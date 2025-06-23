'use client';

import { QuestionCard, CustomSkeleton } from '../ui';
import { BlankScreen } from '@/components/mypage';
import { useCallback, useRef, useMemo } from 'react';
import { useGetQuestion } from '@/hooks/queries/useMyPage';

export default function QuestionList() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetQuestion(null, 10);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading) return;
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            });
            if (node) observerRef.current.observe(node);
        },
        [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    const allData = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) || [];
    }, [data?.pages]);

    if (isLoading) return <CustomSkeleton layout="comment" count={6} />;
    if (isError) return <div>Error</div>;

    return (
        <div>
            {allData.length === 0 ? (
                <BlankScreen
                    text={`아직 작성한 Q&A가 없어요\n궁금한 걸 자유롭게 질문해보세요!`}
                />
            ) : (
                <div className="flex flex-col gap-10 text-white text-lg font-semibold">
                    <div className="flex flex-col gap-5">
                        <div>답변대기</div>
                        <div className="flex flex-col gap-7">
                            {allData
                                .filter((item) => item.answer === undefined)
                                .map((item) => (
                                    <QuestionCard
                                        key={item.comment_id}
                                        title={item.title}
                                        location={item.location}
                                        createdAt={item.createdAt}
                                        comment={item.comment}
                                        answer={item.answer}
                                    />
                                ))}
                        </div>
                    </div>
                    <hr className="border-t border-gray-800 pb-3" />
                    <div className="flex flex-col gap-5">
                        <div>답변 완료</div>
                        <div className="flex flex-col gap-7">
                            {allData
                                .filter((item) => item.answer !== undefined)
                                .map((item, index) => (
                                    <div
                                        key={item.comment_id}
                                        ref={
                                            allData.filter(
                                                (item) =>
                                                    item.answer !== undefined
                                            ).length ===
                                            index + 1
                                                ? lastElementRef
                                                : null
                                        }
                                    >
                                        <QuestionCard
                                            title={item.title}
                                            location={item.location}
                                            createdAt={item.createdAt}
                                            comment={item.comment}
                                            answer={item.answer}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    {isFetchingNextPage && (
                        <div className="text-center py-4">
                            <div className="text-gray-400">로딩 중...</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

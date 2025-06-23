'use client';

import { useState } from 'react';
import { CardList, CustomSkeleton, PaginationButton } from '@/components/ui';
import { BlankScreen } from '@/components/mypage';
import Link from 'next/link';
import { useGetSelfMypage } from '@/hooks/queries/useMyPage';

export default function CardListContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError } = useGetSelfMypage(currentPage, 4);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <CustomSkeleton layout="fanpal" count={4} />;
    if (isError) return <div>Error</div>;

    return (
        <div>
            {data?.data.data.length === 0 || !data ? (
                <BlankScreen
                    text={`아직 만든 팬팔이 없어요\n마음을 나눌 팬팔을 직접 만들어보세요!`}
                    buttonText="팬팔 만들기"
                    link="/ "
                />
            ) : (
                <div className="flex flex-col gap-13.5">
                    <div>
                        {data?.data.data.map((item, index) => (
                            <Link
                                key={item.articleId?.toString() ?? index}
                                href={`/panpal/${item.articleId}`}
                                className="flex flex-col gap-3"
                            >
                                <CardList
                                    title={item.title}
                                    location={item.location}
                                    date={item.date}
                                    deadLine={item.deadLine}
                                    currentPerson={item.currentPerson}
                                    maxPerson={item.maxPerson}
                                    openStatus={
                                        item.openStatus as
                                            | 'CONFIRMED_STATUS'
                                            | 'PENDING_STATUS'
                                            | 'CANCELED_STATUS'
                                    }
                                    image={item.image}
                                    createUser={item.createUser}
                                    createUserProfileImg={
                                        item.createUserProfileImg
                                    }
                                    articleId={item.articleId}
                                    wishList={false}
                                />
                                {index !== data?.data.data.length - 1 && (
                                    <hr className="border-t border-gray-800 pb-3" />
                                )}
                            </Link>
                        ))}
                    </div>
                    <PaginationButton
                        currentPage={currentPage}
                        totalPages={Math.ceil(data?.data.totalCount / 4) ?? 0}
                        onPageChange={handlePageChange}
                        size="large"
                    />
                </div>
            )}
        </div>
    );
}

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, InputText, Profile } from '../ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentList from './CommentList';
import dateConverter from '@/utils/dateConverter';
import { useCommentQuery } from '@/hooks/queries/useComments';
import { useGetUser } from '@/hooks/queries/useAuth';
import LoginModal from '@/components/ui/Modal/LoginModal';
import ConfirmDeleteModal from '@/components/ui/Modal/ConfirmDeleteModal';

interface FormData {
    comment: string;
}

interface DetailPageCommentProps {
    id: number;
    createUser: string;
}

type CommentMode = 'new' | 'edit' | 'reply';

interface CommentModeState {
    mode: CommentMode;
    targetCommentId?: number;
    originalContent?: string;
    parentCommentId?: number;
}

export default function DetailPageComment({
    id,
    createUser,
}: DetailPageCommentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormData>();

    const [secret, setSecret] = useState(false);
    const [commentMode, setCommentMode] = useState<CommentModeState>({
        mode: 'new',
    });

    const formattedDate = dateConverter(Math.floor(Date.now() / 1000), 'utc');

    const observerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { data: user } = useGetUser();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    const {
        commentsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        refetch,
        mutation,
        deleteMutation,
    } = useCommentQuery({
        articleId: id,
        onCommentSuccess: () => {
            reset();
            setSecret(false);
            setCommentMode({ mode: 'new' });
        },
    });

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
            rootMargin: '100px',
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [handleObserver]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }

        const parentCommentId =
            commentMode.mode === 'reply' ? commentMode.parentCommentId : null;

        mutation.mutate({
            parentCommentId: parentCommentId || null,
            secret: secret,
            content: data.comment,
            mode: commentMode.mode === 'reply' ? 'new' : commentMode.mode,
            commentId: commentMode.targetCommentId,
        });
    };

    const handleEditComment = (commentId: number, content: string) => {
        setCommentMode({
            mode: 'edit',
            targetCommentId: commentId,
            originalContent: content,
        });
        setValue('comment', content);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleReplyComment = (parentCommentId: number) => {
        setCommentMode({ mode: 'reply', parentCommentId });
        setValue('comment', '');
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleDeleteComment = (commentId: number) => {
        setCommentToDelete(commentId);
        setIsDeleteModalOpen(true);
    };

    const handleCancel = () => {
        setCommentMode({ mode: 'new' });
        reset();
        setSecret(false);
    };

    const onConfirmDelete = () => {
        if (commentToDelete !== null) {
            deleteMutation.mutate(commentToDelete);
            setIsDeleteModalOpen(false);
            setCommentToDelete(null);
        }
    };

    const onCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setCommentToDelete(null);
    };

    const allComments = commentsData?.pages.flatMap((page) => page.data) || [];

    const getSubmitButtonText = () => {
        if (mutation.isPending)
            return commentMode.mode === 'edit' ? '수정중...' : '등록중...';
        return commentMode.mode === 'edit' ? '수정하기' : '문의하기';
    };

    const getPlaceholderText = () => {
        switch (commentMode.mode) {
            case 'edit':
                return '댓글을 수정해주세요';
            case 'reply':
                return '답글을 입력해주세요';
            default:
                return '내용을 입력해주세요';
        }
    };

    const getHeaderText = () => {
        switch (commentMode.mode) {
            case 'edit':
                return '댓글 수정';
            case 'reply':
                return '답글 작성';
            default:
                return 'Q&A';
        }
    };

    return (
        <div className="flex flex-col">
            <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-72 sm:h-61.25 mt-10 sm:mt-12 px-4 sm:px-6 flex flex-col gap-3 sm:gap-5"
            >
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white">
                        {getHeaderText()}
                    </p>
                    {commentMode.mode !== 'new' && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="text-sm text-gray-400 hover:text-white px-2 py-1 rounded"
                        >
                            취소
                        </button>
                    )}
                </div>

                <div className="w-full h-55.5 sm:h-45.5 flex flex-col sm:flex-row items-end sm:items-center sm:gap-5">
                    <div className="h-45.5 w-full flex flex-col justify-between">
                        <div className="h-6 w-full flex justify-between">
                            <div className="h-full gap-2 flex items-center">
                                <Profile
                                    size="small"
                                    image={user?.profileImg}
                                />
                                <p className="text-sm font-normal text-gray-300">
                                    {user?.nickName}
                                </p>
                            </div>
                            <p className="text-sm font-medium text-gray-600 h-5">
                                {formattedDate}
                            </p>
                        </div>

                        <InputText
                            name="comment"
                            register={register}
                            rules={{
                                required: '댓글을 입력해주세요',
                                minLength: {
                                    value: 3,
                                    message: '3글자 이상 입력하세요',
                                },
                                maxLength: {
                                    value: 100,
                                    message: '100글자 이하로 입력하세요',
                                },
                            }}
                            className="h-27.5"
                            placeholder={getPlaceholderText()}
                        />

                        <div className="h-6 w-23.25 flex justify-between items-center">
                            <input
                                type="checkbox"
                                checked={secret}
                                onChange={(e) => setSecret(e.target.checked)}
                                className="appearance-none w-4.5 h-4.5 rounded-md bg-gray-800 checked:bg-green-500 checked:ring-1 checked:ring-offset-1 checked:shadow-[inset_0_0_0_4px_white]"
                            />
                            <span className="text-xs font-normal text-gray-100">
                                비밀글로 등록
                            </span>
                        </div>
                    </div>

                    <div className="w-26.25 h-10 sm:mb-15 flex gap-2">
                        <Button
                            styled="outline"
                            type="submit"
                            size="small"
                            className="h-full truncate"
                            disabled={mutation.isPending}
                        >
                            {getSubmitButtonText()}
                        </Button>
                    </div>
                </div>

                {errors.comment && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.comment.message}
                    </p>
                )}
            </form>

            {isLoginModalOpen && (
                <LoginModal onClose={() => setIsLoginModalOpen(false)} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    onCancel={onCancelDelete}
                    onConfirm={onConfirmDelete}
                    title="댓글을 삭제하시겠어요?"
                    description="삭제된 댓글은 복구할 수 없어요"
                />
            )}

            <div className="px-4 w-full h-6">
                <div className="border-t border-gray-800 h-1"></div>
            </div>

            <div className="flex flex-col gap-5 pb-17 sm:pb-10">
                <div className="min-h-32 border-b border-gray-800 px-4 py-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-40 sm:h-52.5 font-medium text-gray-500 text-sm">
                            <p>댓글을 불러오는 중...</p>
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center justify-center h-40 sm:h-52.5 font-medium text-red-500 text-sm">
                            <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
                            <button
                                onClick={() => refetch()}
                                className="mt-2 text-blue-500 underline"
                            >
                                다시 시도
                            </button>
                        </div>
                    ) : allComments.length > 0 ? (
                        <>
                            <CommentList
                                comments={allComments}
                                createUserId={createUser ?? ''}
                                onSelectMenu={(commentId, action) => {
                                    const comment = allComments.find(
                                        (c) => c.commentId === commentId
                                    );
                                    if (!comment) return;
                                    if (action === '삭제하기')
                                        handleDeleteComment(commentId);
                                    else if (action === '수정하기')
                                        handleEditComment(
                                            commentId,
                                            comment.content
                                        );
                                    else if (action === '댓글달기')
                                        handleReplyComment(commentId);
                                }}
                            />

                            <div ref={observerRef} className="h-4 w-full">
                                {isFetchingNextPage && (
                                    <div className="flex justify-center items-center py-4">
                                        <div className="text-sm text-gray-500">
                                            더 많은 댓글을 불러오는 중...
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!hasNextPage && allComments.length > 0 && (
                                <div className="flex justify-center items-center py-4">
                                    <div className="text-sm text-gray-500">
                                        모든 댓글을 불러왔습니다.
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 sm:h-52.5 font-medium text-gray-500 text-sm">
                            <p>아직 올라온 질문이 없어요.</p>
                            <p>궁금한 게 있다면 가장 먼저 물어보세요!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { Button, Like } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import LoginModal from '@/components/ui/Modal/LoginModal';
import { useFanFalMutations } from '@/hooks/queries/useFanFalMutations';
import { useGetUser } from '@/hooks/queries/useAuth';
import { toast } from 'react-toastify';
import { useDeleteFanfalMutation } from '@/hooks/queries/useDeleteFanfalMutation';
import { useRouter } from 'next/navigation';
import ConfirmDeleteModal from '@/components/ui/Modal/ConfirmDeleteModal';
import { useLike } from '@/hooks/useLike';

interface Participant {
    profile_image_url: string;
    nickname: string;
}

interface DetailPageParticipationProps {
    articleId: number;
    createUser: string;
    participants: Participant[];
    refetch?: () => void;
}

export default function DetailPageParticipation({
    articleId,
    createUser,
    participants,
    refetch,
}: DetailPageParticipationProps) {
    const { mutate: deleteArticle, isPending: isDeleting } =
        useDeleteFanfalMutation();
    const isDesktop = useMediaQuery('(min-width: 1279px)');
    const isTablet = useMediaQuery('(min-width: 640px)');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { joinMutation, cancelMutation } = useFanFalMutations();
    const { data: user } = useGetUser();
    const isLoggedIn = Boolean(user);
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { isLiked, toggleLike } = useLike(articleId, { isLoggedIn, refetch });

    // 현재 로그인한 사용자가 참여자인지 체크해서 상태 초기화
    const [isParticipated, setIsParticipated] = useState(false);
    useEffect(() => {
        console.log('현재 로그인 유저 닉네임:', user?.nickName);
        console.log(
            '참여자 목록 닉네임:',
            participants.map((p) => p.nickname)
        );

        if (isLoggedIn && user?.nickName) {
            const participated = participants.some(
                (p) => p.nickname === user.nickName
            );
            console.log('참여 여부:', participated);
            setIsParticipated(participated);
        } else {
            setIsParticipated(false);
        }
    }, [participants, user, isLoggedIn]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('링크가 복사되었습니다!');
        } catch (err) {
            toast.error('복사에 실패했습니다.');
            console.error('링크 복사 실패:', err);
        }
    };
    const handleParticipateClick = async () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
            return;
        }

        try {
            if (isParticipated) {
                await cancelMutation.mutateAsync(articleId);
                setIsParticipated(false);
                toast.success('참여가 취소되었습니다.');

                refetch?.();
            } else {
                await joinMutation.mutateAsync(articleId);
                setIsParticipated(true);
                toast.success('참여가 완료되었습니다!');

                refetch?.();
            }
        } catch (error) {
            console.error('참여/취소 처리 중 오류:', error);

            if (isParticipated) {
                toast.error('참여 취소에 실패했습니다.');
            } else {
                toast.error('참여에 실패했습니다.');
            }

            refetch?.();

            if (user?.nickName) {
                const serverParticipated = participants.some(
                    (p) => p.nickname === user.nickName
                );
                setIsParticipated(serverParticipated);
            }
        }
    };

    const isAdmin = isLoggedIn && user?.nickName === createUser;

    return (
        <>
            <div
                className={cn(
                    'w-full bg-[#1A1B1FCC] px-5 pt-3 pb-4 gap-5.25 sm:px-6 sm:pt-5 sm:pb-7 mt-6 sm:mt-10 xl:mt-12 xl:w-70.5 xl:h-29 xl:pt-0 xl:pb-0 xl:px-0',
                    isDesktop
                        ? 'relative h-24'
                        : 'fixed bottom-0 left-0 z-50 h-19'
                )}
            >
                {isTablet ? (
                    <div className="flex w-full gap-33 xl:flex-col-reverse xl:gap-6 justify-between ">
                        <p className="flex flex-col w-70.5 h-full gap-1 whitespace-nowrap">
                            <span className="text-base font-semibold text-gray-200">
                                함께하면 더 즐거운 팬활동 💚
                            </span>
                            <span className="text-xs font-medium text-gray-500">
                                같은 마음으로 움직이는 팬들과 함께라면 훨씬
                                든든해요
                            </span>
                        </p>
                        {isAdmin ? (
                            isDesktop ? (
                                <div className="flex flex-col gap-3">
                                    <Button
                                        styled="outline"
                                        onClick={handleCopyLink}
                                    >
                                        공유하기
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setIsDeleteModalOpen(true)
                                        }
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? '삭제 중...' : '취소하기'}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex gap-2 w-80.5">
                                    <Button
                                        onClick={() =>
                                            setIsDeleteModalOpen(true)
                                        }
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? '삭제 중...' : '취소하기'}
                                    </Button>
                                    <Button
                                        styled="outline"
                                        onClick={handleCopyLink}
                                    >
                                        공유하기
                                    </Button>
                                </div>
                            )
                        ) : (
                            <Button
                                onClick={handleParticipateClick}
                                styled={isParticipated ? 'outline' : 'solid'}
                                disabled={
                                    joinMutation.isPending ||
                                    cancelMutation.isPending
                                }
                            >
                                {isParticipated ? '참여 취소하기' : '참여하기'}
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="flex justify-between items-center px-4 gap-5.25">
                        <Like like={isLiked} onClick={toggleLike} />
                        {isAdmin ? (
                            <div className="flex gap-2 ">
                                <Button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? '삭제 중...' : '취소하기'}
                                </Button>
                                <Button
                                    styled="outline"
                                    onClick={handleCopyLink}
                                >
                                    공유하기
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleParticipateClick}
                                styled={isParticipated ? 'outline' : 'solid'}
                                disabled={
                                    joinMutation.isPending ||
                                    cancelMutation.isPending
                                }
                            >
                                {isParticipated ? '참여 취소하기' : '참여하기'}
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {isLoginModalOpen && (
                <LoginModal onClose={() => setIsLoginModalOpen(false)} />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    onCancel={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => {
                        deleteArticle(articleId, {
                            onSuccess: () => {
                                toast.success(
                                    '게시글이 성공적으로 삭제되었습니다.'
                                );
                                router.push('/');
                            },
                            onError: (error: Error) => {
                                toast.error('게시글 삭제에 실패했습니다.');
                                console.error(error);
                            },
                        });
                    }}
                />
            )}
        </>
    );
}

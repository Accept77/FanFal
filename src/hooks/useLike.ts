import { useWishlistStore } from '@/store/wishlistStore';
import { wishLikeApi } from '@/utils/apis/likeApi';

interface UseLikeOptions {
    isLoggedIn: boolean;
    refetch?: () => void;
    onLikeClick?: (event: React.MouseEvent, isLiked: boolean) => void;
}

export const useLike = (articleId: number, options: UseLikeOptions) => {
    const { isLoggedIn, refetch, onLikeClick } = options;

    const isLiked = useWishlistStore((state) => state.isLiked(articleId));
    const addLike = useWishlistStore((state) => state.addLike);
    const removeLike = useWishlistStore((state) => state.removeLike);

    const toggleLike = async (event?: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const wasLiked = isLiked;

        try {
            // 1. 로컬 상태 먼저 업데이트 (UI 반응성)
            if (wasLiked) {
                removeLike(articleId);
            } else {
                addLike(articleId);
            }

            // 2. 로그인 상태일 때만 서버 API 호출
            if (isLoggedIn) {
                if (wasLiked) {
                    await wishLikeApi.unlike(articleId);
                } else {
                    await wishLikeApi.like([articleId]);
                }
            }

            refetch?.();
            if (event) onLikeClick?.(event, !wasLiked);
        } catch (error) {
            console.error('찜 처리 중 오류:', error);
            // 실패 시 로컬 상태 롤백
            if (wasLiked) {
                addLike(articleId);
            } else {
                removeLike(articleId);
            }
        }
    };

    return { isLiked, toggleLike };
};

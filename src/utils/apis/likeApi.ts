import { customFetcher } from '@/utils/apis/customFetcher';

interface WishLikeResponse {
    statusCode: number;
    message: string;
    data: string;
}

export const wishLikeApi = {
    /**
     * 찜 등록
     * @param articleIds number[] - 찜할 게시물 ID 리스트
     */
    like: async (articleIds: number[]): Promise<WishLikeResponse> => {
        return customFetcher<WishLikeResponse, { article_ids: number[] }>(
            '/api/wishlike',
            {
                method: 'POST',
                auth: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { article_ids: articleIds },
            }
        );
    },

    /**
     * 찜 해제
     * @param articleId number - 해제할 게시물 ID
     */
    unlike: async (articleId: number): Promise<WishLikeResponse> => {
        return customFetcher<WishLikeResponse, void>(
            `/api/wishlike/${articleId}`,
            {
                method: 'DELETE',
                auth: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },
};

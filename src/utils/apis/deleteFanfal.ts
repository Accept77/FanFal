import { customFetcher } from '@/utils/apis/customFetcher';

export interface ApiResponse {
    statusCode: number;
    message: string;
    data: number;
}

export const deleteFanfalApi = {
    deleteArticle: async (articleId: number): Promise<ApiResponse> => {
        return customFetcher<ApiResponse, void>(`/api/board/${articleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
};

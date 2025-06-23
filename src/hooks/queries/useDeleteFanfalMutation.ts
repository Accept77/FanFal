import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFanfalApi } from '@/utils/apis/deleteFanfal';

export interface ApiResponse {
    statusCode: number;
    message: string;
    data: number;
}

export function useDeleteFanfalMutation() {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, number>({
        mutationFn: (articleId: number) =>
            deleteFanfalApi.deleteArticle(articleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });
}

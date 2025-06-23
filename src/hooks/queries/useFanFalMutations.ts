import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fanFalApi } from '@/utils/apis/fanpalApi';

export interface FanFalResponse {
    statusCode: number;
    message: string;
    data: string;
}

export function useFanFalMutations() {
    const queryClient = useQueryClient();

    const joinMutation = useMutation<FanFalResponse, Error, number>({
        mutationFn: async (articleId) => {
            const result = await fanFalApi.join(articleId);
            return result;
        },
        onSuccess: (data, articleId) => {
            queryClient.invalidateQueries({ queryKey: ['article', articleId] });
            queryClient.invalidateQueries({
                queryKey: ['participants', articleId],
            });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['fanfal'] });
        },
        onError: (error, articleId) => {
            console.error('참여 API 에러:', error, articleId);
        },
    });

    const cancelMutation = useMutation<FanFalResponse, Error, number>({
        mutationFn: async (articleId) => {
            const result = await fanFalApi.cancel(articleId);
            return result;
        },
        onSuccess: (data, articleId) => {
            queryClient.invalidateQueries({ queryKey: ['article', articleId] });
            queryClient.invalidateQueries({
                queryKey: ['participants', articleId],
            });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['fanfal'] });
        },
        onError: (error, articleId) => {
            console.error('취소 API 에러:', error, articleId);
        },
    });

    return { joinMutation, cancelMutation };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBoardApi } from '@/utils/apis/createFanfalApi';
import type { BoardRequest, BoardResponse } from '@/utils/apis/createFanfalApi';

export const useCreateFanfalMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<BoardResponse, Error, BoardRequest>({
        mutationFn: (payload) => createBoardApi.postBoard(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });
};

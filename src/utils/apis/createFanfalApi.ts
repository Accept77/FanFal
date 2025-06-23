import { customFetcher } from '@/utils/apis/customFetcher';

export interface BoardRequest {
    title: string;
    roadNameAddress: string;
    latitude: number;
    longitude: number;
    imageKey: string;
    description: string;
    smallCategory: string;
    date: number;
    deadline: number;
    minPerson: number;
    maxPerson: number;
}

export interface BoardResponse {
    statusCode: number;
    message: string;
    data: string | null;
}

export const createBoardApi = {
    postBoard: async (params: BoardRequest): Promise<BoardResponse> => {
        return customFetcher<BoardResponse, BoardRequest>(`/api/board`, {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
};

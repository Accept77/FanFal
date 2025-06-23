import { getListApiResponse, getListApiParams } from '@/types/board';
import { customFetcher } from '@/utils/apis/customFetcher';

export const getListApi = {
    getArticles: async (
        params: getListApiParams
    ): Promise<getListApiResponse> => {
        const query = new URLSearchParams({
            bigCategory: params.bigCategory,
            ...(params.smallCategory && {
                smallCategory: params.smallCategory,
            }),
            ...(params.location && { location: params.location }),
            ...(params.date && { date: params.date.toString() }),
            sort: params.sort,
            sortAsc: String(params.sortAsc),
            lastArticleId: params.lastArticleId.toString(),
            limit: params.limit.toString(),
            page: params.page.toString(),
        });

        return customFetcher<getListApiResponse, undefined>(
            `/api/board?${query.toString()}`,
            {
                method: 'GET',
            }
        );
    },
};

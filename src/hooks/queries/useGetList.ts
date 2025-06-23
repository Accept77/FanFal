import { useQuery } from '@tanstack/react-query';
import { getListApi } from '@/utils/apis/getListApi';
import { CATEGORY_DATA } from '@/types/categories';
import { Card } from '@/types/card';
import { getDetailApi } from '@/utils/apis/getDetailApi';
import { DetailApiResponse } from '@/types/detail';

interface UseGetListParams {
    activeTab: number;
    selectedCategory: string;
    selectedRegion: string;
    selectedDate: Date | null;
    selectedSortOption: 'recent' | 'deadLine' | 'person';
    sortAsc: boolean;
    lastArticleId?: number;
    limit?: number;
    page?: number;
}

export const useGetList = ({
    activeTab,
    selectedCategory,
    selectedRegion,
    selectedDate,
    selectedSortOption,
    sortAsc,
    lastArticleId = 0,
    limit = 10,
    page = 1,
}: UseGetListParams) => {
    const queryResult = useQuery({
        queryKey: [
            'articles',
            activeTab,
            selectedCategory,
            selectedRegion,
            selectedDate?.getTime(),
            selectedSortOption,
            sortAsc,
            lastArticleId,
            limit,
            page,
        ],

        queryFn: async (): Promise<Card[]> => {
            const bigCategory = CATEGORY_DATA[activeTab].id;

            const response = await getListApi.getArticles({
                bigCategory,
                smallCategory:
                    selectedCategory === 'ALL' ? '' : selectedCategory,
                location: selectedRegion === '전체' ? '' : selectedRegion,
                date: selectedDate
                    ? Math.floor(selectedDate.getTime() / 1000)
                    : undefined,
                sort: selectedSortOption,
                sortAsc,
                lastArticleId,
                limit,
                page,
            });

            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 10 * 60 * 1000, // 10분
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        placeholderData: (previousData) => previousData,
    });

    return queryResult;
};

export const useGetDetail = ({ id }: { id: number }) => {
    return useQuery<DetailApiResponse['data']>({
        queryKey: ['articles', id],
        queryFn: async () => {
            const response = await getDetailApi.getDetailById(id);
            return response;
        },
    });
};

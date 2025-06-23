import { findTotalCount, getConcertList } from '@/utils/apis/concert';
import { useQuery } from '@tanstack/react-query';
import { Concert } from '@/types/concert';

export const useConcert = (
    currentPage: number,
    location: string,
    startDate: string,
    endDate: string
) => {
    return useQuery<Concert[]>({
        queryKey: ['concerts', currentPage, location, startDate, endDate],
        queryFn: () =>
            getConcertList(currentPage, startDate, endDate, location),
        staleTime: 1000 * 60 * 1,
    });
};

export const useTotalCount = (
    startDate: string,
    endDate: string,
    location: string
) => {
    return useQuery<number>({
        queryKey: ['totalCount', startDate, endDate, location],
        queryFn: () => findTotalCount(startDate, endDate, location),
    });
};

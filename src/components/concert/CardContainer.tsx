import { useEffect, useState } from 'react';
import { PaginationButton, CustomSkeleton } from '../ui';
import ConcertCardList from './ConcertCardList';
import { useQueryClient } from '@tanstack/react-query';
import { getConcertList } from '@/utils/apis/concert';
import { BlankScreen } from '../mypage';
import { useConcert, useTotalCount } from '@/hooks/queries/useConcert';

export default function CardContainer({
    startDate,
    endDate,
    location,
}: {
    startDate: string;
    endDate: string;
    location: string;
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const {
        data: concertList,
        isLoading,
        isError,
    } = useConcert(currentPage, location, startDate, endDate);
    const {
        data: totalCount,
        isLoading: totalCountLoading,
        isError: totalCountError,
    } = useTotalCount(startDate, endDate, location);

    useEffect(() => {
        if (totalCount && currentPage <= totalCount - 2) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery({
                queryKey: ['concerts', nextPage, location, startDate, endDate],
                queryFn: () =>
                    getConcertList(nextPage, startDate, endDate, location),
            });
        }
    }, [currentPage, queryClient, totalCount, startDate, endDate, location]);

    if (isLoading || totalCountLoading) {
        return <CustomSkeleton layout="concert" count={8} />;
    }

    if (isError || totalCountError) {
        return (
            <div className="flex justify-center items-center min-h-screen xl:min-w-[1060px] min-w-screen">
                <div className="text-red-500">
                    데이터를 불러오는데 실패했습니다.
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-17 justify-center items-center">
            {concertList && concertList[0] ? (
                <ConcertCardList concertResponse={concertList} />
            ) : (
                <div className="flex flex-col justify-center items-center xl:min-w-[1060px] min-w-screen">
                    <BlankScreen
                        text={`아직공연 목록이 없어요. \n 곧 멋진 공연이 찾아올 거예요!`}
                        image="/images/mike.png"
                    />
                </div>
            )}
            {totalCount && (
                <PaginationButton
                    currentPage={currentPage}
                    totalPages={totalCount}
                    onPageChange={setCurrentPage}
                    size="large"
                />
            )}
        </div>
    );
}

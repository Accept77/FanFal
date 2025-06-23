'use client';

import { DetailPageCard, DetailPageDescription } from '@/components/detailPage';
import { useEffect } from 'react';
import { useGetDetail } from '@/hooks/queries/useGetList';
import CustomSkeleton from '@/components/ui/CustomSkeleton';
import { useParams } from 'next/navigation';

export default function PanpalDetailPage() {
    const { id: idString } = useParams();
    const id = Number(idString);

    const { data, isLoading, error, refetch } = useGetDetail({
        id: isNaN(id) || id <= 0 ? 0 : id,
    });

    useEffect(() => {
        refetch();
    }, [id, refetch]);

    if (isLoading) {
        return <CustomSkeleton layout="detail" />;
    }

    if (error) {
        return (
            <div className="w-full pt-6 sm:pt-5 xl:pt-8 flex flex-col justify-center min-w-93.75 min-h-screen max-w-249 m-auto">
                <div className="w-full flex flex-col mt-8 sm:mt-16 xl:mt-18.25 sm:px-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        오류가 발생했습니다
                    </h1>
                    <p className="text-gray-400">
                        판팔 정보를 불러오는 중 문제가 발생했습니다.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full pt-6 sm:pt-5 xl:pt-8 flex flex-col justify-center min-w-93.75 min-h-screen max-w-249 m-auto">
                <div className="w-full flex flex-col mt-8 sm:mt-16 xl:mt-18.25 sm:px-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        펜팔을 찾을 수 없습니다
                    </h1>
                    <p className="text-gray-400">
                        존재하지 않거나 삭제된 펜팔입니다.
                    </p>
                </div>
            </div>
        );
    }

    const descriptionProps = {
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        articleId: id,
        createUser: data.nickName,
        participants: data.participants,
        refetch,
    };

    const cardProps = {
        title: data.title,
        date: data.date,
        deadLine: data.deadLine,
        createdAt: data.createdAt,
        minPerson: data.min_person,
        currentPerson: data.currentPerson,
        maxPerson: data.maxPerson,
        participants: data.participants,
        wishList: data.wishList,
        articleImageUrl: data.articleImageUrl,
        openStatus: data.openStatus,
        useStatus: data.useStatus,
        createUser: data.nickName,
        location: data.location,
        articleId: id,
        createUserProfileImgUrl: data.writerImageUrl,
        refetch,
    };

    return (
        <div className="w-full pt-6 sm:pt-5 xl:pt-8 flex flex-col justify-center min-w-93.75 min-h-screen max-w-249 m-auto xl:flex-row">
            <div className="w-full flex flex-col mt-8 sm:mt-16 xl:mt-18.25 sm:px-6">
                <DetailPageCard {...cardProps} />
                <DetailPageDescription {...descriptionProps} />
            </div>
        </div>
    );
}

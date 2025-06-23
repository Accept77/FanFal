import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CardListSkeletonProps {
    layout?: 'concert' | 'fanpal' | 'detail' | 'comment';
    count?: number;
    containerClass?: string;
    cardClass?: string;
}

interface SkeletonCardProps {
    layout: 'concert' | 'fanpal' | 'detail' | 'comment';
    cardClass?: string;
}

function SkeletonCard({ layout, cardClass }: SkeletonCardProps) {
    if (layout === 'concert') {
        return (
            <div
                className={`xl:w-64 sm:w-52 xl:px-3 xl:pt-3 xl:pb-8 p-2 ${cardClass || ''}`}
            >
                <div className="flex sm:flex-col flex-row sm:gap-6 gap-3">
                    <div className="relative xl:h-75 sm:h-61 h-30 sm:w-full w-25 items-center justify-center flex-shrink-0">
                        <Skeleton className="w-full h-full" />
                    </div>
                    <div className="flex flex-col gap-1 text-sm justify-center sm:w-full w-60">
                        <Skeleton
                            height={24}
                            className="xl:h-6 sm:h-5 h-4 mb-1"
                        />
                        <Skeleton height={16} width="70%" className="mb-1" />
                        <Skeleton
                            height={16}
                            width="85%"
                            className="sm:mt-0 mt-2 "
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'fanpal') {
        return (
            <div className="w-full flex flex-col sm:flex-row sm:py-3 sm:pl-3 sm:pr-6 sm:gap-6 gap-0 sm:min-h-67.5 min-h-97 hover:bg-gray-900 hover:cursor-pointer">
                <div className="w-full sm:w-1/4 relative h-50 sm:h-auto">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="sm:w-3/4 w-full flex flex-col justify-between pt-5.5 sm:gap-0 gap-5">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex gap-2 text-gray-400 items-center">
                                    <div className="text-xl font-semibold text-white">
                                        <Skeleton height={28} width="200px" />
                                    </div>
                                    <div className="hidden sm:block">|</div>
                                    <div className="font-medium hidden sm:block">
                                        <Skeleton height={16} width="120px" />
                                    </div>
                                </div>
                                <div className="flex sm:text-white text-gray-400 items-center font-normal gap-2">
                                    <div className="font-medium sm:hidden">
                                        <Skeleton height={16} width="100px" />
                                    </div>
                                    <div className="sm:hidden">|</div>
                                    <Skeleton height={16} width="150px" />
                                </div>
                            </div>
                            <div className="flex gap-2 text-sm text-gray-400 items-center">
                                <Skeleton
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                />
                                <Skeleton height={16} width="80px" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton height={20} width="60%" />
                        <Skeleton height={16} width="40%" />
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'detail') {
        return (
            <div className="pt-25 pb-10 text-white w-full flex justify-center px-6">
                <div className="xl:max-w-[1005px] w-full flex flex-col gap-12">
                    <div className="flex sm:flex-row flex-col sm:gap-10 gap-7">
                        <div className="relative w-full sm:w-72 h-96 min-w-72 min-h-96">
                            <Skeleton className="w-full h-full rounded-lg" />
                        </div>

                        <div className="flex flex-col sm:gap-14 gap-7 w-full">
                            <div className="text-2xl font-semibold">
                                <Skeleton height={32} width="80%" />
                            </div>

                            <div className="grid sm:grid-cols-[64px_auto_1fr] grid-cols-[auto_1fr] gap-y-2 gap-x-3 justify-items-between text-base font-normal">
                                <Skeleton height={16} width={64} />
                                <div className="text-gray-800 sm:block hidden">
                                    |
                                </div>
                                <Skeleton height={16} width="70%" />

                                <Skeleton height={16} width={64} />
                                <div className="text-gray-800 sm:block hidden">
                                    |
                                </div>
                                <Skeleton height={16} width="85%" />

                                <Skeleton height={16} width={64} />
                                <div className="text-gray-800 sm:block hidden">
                                    |
                                </div>
                                <Skeleton height={16} width="40%" />

                                <Skeleton height={16} width={32} />
                                <div className="text-gray-800 sm:block hidden">
                                    |
                                </div>
                                <div className="sm:text-left text-right">
                                    <Skeleton
                                        height={16}
                                        width="90%"
                                        className="mb-1"
                                    />
                                    <Skeleton
                                        height={16}
                                        width="80%"
                                        className="mb-1"
                                    />
                                    <Skeleton height={16} width="75%" />
                                </div>

                                {/* 예매처 */}
                                <Skeleton height={16} width={48} />
                                <div className="text-gray-800 sm:block hidden">
                                    |
                                </div>
                                <Skeleton height={16} width="60%" />
                            </div>
                        </div>
                    </div>

                    <hr className="border-t border-gray-800" />

                    <div className="flex xl:flex-row flex-col gap-8 xl:items-start items-center xl:pb-0 pb-26">
                        <div className="relative w-fit">
                            <Skeleton
                                width={690}
                                height={800}
                                className="object-contain hidden sm:block rounded-lg"
                            />
                            <Skeleton
                                width={320}
                                height={400}
                                className="object-contain sm:hidden rounded-lg"
                            />
                        </div>

                        <div className="xl:w-fit w-full xl:relative fixed bottom-0 px-6 py-7 xl:py-0 xl:px-0 bg-[#14151A]">
                            <Skeleton
                                height={48}
                                width={200}
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'comment') {
        return (
            <div className="bg-gray-900 px-7 py-8 rounded-2xl flex sm:flex-row flex-col justify-between">
                <div className="flex flex-col gap-8">
                    <div className="gap-1 flex flex-col">
                        <div className="flex gap-2 text-gray-500 items-center text-sm font-medium">
                            <Skeleton height={14} width="120px" />
                            <div>|</div>
                            <Skeleton height={14} width="80px" />
                        </div>
                        <div>
                            <div className="flex gap-2 flex-col">
                                <div className="text-white font-medium text-base">
                                    <Skeleton height={16} width="85%" />
                                </div>
                                <div className="text-gray-500 text-sm font-light">
                                    <Skeleton height={14} width="100px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 min-w-18 items-end">
                    <Skeleton
                        height={24}
                        width="70px"
                        className="rounded-full"
                    />
                </div>
            </div>
        );
    }

    return <div>not found</div>;
}

export default function CustomSkeleton({
    layout = 'concert',
    count,
    containerClass = '',
    cardClass = '',
}: CardListSkeletonProps) {
    if (layout === 'detail') {
        return (
            <SkeletonTheme baseColor="#2b2c30" highlightColor="#44464b">
                <SkeletonCard layout={layout} cardClass={cardClass} />
            </SkeletonTheme>
        );
    }

    const skeletonCount = count || 8;

    return (
        <SkeletonTheme baseColor="#2b2c30" highlightColor="#44464b">
            <div
                className={`flex flex-col gap-3 justify-center items-center w-full ${containerClass}`}
            >
                {layout === 'fanpal' || layout === 'comment' ? (
                    <div className="flex flex-col gap-3 w-full">
                        {Array.from({ length: skeletonCount }).map(
                            (_, index) => (
                                <SkeletonCard
                                    key={index}
                                    layout={layout}
                                    cardClass={cardClass}
                                />
                            )
                        )}
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-4 gap-3">
                        {Array.from({ length: skeletonCount }).map(
                            (_, index) => (
                                <React.Fragment key={index}>
                                    <SkeletonCard
                                        key={index}
                                        layout={layout}
                                        cardClass={cardClass}
                                    />
                                    {index !== skeletonCount - 1 && (
                                        <hr className="border-t border-gray-800 sm:hidden" />
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </div>
                )}
            </div>
        </SkeletonTheme>
    );
}

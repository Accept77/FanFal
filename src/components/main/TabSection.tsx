'use client';

import { DoTogetherIcon, GoTogetherIcon } from '@/assets';
import { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { CATEGORY_DATA } from '@/types/categories';
import { Tab, Button, PanpalModal } from '@/components/ui';
import { cn } from '@/utils/cn';

type TapSectionProps = {
    activeTab: number;
    setActiveTab: (tab: number) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    showCreateButton?: boolean;
};

export default function TapSection({
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    showCreateButton = true,
}: TapSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 1280px)');
    const isTablet = useMediaQuery(
        '(min-width: 640px) and (max-width: 1279px)'
    );
    const currentCategory = CATEGORY_DATA[activeTab];

    return (
        <div
            className={cn(
                'w-full h-23 sm:h-31 flex justify-center flex-col gap-5 sm:gap-10 xl:gap-5 xl:items-center min-w-94',
                showCreateButton ? 'sm:h-31 xl:h-53' : 'sm:h-20 xl:h-24'
            )}
        >
            <div className="w-full h-12 flex xl:w-70">
                <Tab
                    icon={<GoTogetherIcon width={24} height={24} />}
                    active={activeTab === 0}
                    onClick={() => setActiveTab(0)}
                    className="w-full"
                >
                    같이 가요
                </Tab>
                <Tab
                    icon={<DoTogetherIcon width={24} height={24} />}
                    active={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                    className="w-full"
                >
                    같이 해요
                </Tab>
            </div>
            <div className="w-full h-9 sm:h-12 xl:h-10 flex sm:justify-between sm:items-center ">
                <div className="flex">
                    <div
                        className={cn(
                            'px-3 py-2 rounded-full font-medium text-sm cursor-pointer',
                            selectedCategory === 'ALL'
                                ? 'bg-gray-800 text-white'
                                : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
                        )}
                        onClick={() => setSelectedCategory('ALL')}
                    >
                        전체
                    </div>

                    {currentCategory?.smallCategory?.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                'px-3 py-2 rounded-full font-medium text-sm cursor-pointer',
                                selectedCategory === item.id
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
                            )}
                            onClick={() => setSelectedCategory(item.id)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                {showCreateButton && isTablet && (
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-30 h-12 whitespace-nowrap"
                    >
                        팬팔 만들기
                    </Button>
                )}
            </div>

            {showCreateButton && isDesktop && (
                <div className="w-full h-24 flex p-5 justify-between border-b-2 border-gray-800">
                    <p className="w-60 h-14 flex flex-col justify-between">
                        <span className="text-sm font-medium text-gray-300">
                            할께 할 사람이 없나요?
                        </span>
                        <span className="text-2xl font-semibold text-white">
                            지금 모임에 참여해보세요
                        </span>
                    </p>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-30 h-12 whitespace-nowrap"
                    >
                        팬팔 만들기
                    </Button>
                </div>
            )}

            {isModalOpen && (
                <PanpalModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={() => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

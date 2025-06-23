'use client';

import { useState, useEffect } from 'react';
import { TabSection, FilterSection, CardSection } from '@/components/main';
import { useWishlistStore } from '@/store/wishlistStore';
import { useGetUser } from '@/hooks/queries/useAuth';
import { useGetList } from '@/hooks/queries/useGetList';

export default function WishList() {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const [selectedRegion, setSelectedRegion] = useState<string>('전체');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSortOption, setSelectedSortOption] = useState<
        'recent' | 'deadLine' | 'person'
    >('recent');
    const [sortAsc, setSortAsc] = useState<boolean>(false);
    const likedArticleIds = useWishlistStore(
        (state) => state.likedArticleIds ?? []
    );

    const { data: user } = useGetUser();
    const isLoggedIn = !!user;

    const { data: articles = [], isLoading } = useGetList({
        activeTab,
        selectedCategory,
        selectedRegion,
        selectedDate,
        selectedSortOption,
        sortAsc,
    });

    useEffect(() => {
        setSelectedCategory('ALL');
    }, [activeTab]);

    const serverWishedArticles = articles.filter((a) => a.wish === true);

    // 로컬(wishlistStore)에서 찜한 아이템 ID
    const localWishedArticles = articles.filter((a) =>
        likedArticleIds.includes(a.articleId)
    );

    // 로그인 상태일 경우 둘 다 합쳐서 중복 제거
    const wishListArticles = isLoggedIn
        ? [
              ...new Map(
                  [...serverWishedArticles, ...localWishedArticles].map(
                      (item) => [item.articleId, item]
                  )
              ).values(),
          ]
        : localWishedArticles;

    return (
        <div>
            <div className="w-full px-10 h-21 hidden sm:block sm:pt-24 xl:pt-28 max-w-249 m-auto ">
                <p className="flex flex-col gap-2">
                    <span className="text-white text-2xl font-semibold">
                        찜한 팬팔
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                        마감되기 전에 지금 바로 참여해보세요 👀
                    </span>
                </p>
            </div>
            <div className="w-full px-4 sm:px-6 pt-6 sm:pt-25 xl:pt-18 flex justify-center min-w-98 min-h-screen max-w-249 m-auto ">
                <div className="w-full flex flex-col gap-4 sm:gap-8 xl:gap-10 mt-13.25 sm:mt-0 xl:mt-0 ">
                    <TabSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        showCreateButton={false}
                    />
                    <FilterSection
                        selectedRegion={selectedRegion}
                        setSelectedRegion={setSelectedRegion}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedSortOption={selectedSortOption}
                        setSelectedSortOption={setSelectedSortOption}
                        sortAsc={sortAsc}
                        setSortAsc={setSortAsc}
                    />
                    <CardSection
                        showCreateButton={false}
                        cards={wishListArticles}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}

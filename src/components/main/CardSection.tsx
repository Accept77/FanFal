'use client';

import React, { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import Link from 'next/link';
import { Card } from '@/types/card';
import {
    Button,
    CardList,
    PaginationButton,
    PanpalModal,
    CustomSkeleton,
} from '@/components/ui';

interface CardSectionProps {
    cards: Card[];
    showCreateButton?: boolean;
    isLoading?: boolean;
}

export default function CardSection({
    cards,
    showCreateButton = true,
    isLoading = false,
}: CardSectionProps) {
    const hasCards = cards && cards.length > 0;
    const isMobile = useMediaQuery('(max-width: 639px)');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 4;
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const currentCards = cards.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-end gap-12">
                <div className="w-full min-h-110 sm:min-h-190 xl:min-h-145 flex items-center justify-center">
                    <CustomSkeleton layout="fanpal" count={4} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-end gap-12">
            <div className="w-full min-h-110 sm:min-h-190 xl:min-h-145 flex items-center justify-center ">
                {hasCards ? (
                    <div className="flex flex-col gap-10 sm:gap-10 xl:gap-30 w-full ">
                        <div className="flex- flex-col gap-3 min-h-100 sm:min-h-160 xl:min-h-80">
                            {currentCards.map((card) => {
                                console.log('card.createUser:', card.nickName);
                                return (
                                    <Link
                                        key={card.articleId}
                                        href={`/panpal/${card.articleId}`}
                                    >
                                        <CardList
                                            title={card.title}
                                            location={card.location}
                                            date={card.date}
                                            deadLine={card.deadLine}
                                            currentPerson={card.currentPerson}
                                            maxPerson={card.maxPerson}
                                            openStatus={card.openStatus}
                                            image={card.image}
                                            createUser={card.nickName}
                                            createUserProfileImg={
                                                card.writerImageUrl
                                            }
                                            articleId={card.articleId}
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        <PaginationButton
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            size="small"
                        />
                        <div className=""></div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm font-medium flex flex-col justify-center items-center">
                        <span>아직 팬팔이 없어요,</span>
                        <span>지금 바로 팬팔을 만들어보세요</span>
                    </p>
                )}
            </div>

            {isMobile && showCreateButton && (
                <div className="h-20">
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
                    onSubmit={(data) => {
                        console.log('제출된 데이터:', data);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

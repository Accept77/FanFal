'use client';

import { Button, CustomSkeleton } from '@/components/ui';
import { getConcertDetail } from '@/utils/apis/concert';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ConcertDetail } from '@/types/concert';
import React from 'react';
import Link from 'next/link';

// 날짜 포맷 함수 추가
function formatKoreanDate(dateStr: string) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(6, 7);
    const day = dateStr.slice(8, 10);
    const date = new Date(`${year}-${month}-${day}`);
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[date.getDay()];
    return `${year}년 ${Number(month)}월 ${Number(day)}일 (${dayOfWeek})`;
}

export default function ConcertDetailPage() {
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery<ConcertDetail>({
        queryKey: ['concertDetail', id],
        queryFn: () => getConcertDetail(id as string),
    });

    if (isLoading) {
        return <CustomSkeleton layout="detail" />;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="pt-25 pb-10 text-white w-full flex justify-center px-6">
            <div className="xl:max-w-[1005px] w-full flex flex-col gap-12">
                <div className="flex sm:flex-row flex-col sm:gap-10 gap-7">
                    <div className="relative w-full sm:w-72 h-96 min-w-72 min-h-96">
                        <Image
                            src={data?.poster || ''}
                            alt="콘서트 이미지"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col sm:gap-14 gap-7">
                        <div className="text-2xl font-semibold">
                            {data?.prfnm}
                        </div>
                        <div className="grid sm:grid-cols-[64px_auto_1fr] grid-cols-[auto_1fr] gap-y-2 gap-x-3 justify-items-between text-base font-normal break-keep">
                            <div className="text-gray-400">공연장소</div>
                            <div className="text-gray-800 sm:block hidden">
                                |
                            </div>
                            <div className="sm:text-left text-right">
                                {data?.fcltynm}
                            </div>
                            <div className="text-gray-400">공연기간</div>
                            <div className="text-gray-800 sm:block hidden">
                                |
                            </div>
                            <div className="sm:text-left text-right">
                                {formatKoreanDate(data?.prfpdfrom || '')} ~{' '}
                                {formatKoreanDate(data?.prfpdto || '')}
                            </div>
                            <div className="text-gray-400">관람연령</div>
                            <div className="text-gray-800 sm:block hidden">
                                |
                            </div>
                            <div className="sm:text-left text-right">
                                {data?.prfage}
                            </div>
                            <div className="text-gray-400">가격</div>
                            <div className="text-gray-800 sm:block hidden">
                                |
                            </div>
                            <div className="sm:text-left text-right">
                                {data?.pcseguidance
                                    ?.split(/원,\s*/)
                                    .map((price, index) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && <br />}
                                            {price.split(' ')[0]}{' '}
                                            <span className="font-bold">
                                                {price.split(' ')[1]}
                                            </span>
                                        </React.Fragment>
                                    ))}
                            </div>
                            <div className="text-gray-400">예매처</div>
                            <div className="text-gray-800 sm:block hidden">
                                |
                            </div>
                            <div className="sm:text-left text-right">
                                <div>
                                    {Array.isArray(data?.relates.relate)
                                        ? data?.relates.relate.map(
                                              (item, index) => (
                                                  <React.Fragment
                                                      key={item.relateurl}
                                                  >
                                                      {index > 0 && ', '}
                                                      {item.relatenm}
                                                  </React.Fragment>
                                              )
                                          )
                                        : data?.relates.relate?.relatenm}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-t border-gray-800" />
                <div className="flex xl:flex-row flex-col gap-8 xl:items-start items-center xl:pb-0 pb-26">
                    <div className="relative w-fit">
                        {Array.isArray(data?.styurls.styurl) ? (
                            data?.styurls.styurl.map((item, index) => (
                                <Image
                                    key={index}
                                    src={item}
                                    alt="콘서트 설명"
                                    width={690}
                                    height={1}
                                    className="object-contain hidden sm:block"
                                />
                            ))
                        ) : (
                            <Image
                                src={data?.styurls.styurl || ''}
                                alt="콘서트 설명"
                                width={690}
                                height={1}
                                className="object-contain hidden sm:block"
                            />
                        )}
                        {Array.isArray(data?.styurls.styurl) ? (
                            data?.styurls.styurl.map((item, index) => (
                                <Image
                                    key={index}
                                    src={item}
                                    alt="콘서트 설명"
                                    width={320}
                                    height={1}
                                    className="object-contain sm:hidden"
                                />
                            ))
                        ) : (
                            <Image
                                src={data?.styurls.styurl || ''}
                                alt="콘서트 설명"
                                width={320}
                                height={1}
                                className="object-contain sm:hidden"
                            />
                        )}
                    </div>
                    <div className="xl:w-fit w-full xl:relative fixed bottom-0 px-6 py-7 xl:py-0 xl:px-0 bg-[#14151A]">
                        <Link
                            href={
                                Array.isArray(data?.relates.relate)
                                    ? data?.relates.relate[0]?.relateurl || ''
                                    : data?.relates.relate?.relateurl || ''
                            }
                            target="_blank"
                            className="break-keep"
                        >
                            <Button size="large">예매처 바로가기</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

import dateConverter from '@/utils/dateConverter';
import { Button } from '.';
import Link from 'next/link';

interface AnswerCardProps {
    title: string;
    location: string;
    createdAt: number;
    comment: string;
    answer: boolean;
    articleId: number;
}

export default function AnswerCard({
    title,
    location,
    createdAt,
    comment,
    answer,
    articleId,
}: AnswerCardProps) {
    return (
        <div className="bg-gray-900 px-7 py-8  rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between w-full sm:flex-row flex-col gap-5">
                <div className="gap-1 flex flex-col">
                    <div className="flex gap-2  text-gray-500 items-center text-sm font-medium">
                        <div className="text-green-400">{title}</div>
                        <div>|</div>
                        <div>{location}</div>
                    </div>
                    <div>
                        <div className="flex gap-2 flex-col">
                            <div className="text-white font-medium text-base">
                                {comment}
                            </div>
                            <div className="text-gray-500 text-sm font-light">
                                {dateConverter(Number(createdAt), 'utc')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-end">
                    {answer ? (
                        <Button
                            styled="outline"
                            size="small"
                            disabled
                            className="w-33"
                        >
                            답변 완료
                        </Button>
                    ) : (
                        <Link href={`/panpal/${articleId}`}>
                            <Button
                                styled="outline"
                                size="small"
                                className="w-33"
                            >
                                답변 하러가기
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

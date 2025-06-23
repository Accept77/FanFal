import dateConverter from '@/utils/dateConverter';
import { ProgressChip } from '@/components/ui';
import { AnswerArrowIcon } from '@/assets';
import Profile from './Profile';

interface QuestionCardProps {
    title: string;
    location: string;
    createdAt: number;
    comment: string;
    answer?: {
        nickname: string;
        profileImage: string;
        content: string;
        createdAt: number;
    };
}

export default function QuestionCard({
    title,
    location,
    createdAt,
    comment,
    answer,
}: QuestionCardProps) {
    return (
        <div className="bg-gray-900 px-7 py-8  rounded-2xl flex sm:flex-row flex-col justify-between">
            <div className="flex flex-col gap-8">
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
                                {dateConverter(createdAt, 'utc')}
                            </div>
                        </div>
                    </div>
                </div>
                {answer && (
                    <div className="flex gap-3.5">
                        <AnswerArrowIcon
                            width={22}
                            height={18}
                            className="text-gray-500"
                        />
                        <div className="flex flex-col gap-1.5">
                            <div className="flex gap-2">
                                <Profile
                                    size="small"
                                    image={answer.profileImage}
                                >
                                    {answer.nickname}
                                </Profile>
                                <div className="text-green-400 px-3 py-1 text-xs font-medium rounded-full bg-gray-800">
                                    작성자
                                </div>
                            </div>
                            <div className="text-gray-100 text-sm font-medium">
                                {answer.content}
                            </div>
                            <div className="text-gray-400 text-sm font-light">
                                {dateConverter(answer.createdAt, 'utc')}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 min-w-18 items-end">
                {answer ? (
                    <ProgressChip openStatus="CONFIRMED_STATUS">
                        답변 완료
                    </ProgressChip>
                ) : (
                    <ProgressChip openStatus="PENDING_STATUS">
                        답변 대기
                    </ProgressChip>
                )}
            </div>
        </div>
    );
}

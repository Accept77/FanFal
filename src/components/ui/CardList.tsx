import Image from 'next/image';
import dateConverter from '@/utils/dateConverter';
import Profile from './Profile';
import ContainerProgress from './ContainerProgress';
import Like from './Like';
import Tag from './Tag';
import { HandIcon } from '@/assets';
import { useGetUser } from '@/hooks/queries/useAuth';
import { useLike } from '@/hooks/useLike';

interface CardListProps {
    title: string;
    location: string;
    date: number;
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus:
        | 'CONFIRMED_STATUS'
        | 'PENDING_STATUS'
        | 'CANCELED_STATUS'
        | 'PROGRESSING_STATUS';
    wishList?: boolean;
    image: string;
    createUser: string;
    createUserProfileImg: string;
    onLikeClick?: (event: React.MouseEvent, isLiked: boolean) => void;
    articleId: number;
}

export default function CardList({
    title,
    location,
    date,
    deadLine,
    currentPerson,
    maxPerson,
    openStatus,
    image,
    createUser,
    createUserProfileImg,
    onLikeClick,
    articleId,
    wishList = true,
}: CardListProps) {
    const { data: user } = useGetUser();
    const isLoggedIn = !!user;
    const { isLiked, toggleLike } = useLike(articleId, {
        isLoggedIn,
        onLikeClick,
    });

    const convertedDate = dateConverter(Number(date), 'korea');
    const convertedDeadLine = dateConverter(Number(deadLine), 'korea-short');

    const getDeadlineText = () => {
        if (!deadLine) return null;

        const now = new Date();
        const deadline = new Date(deadLine * 1000);

        const nowDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const deadlineDate = new Date(
            deadline.getFullYear(),
            deadline.getMonth(),
            deadline.getDate()
        );

        if (nowDate.getTime() === deadlineDate.getTime()) {
            const deadlineHour = deadline.getHours();
            return `오늘 ${deadlineHour}시 마감`;
        }

        return null;
    };

    return (
        <div className="w-full flex flex-col sm:flex-row sm:py-3 sm:pl-3 sm:pr-6 sm:gap-6 gap-0 sm:min-h-67.5 min-h-97 hover:bg-gray-900 active:opacity-50 hover:cursor-pointer">
            <div className="w-full sm:w-1/4 relative h-50 sm:h-auto">
                <Image src={image} alt="image" fill objectFit="cover" />
                {openStatus === 'CONFIRMED_STATUS' && (
                    <div className="absolute bg-black/80 w-full h-full flex flex-col justify-center items-center gap-6">
                        <HandIcon width={32} height={32} />
                        <div className="flex justify-center items-center text-gray-100 text-sm text-center">
                            모집이 마감되었어요.
                            <br />
                            다음기회에 만나요!
                        </div>
                    </div>
                )}
                {getDeadlineText() && <Tag>{getDeadlineText()}</Tag>}
            </div>
            <div className="sm:w-3/4 w-full flex flex-col justify-between pt-5.5 sm:gap-0 gap-5">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="flex gap-2  text-gray-400 items-center">
                                <div className="text-xl font-semibold text-white">
                                    {title}
                                </div>
                                <div className="hidden sm:block">|</div>
                                <div className="font-medium hidden sm:block">
                                    {location}
                                </div>
                            </div>
                            <div className="flex sm:text-white text-gray-400 items-center font-normal gap-2">
                                <div className="font-medium sm:hidden">
                                    {location}
                                </div>
                                <div className="sm:hidden">|</div>
                                {convertedDate}
                            </div>
                        </div>
                        <div className="flex gap-2 text-sm text-gray-400 items-center">
                            <Profile
                                size="small"
                                image={createUserProfileImg}
                            />
                            <p>{createUser}</p>
                        </div>
                    </div>
                    {wishList && (
                        <div>
                            <Like like={isLiked} onClick={toggleLike} />
                        </div>
                    )}
                </div>
                <ContainerProgress
                    current={currentPerson}
                    max={maxPerson}
                    openStatus={openStatus}
                    deadLine={convertedDeadLine}
                />
            </div>
        </div>
    );
}

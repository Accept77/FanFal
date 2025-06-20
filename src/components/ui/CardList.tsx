import Image from 'next/image';
import dateConverter from '@/utils/dateConverter';
import Profile from './Profile';
import ContainerProgress from './ContainerProgress';
import Like from './Like';
import Tag from './Tag';
import { HandIcon } from '@/assets';
import { useWishlistStore } from '@/store/wishlistStore';
import { useGetUser } from '@/hooks/queries/useAuth';
import { wishLikeApi } from '@/utils/apis/likeApi';

interface CardListProps {
    title: string;
    location: string;
    date: number;
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'waiting' | 'finished' | 'progressing' | 'canceled';
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
    wishList,
}: CardListProps) {
    const { data: user } = useGetUser();
    const isLoggedIn = !!user;
    const convertedDate = dateConverter(Number(date), 'korea'); // date?
    const convertedDeadLine = dateConverter(Number(deadLine), 'korea-short');
    const isLiked = useWishlistStore((state) => state.isLiked(articleId));
    const addLike = useWishlistStore((state) => state.addLike);
    const removeLike = useWishlistStore((state) => state.removeLike);

    const handleLikeClick = async (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            if (isLoggedIn) {
                if (isLiked) {
                    await wishLikeApi.unlike(articleId);
                } else {
                    await wishLikeApi.like([articleId]);
                }
            }

            // 로컬 store도 항상 업데이트
            if (isLiked) {
                removeLike(articleId);
            } else {
                addLike(articleId);
            }

            onLikeClick?.(event, !isLiked);
        } catch (error) {
            console.error('찜 처리 중 오류 발생:', error);
        }
    };

    // 박수 아이콘 white 적용안됨 전에 프로플 에디트도 됐다가 안된거 같은데 svg 파일 문젠거같음 체크해봐야할듯 원인파악
    return (
        <div className="w-full flex flex-col sm:flex-row sm:py-3 sm:pl-3 sm:pr-6 sm:gap-6 gap-0 sm:min-h-67.5 min-h-97 hover:bg-gray-900 active:opacity-50 hover:cursor-pointer">
            <div className="w-full sm:w-1/4 relative h-50 sm:h-auto">
                <Image src={image} alt="image" fill objectFit="cover" />
                {openStatus === 'finished' ? (
                    <div className="absolute bg-black/50 w-full h-full flex flex-col justify-center items-center gap-6">
                        <HandIcon className="w-8 h-8 text-gray-600 fill-white" />
                        <div className="flex justify-center items-center text-gray-100 text-sm text-center">
                            모집이 마감되었어요.
                            <br />
                            다음기회에 만나요!
                        </div>
                    </div>
                ) : (
                    <Tag>오늘 12시 마감</Tag>
                )}
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
                    <div>
                        {wishList && (
                            <Like like={isLiked} onClick={handleLikeClick} />
                        )}
                    </div>
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

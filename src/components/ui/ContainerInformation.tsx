import Profile from '@/components/ui/Profile';
import ContainerProgress from './ContainerProgress';
import Like from './Like';
import dateConverter from '@/utils/dateConverter';
import { useGetUser } from '@/hooks/queries/useAuth';
import { useLike } from '@/hooks/useLike';

interface ContainerInformationProps {
    createUser: string;
    createUserProfileImgUrl: string;
    title: string;
    location: string;
    date: number;
    deadLine: number;
    minPerson: number;
    maxPerson: number;
    currentPerson: number;
    wishList: boolean;
    articleId: number;
    openStatus:
        | 'CONFIRMED_STATUS'
        | 'PENDING_STATUS'
        | 'CANCELED_STATUS'
        | 'PROGRESSING_STATUS';
    refetch?: () => void;
}

export default function ContainerInformaiton({
    createUser,
    createUserProfileImgUrl,
    title,
    location,
    date,
    deadLine,
    minPerson,
    maxPerson,
    currentPerson,
    articleId,
    openStatus,
    refetch,
}: ContainerInformationProps) {
    const { data: user } = useGetUser();
    const isLoggedIn = !!user;

    const formattedDate = dateConverter(date, 'korea');
    const formattedLimitedDate = dateConverter(deadLine, 'korea');
    console.log(user?.wistLikeCount);
    const { isLiked, toggleLike } = useLike(articleId, {
        isLoggedIn,
        refetch,
    });

    return (
        <div className="w-full px-2 sm:px-0 h-71 sm:h-85 flex flex-col gap-7 sm:justify-between bg-transparent min-w-52">
            <div className="h-43 flex flex-col justify-between sm:h-48">
                <div className="h-23 sm:h-24 flex flex-col gap-2 sm:gap-3">
                    <div className="flex flex-col h-15 gap-1">
                        <div className="flex justify-between items-center h-8">
                            <span className="text-2xl font-semibold h-8 text-white">
                                {title}
                            </span>
                            <Like
                                like={isLiked}
                                onClick={toggleLike}
                                className="hidden sm:inline-block"
                            />
                        </div>
                        <span className="text-base font-normal text-gray-300 h-6">
                            {location}
                        </span>
                    </div>
                    <div className="h-6 flex gap-2 items-center">
                        <Profile size="small" image={createUserProfileImgUrl} />
                        <span className="h-5 text-gray-300">{createUser}</span>
                    </div>
                </div>
                <div className="h-13 sm:h-14 flex flex-col gap-1 sm:gap-2">
                    <div className="h-6 flex items-center truncate">
                        <span className="w-14 text-base font-normal text-gray-400">
                            진행일시
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />
                        <span className="text-base font-normal text-white">
                            {formattedDate}
                        </span>
                    </div>
                    <div className="h-6 flex items-center truncate">
                        <span className="w-14 text-base font-normal text-green-400">
                            모집마감
                        </span>
                        <div className="w-0.5 h-3.5 ml-2.5 mr-2 bg-gray-800" />
                        <span className="text-base font-normal text-white">
                            {formattedLimitedDate}
                        </span>
                    </div>
                </div>
            </div>
            <div className="h-21 sm:h-20 flex flex-col gap-3">
                <div className="h-10">
                    <ContainerProgress
                        max={maxPerson}
                        current={currentPerson}
                        openStatus={openStatus}
                    />
                </div>
                <div className="h-4 flex items-center justify-between text-sm font-medium text-gray-500">
                    <span>최소인원 {minPerson}명</span>
                    <span>최대인원 {maxPerson}명</span>
                </div>
            </div>
        </div>
    );
}

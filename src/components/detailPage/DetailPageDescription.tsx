'use client';
import DetailPageComment from './DetailPageComment';
import DetailPageParticipation from './DetailPageParticipation';
import GoogleMap from './GoogleMap';

interface DetailPageDescriptionProps {
    description: string;
    latitude: number;
    longitude: number;
    articleId: number;
    createUser: string;
    participants: {
        profile_image_url: string;
        nickname: string;
    }[];
    refetch?: () => void;
}

export default function DetailPageDescription({
    description,
    latitude,
    longitude,
    articleId,
    createUser,
    participants,
    refetch,
}: DetailPageDescriptionProps) {
    return (
        <div className="xl:flex xl:gap-6 ">
            <div>
                <div className="w-full mt-6 sm:mt-10 xl:mt-12 flex flex-col gap-10 sm:gap-12 px-4 sm:px-6">
                    <p className="w-full flex flex-col gap-3 sm:gap-5">
                        <span className="text-lg font-semibold text-white">
                            상세내용
                        </span>
                        <span className="text-gray-300 text-sm min-w-148">
                            {description}
                        </span>
                    </p>
                    <div className="w-full h-80 flex flex-col gap-3 sm:gap-5">
                        <p className="text-lg font-semibold text-white h-7">
                            장소
                        </p>
                        <div className="w-full h-70 bg-gray-800 rounded-[20px]">
                            <GoogleMap lat={latitude} lng={longitude} />
                        </div>
                    </div>
                </div>
                <DetailPageComment id={articleId} createUser={createUser} />
            </div>
            <DetailPageParticipation
                articleId={articleId}
                createUser={createUser}
                participants={participants}
                refetch={refetch}
            />
        </div>
    );
}

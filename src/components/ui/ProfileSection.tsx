'use client';

import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';
import { EditNoBgIcon, Heart, ThreeHeart } from '@/assets';
import { useEffect, useState } from 'react';
import { useGetUser } from '@/hooks/queries/useAuth';

interface ProfileSectionProps {
    handlePasswordModal: () => void;
    handleEditProfileModal: () => void;
}

export default function ProfileSection({
    handlePasswordModal,
    handleEditProfileModal,
}: ProfileSectionProps) {
    const { data: user } = useGetUser();
    const [isMdUp, setIsMdUp] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMdUp(window.innerWidth >= 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMdUp) {
        return (
            <>
                <div className="w-full h-55.5 bg-gray-850 p-8 flex flex-col justify-center items-center rounded-t-[20px]">
                    <div className="w-full h-full flex flex-col gap-2">
                        <div className="w-full h-16 flex justify-between">
                            <Profile
                                size="large"
                                image={user?.profileImg || ''}
                            ></Profile>
                            <Button
                                size="small"
                                styled="outline"
                                className="w-39.25  text-white outline-white h-10"
                                onClick={handlePasswordModal}
                            >
                                비밀번호 변경하기
                            </Button>
                        </div>
                        <div className="h-8 flex items-center overflow-hidden">
                            <p className="text-xl font-semibold h-7 text-white ">
                                {user?.nickName}
                            </p>
                            <button
                                onClick={handleEditProfileModal}
                                className="w-8 h-8 text-white cursor-pointer hover:text-green-500"
                            >
                                <EditNoBgIcon width={32} height={32} />
                            </button>
                        </div>
                        <p className="text-base font-light text-gray-300 h-12  w-full overflow-auto">
                            {user?.description}
                        </p>
                    </div>
                </div>
                <div className="bg-green-400 rounded-b-[20px] w-full h-10 px-8 flex justify-between items-center">
                    <Heart />
                    <ThreeHeart />
                </div>
            </>
        );
    }

    return (
        <div className="w-full h-63 flex flex-col justify-between items-center">
            <div className="h-45 flex flex-col justify-between w-full">
                <div className="h-16 w-full flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                        <Profile size="large" image={user?.profileImg || ''} />
                        <p className="text-lg font-semibold h-7 text-white overflow-hidden">
                            {user?.nickName}
                        </p>
                    </div>

                    <div className="h-8 flex items-center ">
                        <button
                            onClick={handleEditProfileModal}
                            className="w-8 h-8 text-white cursor-pointer hover:text-green-500"
                        >
                            <EditNoBgIcon width={32} height={32} />
                        </button>
                    </div>
                </div>
                <p className="text-base font-light text-gray-300 h-24  w-full overflow-auto">
                    {user?.description}
                </p>
            </div>

            <Button
                size="large"
                styled="outline"
                className="outline-white text-white w-full h-10"
                onClick={handlePasswordModal}
            >
                비밀번호 변경하기
            </Button>
        </div>
    );
}

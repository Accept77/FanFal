'use client';

import { ProfileSection } from '@/components/ui';
import { useState } from 'react';
import PasswordModal from '../ui/Modal/PasswordModal';
import EditProfileModal from '../ui/Modal/ProfileModal';
import {
    useChangeProfileMutation,
    useChangePasswordMutation,
} from '@/hooks/queries/useMyPage';
import { toast } from 'react-toastify';
import { imageUploadApi } from '@/utils/apis/imgS3Api';

export default function ProfileContainer() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const changeProfileMutation = useChangeProfileMutation();
    const changePasswordMutation = useChangePasswordMutation();

    const handleOpenPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };

    const handleOpenEditProfileModal = () => {
        setIsEditProfileModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    const handleCloseEditProfileModal = () => {
        setIsEditProfileModalOpen(false);
    };

    const handleSubmitPasswordModal = (data: {
        password: string;
        newPassword: string;
    }) => {
        console.log(data);
        setIsPasswordModalOpen(false);
        changePasswordMutation.mutate(data, {
            onSuccess: () => {
                toast.success('비밀번호가 변경되었습니다.');
            },
            onError: () => {
                toast.error('비밀번호 변경에 실패했습니다.');
            },
        });
    };

    const handleSubmitEditProfileModal = async (data: {
        nickName: string;
        profileImg: File;
        information: string;
    }) => {
        setIsEditProfileModalOpen(false);

        let profileImageUrl = '';
        if (data.profileImg) {
            try {
                const res = await imageUploadApi.getUploadUrl({
                    fileName: data.profileImg.name,
                });
                const { preSignedUrl, key } = res.data;

                await fetch(preSignedUrl, {
                    method: 'PUT',
                    body: data.profileImg,
                    headers: { 'Content-Type': data.profileImg.type },
                });

                profileImageUrl = key;
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                toast.error('이미지 업로드에 실패했습니다.');
                return;
            }
        }

        changeProfileMutation.mutate(
            {
                nickName: data.nickName,
                profileImgUrl: profileImageUrl,
                information: data.information,
            },
            {
                onSuccess: () => {
                    toast.success('프로필이 변경되었습니다.');
                },
                onError: () => {
                    toast.error('프로필 변경에 실패했습니다.');
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="text-2xl font-semibold text-white">마이페이지</div>
            <div>
                <ProfileSection
                    handlePasswordModal={handleOpenPasswordModal}
                    handleEditProfileModal={handleOpenEditProfileModal}
                />
                {isPasswordModalOpen && (
                    <PasswordModal
                        onClose={handleClosePasswordModal}
                        onSubmit={handleSubmitPasswordModal}
                    />
                )}
                {isEditProfileModalOpen && (
                    <EditProfileModal
                        onClose={handleCloseEditProfileModal}
                        onSubmit={handleSubmitEditProfileModal}
                    />
                )}
            </div>
        </div>
    );
}

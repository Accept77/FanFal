'use client';

import { useRef, useEffect, useState } from 'react';
import { useForm, FieldValues, FieldError } from 'react-hook-form';

import BaseModal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Profile from '@/components/ui/Profile';
import { useGetUser } from '@/hooks/queries/useAuth';
import InputText from '../InputText';

interface EditProfileModalProps {
    onClose: () => void;
    onSubmit: (data: {
        nickName: string;
        profileImg: File;
        information: string;
    }) => void;
}

export default function EditProfileModal({
    onClose,
    onSubmit,
}: EditProfileModalProps) {
    const { data: user } = useGetUser();
    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({ mode: 'onBlur' });

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // file 필드 수동 등록
    useEffect(() => {
        register('file', {
            validate: {
                fileSize: (files) => {
                    if (!files || files.length === 0) return true;
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    return (
                        files[0].size <= maxSize ||
                        '파일 크기는 5MB 이하여야 합니다'
                    );
                },
            },
        });
    }, [register]);

    const file = watch('file');
    const previewImage = file?.[0]
        ? URL.createObjectURL(file[0])
        : user?.profileImage || '';

    const handleImageClick = () => {
        setIsFileDialogOpen(true);

        setTimeout(() => {
            fileInputRef.current?.click();
        }, 50);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFileDialogOpen(false);
        if (e.target.files) {
            setValue('file', e.target.files, { shouldValidate: true });
        }
    };

    const handleFileFocus = () => {
        if (isFileDialogOpen) {
            setTimeout(() => {
                setIsFileDialogOpen(false);
            }, 100);
        }
    };

    const handleFormSubmit = (data: FieldValues) => {
        onSubmit({
            nickName: data.nickname || user?.nickName,
            profileImg: data.file?.[0],
            information: data.description || user?.description,
        });
    };

    const handleModalClose = () => {
        if (!isFileDialogOpen) {
            onClose();
        }
    };

    return (
        <BaseModal onClose={handleModalClose}>
            <div className="w-85.75 md:w-130 flex items-center justify-center py-6">
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="w-73.75 md:w-118 flex flex-col gap-6"
                >
                    <div className="flex justify-between w-full items-center">
                        <p className="text-lg font-semibold">프로필 수정하기</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Profile
                            size="large"
                            edit={true}
                            image={previewImage}
                            editButtonOnClick={handleImageClick}
                            editButtonClassName="cursor-pointer"
                        />

                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            onFocus={handleFileFocus}
                            className="hidden"
                        />
                        {errors.file && (
                            <span className="text-red-500 text-sm">
                                {(errors.file as FieldError).message}
                            </span>
                        )}

                        <div className=" flex flex-col justify-between">
                            <p className="text-sm md:text-base font-semibold">
                                닉네임
                            </p>
                            <Input
                                type="text"
                                name="nickname"
                                placeholder={user?.nickName || ''}
                                value={user?.nickName || ''}
                                register={register}
                                className="placeholder:text-white"
                                rules={{
                                    minLength: {
                                        value: 2,
                                        message: '2글자 이상 입력해주세요.',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: '10글자 이하로 입력해주세요.',
                                    },
                                }}
                                error={errors.nickName as FieldError}
                                size="small"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="text-sm md:text-base font-semibold">
                                소개
                            </p>
                            <InputText
                                name="description"
                                placeholder={user?.description || ''}
                                className="h-27 placeholder:text-white"
                                register={register}
                                error={errors.description as FieldError}
                                size="small"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            size="large"
                            type="button"
                            onClick={onClose}
                            styled="outline"
                        >
                            취소
                        </Button>
                        <Button size="large" type="submit" styled="solid">
                            수정하기
                        </Button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
}

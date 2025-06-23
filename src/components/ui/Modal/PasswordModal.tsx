'use client';

import BaseModal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import {
    useForm,
    FieldValues,
    SubmitHandler,
    FieldError,
} from 'react-hook-form';

// 현재 비밀번호가 맞는지 여부는 어떻게 판단? -> 보내서 정상적인 응답?
// 수정하기가 정상적으로 되면 모달창 닫기

interface PasswordModalProps {
    onClose: () => void;
    onSubmit: (data: { password: string; newPassword: string }) => void;
}

export default function PasswordModal({
    onClose,
    onSubmit,
}: PasswordModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FieldValues>({
        mode: 'onBlur',
    });

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setError('confirmPassword', {
                message: '비밀번호가 일치하지 않습니다.',
            });
            return;
        }

        console.log('비밀번호 변경 정보', data);
        onSubmit({
            password: data.password,
            newPassword: data.newPassword,
        });
    };

    return (
        <BaseModal onClose={onClose}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="w-85.75 h-115 md:w-130 md:h-118 flex items-center justify-center"
            >
                <div className="w-73.75 h-103 md:w-118 md:h-106 flex flex-col justify-between">
                    <div className="h-81 md:h-84 flex flex-col justify-between">
                        <p className="h-7 text-base font-semibold">
                            비밀번호 변경하기
                        </p>
                        <div className="h-66 md:h-69 flex flex-col justify-between text-sm font-semibold md:font-base">
                            <div className="h-18 flex flex-col justify-between">
                                <p>현재 비밀번호</p>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="현재 비밀번호를 입력해주세요."
                                    register={register}
                                    rules={{
                                        required: '현재 비밀번호는 필수입니다.',
                                    }}
                                    error={errors.password as FieldError}
                                    size="small"
                                />
                            </div>
                            <div className="h-18 flex flex-col justify-between">
                                <p>새 비밀번호</p>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    placeholder="새 비밀번호를 입력해주세요."
                                    register={register}
                                    rules={{
                                        required: '새 비밀번호를 입력해주세요.',
                                        minLength: {
                                            value: 6,
                                            message: '6자 이상 입력하세요',
                                        },
                                    }}
                                    error={errors.newPassword as FieldError}
                                    size="small"
                                />
                            </div>
                            <div className="h-18 flex flex-col justify-between">
                                <p>비밀번호 확인</p>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="새 비밀번호를 다시 입력해주세요."
                                    register={register}
                                    rules={{
                                        required: '비밀번호 확인은 필수입니다.',
                                    }}
                                    error={errors.confirmPassword as FieldError}
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 h-10 md:h-12">
                        <Button
                            size="large"
                            onClick={onClose}
                            styled="outline"
                            type="button"
                        >
                            취소
                        </Button>
                        <Button size="large" styled="solid" type="submit">
                            수정하기
                        </Button>
                    </div>
                </div>
            </form>
        </BaseModal>
    );
}

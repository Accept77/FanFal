'use client';
import Link from 'next/link';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@/components/ui';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useLogin } from '@/hooks/queries/useAuth';
import { LoginFormData } from '@/types/form';
import { useFormValidation } from '@/hooks/useFormValidation';

export default function LoginForm() {
    const { register, handleSubmit, formState, setError, watch } =
        useForm<LoginFormData>({
            mode: 'onBlur',
            reValidateMode: 'onBlur',
        });
    const { mutate: login, isPending, isSuccess } = useLogin();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        //로그인 요청 중에는 다시 요청하지 않도록 처리
        if (isPending || isSuccess) return;
        //로그인 요청
        login(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    window.location.href = '/mypage';
                    return;
                },
                onError: () => {
                    setError('email', {
                        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                    });
                    setError('password', {
                        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
                    });
                },
            }
        );
    };
    const { isAllFieldsFilled } = useFormValidation<LoginFormData>({
        watch,
        fields: ['email', 'password'],
    });

    return (
        <div className="flex flex-col justify-center items-center gap-[14px] px-4 pb-8 sm:py-8 sm:px-[54px]">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[311px] sm:w-[500px] xl:w-[402px] h-auto"
            >
                <div>
                    <h1 className="text-white text-xl sm:text-2xl font-semibold leading-7 xl:leading-8 text-center mb-8">
                        로그인
                    </h1>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <Input
                                type="text"
                                placeholder="이메일을 입력해주세요"
                                label="아이디"
                                name="email"
                                labelClassName="text-sm mb-2 w-fit font-semibold leading-5"
                                size={!isMobile ? 'large' : 'small'}
                                register={register}
                                error={formState.errors.email as FieldError}
                                rules={{
                                    required: '이메일을 입력해주세요',
                                }}
                                autoComplete="on"
                            />
                            <Input
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                label="비밀번호"
                                name="password"
                                labelClassName="text-sm mb-2 w-fit font-semibold leading-5"
                                size={!isMobile ? 'large' : 'small'}
                                register={register}
                                error={formState.errors.password as FieldError}
                                rules={{
                                    required: '비밀번호를 입력해주세요',
                                }}
                                autoComplete="on"
                            />
                            <div className="flex justify-center">
                                <Link
                                    tabIndex={-1}
                                    href="/findpassword"
                                    className="text-center w-fit text-gray-400 text-sm not-italic font-medium leading-5 underline underline-offset-2"
                                >
                                    비밀번호를 잊으셨나요?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="w-full mb-6"
                                disabled={
                                    !isAllFieldsFilled || isPending || isSuccess
                                }
                            >
                                로그인
                            </Button>
                            <div className="flex gap-1 justify-center items-center">
                                <span className="text-gray-400 text-sm font-medium leading-5">
                                    팬팔이 처음이신가요?
                                </span>
                                <Link
                                    href="/signup"
                                    className="text-green-700 text-sm font-medium underline underline-offset-2"
                                >
                                    회원가입
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

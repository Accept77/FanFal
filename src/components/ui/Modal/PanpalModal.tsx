'use client';

import { useForm, Controller } from 'react-hook-form';
import BaseModal from '@/components/ui/Modal';
import { DeleteIcon } from '@/assets/index';
import PlaceAutoCompleteInput from './PlaceAutoCompleteInput';
import { CATEGORY_DATA } from '@/types/categories';
import { imageUploadApi } from '@/utils/apis/imgS3Api';
import { toast } from 'react-toastify';
import {
    InputText,
    InputNumber,
    DateInput,
    BoxSelect,
    Input,
    InputFile,
    Button,
} from '@/components/ui';
import { useCreateFanfalMutation } from '@/hooks/queries/useCreateFanfalMutation';

interface PanpalModalProps {
    onClose: () => void;
    onSubmit: (data: BoardRequest) => void;
}

export interface BoardRequest {
    title: string;
    roadNameAddress: string;
    latitude: number;
    longitude: number;
    imageKey: string;
    description: string;
    smallCategory: string;
    date: number;
    deadline: number;
    minPerson: number;
    maxPerson: number;
}

interface FormData {
    name: string;
    detail: string;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    file: FileList;
    category: string;
    startDate: Date;
    endDate: Date;
    minApplicants: number;
    maxApplicants: number;
}

export default function PanpalModal({ onClose }: PanpalModalProps) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            detail: '',
            location: { lat: 0, lng: 0, address: '' },
        },
    });

    const startDate = watch('startDate');
    const { mutate: createFanfal } = useCreateFanfalMutation();
    const onFormSubmit = async (data: FormData) => {
        let imageKey = '';

        if (data.file && data.file.length > 0) {
            const file = data.file[0];
            try {
                const res = await imageUploadApi.getUploadUrl({
                    fileName: file.name,
                });
                const { preSignedUrl, key } = res.data;

                await fetch(preSignedUrl, {
                    method: 'PUT',
                    body: file,
                    headers: { 'Content-Type': file.type },
                });

                imageKey = key;
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                toast.error('이미지 업로드에 실패했습니다.');
                return;
            }
        }

        const payload = {
            title: data.name,
            roadNameAddress: data.location.address,
            latitude: data.location.lat,
            longitude: data.location.lng,
            imageKey,
            description: data.detail,
            smallCategory: data.category.split(',')[0], // 필요 시 enum 변환
            date: data.startDate
                ? Math.floor(data.startDate.getTime() / 1000)
                : 0,
            deadline: data.endDate
                ? Math.floor(data.endDate.getTime() / 1000)
                : 0,
            minPerson: data.minApplicants ?? 0,
            maxPerson: data.maxApplicants ?? 0,
        };

        console.log(
            '[DEBUG] 제출 전 payload:',
            JSON.stringify(payload, null, 2)
        );

        createFanfal(payload, {
            onSuccess: () => {
                toast.success('팬팔이 성공적으로 만들어졌습니다!');
                onClose();
            },
            onError: (error) => {
                console.error('생성 실패:', error);
                toast.error('팬팔 생성에 실패했습니다.');
            },
        });
    };

    return (
        <BaseModal onClose={onClose} fullScreenOnMobile>
            <div className="w-full h-screen sm:h-[780px] flex flex-col items-center justify-center px-2 sm:px-6 ">
                <div className="relative w-full max-w-130 h-full  sm:h-[730px] m-4 flex flex-col gap-5">
                    <div className="flex justify-between items-center px-4 pt-6 h-12 text-lg font-semibold z-10">
                        <p>팬팔 만들기</p>
                        <DeleteIcon
                            className="cursor-pointer"
                            onClick={onClose}
                        />
                    </div>

                    <form
                        id="panpal-form"
                        onSubmit={handleSubmit(onFormSubmit)}
                        className="flex-1 overflow-y-auto sm:max-h-[750px] px-4 mt-6 flex flex-col gap-6 scrollbar-hide"
                    >
                        <div className="flex flex-col gap-2 h-19">
                            <p className="text-sm font-semibold h-6">
                                팬팔 이름
                            </p>
                            <Input<FormData>
                                type="text"
                                name="name"
                                placeholder="팬팔 이름을 작성해주세요"
                                register={register}
                                rules={{ required: '팬팔 이름을 입력해주세요' }}
                                error={errors.name}
                                size="small"
                            />
                        </div>

                        <div className="flex flex-col gap-2 h-[142px]">
                            <p className="text-sm font-semibold">상세 내용</p>
                            <InputText<FormData>
                                name="detail"
                                placeholder="상세 내용을 입력해주세요"
                                register={register}
                                rules={{ required: '내용을 입력해주세요' }}
                                error={errors.detail}
                                size="small"
                                className="h-[110px]"
                            />
                        </div>

                        <div className="flex flex-col gap-2 h-18">
                            <p className="text-sm font-semibold h-6">장소</p>
                            <Controller
                                name="location"
                                control={control}
                                rules={{
                                    validate: (loc) =>
                                        loc.address !== '' ||
                                        '장소를 선택해주세요',
                                }}
                                render={({ field }) => (
                                    <PlaceAutoCompleteInput
                                        onPlaceSelect={(lat, lng, address) => {
                                            field.onChange({
                                                lat,
                                                lng,
                                                address,
                                            });
                                        }}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-2 h-18">
                            <p className="text-sm font-semibold h-6">이미지</p>
                            <InputFile<FormData>
                                name="file"
                                accept="image/*"
                                register={register}
                                rules={{
                                    validate: {
                                        fileSize: (files) => {
                                            if (!(files instanceof FileList))
                                                return true;
                                            if (files.length === 0) return true;

                                            const maxSize = 5 * 1024 * 1024;
                                            const file = files[0];

                                            if (file.size > maxSize) {
                                                return '파일 크기는 5MB 이하여야 합니다';
                                            }

                                            return true;
                                        },
                                    },
                                }}
                                error={errors.file}
                                size="small"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-sm font-semibold h-6">
                                선택 서비스
                            </p>
                            <BoxSelect<FormData>
                                categories={CATEGORY_DATA}
                                register={register}
                                name="category"
                                rules={{ required: '서비스를 선택해주세요.' }}
                                error={errors.category}
                            />
                        </div>

                        <div className="h-[212px] pt-6 border-t border-gray-700 flex flex-col gap-5">
                            <div className="h-18">
                                <p className="text-sm font-semibold h-6">
                                    팬팔 날짜
                                </p>
                                <DateInput
                                    name="startDate"
                                    control={control}
                                    rules={{
                                        required: '시작 날짜를 선택해주세요',
                                    }}
                                    type="datetime-local"
                                    minDate={new Date()}
                                    isStartDate={true}
                                    error={errors.startDate}
                                    placeholder="시작 날짜를 선택해주세요"
                                    size="small"
                                />
                            </div>
                            <div className="h-18">
                                <p className="text-sm font-semibold h-6">
                                    마감 날짜
                                </p>
                                <div className="h-18">
                                    <DateInput<FormData>
                                        name="endDate"
                                        control={control}
                                        rules={{
                                            required:
                                                '마감 날짜를 선택해주세요',
                                            validate: (value) => {
                                                if (
                                                    !startDate ||
                                                    !value ||
                                                    !(value instanceof Date)
                                                )
                                                    return true;

                                                const oneHourBefore =
                                                    startDate.getTime() -
                                                    60 * 60 * 1000;
                                                if (
                                                    value.getTime() >
                                                    oneHourBefore
                                                ) {
                                                    return '마감 날짜는 시작 날짜 최소 1시간 전이어야 합니다.';
                                                }
                                                return true;
                                            },
                                        }}
                                        type="datetime-local"
                                        maxDate={
                                            startDate
                                                ? new Date(startDate)
                                                : new Date()
                                        }
                                        minDate={new Date()}
                                        isStartDate={false}
                                        error={errors.endDate}
                                        placeholder="마감 날짜를 선택해주세요"
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-700 flex flex-col gap-2">
                            <p className="text-sm font-semibold h-6">
                                모집 정원
                            </p>
                            <div className="h-10 flex items-center justify-between">
                                <p className="text-gray-300 text-sm">
                                    최소 인원
                                </p>
                                <div className="w-30 h-10 flex items-center">
                                    <InputNumber
                                        name="minApplicants"
                                        control={control}
                                        rules={{
                                            required:
                                                '모집 정원을 입력해주세요',
                                            validate: (value) =>
                                                Number.isInteger(
                                                    Number(value)
                                                ) && Number(value) > 1
                                                    ? true
                                                    : '2 이상의 정수를 입력해주세요',
                                        }}
                                        size="small"
                                    />
                                </div>
                            </div>
                            <div className="h-10 flex items-center justify-between">
                                <p className="text-gray-300 text-sm">
                                    최대 인원
                                </p>
                                <div className="w-30 h-10 flex items-center">
                                    <InputNumber
                                        name="maxApplicants"
                                        control={control}
                                        rules={{
                                            required:
                                                '모집 정원을 입력해주세요',
                                            validate: (value) =>
                                                Number.isInteger(
                                                    Number(value)
                                                ) && Number(value) > 0
                                                    ? true
                                                    : '1 이상의 정수를 입력해주세요',
                                        }}
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="flex justify-center px-6 sticky bottom-0 z-50 items-center">
                        <Button size="large" type="submit" form="panpal-form">
                            팬팔 만들기
                        </Button>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}

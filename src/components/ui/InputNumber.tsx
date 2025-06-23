'use client';

import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import React, {
    FocusEvent,
    InputHTMLAttributes,
    KeyboardEvent,
    useState,
} from 'react';
import {
    Controller,
    FieldError,
    FieldValues,
    RegisterOptions,
    Control,
    Path,
} from 'react-hook-form';
import { DecrementIcon, IncrementIcon } from '@/assets';
import { InputSize, InputVariant } from '@/types/InputStyle';

type PathValue<
    TFieldValues,
    TPath extends Path<TFieldValues>,
> = TPath extends `${infer Key}.${infer Rest}`
    ? Key extends keyof TFieldValues
        ? Rest extends Path<TFieldValues[Key]>
            ? PathValue<TFieldValues[Key], Rest>
            : never
        : never
    : TPath extends keyof TFieldValues
      ? TFieldValues[TPath]
      : never;

interface InputNumberProps<TFormValues extends FieldValues = FieldValues>
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    name: Path<TFormValues>; // 변경
    label?: string;
    size?: InputSize;
    control: Control<TFormValues>;
    rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
    error?: FieldError;
    dirtyFields?: FieldValues;
    touchedFields?: FieldValues;
    labelClassName?: string; //라벨 클래스
    errorMessageClass?: string; //에러 메시지 클래스
    min?: number;
    max?: number;
    step?: number;
}

// 인풋 스타일
const numberInputVariants = cva(
    [
        'rounded-xl font-medium w-full bg-gray-900 outline-none',
        'placeholder:text-gray-600 font-Pretendard caret-white text-center',
        'transition-all duration-150',
        'hover:border-2 hover:border-green-900 hover:text-white',
        '[&::-webkit-inner-spin-button]:appearance-none',
        '[&::-webkit-outer-spin-button]:appearance-none',
        'mb-2',
    ],
    {
        variants: {
            variant: {
                default: 'border-2 border-transparent text-white',
                done: 'border-2 border-gray-900 text-white',
                typing: 'border-2 border-green-400 text-white',
                error: 'border-2 border-red-500 text-white',
            },
            size: {
                small: 'text-sm px-3 py-2',
                large: 'text-base px-2 py-[10px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'large',
        },
    }
);
// 버튼 스타일
const numberCustomButtonVariants = cva(
    [
        'group w-6 h-6 rounded-full flex items-center justify-center',
        'transition-colors duration-100 cursor-pointer select-none border flex-shrink-0',
        'disabled:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed',
        'border-green-400 active:border-green-700',
        'mb-2',
    ],
    {
        variants: {
            disabled: {
                true: 'border-gray-700',
                false: 'border-green-400',
            },
        },
        defaultVariants: {
            disabled: false,
        },
    }
);
// 아이콘 색상 스타일
const iconVariants = cva(
    'transition-colors duration-100 disabled:text-gray-300 text-green-400',
    {
        variants: {
            disabled: {
                true: 'text-gray-300',
                false: 'text-green-400 group-active:text-green-700',
            },
        },
    }
);
//라벨 클래스
const labelVariants = cva('whitespace-nowrap block', {
    variants: {
        labelSize: {
            small: 'text-sm leading-5 text-white mb-2',
            large: 'text-base leading-6 text-white mb-3',
        },
    },
    defaultVariants: {
        labelSize: 'large',
    },
});
export default function InputNumber<
    TFormValues extends FieldValues = FieldValues,
>({
    label,
    name,
    rules,
    className,
    autoComplete = 'off', //자동완성 옵션
    size,
    onFocus,
    control,
    error,
    labelClassName, //라벨 클래스
    min = 2,
    max = 20,
    step = 1,
}: InputNumberProps<TFormValues>) {
    //에러 미시지
    const errorMessage = error?.message;
    const [isFocused, setIsFocused] = useState(false);
    /**
     * @description 인풋 상태에 따라 variant 반환 함수
     */
    function getVariant(): InputVariant {
        if (isFocused) return 'typing';
        if (errorMessage) return 'error';
        return 'done';
    }

    return (
        <div className={`w-full}`}>
            <label
                className={cn(
                    labelVariants({ labelSize: size }),
                    labelClassName
                )}
                htmlFor={name}
            >
                {label}
            </label>
            <div className="w-full">
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    defaultValue={min as PathValue<TFormValues, typeof name>}
                    render={({ field }) => {
                        const currentValue = Number(field.value) || 1;
                        const handleInputChange = (
                            e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            const value = e.target.value.replace(/\D/g, ''); // \D = 숫자가 아닌 모든 문자
                            const numValue = Number(value) || 1;
                            if (numValue < min) field.onChange(min);
                            if (numValue > max) field.onChange(max);
                            else field.onChange(numValue);
                        };

                        function handleFocus(e: FocusEvent<HTMLInputElement>) {
                            onFocus?.(e);
                            setIsFocused(true); // 🟢 포커스 상태로 변경
                        }
                        function handleBlur() {
                            field.onBlur();
                            setIsFocused(false); // 🔴 포커스 해제
                        }

                        const handleIncrement = () => {
                            const newValue = Math.min(currentValue + step, max);
                            field.onChange(newValue);
                        };

                        const handleDecrement = () => {
                            const newValue = Math.max(currentValue - step, min);
                            field.onChange(newValue);
                        };
                        /* "." 소수점 입력 완전 방지 */
                        const handleKeyDown = (
                            e: KeyboardEvent<HTMLInputElement>
                        ) => {
                            if (e.key === '.' || e.key === '-')
                                e.preventDefault();
                        };
                        return (
                            <div className="flex items-center gap-3">
                                {/*  - 버튼 */}
                                <button
                                    type="button"
                                    className={cn(
                                        numberCustomButtonVariants({
                                            disabled: currentValue <= min,
                                        })
                                    )}
                                    disabled={min >= currentValue}
                                    onClick={handleDecrement}
                                >
                                    <DecrementIcon
                                        width={16}
                                        height={16}
                                        className={cn(
                                            iconVariants({
                                                disabled: currentValue <= min,
                                            })
                                        )}
                                    />
                                </button>
                                <input
                                    {...field}
                                    inputMode="numeric"
                                    autoComplete={autoComplete}
                                    className={cn(
                                        numberInputVariants({
                                            variant: getVariant(),
                                            size: size,
                                        }),
                                        className
                                    )}
                                    name={name}
                                    id={name}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    type="number"
                                />
                                <button
                                    type="button"
                                    className={cn(
                                        numberCustomButtonVariants({
                                            disabled: currentValue >= max,
                                        })
                                    )}
                                    disabled={max <= currentValue}
                                    onClick={handleIncrement}
                                >
                                    <IncrementIcon
                                        width={16}
                                        height={16}
                                        className={cn(
                                            iconVariants({
                                                disabled: currentValue >= max,
                                            })
                                        )}
                                    />
                                </button>
                            </div>
                        );
                    }}
                />
            </div>
            {/** @description 에러 메시지 애니메이션 효과가 필요하다면 errorMessage로 부분 렌더링 해주면 됩니다. */}
        </div>
    );
}

'use client';
import { Category } from '@/types/categories';
import { DoTogetherIcon, GoTogetherIcon } from '@/assets';
import { cva } from 'class-variance-authority';
import {
    FieldError,
    RegisterOptions,
    UseFormRegister,
    Path,
} from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
interface BoxSelectProps<TFormValues extends FieldValues = FieldValues> {
    categories: Category[];
    register: UseFormRegister<TFormValues>;
    name: Path<TFormValues>;
    rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
    error?: FieldError;
    defaultValue?: string;
}
const buttonVariants = cva([
    'md:px-3 py-2 rounded-full cursor-pointer text-gray-300 border-gray-600',
    'text-sm leading-5 font-semibold border-[1px]',
    'peer-checked:bg-green-400',
    'peer-checked:border-green-400',
    'peer-checked:text-black',
    'transition-all duration-200',
    'hover:border-green-500',
    'px-2',
]);
export default function BoxSelect<
    TFormValues extends FieldValues = FieldValues,
>({ categories, register, name, rules }: BoxSelectProps<TFormValues>) {
    return (
        <div className="w-full">
            <div className="md:flex md:flex-col md:gap-4 md:w-[452px]">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="w-full flex md:flex-row md:items-center md:justify-between flex-col gap-1.5  font-Pretendard text-sm leading-5 font-semibold"
                    >
                        <div className="flex  items-center gap-2  md:mb-0 mb-[6px]">
                            <h2 className="text-gray-400 leading-7 font-medium text-sm">
                                {category.title}
                            </h2>
                            <span>
                                {category.id === 'GO_TYPE' ? (
                                    <GoTogetherIcon
                                        width={20}
                                        height={20}
                                        className="text-gray-400"
                                    />
                                ) : (
                                    <DoTogetherIcon
                                        width={20}
                                        height={20}
                                        className="text-gray-400"
                                    />
                                )}
                            </span>
                        </div>

                        <div className="flex gap-2 mb-5 md:mb-0">
                            {category.smallCategory.map((service) => (
                                <div key={service.id}>
                                    <input
                                        {...register(name, rules)}
                                        type="radio"
                                        value={service.id}
                                        className="hidden peer sr-only"
                                        id={`${category.id}_${service.id}`}
                                    />

                                    <label
                                        htmlFor={`${category.id}_${service.id}`}
                                        className={buttonVariants()}
                                    >
                                        {service.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    active: boolean;
    className?: string;
}
// TODO 쿼리 파라미터로 새로고침시에도 유지되게 리팩토링

export default function Tab({
    children,
    icon,
    active,
    className,
    onClick,
}: TabProps) {
    const divClassName = cva(
        'flex items-center gap-1 font-semibold text-lg mx-1.5 justify-center break-keep',
        {
            variants: {
                active: {
                    true: 'text-white',
                    false: 'text-gray-600',
                },
            },
            defaultVariants: {
                active: false,
            },
        }
    );
    const hrClassName = cva('w-full h-0.5', {
        variants: {
            active: {
                true: 'bg-white',
                false: 'bg-gray-600',
            },
        },
        defaultVariants: {
            active: false,
        },
    });

    return (
        <button
            className={cn(
                'flex flex-col items-center gap-2 hover:cursor-pointer w-full',
                className
            )}
            onClick={onClick}
        >
            <div className={divClassName({ active })}>
                {children}
                {icon}
            </div>
            <div className={hrClassName({ active })} />
        </button>
    );
}

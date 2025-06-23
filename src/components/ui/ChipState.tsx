import { cva } from 'class-variance-authority';

interface ChipStateProps {
    children: React.ReactNode;
    status?: 'UPCOMING_STATUS' | 'COMPLETED_STATUS';
}

export default function ChipState({
    children,
    status = 'UPCOMING_STATUS',
}: ChipStateProps) {
    const className = cva(
        'px-2 py-1.5 rounded-3xl flex justify-center items-center text-xs font-semibold',
        {
            variants: {
                status: {
                    UPCOMING_STATUS: 'bg-green-500 text-black',
                    COMPLETED_STATUS: 'bg-gray-800 text-gray-400',
                },
            },
            defaultVariants: {
                status: 'UPCOMING_STATUS',
            },
        }
    );
    return <div className={className({ status })}>{children}</div>;
}

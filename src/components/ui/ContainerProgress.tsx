'use client';

import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { UserIcon } from '@/assets';
import { ProgressChip } from '@/components/ui';

interface ContainerProgressProps {
    max: number;
    current: number;
    openStatus:
        | 'CONFIRMED_STATUS'
        | 'PENDING_STATUS'
        | 'CANCELED_STATUS'
        | 'PROGRESSING_STATUS'; // 마감상태로 부탁드림.. 오후 6시에 작업해주신다하셔서 들어오며수정
    deadLine?: string;
}

export default function ContainerProgress({
    max,
    current,
    openStatus,
    deadLine,
}: ContainerProgressProps) {
    const progress = `${((current / max) * 100).toFixed(0)}%`;
    const className = cva('h-2 rounded-md border-none', {
        variants: {
            openStatus: {
                PENDING_STATUS: 'bg-gray-300',
                CONFIRMED_STATUS: 'bg-green-400',
                PROGRESSING_STATUS: 'bg-green-800', // TODO Deadline으로 교체
                CANCELED_STATUS: '',
            },
        },
        defaultVariants: {
            openStatus: 'PENDING_STATUS',
        },
    });

    return (
        <div className="flex flex-col gap-2 pt-2 pb-4">
            <div className="flex justify-between text-gray-50 text-sm font-normal">
                <div className="flex gap-4 items-center justify-center">
                    <div className="flex gap-0.5 items-center justify-center font-medium">
                        <UserIcon width={16} height={16} />
                        <div>
                            {current} / {max}
                        </div>
                    </div>
                    {openStatus === 'CONFIRMED_STATUS' && (
                        <ProgressChip openStatus={openStatus}>
                            개설확정
                        </ProgressChip>
                    )}
                </div>

                {openStatus === 'PROGRESSING_STATUS' ? (
                    <ProgressChip openStatus={openStatus}>
                        모집마감
                    </ProgressChip>
                ) : deadLine ? (
                    <div className="flex gap-2 items-center justify-center">
                        <div className="text-green-400">마감</div>
                        <div>{deadLine}</div>
                    </div>
                ) : null}
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-md overflow-hidden">
                <motion.hr
                    className={className({ openStatus })}
                    initial={{ width: '0%' }}
                    animate={{ width: progress }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}

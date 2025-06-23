'use client';

import BaseModal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ConfirmDeleteModalProps {
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export default function ConfirmDeleteModal({
    onCancel,
    onConfirm,
    title = '팬팔을 삭제하시겠어요?',
    description = '삭제된 팬팔은 복구할 수 없어요',
}: ConfirmDeleteModalProps) {
    return (
        <BaseModal onClose={onCancel}>
            <div className="w-75 h-45 md:w-105 md:h-52.5 flex items-center justify-center">
                <div className="w-63 h-30 md:w-91 md:h-34 flex flex-col gap-6 md:gap-7">
                    <div className="flex flex-col gap-6 h-41">
                        <div className="h-14 md:h-15 flex flex-col gap-2">
                            <p className="text-white text-lg font-semibold text-center">
                                {title}
                            </p>
                            <p className="text-gray-400 text-base font-light text-center">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 h-10 md:h-12">
                        <Button
                            size="large"
                            onClick={onCancel}
                            styled="outline"
                        >
                            취소
                        </Button>
                        <Button size="large" onClick={onConfirm}>
                            삭제
                        </Button>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}

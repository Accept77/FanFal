import EditButton from './EditButton';
import { cva } from 'class-variance-authority';
import { ProfileIcon } from '@/assets';
import Image from 'next/image';

interface ProfileProps {
    size: 'small' | 'medium' | 'large' | 'xsmall';
    image?: string;
    edit?: boolean;
    children?: React.ReactNode;
    editButtonOnClick?: () => void;
    editButtonClassName?: string;
}

// URL 유효성 검사 함수
const isValidUrl = (string: string): boolean => {
    if (!string || string.trim() === '') return false;

    try {
        new URL(string);
        return true;
    } catch {
        // 상대 경로나 절대 경로 형태도 허용
        return (
            string.startsWith('/') ||
            string.startsWith('./') ||
            string.startsWith('../')
        );
    }
};

export default function Profile({
    size,
    image,
    edit,
    children,
    editButtonClassName,
    editButtonOnClick,
}: ProfileProps) {
    const imageClass = cva(
        'relative bg-gray-800 rounded-full overflow-hidden ',
        {
            variants: {
                size: {
                    xsmall: 'w-5 h-5 px-0.5 py-1',
                    small: 'w-6 h-6 px-0.5 py-1',
                    medium: 'w-10 h-10 px-1 py-2',
                    large: 'w-16 h-16 px-2.5 py-3.5',
                },
            },
        }
    );
    const containerClass = cva('flex items-center text-gray-300', {
        variants: {
            size: {
                xsmall: 'text-xs gap-1',
                small: 'text-sm gap-2',
                medium: 'text-base gap-2',
                large: 'text-lg gap-3 ',
            },
        },
    });

    // 유효한 이미지 URL인지 확인
    const hasValidImage = image && isValidUrl(image);

    return (
        <div className={containerClass({ size })}>
            <div className="relative">
                <div className={imageClass({ size })}>
                    {hasValidImage ? (
                        <Image
                            src={image}
                            alt="profile"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    ) : (
                        <ProfileIcon />
                    )}
                </div>
                {edit && (
                    <div className="flex absolute right-0 bottom-0">
                        <EditButton
                            size="small"
                            onClick={editButtonOnClick}
                            color="green"
                            className={editButtonClassName}
                        />
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}

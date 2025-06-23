import { EditIcon, EditNoBgIcon } from '@/assets';
import { ButtonHTMLAttributes } from 'react';

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'small' | 'large';
    color: 'green' | 'gray';
}

export default function EditButton({
    onClick,
    size = 'large',
    color = 'gray',
}: EditButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="hover:cursor-pointer"
        >
            {color === 'green' ? (
                <EditIcon
                    width={size === 'large' ? 32 : 18}
                    className="fill-gray-800 text-green-400" // text-green-400에 덮어져서 svg구조 수정  custom 변수
                    style={{
                        '--icon-path-color': '#1F2937',
                    }}
                />
            ) : (
                <EditNoBgIcon
                    width={size === 'large' ? 32 : 18}
                    className="fill-gray-100"
                />
            )}
        </button>
    );
}

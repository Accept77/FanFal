import Dropdown from './Dropdown';
import Button from './Button';

// CustomTimeInput 컴포넌트 - DatePicker와 연동됨
interface CustomTimeInputProps {
    date?: Date; // DatePicker에서 자동으로 전달
    value?: string; // 현재 시간 값 (HH:mm 형식)
    onChange?: (time: string) => void; // 시간 변경 콜백
    isStartDate?: boolean; // 🆕 추가
    onClose?: () => void;
    onMoveNext?: () => void;
}

export default function CustomTimeInput({
    date,
    onChange,
    onClose,
    isStartDate = false,
    onMoveNext,
}: CustomTimeInputProps) {
    // 현재 선택된 시간 파싱
    const currentHour = date ? date.getHours() : 9;
    const currentMinute = date ? date.getMinutes() : 0;

    // 12시간 형식으로 변환
    const hour12 =
        currentHour > 12
            ? currentHour - 12
            : currentHour === 0
              ? 12
              : currentHour;
    const period = currentHour >= 12 ? '오후' : '오전';
    const minute5 = Math.floor(currentMinute / 5) * 5;

    // 시간 변경 핸들러 - 수정 버전
    const handleTimeChange = (
        newHour: number,
        newMinute: number,
        newPeriod: string
    ) => {
        // 12시간 -> 24시간 변환
        let hour24 = newHour;
        if (newPeriod === '오후' && newHour !== 12) {
            hour24 = newHour + 12; // 오후 1시 = 13시, 오후 2시 = 14시 ...
        } else if (newPeriod === '오전' && newHour === 12) {
            hour24 = 0; // 오전 12시 = 0시 (자정)
        }
        // 오전 1~11시는 그대로 1~11시
        // 오후 12시는 그대로 12시 (정오)

        const timeString = `${hour24.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
        onChange?.(timeString);
    };
    return (
        <div className="flex flex-col md:flex-row gap-[3px] h-full">
            {/* 시간 선택 */}
            <div className="flex-col items-center p-0 hidden md:flex">
                <div className="border-l border-gray-800 custom-scrollbar-datepicker items-center h-[231px] w-[52px] flex flex-col gap-2 overflow-y-auto bg-gray-800 md:bg-gray-900">
                    {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour) => (
                        <button
                            type="button"
                            key={hour}
                            onClick={() =>
                                handleTimeChange(hour, minute5, period)
                            }
                            className={`flex justify-center items-center w-[30px] p-2 h-[35px] text-center text-sm transition-colors ${
                                hour12 === hour
                                    ? 'bg-green-500 text-gray-800 font-normal rounded-lg'
                                    : 'text-gray-300 hover:text-green-400'
                            }`}
                        >
                            {hour.toString().padStart(2, '0')}
                        </button>
                    ))}
                </div>
            </div>

            {/* 분 선택 */}
            <div className="flex-col items-center hidden md:flex">
                <div className="border-l border-gray-800 custom-scrollbar-datepicker items-center h-[231px] w-[52px] flex flex-col gap-2 overflow-y-auto bg-gray-800 md:bg-gray-900">
                    {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                            <button
                                type="button"
                                key={minute}
                                onClick={() =>
                                    handleTimeChange(hour12, minute, period)
                                }
                                className={`flex justify-center items-center w-[30px] p-2 h-[35px] text-center text-sm transition-colors ${
                                    minute5 === minute
                                        ? 'bg-green-500 text-gray-800 font-normal rounded-lg'
                                        : 'text-gray-300 hover:text-green-400'
                                }`}
                            >
                                {minute.toString().padStart(2, '0')}
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* 오전/오후 선택 */}
            <div className="flex md:flex-col flex-row items-center w-full justify-between">
                <div className="md:hidden leading-6 text-base font-semibold text-white">
                    시간 선택
                </div>
                <div className="border-l border-gray-800 flex md:flex-col flex-row gap-2 pl-[12px] md:h-[231px]">
                    {['오후', '오전'].map((p) => (
                        <button
                            type="button"
                            key={p}
                            onClick={() => handleTimeChange(hour12, minute5, p)}
                            className={`px-2 py-[6px] text-center text-sm rounded-lg transition-colors bg-gray-900 whitespace-nowrap ${
                                period === p
                                    ? 'bg-green-500 text-gray-800 font-normal rounded-lg'
                                    : 'md:text-gray-300 text-gray-200 hover:text-green-400'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            <div className="md:hidden text-base leading-6 font-medium text-gray-50">
                {/* 시간/분 드롭다운 */}
                <div className="flex gap-4 items-center justify-center mb-8">
                    {/* 시간 드롭다운 */}
                    <div className="relative flex-1 flex items-center justify-center gap-2">
                        <Dropdown
                            options={[
                                12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                            ].map((hour) => `${hour}시`)}
                            selected={`${hour12}시`}
                            onSelect={(value) => {
                                const hourNum = parseInt(
                                    value.replace('시', '')
                                );
                                handleTimeChange(hourNum, minute5, period);
                            }}
                            placeholder="시간 선택"
                            iconType="arrow"
                        />
                        <span className="text-white text-sm leading-6 font-normal">
                            시
                        </span>{' '}
                    </div>

                    {/* 분 드롭다운 */}
                    <div className="flex-1 flex items-center justify-center gap-2">
                        <Dropdown
                            options={Array.from(
                                { length: 12 },
                                (_, i) =>
                                    `${(i * 5).toString().padStart(2, '0')}분`
                            )}
                            selected={`${minute5.toString().padStart(2, '0')}분`}
                            onSelect={(value) => {
                                const minuteNum = parseInt(
                                    value.replace('분', '')
                                );
                                handleTimeChange(hour12, minuteNum, period);
                            }}
                            placeholder="분 선택"
                            iconType="arrow"
                        />
                        <span className="text-white text-sm leading-6 font-normal">
                            분
                        </span>
                    </div>
                </div>

                {/* 확인 버튼 */}
                {isStartDate ? (
                    <Button
                        size="large"
                        styled="solid"
                        onClick={() => onMoveNext?.()}
                    >
                        마감 날짜 선택
                    </Button>
                ) : (
                    <Button
                        size="large"
                        styled="solid"
                        onClick={() => onClose?.()}
                    >
                        확인
                    </Button>
                )}
            </div>
        </div>
    );
}

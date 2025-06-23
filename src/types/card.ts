export type Card = {
    articleId: number;
    title: string;
    location: string;
    date: number;
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus:
        | 'CONFIRMED_STATUS' // 최소인원 초과 상태
        | 'PENDING_STATUS' // 대기
        | 'CANCELED_STATUS' // 취소
        | 'PROGRESSING_STATUS'; // 최소인원 초과 + 데드라인 -> 요고 6시에 넣어주신다고..
    wish: boolean;
    image: string;
    useStatus: 'UPCOMING_STATUS' | 'COMPLETED_STATUS';
    createdAt: number;
    nickName: string;
    writerImageUrl: string;
    buttonOnClick?: () => void;
};

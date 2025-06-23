import { http, HttpResponse } from 'msw';
import { Card } from '@/types/card';

const today = new Date();

const getDateAfterDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date.getTime() / 1000;
};

const getDateBeforeDays = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date.getTime() / 1000;
};

const goTypeArticlesMap: Record<string, Card[]> = {
    BUSRENTAL_TYPE: [
        {
            articleId: 1,
            nickName: '김민수',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            title: '버스 대절해서 부산 가요~',
            location: '서울 강남구',
            date: getDateAfterDays(10),
            deadLine: today.getTime() / 1000,
            createdAt: getDateBeforeDays(2),
            currentPerson: 3,
            maxPerson: 5,
            openStatus: 'CONFIRMED_STATUS',
            wish: false,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            useStatus: 'UPCOMING_STATUS',
        },
        {
            articleId: 4,
            nickName: '박지훈',
            writerImageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
            title: '경기에서 버스 대절해요, 같이 가요!',
            location: '경기 수원시',
            date: getDateAfterDays(8),
            deadLine: getDateAfterDays(14),
            createdAt: getDateBeforeDays(1),
            currentPerson: 2,
            maxPerson: 6,
            openStatus: 'CONFIRMED_STATUS',
            wish: true,
            image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
            useStatus: 'UPCOMING_STATUS',
        },
    ],
    COMPANION_TYPE: [
        {
            articleId: 2,
            nickName: '이수진',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            title: '서울 근교 등산 동행 구해요',
            location: '서울 강서구',
            date: getDateAfterDays(20),
            deadLine: getDateAfterDays(25),
            createdAt: getDateBeforeDays(1),
            currentPerson: 2,
            maxPerson: 7,
            openStatus: 'CONFIRMED_STATUS',
            wish: true,
            image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
            useStatus: 'UPCOMING_STATUS',
        },
        {
            articleId: 5,
            nickName: '최수진',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
            title: '경기 가평 등산 함께하실 분~',
            location: '경기 가평군',
            date: getDateAfterDays(18),
            deadLine: getDateAfterDays(23),
            createdAt: getDateBeforeDays(2),
            currentPerson: 3,
            maxPerson: 8,
            openStatus: 'CONFIRMED_STATUS',
            wish: false,
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
            useStatus: 'UPCOMING_STATUS',
        },
    ],
    AFTERPARTY_TYPE: [
        {
            articleId: 3,
            nickName: '홍길동',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            title: '콘서트 뒤풀이 같이 가요!',
            location: '서울 중구',
            date: getDateAfterDays(30),
            deadLine: getDateAfterDays(35),
            createdAt: getDateBeforeDays(3),
            currentPerson: 5,
            maxPerson: 10,
            openStatus: 'PENDING_STATUS',
            wish: false,
            image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56',
            useStatus: 'UPCOMING_STATUS',
        },
        {
            articleId: 6,
            nickName: '이민호',
            writerImageUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
            title: '부산 뒤풀이 갈 사람 모여요',
            location: '부산 해운대구',
            date: getDateAfterDays(28),
            deadLine: getDateAfterDays(33),
            createdAt: getDateBeforeDays(4),
            currentPerson: 4,
            maxPerson: 9,
            openStatus: 'PENDING_STATUS',
            wish: true,
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
            useStatus: 'UPCOMING_STATUS',
        },
    ],
};

const doingTypeArticlesMap: Record<string, Card[]> = {
    TOGETHER_TYPE: [
        {
            articleId: 101,
            nickName: '박지훈',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            title: '팝업스토어 같이 하실분~',
            location: '서울 마포구',
            date: getDateAfterDays(5),
            deadLine: getDateAfterDays(10),
            createdAt: getDateBeforeDays(4),
            currentPerson: 1,
            maxPerson: 3,
            openStatus: 'CONFIRMED_STATUS',
            wish: false,
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            useStatus: 'UPCOMING_STATUS',
        },
        {
            articleId: 107,
            nickName: '김하늘',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            title: '경기 용인 팝업스토어 같이하실분',
            location: '경기 용인시',
            date: getDateAfterDays(7),
            deadLine: getDateAfterDays(12),
            createdAt: getDateBeforeDays(5),
            currentPerson: 2,
            maxPerson: 4,
            openStatus: 'CONFIRMED_STATUS',
            wish: true,
            image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
            useStatus: 'UPCOMING_STATUS',
        },
    ],
    BIRTHDAY_TYPE: [
        {
            articleId: 102,
            nickName: '최은영',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            title: '생일 카페 같이해요!',
            location: '서울 송파구',
            date: getDateAfterDays(15),
            deadLine: getDateAfterDays(20),
            createdAt: getDateBeforeDays(1),
            currentPerson: 2,
            maxPerson: 4,
            openStatus: 'CONFIRMED_STATUS',
            wish: true,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            useStatus: 'UPCOMING_STATUS',
        },
    ],
    ONLINE_TYPE: [
        {
            articleId: 103,
            nickName: '유재석',
            writerImageUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
            title: '온라인 콘서트 같이 하실래요?',
            location: '서울 은평구',
            date: getDateAfterDays(12),
            deadLine: getDateAfterDays(17),
            createdAt: getDateBeforeDays(2),
            currentPerson: 4,
            maxPerson: 5,
            openStatus: 'PENDING_STATUS',
            wish: false,
            image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
            useStatus: 'UPCOMING_STATUS',
        },
    ],
    TOUR_TYPE: [
        {
            articleId: 104,
            nickName: '장보리',
            writerImageUrl: 'https://randomuser.me/api/portraits/women/35.jpg',
            title: '덕질 투어 계획중~ 관심있는 분!',
            location: '서울 종로구',
            date: getDateAfterDays(25),
            deadLine: getDateAfterDays(30),
            createdAt: getDateBeforeDays(3),
            currentPerson: 6,
            maxPerson: 8,
            openStatus: 'PENDING_STATUS',
            wish: true,
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
            useStatus: 'UPCOMING_STATUS',
        },
    ],
};

export const getBoardHandlers = [
    http.get('http://localhost:3000/api/board', async ({ request }) => {
        const url = new URL(request.url);
        const bigCategory = url.searchParams.get('bigCategory');
        const smallCategory = url.searchParams.get('smallCategory');
        const location = url.searchParams.get('location');
        const date = url.searchParams.get('date');
        const sort = url.searchParams.get('sort');
        const sortAsc = url.searchParams.get('sortAsc') === 'true';
        const lastArticleId = parseInt(
            url.searchParams.get('lastArticleId') || '0'
        );
        const limit = parseInt(url.searchParams.get('limit') || '10');

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = !!authHeader;

        let articles: Card[] = [];

        if (bigCategory === 'GO_TYPE') {
            if (
                smallCategory &&
                smallCategory !== 'ALL' &&
                goTypeArticlesMap[smallCategory]
            ) {
                articles = goTypeArticlesMap[smallCategory];
            } else {
                articles = Object.values(goTypeArticlesMap).flat();
            }
        } else if (bigCategory === 'DOING_TYPE') {
            if (
                smallCategory &&
                smallCategory !== 'ALL' &&
                doingTypeArticlesMap[smallCategory]
            ) {
                articles = doingTypeArticlesMap[smallCategory];
            } else {
                articles = Object.values(doingTypeArticlesMap).flat();
            }
        }

        articles = articles.filter(
            (article) => article.articleId > lastArticleId
        );

        if (location && location !== '') {
            articles = articles.filter((article) =>
                article.location.includes(location)
            );
        }

        // 날짜 필터링 로직 수정
        if (date) {
            const filterDate = parseInt(date);

            // 선택된 날짜의 시작과 끝 시간 계산 (해당 날짜 하루 전체)
            const selectedDate = new Date(filterDate * 1000);
            const startOfDay = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
            );
            const endOfDay = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate() + 1
            );

            const startTimestamp = Math.floor(startOfDay.getTime() / 1000);
            const endTimestamp = Math.floor(endOfDay.getTime() / 1000);

            // 해당 날짜에 속하는 일정만 필터링
            articles = articles.filter((article) => {
                return (
                    article.date >= startTimestamp &&
                    article.date < endTimestamp
                );
            });
        }

        if (sort) {
            articles.sort((a, b) => {
                let comp = 0;
                if (sort === 'recent') {
                    comp = a.date - b.date;
                } else if (sort === 'deadLine') {
                    comp = a.deadLine - b.deadLine;
                } else if (sort === 'person') {
                    comp = a.currentPerson - b.currentPerson;
                }
                return sortAsc ? comp : -comp;
            });
        }

        articles = articles.map((article) => ({
            ...article,
            wish: isLoggedIn ? article.wish : false,
        }));

        articles = articles.slice(0, limit);

        return HttpResponse.json({
            statusCode: 200,
            message: '게시글 조회 성공',
            data: articles,
        });
    }),
];

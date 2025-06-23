import { http, HttpResponse } from 'msw';

export const MyCardListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            fanpal_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            date: 1748933344, // 2025년 5월 1일
            currentPerson: 3,
            maxPerson: 6,
            openStatus: 'waiting',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
            createUser: 'foodie123',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            useStatus: 'UPCOMING',
        },
        {
            fanpal_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            date: 1748846944, // 2025년 4월 30일
            currentPerson: 5,
            maxPerson: 8,
            openStatus: 'finished',
            image: 'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7',
            createUser: 'traveler456',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            useStatus: 'COMPLETED',
        },
        {
            fanpal_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            date: 1748760544, // 2025년 4월 29일
            currentPerson: 7,
            maxPerson: 10,
            openStatus: 'progressing',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            createUser: 'hiker789',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            useStatus: 'UPCOMING',
        },
        {
            fanpal_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            date: 1748674144, // 2025년 4월 28일
            currentPerson: 10,
            maxPerson: 12,
            openStatus: 'canceled',
            image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b',
            createUser: 'explorer101',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            useStatus: 'UPCOMING',
        },
        {
            fanpal_id: 5,
            title: '강원도 스키장 투어',
            location: '강원도 평창군',
            date: 1748587744, // 2025년 4월 27일
            currentPerson: 4,
            maxPerson: 8,
            openStatus: 'waiting',
            image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9',
            createUser: 'snowboarder202',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            useStatus: 'UPCOMING',
        },
        {
            fanpal_id: 6,
            title: '전주 한옥마을 체험',
            location: '전주 완산구',
            date: 1748501344, // 2025년 4월 26일
            currentPerson: 6,
            maxPerson: 10,
            openStatus: 'progressing',
            image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f',
            createUser: 'culturelover303',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
            useStatus: 'UPCOMING',
        },
        {
            fanpal_id: 7,
            title: '여수 바다낚시 체험',
            location: '여수시',
            date: 1748414944, // 2025년 4월 25일
            currentPerson: 8,
            maxPerson: 12,
            openStatus: 'finished',
            image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c',
            createUser: 'fisherman404',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
            useStatus: 'COMPLETED',
        },
        {
            fanpal_id: 8,
            title: '경주 불국사 투어',
            location: '경주시',
            date: 1748328544, // 2025년 4월 24일
            currentPerson: 5,
            maxPerson: 8,
            openStatus: 'waiting',
            image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
            createUser: 'historybuff505',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            useStatus: 'UPCOMING',
        },
        {
            fanpal_id: 9,
            title: '제주 올레길 트레킹',
            location: '제주 서귀포시',
            date: 1748242144, // 2025년 4월 23일
            currentPerson: 7,
            maxPerson: 10,
            openStatus: 'progressing',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            createUser: 'trekker606',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
            useStatus: 'UPCOMING',
        },
        {
            fanpal_id: 10,
            title: '부산 감천문화마을 투어',
            location: '부산 사하구',
            date: 1748155744, // 2025년 4월 22일
            currentPerson: 9,
            maxPerson: 15,
            openStatus: 'waiting',
            image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f',
            createUser: 'artlover707',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
            useStatus: 'UPCOMING',
        },
    ],
};

export const CardListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            fanpal_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            date: 1748933344, // 2025년 5월 1일
            deadline: 1748846944, // 2025년 4월 30일
            currentPerson: 3,
            maxPerson: 6,
            openStatus: 'waiting',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
            createUser: 'foodie123',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        },
        {
            fanpal_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            date: 1748846944, // 2025년 4월 30일
            deadline: 1748760544, // 2025년 4월 29일
            currentPerson: 5,
            maxPerson: 8,
            openStatus: 'finished',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7',
            createUser: 'traveler456',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        },
        {
            fanpal_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            date: 1748760544, // 2025년 4월 29일
            deadline: 1748674144, // 2025년 4월 28일
            currentPerson: 7,
            maxPerson: 10,
            openStatus: 'progressing',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            createUser: 'hiker789',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        },
        {
            fanpal_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            date: 1748674144, // 2025년 4월 28일
            deadline: 1748587744, // 2025년 4월 27일
            currentPerson: 10,
            maxPerson: 12,
            openStatus: 'progressing',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b',
            createUser: 'explorer101',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        },
        {
            fanpal_id: 5,
            title: '강원도 스키장 투어',
            location: '강원도 평창군',
            date: 1748587744, // 2025년 4월 27일
            deadline: 1748501344, // 2025년 4월 26일
            currentPerson: 4,
            maxPerson: 8,
            openStatus: 'waiting',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9',
            createUser: 'snowboarder202',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        },
        {
            fanpal_id: 6,
            title: '전주 한옥마을 체험',
            location: '전주 완산구',
            date: 1748501344, // 2025년 4월 26일
            deadline: 1748414944, // 2025년 4월 25일
            currentPerson: 6,
            maxPerson: 10,
            openStatus: 'progressing',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f',
            createUser: 'culturelover303',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        },
        {
            fanpal_id: 7,
            title: '여수 바다낚시 체험',
            location: '여수시',
            date: 1748414944, // 2025년 4월 25일
            deadline: 1748328544, // 2025년 4월 24일
            currentPerson: 8,
            maxPerson: 12,
            openStatus: 'finished',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c',
            createUser: 'fisherman404',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        },
        {
            fanpal_id: 8,
            title: '경주 불국사 투어',
            location: '경주시',
            date: 1748328544, // 2025년 4월 24일
            deadline: 1748242144, // 2025년 4월 23일
            currentPerson: 5,
            maxPerson: 8,
            openStatus: 'waiting',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
            createUser: 'historybuff505',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        },
        {
            fanpal_id: 9,
            title: '제주 올레길 트레킹',
            location: '제주 서귀포시',
            date: 1748242144, // 2025년 4월 23일
            deadline: 1748155744, // 2025년 4월 22일
            currentPerson: 7,
            maxPerson: 10,
            openStatus: 'progressing',
            wishList: true,
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
            createUser: 'trekker606',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
        },
        {
            fanpal_id: 10,
            title: '부산 감천문화마을 투어',
            location: '부산 사하구',
            date: 1748155744, // 2025년 4월 22일
            deadline: 1748069344, // 2025년 4월 21일
            currentPerson: 9,
            maxPerson: 15,
            openStatus: 'waiting',
            wishList: false,
            image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f',
            createUser: 'artlover707',
            createUserProfileImg:
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
        },
    ],
};

export const QuestionListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            comment_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748933344,
            comment: '식사 시간은 언제인가요?',
            answer: {
                nickname: 'foodie123',
                profileImage:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                content: '오후 12시에 만나서 점심 식사를 할 예정입니다.',
                createdAt: 1748933344,
            },
        },
        {
            comment_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1748846944,
            comment: '숙소는 어떻게 되나요?',
            answer: {
                nickname: 'traveler456',
                profileImage:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                content: '해운대 근처 호텔에서 1박 2일로 진행됩니다.',
                createdAt: 1748846944,
            },
        },
        {
            comment_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            createdAt: 1748760544,
            comment: '등산 장비는 준비해야 하나요?',
            answer: {
                nickname: 'hiker789',
                profileImage:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                content: '네, 등산화와 등산 스틱은 필수입니다.',
                createdAt: 1748760544,
            },
        },
        {
            comment_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            createdAt: 1748674144,
            comment: '식사는 포함인가요?',
            answer: {
                nickname: 'explorer101',
                profileImage:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                content: '네, 점심 식사가 포함되어 있습니다.',
                createdAt: 1748674144,
            },
        },
        {
            comment_id: 5,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748587744,
            comment: '예약은 어떻게 하나요?',
            answer: {
                nickname: 'foodie123',
                profileImage:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                content: '참여하기 버튼을 눌러주시면 됩니다.',
                createdAt: 1748587744,
            },
        },
        {
            comment_id: 6,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1748501344,
            comment: '해수욕장 이용 시간은 어떻게 되나요?',
        },
        {
            comment_id: 7,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            createdAt: 1748414944,
            comment: '등반 코스는 어떤 것이 있나요?',
        },
        {
            comment_id: 8,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            createdAt: 1748328544,
            comment: '투어 시간은 얼마나 걸리나요?',
        },
        {
            comment_id: 9,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748242144,
            comment: '식사 메뉴는 어떻게 되나요?',
        },
        {
            comment_id: 10,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1748155744,
            comment: '교통편은 어떻게 되나요?',
        },
        {
            comment_id: 11,
            title: '강원도 스키장 투어',
            location: '강원도 평창군',
            createdAt: 1748069344,
            comment: '스키장 렌탈 장비는 어떻게 되나요?',
            answer: {
                nickname: 'snowboarder202',
                profileImage:
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
                content:
                    '스키장에서 렌탈 가능하며, 개인 장비 지참도 가능합니다.',
                createdAt: 1748069344,
            },
        },
        {
            comment_id: 12,
            title: '전주 한옥마을 체험',
            location: '전주 완산구',
            createdAt: 1747982944,
            comment: '한복 대여는 어떻게 하나요?',
            answer: {
                nickname: 'culturelover303',
                profileImage:
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
                content: '한옥마을 입구에서 한복 대여가 가능합니다.',
                createdAt: 1747982944,
            },
        },
        {
            comment_id: 13,
            title: '여수 바다낚시 체험',
            location: '여수시',
            createdAt: 1747896544,
            comment: '낚시 도구는 준비해야 하나요?',
            answer: {
                nickname: 'fisherman404',
                profileImage:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
                content: '낚시 도구는 현장에서 대여 가능합니다.',
                createdAt: 1747896544,
            },
        },
        {
            comment_id: 14,
            title: '경주 불국사 투어',
            location: '경주시',
            createdAt: 1747810144,
            comment: '입장료는 얼마인가요?',
            answer: {
                nickname: 'historybuff505',
                profileImage:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                content: '성인 5,000원, 청소년 3,000원입니다.',
                createdAt: 1747810144,
            },
        },
        {
            comment_id: 15,
            title: '제주 올레길 트레킹',
            location: '제주 서귀포시',
            createdAt: 1747723744,
            comment: '코스 난이도는 어떤가요?',
            answer: {
                nickname: 'trekker606',
                profileImage:
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
                content: '초급자도 걷기 쉬운 코스로 준비했습니다.',
                createdAt: 1747723744,
            },
        },
        {
            comment_id: 16,
            title: '부산 감천문화마을 투어',
            location: '부산 사하구',
            createdAt: 1747637344,
            comment: '주차는 어디에 하나요?',
            answer: {
                nickname: 'artlover707',
                profileImage:
                    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
                content: '마을 입구에 공영주차장이 있습니다.',
                createdAt: 1747637344,
            },
        },
        {
            comment_id: 17,
            title: '강원도 스키장 투어',
            location: '강원도 평창군',
            createdAt: 1747550944,
            comment: '스키 강습은 포함인가요?',
        },
        {
            comment_id: 18,
            title: '전주 한옥마을 체험',
            location: '전주 완산구',
            createdAt: 1747464544,
            comment: '전통 음식 체험은 있나요?',
        },
        {
            comment_id: 19,
            title: '여수 바다낚시 체험',
            location: '여수시',
            createdAt: 1747378144,
            comment: '잡은 물고기는 가져갈 수 있나요?',
        },
        {
            comment_id: 20,
            title: '경주 불국사 투어',
            location: '경주시',
            createdAt: 1747291744,
            comment: '관람 시간은 얼마나 걸리나요?',
        },
    ],
};

export const AnswerListMok = {
    totalPage: 10,
    currentPage: 1,
    data: [
        {
            fanpal_id: 1,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748933344,
            comment: '식사 시간은 언제인가요?',
            answer: true,
        },
        {
            fanpal_id: 2,
            title: '부산 해운대 여행',
            location: '부산 해운대구',
            createdAt: 1749389854,
            comment: '숙소는 어떻게 되나요?',
            answer: false,
        },
        {
            fanpal_id: 3,
            title: '제주도 한라산 등반',
            location: '제주 제주시',
            createdAt: 1748760544,
            comment: '등산 장비는 준비해야 하나요?',
            answer: true,
        },
        {
            fanpal_id: 4,
            title: '인천 차이나타운 투어',
            location: '인천 중구',
            createdAt: 1749449854,
            comment: '식사는 포함인가요?',
            answer: false,
        },
        {
            fanpal_id: 5,
            title: '서울 맛집 투어',
            location: '서울 강남구',
            createdAt: 1748587744,
            comment: '예약은 어떻게 하나요?',
            answer: true,
        },
        {
            fanpal_id: 6,
            title: '전주 한옥마을 체험',
            location: '전주 완산구',
            createdAt: 1747982944,
            comment: '한복 대여는 어떻게 하나요?',
            answer: true,
        },
        {
            fanpal_id: 7,
            title: '여수 바다낚시 체험',
            location: '여수시',
            createdAt: 1747896544,
            comment: '낚시 도구는 준비해야 하나요?',
            answer: true,
        },
        {
            fanpal_id: 8,
            title: '경주 불국사 투어',
            location: '경주시',
            createdAt: 1747810144,
            comment: '입장료는 얼마인가요?',
            answer: true,
        },
        {
            fanpal_id: 9,
            title: '제주 올레길 트레킹',
            location: '제주 서귀포시',
            createdAt: 1747723744,
            comment: '코스 난이도는 어떤가요?',
            answer: true,
        },
        {
            fanpal_id: 10,
            title: '부산 감천문화마을 투어',
            location: '부산 사하구',
            createdAt: 1747637344,
            comment: '주차는 어디에 하나요?',
            answer: true,
        },
        {
            fanpal_id: 11,
            title: '강원도 스키장 투어',
            location: '강원도 평창군',
            createdAt: 1747550944,
            comment: '스키 강습은 포함인가요?',
            answer: false,
        },
        {
            fanpal_id: 12,
            title: '전주 한옥마을 체험',
            location: '전주 완산구',
            createdAt: 1747464544,
            comment: '전통 음식 체험은 있나요?',
            answer: false,
        },
        {
            fanpal_id: 13,
            title: '여수 바다낚시 체험',
            location: '여수시',
            createdAt: 1747378144,
            comment: '잡은 물고기는 가져갈 수 있나요?',
            answer: false,
        },
        {
            fanpal_id: 14,
            title: '경주 불국사 투어',
            location: '경주시',
            createdAt: 1747291744,
            comment: '관람 시간은 얼마나 걸리나요?',
            answer: false,
        },
        {
            fanpal_id: 15,
            title: '제주 올레길 트레킹',
            location: '제주 서귀포시',
            createdAt: 1747205344,
            comment: '등산화는 필수인가요?',
            answer: true,
        },
        {
            fanpal_id: 16,
            title: '부산 감천문화마을 투어',
            location: '부산 사하구',
            createdAt: 1747118944,
            comment: '사진 촬영 가능한가요?',
            answer: true,
        },
        {
            fanpal_id: 17,
            title: '강원도 스키장 투어',
            location: '강원도 평창군',
            createdAt: 1747032544,
            comment: '눈사태 위험은 없나요?',
            answer: false,
        },
        {
            fanpal_id: 18,
            title: '전주 한옥마을 체험',
            location: '전주 완산구',
            createdAt: 1746946144,
            comment: '야간 관람도 가능한가요?',
            answer: false,
        },
        {
            fanpal_id: 19,
            title: '여수 바다낚시 체험',
            location: '여수시',
            createdAt: 1746859744,
            comment: '날씨가 안 좋으면 어떻게 되나요?',
            answer: true,
        },
        {
            fanpal_id: 20,
            title: '경주 불국사 투어',
            location: '경주시',
            createdAt: 1746773344,
            comment: '가이드 투어는 있나요?',
            answer: true,
        },
    ],
};

const user = {
    nickName: 'John Doe',
    img: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdEviuJ%2FbtsOntsXvGE%2FTPMqlJDrbVQQ2g5du7bgq1%2Fimg.png',
    description: 'This is a description',
    password: '1234',
};

interface MyPageRequestBody {
    lastArticleId?: string;
    limit?: number;
    fanpal_id?: number;
    currentPassword?: string;
    newPassword?: string;
    nickname?: string;
    profileImage?: string;
    description?: string;
}

export const mypageHandlers = [
    http.get('http://localhost:3000/api/user', async () => {
        return HttpResponse.json({
            ...user,
        });
    }),

    http.post('http://localhost:3000/api/mypage', async ({ request }) => {
        const body = (await request.json()) as MyPageRequestBody;
        const { lastArticleId, limit } = body;

        let filteredData = [...MyCardListMok.data];

        const offset = Number(lastArticleId) || 0;
        const limitNum = limit || 10;

        filteredData = filteredData.slice(offset, offset + limitNum);

        return HttpResponse.json({
            totalPage: Math.ceil(MyCardListMok.data.length / limitNum),
            data: filteredData,
        });
    }),

    http.delete('http://localhost:3000/api/mypage', async ({ request }) => {
        const body = (await request.json()) as MyPageRequestBody;
        const { fanpal_id } = body;
        const filteredData = MyCardListMok.data.filter(
            (item) => item.fanpal_id.toString() !== fanpal_id?.toString()
        );
        MyCardListMok.data = filteredData;

        return HttpResponse.json({
            message: 'success',
        });
    }),
    http.post(
        'http://localhost:3000/api/mypage/cancel',
        async ({ request }) => {
            const body = (await request.json()) as MyPageRequestBody;
            const { fanpal_id } = body;
            const filteredData = MyCardListMok.data.filter(
                (item) => item.fanpal_id.toString() !== fanpal_id?.toString()
            );
            MyCardListMok.data = filteredData;

            return HttpResponse.json({
                message: 'success',
            });
        }
    ),

    http.post('http://localhost:3000/api/mypage/self', async ({ request }) => {
        const body = (await request.json()) as MyPageRequestBody;
        const { lastArticleId, limit } = body;

        let filteredData = [...CardListMok.data];

        const offset = Number(lastArticleId) || 0;
        const limitNum = limit || 10;

        filteredData = filteredData.slice(offset, offset + limitNum);

        return HttpResponse.json({
            totalPage: Math.ceil(CardListMok.data.length / limitNum),
            data: filteredData,
        });
    }),

    http.post(
        'http://localhost:3000/api/mypage/question',
        async ({ request }) => {
            const body = (await request.json()) as MyPageRequestBody;
            const { lastArticleId, limit } = body;

            let filteredData = [...QuestionListMok.data];
            if (lastArticleId) {
                const lastIndex = filteredData.findIndex(
                    (item) =>
                        item.comment_id.toString() === lastArticleId.toString()
                );
                if (lastIndex !== -1) {
                    filteredData = filteredData.slice(lastIndex + 1);
                }
            }
            if (limit) {
                filteredData = filteredData.slice(0, limit);
            }

            return HttpResponse.json({
                totalCount: QuestionListMok.data.length,
                data: filteredData,
            });
        }
    ),

    http.post(
        'http://localhost:3000/api/mypage/answer',
        async ({ request }) => {
            const body = (await request.json()) as MyPageRequestBody;
            const { lastArticleId, limit } = body;

            let filteredData = [...AnswerListMok.data];
            if (lastArticleId) {
                const lastIndex = filteredData.findIndex(
                    (item) =>
                        item.fanpal_id.toString() === lastArticleId.toString()
                );
                if (lastIndex !== -1) {
                    filteredData = filteredData.slice(lastIndex + 1);
                }
            }
            if (limit) {
                filteredData = filteredData.slice(0, limit);
            }

            return HttpResponse.json({
                totalCount: AnswerListMok.data.length,
                data: filteredData,
            });
        }
    ),

    http.post(
        'http://localhost:3000/api/mypage/password',
        async ({ request }) => {
            const body = (await request.json()) as MyPageRequestBody;
            const { currentPassword, newPassword } = body;

            if (currentPassword !== user.password) {
                return HttpResponse.json({
                    message: '비밀번호가 일치하지 않습니다.',
                });
            }

            user.password = newPassword || '1234';

            return HttpResponse.json({
                message: 'success',
            });
        }
    ),

    http.patch('http://localhost:3000/api/myPage', async ({ request }) => {
        const body = (await request.json()) as MyPageRequestBody;
        const { nickname, profileImage, description } = body;

        user.nickName = nickname || 'John Doe';
        user.img =
            profileImage ||
            'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdEviuJ%2FbtsOntsXvGE%2FPMqlJDrbVQQ2g5du7bgq1%2Fimg.png';
        user.description = description || 'This is a description';
        return HttpResponse.json({
            message: 'success',
        });
    }),
];

export type Card = {
    articleId: number;
    title: string;
    location: string;
    date: number; // api 명세서 ...
    deadLine: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'PENDING_STATUS' | 'CONFIRMED_STATUS' | 'CANCELED_STATUS';
    wishList: boolean;
    image: string;
    createUser: string;
    createUserProfileImg: string;
    useStatus: 'UPCOMING_STATUS' | 'COMPLETED_STATUS';
    createdAt: number;
};

export type SelfCard = {
    articleId: number;
    title: string;
    location: string;
    date: number;
    deadLine: number;
    createdAt: number;
    currentPerson: number;
    maxPerson: number;
    openStatus: 'PENDING_STATUS' | 'CONFIRMED_STATUS' | 'CANCELED_STATUS';
    wishList: boolean;
    image: string;
    useStatus: 'UPCOMING_STATUS' | 'COMPLETED_STATUS';
    createUser: string;
    createUserProfileImg: string;
    totalPage: number;
};

export type Question = {
    comment_id: number;
    title: string;
    location: string;
    createdAt: number;
    comment: string;
    answer?: {
        nickname: string;
        profileImage: string;
        content: string;
        createdAt: number;
    };
};

export type Answer = {
    articleId: number;
    title: string;
    location: string;
    createdAt: number;
    comment: string;
    answer: boolean;
};

export interface MyPageResponse {
    data: {
        data: Card[];
        totalCount: number;
    };
    message: string;
    statusCode: number;
}

export interface SelfMypageResponse {
    data: {
        data: SelfCard[];
        totalCount: number;
    };
    message: string;
    statusCode: number;
}

export interface QuestionListResponse {
    totalCount: number;
    data: Question[];
}

export interface AnswerListResponse {
    data: {
        data: Answer[];
        totalCount: number;
    };
    message: string;
    statusCode: number;
}

export interface ProfileEditRequest {
    userId?: string;
    nickName?: string;
    email?: string;
    information?: string;
    password?: string;
    profileImgUrl?: string;
}

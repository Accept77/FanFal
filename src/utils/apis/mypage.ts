import { customFetcher } from './customFetcher';
import {
    MyPageResponse,
    SelfMypageResponse,
    QuestionListResponse,
    AnswerListResponse,
    ProfileEditRequest,
} from '@/types/myPage';

export const mypageApi = {
    getMypage: async (page: number | null, limit: number) => {
        return customFetcher<
            MyPageResponse,
            { lastArticleId: number | null; limit: number }
        >(`/api/myPage?page=${page}&limit=${limit}`, {
            method: 'GET',
        });
    },
    deleteMypage: async (articleId: number) => {
        return customFetcher<void, { articleId: number }>(
            `/api/myPage/${articleId}`,
            {
                method: 'DELETE',
            }
        );
    },
    getSelfMypage: async (page: number | null, limit: number) => {
        return customFetcher<
            SelfMypageResponse,
            { page: number | null; limit: number }
        >(`/api/myPage/self?page=${page}&limit=${limit}`, {
            method: 'GET',
        });
    },
    getQuestion: async (lastArticleId: number | null, limit: number) => {
        return customFetcher<
            QuestionListResponse,
            { lastArticleId: number | null; limit: number }
        >('/api/mypage/question', {
            method: 'POST',
            body: {
                lastArticleId,
                limit,
            },
        });
    },
    getAnswer: async (lastArticleId: number | null, limit: number) => {
        return customFetcher<
            AnswerListResponse,
            { lastArticleId: number | null; limit: number }
        >(`/api/myPage/answer?lastArticleId=${lastArticleId}&limit=${limit}`, {
            method: 'GET',
        });
    },
    cancelMypage: async (articleId: number) => {
        return customFetcher<void, void>(`/api/board/${articleId}/fanFal`, {
            method: 'DELETE',
        });
    },

    changePassword: async (data: { password: string; newPassword: string }) => {
        return customFetcher<void, { password: string; newPassword: string }>(
            '/api/myPage',
            {
                method: 'PUT',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    },

    changeProfile: async (data: ProfileEditRequest) => {
        return customFetcher<void, ProfileEditRequest>('/api/myPage', {
            method: 'PATCH',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    postProfileImageUrl: async (profileImage: File) => {
        return customFetcher<
            {
                statusCode: number;
                message: string;
                data: { preSignedUrl: string; key: string };
            },
            { fileName: string }
        >(`/api/images/postImage?fileName=${profileImage.name}`, {
            method: 'GET',
        });
    },
    putProfileImage: async (profileImage: File, url: string) => {
        return customFetcher<void, File>(`${url}`, {
            method: 'PUT',
            body: profileImage,
            headers: {
                'Content-Type': profileImage.type,
            },
        });
    },
};

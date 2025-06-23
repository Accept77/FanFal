import { mypageApi } from '@/utils/apis/mypage';
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    MyPageResponse,
    QuestionListResponse,
    SelfMypageResponse,
    AnswerListResponse,
    ProfileEditRequest,
} from '@/types/myPage';
import { toast } from 'react-toastify';

export const useChangeProfileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ProfileEditRequest) => mypageApi.changeProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error('프로필 변경 실패:', error);
        },
    });
};

export const useChangePasswordMutation = () => {
    return useMutation({
        mutationFn: (data: { password: string; newPassword: string }) =>
            mypageApi.changePassword(data),
        onSuccess: () => {},
        onError: (error) => {
            console.error('비밀번호 변경 실패:', error);
        },
    });
};

export const useGetMyPage = (currentPage: number, pageSize: number) => {
    return useQuery<MyPageResponse>({
        queryKey: ['mypage', currentPage],
        queryFn: () => mypageApi.getMypage(currentPage, pageSize),
        gcTime: 0,
    });
};

export const useDeleteMypageMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (articleId: number) => mypageApi.deleteMypage(articleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mypage'] });
            toast.success('팬팔 삭제가 완료되었습니다.');
        },
        onError: (error) => {
            console.error('팬팔 삭제 실패:', error);
            toast.error('팬팔 삭제에 실패했습니다.');
        },
    });
};

export const useCancelMypageMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (articleId: number) => mypageApi.cancelMypage(articleId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mypage'] });
            toast.success('팬팔 취소가 완료되었습니다.');
        },
        onError: (error) => {
            console.error('팬팔 취소 실패:', error);
            toast.error('팬팔 취소에 실패했습니다.');
        },
    });
};

export const useGetSelfMypage = (currentPage: number, pageSize: number) => {
    return useQuery<SelfMypageResponse>({
        queryKey: ['mypageSelf', currentPage],
        queryFn: () => mypageApi.getSelfMypage(currentPage, pageSize),
    });
};

export const useGetQuestion = (pageParam: number | null, pageSize: number) => {
    return useInfiniteQuery<QuestionListResponse>({
        queryKey: ['questionList'],
        queryFn: ({ pageParam }) =>
            mypageApi.getQuestion(pageParam as number | null, pageSize),
        getNextPageParam: (lastPage) => {
            if (lastPage.data.length === 0) return undefined;
            return lastPage.data[lastPage.data.length - 1].comment_id;
        },
        initialPageParam: 1,
    });
};

export const useGetAnswer = (pageParam: number | null, pageSize: number) => {
    return useInfiniteQuery<AnswerListResponse>({
        queryKey: ['answerList'],
        queryFn: ({ pageParam }) =>
            mypageApi.getAnswer(pageParam as number | null, pageSize),
        getNextPageParam: (lastPage) => {
            if (lastPage.data.data.length === 0) return undefined;
            return lastPage.data.data[lastPage.data.data.length - 1].articleId;
        },
        initialPageParam: 1,
    });
};

import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { commentApi } from '@/utils/apis/commentApi';

export const useCommentQuery = ({
    articleId,
    onCommentSuccess,
}: {
    articleId: number;
    onCommentSuccess: () => void;
}) => {
    const {
        data: commentsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['comments', articleId],
        queryFn: async ({
            pageParam,
        }: {
            pageParam: { lastCommentId?: number; lastParentCommentId?: number };
        }) => {
            const response = await commentApi.getCommentsByArticleId({
                articleId,
                pageSize: 3,
                lastParentCommentId: pageParam?.lastParentCommentId ?? 0,
                lastCommentId: pageParam?.lastCommentId ?? 0,
            });
            return response;
        },
        getNextPageParam: (lastPage) => {
            if (
                !lastPage.data ||
                lastPage.data.length === 0 ||
                lastPage.data.length < 3
            ) {
                return undefined;
            }

            const lastComment = lastPage.data[lastPage.data.length - 1];
            return {
                lastParentCommentId: lastComment.parentCommentId,
                lastCommentId: lastComment.commentId,
            };
        },
        initialPageParam: { lastCommentId: 0, lastParentCommentId: 0 },
        retry: 1,
        staleTime: 1000 * 60 * 5,
    });

    const mutation = useMutation({
        mutationFn: async (body: {
            parentCommentId: number | null;
            secret: boolean;
            content: string;
            mode: 'edit' | 'new';
            commentId?: number;
        }) => {
            const { parentCommentId, secret, content, mode, commentId } = body;

            if (mode === 'edit' && commentId) {
                return await commentApi.patchCommentByArticleId(articleId, {
                    commentId: commentId,
                    secret,
                    content,
                });
            } else {
                return await commentApi.postCommentByArticleId(articleId, {
                    parentCommentId,
                    secret,
                    content,
                });
            }
        },
        onSuccess: () => {
            onCommentSuccess();
            refetch();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (commentId: number) => {
            return await commentApi.deleteCommentById(articleId, commentId);
        },
        onSuccess: () => {
            onCommentSuccess();
            refetch();
        },
    });

    return {
        commentsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        refetch,
        mutation,
        deleteMutation,
    };
};

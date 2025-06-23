import { customFetcher } from '@/utils/apis/customFetcher';

interface PostCommentRequest {
    parentCommentId: number | null;
    secret: boolean;
    content: string;
}

interface PostCommentResponse {
    statusCode: number;
    message: string;
    data: string;
}

interface GetCommentsParams {
    articleId: number;
    pageSize: number;
    lastParentCommentId?: number;
    lastCommentId?: number;
}
interface CommentData {
    commentId: number;
    content: string;
    parentCommentId: number;
    writerId: string;
    deleted: boolean;
    createdAt: number;
    secret: boolean;
    nickName: string;
    writerImageUrl: string;
}

interface GetCommentsResponse {
    statusCode: number;
    message: string;
    data: CommentData[];
}

export const commentApi = {
    postCommentByArticleId: async (
        articleId: number,
        body: PostCommentRequest
    ): Promise<PostCommentResponse> => {
        return customFetcher<PostCommentResponse, PostCommentRequest>(
            `/api/board/${articleId}/comment`,
            {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },

    patchCommentByArticleId: async (
        articleId: number,
        body: { commentId: number; secret: boolean; content: string }
    ): Promise<PostCommentResponse> => {
        return customFetcher<PostCommentResponse, typeof body>(
            `/api/board/${articleId}/comment`,
            {
                method: 'PATCH',
                auth: true,
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },

    getCommentsByArticleId: async ({
        articleId,
        pageSize,
        lastParentCommentId,
        lastCommentId,
    }: GetCommentsParams): Promise<GetCommentsResponse> => {
        let url = `/api/board/${articleId}/comment?pageSize=${pageSize}`;

        if (lastParentCommentId && lastCommentId) {
            url += `&lastParentCommentId=${lastParentCommentId}&lastCommentId=${lastCommentId}`;
        }

        return customFetcher<GetCommentsResponse, void>(url, {
            method: 'GET',
            auth: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
    deleteCommentById: async (
        articleId: number,
        commentId: number
    ): Promise<PostCommentResponse> => {
        return customFetcher<PostCommentResponse, void>(
            `/api/board/${articleId}/comment/${commentId}`,
            {
                method: 'DELETE',
                auth: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    },
};

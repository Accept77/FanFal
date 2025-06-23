import React from 'react';
import { Profile } from '../ui';
import { Lock, CommentArrow } from '@/assets';
import { Dropdown } from '../ui';
import { useGetUser } from '@/hooks/queries/useAuth';

type CommentType = {
    commentId: number;
    content: string;
    parentCommentId: number;
    writerId: string;
    deleted: boolean;
    createdAt: number;
    secret: boolean;
    nickName: string;
    writerImageUrl: string;
    children?: CommentType[];
};

type CommentProps = {
    comment: CommentType;
    createUserId: string;
    level?: number;
    onSelectMenu?: (commentId: number, action: string) => void;
};

type CommentListProps = {
    comments: CommentType[];
    createUserId: string;
    onSelectMenu?: (commentId: number, action: string) => void;
};

function buildCommentTree(comments: CommentType[]): CommentType[] {
    const commentMap = new Map<number, CommentType>();
    const rootComments: CommentType[] = [];

    comments.forEach((comment) => {
        commentMap.set(comment.commentId, { ...comment, children: [] });
    });

    comments.forEach((comment) => {
        if (comment.commentId === comment.parentCommentId) {
            rootComments.push(commentMap.get(comment.commentId)!);
        } else {
            const parent = commentMap.get(comment.parentCommentId);
            if (parent) {
                parent.children!.push(commentMap.get(comment.commentId)!);
            } else {
                rootComments.push(commentMap.get(comment.commentId)!);
            }
        }
    });

    return rootComments;
}

function CommentItem({
    comment,
    createUserId,
    level = 0,
    onSelectMenu,
}: CommentProps) {
    const { data: user } = useGetUser();
    const isAuthor = comment.nickName === createUserId;
    const isMyComment = comment.nickName === user?.nickName;

    const getDropdownOptions = () => {
        if (isMyComment) {
            return ['댓글달기', '수정하기', '삭제하기'];
        } else {
            return ['댓글달기'];
        }
    };

    const content = (
        <div className={`ml-${level * 4} mb-4`}>
            <div className="flex justify-between gap-4 p-3 rounded-lg shadow-sm relative">
                {level > 0 && (
                    <div className="hidden sm:block absolute -left-5">
                        <CommentArrow />
                    </div>
                )}

                <div className="flex flex-col flex-1 text-sm">
                    <div className="h-[24px] flex items-center gap-2">
                        <Profile size="small" image={comment.writerImageUrl} />
                        <span className="font-normal text-sm text-gray-300">
                            {comment.nickName}
                        </span>
                        {isAuthor && (
                            <span className="bg-gray-800 text-green-400 text-xs font-medium px-3 py-1 rounded-[1000px]">
                                작성자
                            </span>
                        )}
                    </div>

                    <div className="text-gray-100 mt-1 mb-2 whitespace-pre-wrap break-words">
                        {comment.deleted ? (
                            <span className="text-gray-100">
                                삭제된 댓글입니다
                            </span>
                        ) : comment.secret ? (
                            <p className="text-gray-100 flex gap-1 items-center">
                                <span>비밀글 입니다</span>
                                <Lock />
                            </p>
                        ) : (
                            comment.content
                        )}
                    </div>

                    <div className="text-xs font-light text-gray-600">
                        {new Date(comment.createdAt * 1000).toLocaleString()}
                    </div>
                </div>

                <div className="flex items-start">
                    {onSelectMenu && (
                        <Dropdown
                            options={getDropdownOptions()}
                            placeholder="메뉴"
                            showPlaceholderInMenu={false}
                            iconType="comment"
                            onSelect={(action) =>
                                onSelectMenu(comment.commentId, action)
                            }
                        />
                    )}
                </div>
            </div>

            {comment.children && comment.children.length > 0 && (
                <div className="mt-5 pl-2">
                    {comment.children.map((child) => (
                        <CommentItem
                            key={child.commentId}
                            comment={child}
                            createUserId={createUserId}
                            level={level + 1}
                            onSelectMenu={onSelectMenu}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return level === 0 ? (
        <div className="border-b border-gray-700">{content}</div>
    ) : (
        content
    );
}

// 댓글 리스트 컴포넌트
export default function CommentList({
    comments,
    createUserId,
    onSelectMenu,
}: CommentListProps) {
    const commentTree = buildCommentTree(comments);

    return (
        <div className="space-y-4">
            {commentTree.map((comment) => (
                <CommentItem
                    key={comment.commentId}
                    comment={comment}
                    createUserId={createUserId}
                    onSelectMenu={onSelectMenu}
                />
            ))}
        </div>
    );
}

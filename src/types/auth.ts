// API 응답 성공시 공통 구조
export type ApiResponse<T> = {
    statusCode?: number;
    message?: string;
    data?: T;
    headers?: Record<string, string>; // 헤더 추가
};
export type ApiFailure = {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
};
export interface LoginRequestDto {
    email: string;
    password: string;
}
export interface LoginResponseResponseDto {
    message: string;
    status: number;
}
export interface SignupMemberRequestDto {
    email: string;
    password: string;
    nickname: string;
}
export interface SignupMemberResponseDto {
    member_id: number;
    email: string;
    nickname: string;
    created_at: string;
}
export interface FindPasswordRequestDto {
    email: string;
}
// 회원가입 성공시 데이터
export interface SignupData {
    member_id: number;
    email: string;
    nickname: string;
    created_at: string;
}
// 유저 정보
export interface User {
    userId: string;
    nickName: string;
    profileImage?: string;
    wistLikeCount?: number;
    description?: string;
}

// 토큰 만료시간 전역 관리
export const TOKEN_EXPIRY = {
    ACCESS_TOKEN: 0.5 * 60 * 60, // 30분 (1800초)
    REFRESH_TOKEN: 2 * 60 * 60, // 2시간 (7200초)
} as const;

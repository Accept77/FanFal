import { FetcherOptions } from '@/types/fetcher';

//const baseURL = 'http://localhost:3000';
export const publicApis: { method: string; path: string }[] = [
    { method: 'POST', path: '/api/proxy/login' },
    { method: 'POST', path: '/api/proxy/signup' },

    { method: 'POST', path: '/api/auth/login' },
    { method: 'POST', path: '/api/auth/signup' },
    { method: 'POST', path: '/api/auth/findpassword' },

    // 게시글 관련 (GET만 public)
    { method: 'GET', path: '/api/board' },
    { method: 'GET', path: '/api/board/' }, // 특정 게시글 조회용
];
export const internalApis = [
    '/api/proxy/login',
    '/api/proxy/logout',
    '/api/proxy/refresh',
    '/api/auth/findpassword',
    '/api/mypage/question',
    '/api/wishlike',
];
export const externalApis = [
    '/api/auth/signup',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/refresh',
    '/api/auth/findpassword',
    '/api/board/',
    '/api/board',
    '/api/myPage',
    '/api/myPage/',
    '/api/myPage/user',
    '/api/myPage/answer',
    '/api/myPage/self',
    '/api/images/postImage',
    '/api/images/getImage',
    '/api/myPage',
    '/api/myPage/{articleId}',
    '/api/myPage/answer',
    '/api/myPage/self',
    '/api/images/postImage',
    '/api/images/getImage',
];
export const fetchInstance = async <TResponse, TRequest>(
    url: string,
    options: FetcherOptions<TRequest> = {}
): Promise<TResponse> => {
    let fullUrl: string;
    const FRONTEND_URL =
        process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
    const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

    if (isInternalApi(url)) {
        // 내부 API: Next.js API Routes
        fullUrl = `${FRONTEND_URL}${url}`;
    } else if (isExternalApi(url)) {
        // 외부 API: 실제 백엔드
        fullUrl = `${BACKEND_URL}${url}`;
    } else {
        // 절대 URL이면 그대로 사용, 그렇지 않으면 백엔드 URL로 라우팅
        fullUrl = url.startsWith('http') ? url : `${BACKEND_URL}${url}`;
    }
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers,
            credentials: 'include',
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //✅ returnFullResponse가 true면 ok 체크 없이 Response 반환
        if (options.returnFullResponse) {
            return response as TResponse;
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};
// 메서드와 경로를 모두 고려한 isPublicApi 함수
export const isPublicApi = (url: string, method: string = 'GET') => {
    const urlPath = url.split('?')[0];
    const upperMethod = method.toUpperCase();

    const result = publicApis.some((api) => {
        // 메서드가 일치하지 않으면 false
        if (api.method.toUpperCase() !== upperMethod) return false;

        // 경로 패턴 매칭
        if (api.path.endsWith('/')) {
            return urlPath.startsWith(api.path);
        }
        return urlPath === api.path || urlPath.startsWith(api.path + '/');
    });

    return result;
};

// ✅ 수정: 쿼리 파라미터 제거 추가
function isInternalApi(url: string): boolean {
    const urlPath = url.split('?')[0]; // 쿼리 파라미터 제거
    return internalApis.some((pattern) => {
        if (pattern.endsWith('/')) {
            return urlPath.startsWith(pattern);
        }
        return urlPath === pattern;
    });
}

// ✅ 수정: 쿼리 파라미터 제거 추가
function isExternalApi(url: string): boolean {
    const urlPath = url.split('?')[0]; // 쿼리 파라미터 제거
    return externalApis.some((pattern) => {
        if (pattern.endsWith('/')) {
            return urlPath.startsWith(pattern);
        }
        return urlPath === pattern || urlPath.startsWith(pattern + '/');
    });
}

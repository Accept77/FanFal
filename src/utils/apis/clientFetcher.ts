import { useAuthStore } from '@/store/authStore';
import { fetchInstance, isPublicApi } from './fetchInstance';
import { FetcherOptions } from '@/types/fetcher';

// 토큰 갱신 중복 방지
let refreshPromise: Promise<string> | null = null;

export const clientFetcher = async <TResponse, TRequest>(
    url: string,
    options: FetcherOptions<TRequest> = {}
): Promise<TResponse> => {
    const authStore = useAuthStore.getState();
    const isPublic = isPublicApi(url, options.method);
    const headers = new Headers(options.headers);
    console.log('isPublic', isPublic);
    if (!isPublic) {
        const token = authStore.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    // 🔍 디버깅 코드 1: 최종 헤더 확인
    console.log('[DEBUG] 최종 요청 헤더:', {
        Authorization: headers.get('Authorization'),
        'Content-Type': headers.get('Content-Type') || 'application/json',
        isPublic: isPublic,
        allHeaders: Object.fromEntries(headers.entries()),
    });

    try {
        // 🔍 디버깅 코드 2: 요청 직전 상태
        console.log('[DEBUG] fetchInstance 호출 직전:', {
            url,
            method: options.method || 'GET',
            hasBody: !!options.body,
        });

        const response = await fetchInstance<TResponse, TRequest>(url, {
            ...options,
            headers,
        });

        // 🔍 디버깅 코드 3: 성공 응답
        console.log('[DEBUG] 요청 성공:', url);
        return response;
    } catch (error: unknown) {
        // 🔍 디버깅 코드 4: 에러 상세 정보

        if (
            error instanceof Error &&
            error.message.includes('401') &&
            !isPublic
        ) {
            console.log('[DEBUG] 401 에러 - 토큰 갱신 시도');

            try {
                // 이미 갱신 중이면 기존 Promise 기다리기
                if (!refreshPromise) {
                    console.log('[DEBUG] 새로운 토큰 갱신 요청');
                    refreshPromise = (async () => {
                        const refreshResponse = await fetchInstance<
                            Response,
                            unknown
                        >('/api/proxy/refresh', {
                            method: 'POST',
                            returnFullResponse: true,
                        });

                        // refresh 토큰도 만료된 경우
                        if (
                            refreshResponse.status === 401 ||
                            refreshResponse.status === 403
                        ) {
                            authStore.removeAccessToken();
                            authStore.setHasRefreshToken(false);
                            throw new Error('Refresh token expired');
                        }

                        const newAccessToken = refreshResponse.headers
                            .get('Authorization')
                            ?.replace('Bearer ', '');
                        if (!newAccessToken) {
                            throw new Error('No access token in response');
                        }
                        console.log(
                            '[DEBUG] 새 토큰 획득:',
                            newAccessToken.substring(0, 20) + '...'
                        );
                        return newAccessToken;
                    })();
                } else {
                    console.log('[DEBUG] 기존 토큰 갱신 요청 대기');
                }

                const newAccessToken = await refreshPromise;
                refreshPromise = null; // 완료 후 초기화
                authStore.setAccessToken(newAccessToken);

                // 새로운 토큰으로 헤더 업데이트
                headers.set('Authorization', `Bearer ${newAccessToken}`);

                // 🔍 디버깅 코드 5: 재시도 전 헤더 확인
                console.log('[DEBUG] 재시도 요청 헤더:', {
                    Authorization: headers.get('Authorization'),
                    newToken: newAccessToken.substring(0, 20) + '...',
                });

                const retryResponse = await fetchInstance<TResponse, TRequest>(
                    url,
                    {
                        ...options,
                        headers,
                    }
                );

                console.log('[DEBUG] 재시도 성공:', url);
                return retryResponse;
            } catch (refreshError) {
                console.error('[DEBUG] 토큰 갱신 실패:', refreshError);
                refreshPromise = null; // 실패 시에도 초기화
                authStore.removeAccessToken();
                authStore.setHasRefreshToken(false);

                try {
                    await fetchInstance('/api/proxy/logout', {
                        method: 'POST',
                    });
                } catch {
                    console.error('❌ 쿠키 삭제 실패');
                }
                // 무한 리다이렉트 방지를 위해 현재 URL이 /login이 아닐 때만 리다이렉트
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};

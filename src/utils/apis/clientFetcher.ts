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
    if (!isPublic) {
        const token = authStore.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    try {
        const response = await fetchInstance<TResponse, TRequest>(url, {
            ...options,
            headers,
        });
        return response;
    } catch (error: unknown) {
        if (
            error instanceof Error &&
            error.message.includes('401') &&
            !isPublic
        ) {
            try {
                if (!refreshPromise) {
                    refreshPromise = (async () => {
                        const refreshResponse = await fetchInstance<
                            Response,
                            unknown
                        >('/api/proxy/refresh', {
                            method: 'POST',
                            returnFullResponse: true,
                        });

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
                        return newAccessToken;
                    })();
                } else {
                }

                const newAccessToken = await refreshPromise;
                refreshPromise = null;
                authStore.setAccessToken(newAccessToken);

                headers.set('Authorization', `Bearer ${newAccessToken}`);

                const retryResponse = await fetchInstance<TResponse, TRequest>(
                    url,
                    {
                        ...options,
                        headers,
                    }
                );

                return retryResponse;
            } catch (refreshError) {
                console.log('refreshError', refreshError);
                refreshPromise = null;
                authStore.removeAccessToken();
                authStore.setHasRefreshToken(false);

                try {
                    await fetchInstance('/api/proxy/logout', {
                        method: 'POST',
                    });
                } catch {}
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};

'use server';
import { cookies } from 'next/headers';
import { fetchInstance, publicApis } from './fetchInstance';
import { FetcherOptions } from '@/types/fetcher';

export const serverFetcher = async <TResponse, TRequest>(
    url: string,
    options: FetcherOptions<TRequest> = {}
): Promise<TResponse> => {
    const cookieStore = await cookies();
    const isPublic = publicApis.includes(url);
    const headers = new Headers(options.headers);

    if (!isPublic) {
        const token = cookieStore.get('accessToken')?.value;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    try {
        const response = await fetchInstance<TResponse, TRequest>(url, {
            ...options,
            headers,
            cache: 'no-store',
        });

        return response;
    } catch (error: unknown) {
        if (
            error instanceof Error &&
            error.message.includes('401') &&
            !isPublic
        ) {
            try {
                const refreshResponse = await fetchInstance<Response, unknown>(
                    'api/auth/refresh',
                    {
                        method: 'POST',
                        credentials: 'include',
                    }
                );

                const newAccessToken = refreshResponse.headers
                    .get('Authorization')
                    ?.replace('Bearer ', '');
                if (!newAccessToken) {
                    throw new Error('No access token in response');
                }

                cookieStore.set('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/',
                });

                headers.set('Authorization', `Bearer ${newAccessToken}`);

                const retryResponse = await fetchInstance<TResponse, TRequest>(
                    url,
                    {
                        ...options,
                        headers,
                        cache: 'no-store',
                    }
                );

                return retryResponse;
            } catch {
                cookieStore.delete('accessToken');
                cookieStore.delete('refreshToken');
                throw new Error('Authentication failed');
            }
        }
        throw error;
    }
};

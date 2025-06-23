// /api/auth/store-token/route.ts
'use server';
import { TOKEN_EXPIRY } from '@/config/constants';
import { fetchInstance } from '@/utils/apis/fetchInstance';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { LoginRequestDto } from '@/types/auth';

export async function POST(request: Request) {
    const loginData = (await request.json()) as LoginRequestDto;
    const cookieStore = await cookies();
    if (loginData.email && loginData.password) {
        try {
            const response = (await fetchInstance('/api/auth/login', {
                method: 'POST',
                body: loginData,
                returnFullResponse: true,
            })) as Response;
            // 로그인 성공시
            const accessToken = response.headers
                .get('Authorization')
                ?.replace('Bearer ', '');
            const setCookieHeader = response.headers.get('Set-Cookie');

            if (accessToken && setCookieHeader) {
                // accessToken만 프록시에서 설정 (refreshToken은 백엔드가 이미 설정함)
                cookieStore.set('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: TOKEN_EXPIRY.ACCESS_TOKEN,
                    path: '/',
                });

                // 백엔드의 Set-Cookie 헤더를 그대로 클라이언트에 전달
                const jsonResponse = NextResponse.json({
                    status: 200,
                    message: '로그인 성공',
                });

                // Set-Cookie 헤더를 응답에 직접 설정
                jsonResponse.headers.set('Set-Cookie', setCookieHeader);
                return jsonResponse;
            }
        } catch {
            // 로그인 실패시
            return NextResponse.json(
                { message: '로그인 실패' },
                { status: 401 }
            );
        }
    }
    // 🎯 로그인 요청
    // if (loginData.email && loginData.password) {
    //     try {
    //         const response = await fetchInstance<Response, LoginRequestDto>(
    //             '/api/auth/loginMocking',

    //             {
    //                 method: 'POST',
    //                 body: loginData,
    //                 returnFullResponse: true,
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error('로그인 실패');
    //         }

    //         // 📋 헤더에서 토큰 추출
    //         const accessToken = response.headers
    //             .get('Authorization')
    //             ?.replace('Bearer ', '');
    //         const setCookieHeader = response.headers.get('Set-Cookie');
    //         const refreshTokenMatch =
    //             setCookieHeader?.match(/refreshToken=([^;]+)/);
    //         const refreshToken = refreshTokenMatch?.[1];

    //         if (!accessToken || !refreshToken) {
    //             throw new Error('토큰이 존재하지 않습니다.');
    //         }

    //         // 🍪 쿠키에 저장 (보안용)
    //         cookieStore.set('accessToken', accessToken, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === 'production',
    //             sameSite: 'strict',
    //             path: '/',
    //             maxAge: TOKEN_EXPIRY.ACCESS_TOKEN,
    //         });

    //         cookieStore.set('refreshToken', refreshToken, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === 'production',
    //             sameSite: 'strict',
    //             path: '/',
    //             maxAge: TOKEN_EXPIRY.REFRESH_TOKEN,
    //         });

    //         const data = await response.json();
    //         return NextResponse.json(data.data);
    //     } catch (error) {
    //         console.error('❌ 로그인 실패:', error);
    //         return NextResponse.json(
    //             { success: false, message: '로그인 실패' },
    //             { status: 401 }
    //         );
    //     }
    // }
    // return NextResponse.json(
    //     { success: false, message: '잘못된 요청' },
    //     { status: 400 }
    // );
}

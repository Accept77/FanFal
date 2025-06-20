import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { TOKEN_EXPIRY } from '@/config/constants';
import { fetchInstance } from '@/utils/apis/fetchInstance';

export async function POST() {
    console.log('refresh 요청');
    const cookieStore = await cookies();
    try {
        const refreshToken = cookieStore.get('refreshToken')?.value;
        const response = (await fetchInstance('/api/auth/refresh', {
            method: 'POST',
            returnFullResponse: true,
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        })) as Response;
        const setCookieHeader = response.headers.get('Set-Cookie');
        const newAuthorizationHeader = response.headers.get('Authorization');
        const newAccessToken = response.headers
            .get('Authorization')
            ?.replace('Bearer ', '');
        if (!newAccessToken) {
            console.log('❌ 백엔드에서 토큰을 받지 못함');
            return NextResponse.json(
                {
                    status: 401,
                    message: '새로운 액세스 토큰을 받지 못했습니다',
                },
                {
                    status: 401,
                }
            );
        }
        if (newAccessToken && setCookieHeader && newAuthorizationHeader) {
            cookieStore.set('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: TOKEN_EXPIRY.ACCESS_TOKEN,
                path: '/',
            });
            const jsonResponse = NextResponse.json({
                status: 200,
                message: '리프레쉬 토큰 검증 성공',
            });
            jsonResponse.headers.set('Set-Cookie', setCookieHeader);
            jsonResponse.headers.set('Authorization', newAuthorizationHeader);
            return jsonResponse;
        }
    } catch (error) {
        console.log('❌ 프록시에서 백엔드 호출 실패:', error);
        return NextResponse.json({
            status: 401,
            message: '리프레쉬 토큰 검증 실패',
        });
    }

    // JWT 검증
    // const refreshToken = cookieStore.get('refreshToken')?.value;

    // if (!refreshToken) {
    //     console.error('❌ 리프레쉬 토큰이 없습니다');
    //     return NextResponse.json(
    //         {
    //             statusCode: 401,
    //             message: '리프레쉬 토큰이 없습니다.',
    //         },
    //         { status: 401 }
    //     );
    // }
    // try {
    //     const payload = JSON.parse(atob(refreshToken.split('.')[1]));
    //     const currentTime = Math.floor(Date.now() / 1000);

    //     console.log(
    //         '🕐 리프레쉬 토큰 만료시간:',
    //         new Date(payload.exp * 1000).toLocaleString()
    //     );
    //     console.log('🕐 현재 시간:', new Date().toLocaleString());

    //     if (payload.exp < currentTime) {
    //         console.error('❌ 리프레쉬 토큰이 만료되었습니다');
    //         throw new Error('Refresh token expired');
    //     }

    //     console.log('✅ 리프레쉬 토큰 검증 통과');

    //     // 새 액세스 토큰 생성
    //     const newAccessPayload = {
    //         userId: payload.userId,
    //         nickName: payload.nickName,
    //         role: 'user',
    //         iat: Math.floor(Date.now() / 1000),
    //         exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY.ACCESS_TOKEN,
    //     };

    //     const header = { alg: 'HS256', typ: 'JWT' };
    //     const newAccessToken =
    //         btoa(JSON.stringify(header)) +
    //         '.' +
    //         btoa(JSON.stringify(newAccessPayload)) +
    //         '.' +
    //         'mock-signature';

    //     console.log('✅ 새 JWT 액세스 토큰 생성:', newAccessToken);

    //     // 🍪 새 액세스 토큰을 쿠키에도 저장
    //     cookieStore.set('accessToken', newAccessToken, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === 'production',
    //         sameSite: 'strict',
    //         path: '/',
    //         maxAge: TOKEN_EXPIRY.ACCESS_TOKEN,
    //     });

    //     return NextResponse.json(
    //         {
    //             statusCode: 200,
    //             message: '리프레쉬 토큰으로 액세스 토큰 재발급 성공',
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${newAccessToken}`,
    //             },
    //         }
    //     );
    // } catch (error) {
    //     console.error('❌ 리프레쉬 토큰 검증 실패:', error);

    //     return NextResponse.json(
    //         {
    //             statusCode: 401,
    //             message: '유효하지 않거나 만료된 리프레쉬 토큰입니다.',
    //         },
    //         { status: 401 }
    //     );
    // }
}

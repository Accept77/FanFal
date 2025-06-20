import { http, HttpResponse } from 'msw';
import {
    FindPasswordRequestDto,
    LoginRequestDto,
    SignupMemberRequestDto,
} from '@/types/auth';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import { TOKEN_EXPIRY } from '@/config/constants';
const mockUser = [
    {
        email: 'test@test.com',
        password: 'test1234!',
        nickname: 'user1',
        wistLikeCount: 5,
        description: '안녕하세요 사용자입니다.',
        profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
        email: 'test2@test.com',
        password: 'test1234!',
        nickname: 'user2',
        wistLikeCount: 10,
        description: '안녕하세요 사용자2입니다.',
        profileImage: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
];
const BASE_URL = 'http://localhost:3000'; // 추후 백엔드 서버로 변경

// 🎯 완벽한 유니코드 안전 Base64 인코딩
function unicodeSafeBase64Encode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
}

// 🎯 완벽한 유니코드 안전 Base64 디코딩
function unicodeSafeBase64Decode(str: string): string {
    return decodeURIComponent(escape(atob(str)));
}

export const loginHandlers = [
    http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
        const loginData = (await request.json()) as LoginRequestDto;

        if (
            mockUser.some(
                (user) =>
                    user.email === loginData.email &&
                    user.password === loginData.password
            )
        ) {
            const userInfo = mockUser.find(
                (user) => user.email === loginData.email
            );
            // 🎯 실제 JWT처럼 만료시간을 가진 토큰 생성
            const accessPayload = {
                email: userInfo?.email,
                nickname: userInfo?.nickname,
                role: 'user',
                iat: Math.floor(Date.now() / 1000), // 발급 시간
                exp: Math.floor(Date.now() / 1000) + 30, // 🎯 30초 후 만료
                userInfo: {
                    email: userInfo?.email,
                    nickname: userInfo?.nickname,
                    profileImage: userInfo?.profileImage,
                    wistLikeCount: userInfo?.wistLikeCount,
                    description: userInfo?.description,
                },
            };
            const refreshPayload = {
                email: userInfo?.email,
                nickname: userInfo?.nickname,
                type: 'refresh',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 🎯 7일 후 만료
                userInfo: {
                    email: userInfo?.email,
                    nickname: userInfo?.nickname,
                    profileImage: userInfo?.profileImage,
                    wistLikeCount: userInfo?.wistLikeCount,
                    description: userInfo?.description,
                },
            };

            // JWT 형태로 만들기 (header.payload.signature)
            const header = { alg: 'HS256', typ: 'JWT' };
            // 🎯 안전한 base64 인코딩 사용
            const mockAccessToken =
                unicodeSafeBase64Encode(JSON.stringify(header)) +
                '.' +
                unicodeSafeBase64Encode(JSON.stringify(accessPayload)) +
                '.' +
                'mock-signature';

            const mockRefreshToken =
                unicodeSafeBase64Encode(JSON.stringify(header)) +
                '.' +
                unicodeSafeBase64Encode(JSON.stringify(refreshPayload)) +
                '.' +
                'mock-signature';

            setCookie('accessToken', mockAccessToken, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: TOKEN_EXPIRY.ACCESS_TOKEN,
                path: '/',
            });
            setCookie('refreshToken', mockRefreshToken, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: TOKEN_EXPIRY.REFRESH_TOKEN,
                path: '/',
            });

            return HttpResponse.json(
                {
                    statusCode: 200,
                    message: '로그인 성공',
                },
                {
                    status: 200,
                }
            );
        }

        return HttpResponse.json(
            {
                statusCode: 401,
                message: '이메일 또는 비밀번호가 잘못되었습니다.',
            },
            {
                status: 401,
            }
        );
    }),
];
export const logoutHandlers = [
    http.post(`${BASE_URL}/api/auth/logout`, async () => {
        console.log('logoutHandlers 호출');
        removeCookie('accessToken', '/');
        removeCookie('refreshToken', '/');
        return HttpResponse.json({
            statusCode: 200,
            message: '로그아웃 성공',
        });
    }),
];
export const signupHandlers = [
    http.post(`${BASE_URL}/api/auth/signup`, async ({ request }) => {
        const signupData = (await request.json()) as SignupMemberRequestDto;
        if (mockUser.some((user) => user.email === signupData.email)) {
            return HttpResponse.json(
                {
                    statusCode: 104,
                    message: '이미 사용중인 이메일입니다.',
                },
                {
                    status: 200,
                }
            );
        }
        mockUser.push({
            email: signupData.email,
            nickname: signupData.nickname,
            profileImage: '',
            wistLikeCount: 0,
            password: signupData.password,
            description: '',
        });
        return HttpResponse.json(
            {
                statusCode: 200,
                message: '회원가입 성공',
                data: '',
            },
            {
                status: 200,
            }
        );
    }),
];
export const userHandlers = [
    http.get(`${BASE_URL}/api/auth/user`, async ({ request }) => {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        // 🎯 JWT 만료시간 검증
        try {
            const payload = JSON.parse(
                unicodeSafeBase64Decode(token?.split('.')[1] || '')
            );
            const currentTime = Math.floor(Date.now() / 1000);
            // 토큰 만료 확인
            if (payload.exp < currentTime) {
                console.log('🚨 토큰 만료됨!');
                throw new Error('Token expired');
            }

            // ✅ 성공 응답
            return HttpResponse.json({
                statusCode: 200,
                message: '유저 정보 조회 성공',
                data: {
                    email: payload.userInfo.email,
                    nickname: payload.userInfo.nickname,
                    profileImage: payload.userInfo.profileImage,
                    wistLikeCount: payload.userInfo.wistLikeCount,
                    description: payload.userInfo.description,
                },
            });
        } catch (error) {
            console.log('🚨 토큰 검증 실패:', error);
            return HttpResponse.json(
                {
                    statusCode: 401,
                    message: '유효하지 않거나 만료된 액세스 토큰입니다',
                },
                { status: 401 }
            );
        }
    }),
];
export const refreshHandlers = [
    http.post(`${BASE_URL}/api/auth/refresh`, async () => {
        console.log('refreshHandlers 호출');
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
            console.error('❌ 리프레쉬 토큰이 없습니다');
            return HttpResponse.json(
                {
                    statusCode: 401,
                    message: '리프레쉬 토큰이 없습니다.',
                },
                {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
        // JWT 검증
        try {
            const payload = JSON.parse(
                unicodeSafeBase64Decode(refreshToken.split('.')[1])
            );
            const currentTime = Math.floor(Date.now() / 1000);

            if (payload.exp < currentTime) {
                console.error('❌ 리프레쉬 토큰이 만료되었습니다');
                throw new Error('Refresh token expired');
            }

            // 새 액세스 토큰 생성
            const newAccessPayload = {
                email: payload.userInfo.email,
                nickname: payload.userInfo.nickname,
                role: 'user',
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 60, // 1분 후 만료
                userInfo: {
                    email: payload.userInfo.email,
                    nickname: payload.userInfo.nickname,
                    profileImage: payload.userInfo.profileImage,
                    wistLikeCount: payload.userInfo.wistLikeCount,
                    description: payload.userInfo.description,
                },
            };

            const header = { alg: 'HS256', typ: 'JWT' };
            const newAccessToken =
                unicodeSafeBase64Encode(JSON.stringify(header)) +
                '.' +
                unicodeSafeBase64Encode(JSON.stringify(newAccessPayload)) +
                '.' +
                'mock-signature';

            setCookie('accessToken', newAccessToken, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: TOKEN_EXPIRY.ACCESS_TOKEN,
                path: '/',
            });
            return HttpResponse.json(
                {
                    statusCode: 200,
                    message: '리프레쉬 토큰으로 액세스 토큰 재발급 성공',
                },
                {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            console.error('❌ 리프레쉬 토큰 검증 실패:', error);

            // 🎯 명확한 401 응답 반환
            return HttpResponse.json(
                {
                    statusCode: 401,
                    message: '유효하지 않거나 만료된 리프레쉬 토큰입니다.',
                },
                {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
    }),
];
export const findPasswordHandlers = [
    http.post(`${BASE_URL}/api/auth/findpassword`, async ({ request }) => {
        const findPasswordData =
            (await request.json()) as FindPasswordRequestDto;
        if (mockUser.some((user) => user.email === findPasswordData.email)) {
            return HttpResponse.json(
                {
                    statusCode: 200,
                    message: '임시 비밀번호 발급 성공',
                },
                {
                    status: 200,
                }
            );
        }
        return HttpResponse.json(
            {
                statusCode: 401,
                message: '이메일이 존재하지 않습니다.',
            },
            {
                status: 401,
            }
        );
    }),
];

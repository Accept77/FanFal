import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/ui/Nav';
import QueryProvider from '@/components/providers/QueryProvider';
import { ClientAuthProvider } from '@/components/providers/ClientAuthProvider';
import { cookies } from 'next/headers';
import { MSWComponent } from '@/components/providers/MSWComponent';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
    title: 'FanPal',
    description: '',
    icons: {
        icon: '/icons/navMobile.svg',
    },
};
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { initMocks } = await import('@/mocks');
    await initMocks(); // 서버 사이드 MSW 초기화

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const hasRefreshToken = refreshToken ? true : false;
    return (
        <html lang="ko">
            <body className="bg-[#14151A]">
                <MSWComponent>
                    <ClientAuthProvider
                        initialAccessToken={accessToken}
                        hasRefreshToken={hasRefreshToken}
                    >
                        <QueryProvider>
                            <Nav />
                            {children}
                            <ToastContainer
                                position="top-right"
                                autoClose={60 * 30}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                transition={Bounce}
                                theme="dark"
                                toastClassName="!bg-gray-800"
                            />
                        </QueryProvider>
                    </ClientAuthProvider>
                </MSWComponent>
                <div id="modal-root" />
            </body>
        </html>
    );
}

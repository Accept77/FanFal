export async function initMocks() {
    // 개발 환경이 아니라면 실행 X
    //console.log('NODE_ENV:', process.env.NODE_ENV);

    if (process.env.NODE_ENV !== 'development') return;

    if (typeof window === 'undefined') {
        const { server } = await import('./server');
        server.listen();
    } else {
        const { worker } = await import('./browser');
        await worker.start({
            onUnhandledRequest: 'bypass',
            quiet: false,
            serviceWorker: {
                options: {
                    scope: '/',
                },
            },
        });
    }
}

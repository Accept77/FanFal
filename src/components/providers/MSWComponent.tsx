'use client';

import { useEffect, useState } from 'react';
import { initMocks } from '@/mocks';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
    const [mswReady, setMswReady] = useState(false);
    useEffect(() => {
        // console.log('MSWComponent 마운트, mswReady:', mswReady);

        const init = async () => {
            await initMocks();
            setMswReady(true);
        };

        if (!mswReady) {
            init();
        }
    }, [mswReady]);

    if (!mswReady) {
        return null;
    }
    return <>{children}</>;
};

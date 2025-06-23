import { Card } from '@/types/card';

export type getListApiParams = {
    bigCategory: string;
    smallCategory?: string;
    location?: string;
    date?: number;
    sort: 'recent' | 'deadLine' | 'person';
    sortAsc: boolean;
    lastArticleId: number;
    limit: number;
    page: number;
};

export type getListApiResponse = {
    statusCode: number;
    message: string;
    data: Card[];
};

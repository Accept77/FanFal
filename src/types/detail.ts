export interface DetailApiResponse {
    statusCode: number;
    message: string;
    data: {
        title: string;
        location: string;
        latitude: number;
        longitude: number;
        description: string;
        date: number;
        deadLine: number;
        createdAt: number;
        min_person: number;
        currentPerson: number;
        maxPerson: number;
        participants: {
            profile_image_url: string;
            nickname: string;
        }[];
        wishList: boolean;
        articleImageUrl: string;
        openStatus: 'CONFIRMED_STATUS' | 'PENDING_STATUS' | 'CANCELED_STATUS';
        useStatus: 'UPCOMING_STATUS' | 'COMPLETED_STATUS';
        nickName: 'string';
        writerImageUrl: 'string';
    };
}

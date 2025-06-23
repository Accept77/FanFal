export type Category = {
    id: string;
    title: string;
    smallCategory: SmallCategory[];
};
interface SmallCategory {
    id: string;
    name: string;
}

export const CATEGORY_DATA: Category[] = [
    {
        id: 'GO_TYPE',
        title: '같이 가요',
        smallCategory: [
            { id: 'BUSRENTAL_TYPE', name: '버스 대절' },
            { id: 'COMPANION_TYPE', name: '동행' },
            { id: 'AFTERPARTY_TYPE', name: '뒤풀이' },
        ],
    },
    {
        id: 'DOING_TYPE',
        title: '같이 해요',
        smallCategory: [
            { id: 'POPUP_TYPE', name: '팝업' },
            { id: 'BIRTHDAYCAFE_TYPE', name: '생일카페' },
            { id: 'ONLINECONCERT_TYPE', name: '온라인콘서트' },
            { id: 'FANDOMTOUR_TYPE', name: '덕질투어' },
        ],
    },
];

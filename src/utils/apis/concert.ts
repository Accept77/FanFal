import { XMLParser } from 'fast-xml-parser';

const fetcherConcert = async (
    currentPage: number,
    startDate: string,
    endDate: string,
    rows: number,
    location?: string
) => {
    const locationCode = {
        서울: 11,
        부산: 26,
        대구: 27,
        인천: 28,
        광주: 29,
        대전: 30,
        울산: 31,
        세종: 36,
        경기: 41,
        강원: 51,
        충북: 43,
        충남: 44,
        전북: 45,
        전남: 46,
        경북: 47,
        경남: 48,
        제주: 50,
    };
    const signgucode =
        location && location !== '지역'
            ? `&signgucode=${locationCode[location as keyof typeof locationCode]}`
            : '';
    const response = await fetch(
        `/api/concert?stdate=${startDate}&eddate=${endDate}&cpage=${currentPage}&rows=${rows}${signgucode}`
    );
    const data = await response.text();
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '_text',
    });
    const jsData = parser.parse(data);
    return jsData.dbs.db;
};

export const getConcertList = async (
    currentPage: number,
    startDate: string,
    endDate: string,
    location?: string
) => {
    const data = await fetcherConcert(
        currentPage,
        startDate,
        endDate,
        8,
        location
    );
    return Array.isArray(data) ? data : [data];
};

export const getConcertDetail = async (id: string) => {
    const response = await fetch(`/api/concert?id=${id}`);
    const data = await response.text();
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '_text',
    });
    const jsData = parser.parse(data);
    return jsData?.dbs?.db || null;
};

export const findTotalCount = async (
    startDate: string,
    endDate: string,
    location?: string
) => {
    const initialPages = [1, 5, 10];
    let start = initialPages[0];
    let end = initialPages[initialPages.length - 1];
    let totalPages = 11;
    let lastValidData = 0;

    const initialResults = await Promise.all(
        initialPages.map((page) =>
            fetcherConcert(page, startDate, endDate, 100, location)
        )
    );

    if (!initialResults || !initialResults[0]) {
        console.log('No results found');
        return 0;
    }

    if (initialResults[0].length < 100) {
        console.log('initialResults[0] length < 100');
        return Math.ceil(initialResults[0].length / 8);
    }

    for (let i = 0; i < initialResults.length; i++) {
        if (!initialResults[i]) {
            start = initialPages[0] + 1;
            end = initialPages[i] - 1;
            break;
        }
    }

    if (start <= end && end !== 10) {
        const midPages = Array.from(
            { length: end - start + 1 },
            (_, idx) => start + idx
        );
        const midResults = await Promise.all(
            midPages.map((page) =>
                fetcherConcert(page, startDate, endDate, 100, location)
            )
        );
        for (let i = 0; i < midResults.length; i++) {
            if (midResults[i].length < 100) {
                totalPages = midPages[i];
                lastValidData = midResults[i].length;
                break;
            }
        }
    }

    const totalCount = Math.ceil(((totalPages - 1) * 100 + lastValidData) / 8);
    return totalCount;
};

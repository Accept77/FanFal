export default function dateConverter(
    timestamp: number,
    type: 'korea' | 'utc' | 'korea-short'
) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    if (type === 'korea') {
        return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
    }
    if (type === 'utc') {
        return `${year}.${month}.${day}. `;
    }
    if (type === 'korea-short') {
        return `${month}월 ${day}일 ${hour}:${minute}`;
    }
}

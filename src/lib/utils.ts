export const pxToVw = (px: number) => `${px / 1920 * 100}vw`

export const formatNumber = (num: string | number) => {
    let number = Number(num)
    if (number < 1000) {
        return num.toString();
    } else if (number < 1000000 && number % 1000 === 0) {
        return (number / 1000).toFixed(0) + 'k';
    } else if (number < 1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number < 1000000 && number % 1000000 === 0) {
        return (number / 1000000).toFixed(0) + 'kk';
    }else if (number >= 1000000 && number < 1000000) {
        return (number / 1000).toFixed(0) + 'kk';
    } else {
        return (number / 1000000).toFixed(1) + 'kk';
    }
}
export const formatNumberWithSpaces = (number: number) => {

    const numberAsString = number.toString();
    const parts = numberAsString.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return parts.join('.');
}





export type AdapterMessage = {
    type: string;
    message?: unknown;
};

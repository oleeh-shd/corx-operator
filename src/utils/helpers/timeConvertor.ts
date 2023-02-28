
export const timeConvert = (num: number) => {
    let minuets: number | string = Math.floor(num / 60);

    if (minuets.toString().length === 1) {
        minuets = '0' + minuets;
    }
    let seconds: number | string = num % 60;

    if (seconds.toString().length === 1) {
        seconds = '0' + seconds;
    }

    return `${minuets} : ${seconds}`;
};

export const timeConvert = (num: number) => {
  let minuets: number | string = Math.floor(Math.round(num) / 60);

  if (minuets.toString().length === 1) {
    minuets = '0' + minuets;
  }
  let seconds: number | string = Math.round(num) % 60;

  if (seconds.toString().length === 1) {
    seconds = '0' + seconds;
  }

  return `${minuets} : ${seconds}`;
};

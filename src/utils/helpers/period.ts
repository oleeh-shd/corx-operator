export const period = (val: number) => {
  if (val > 17 && val < 25) {
    return '18-24';
  }
  if (val > 24 && val < 36) {
    return '25-34';
  }
  if (val > 34 && val < 45) {
    return '35-44';
  }
  if (val > 44 && val < 55) {
    return '45-54';
  }
  if (val > 54 && val < 66) {
    return '55-64';
  }
  return '65 and older';
}

export function restrictNumber(num, upper, lower) {
  if (num <= lower) {
    num = lower;
  }
  if (num > upper) {
    num = upper;
  }
  return num;
}

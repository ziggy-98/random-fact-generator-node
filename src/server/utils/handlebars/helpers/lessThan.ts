export function lessThan(input: number, value: number, orEqualTo?: boolean) {
  if (orEqualTo) {
    return input <= value;
  }
  return input < value;
}

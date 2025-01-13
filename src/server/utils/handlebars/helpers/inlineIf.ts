export function inlineIf(input: string, evaluation: boolean, value: string, not?: boolean) {
  if ((evaluation && input && !not) || (evaluation && !input && not)) {
    return value;
  }
  if ((evaluation && !input) || (evaluation && input && not)) {
    return;
  }
  if (!evaluation && not) {
    return input !== value;
  }
  return input === value;
}

export function inlineIf(input: string | undefined, value: string, isInputTruthy?: boolean, not?: boolean) {
  if ((isInputTruthy && input && !not) || (isInputTruthy && !input && not)) {
    return value;
  }
  if ((isInputTruthy && !input) || (isInputTruthy && input && not)) {
    return;
  }
  if (!isInputTruthy && not) {
    return input !== value;
  }
  return input === value;
}

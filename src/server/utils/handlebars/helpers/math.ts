export function math(input: number, value: number, operation: string) {
  switch (operation) {
    case "add":
      return input + value;
    case "subtract":
      return input - value;
    case "multiply":
      return input * value;
    case "divide":
      return input / value;
    case "mod":
      return input % value;
    default:
      return Math[operation]?.(input, value) ?? undefined;
  }
}

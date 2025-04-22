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
      const functionSig = Math[operation];
      if (!functionSig || functionSig.length !== 2) {
        return undefined;
      }
      return Math[operation]?.(input, value);
  }
}

import { checkFormAttribute } from "../checkFormAttribute";
import { greaterThan } from "../greaterThan";
import { inlineIf } from "../inlineIf";
import { lessThan } from "../lessThan";
import { math } from "../math";
describe("checkFormAttribute", () => {
  it("should return the specified attribute when the input matches the value", () => {
    expect(checkFormAttribute("correct value", "correct value", "checked")).toBe("checked");
  });
  it("should return undefined when the input does not match the value", () => {
    expect(checkFormAttribute("incorrect value", "correct value", "checked")).toBe(undefined);
  });
});

describe("greaterThan", () => {
  it("should return true when the input is greater than the value", () => {
    expect(greaterThan(2, 1)).toBe(true);
  });
  it("should return false when the input is less than the value", () => {
    expect(greaterThan(1, 2)).toBe(false);
  });
  it("should return true if the input is equal to the value and equalTo is true", () => {
    expect(greaterThan(2, 2, true)).toBe(true);
  });
  it("should return false if the input is equal to the value and equalTo is false", () => {
    expect(greaterThan(2, 2)).toBe(false);
  });
});

describe("inlineIf", () => {
  it("Should return the value if the input is being tested for truthiness and the input is truthy", () => {
    expect(inlineIf("true", "this is true", true)).toBe("this is true");
  });
  it("Should return undefined if the input is being tested for truthiness and the input is falsy", () => {
    expect(inlineIf(undefined, "this is true", true)).toBe(undefined);
  });
  it("Should return undefined if the input is being tested for falsiness and the input is truthy", () => {
    expect(inlineIf("true", "this is true", true, true)).toBe(undefined);
  });
  it("Should return the value if the input is being tested for falsiness and the input is falsy", () => {
    expect(inlineIf(undefined, "this is true", true, true)).toBe("this is true");
  });
  it("Should return true if the input is being evaluated against the value and they are the same", () => {
    expect(inlineIf("this is equal", "this is equal", false)).toBe(true);
  });
  it("Should return false if the input is being evaluated against the value and they are different", () => {
    expect(inlineIf("this is equal", "this is not", false)).toBe(false);
  });
  it("Should return false if the input is being negatively evaluated against the value and they are the same", () => {
    expect(inlineIf("this is equal", "this is equal", false, true)).toBe(false);
  });
  it("Should return true if the input is being negatively evaluated against the value and they are different", () => {
    expect(inlineIf("this is equal", "this is not", false, true)).toBe(true);
  });
});

describe("lessThan", () => {
  it("Should return true if the input is less than the value", () => {
    expect(lessThan(1, 2)).toBe(true);
  });
  it("should return false if the input is greater than the value", () => {
    expect(lessThan(2, 1)).toBe(false);
  });
  it("Should return true if the input is equal to the value and equalTo is true", () => {
    expect(lessThan(2, 2, true)).toBe(true);
  });
  it("Should return false if the input is equal to the value and equalTo is false", () => {
    expect(lessThan(2, 2)).toBe(false);
  });
});

describe("math", () => {
  it("Should return the numbers added together if the operation is add", () => {
    expect(math(2, 2, "add")).toBe(4);
  });
  it("Should return the numbers subtracted if the operation is subtract", () => {
    expect(math(2, 1, "subtract")).toBe(1);
  });
  it("Should return the numbers multiplied if the operation is multiply", () => {
    expect(math(2, 2, "multiply")).toBe(4);
  });
  it("Should return the numbers divided if the operation is divide", () => {
    expect(math(2, 2, "divide")).toBe(1);
  });
  it("Should return the modular value of the input from the value if the operation is mod", () => {
    expect(math(3, 2, "mod")).toBe(1);
  });
  it("Should find and execute a math operation if the operation is a valid Math operation", () => {
    expect(math(3, 2, "max")).toBe(3);
  });
  it("Should return undefined if the operation is not valid", () => {
    expect(math(3, 2, "not a function")).toBe(undefined);
  });
  it("should return undefined if the given operation is valid, but only allows one argument", () => {
    expect(math(4, 2, "sqrt")).toBe(undefined);
  });
});

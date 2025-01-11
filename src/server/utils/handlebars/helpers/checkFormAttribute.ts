type AttrCheckType = "checked" | "selected" | "disabled";

export function checkFormAttribute(input: string, value: string, attr: AttrCheckType) {
  if (input === value) {
    return attr;
  }
  return;
}

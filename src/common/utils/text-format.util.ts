export function groupDigits(value: string): string {
  const first = value.length % 3 || 3,
    groups = [value.slice(0, first)];
  for (let i = first; i < value.length; i += 3)
    groups.push(value.slice(i, i + 3));
  return groups.join(".");
}
export function stripTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.codePointAt(end - 1) === 47) end--;
  return value.slice(0, end);
}

export function articleNumberKey(input: string): string | null {
  const key = input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/^(?:articulos|articulo|arts|art)\.?\s*/, "")
    .replace(/[\s.º°]/g, "");
  return /^\d{1,6}(?:bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies)?$/.test(
    key,
  )
    ? key
    : null;
}

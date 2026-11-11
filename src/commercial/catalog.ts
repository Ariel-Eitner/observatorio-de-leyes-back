import catalog from "./commercial-catalog.json";
export const COMMERCIAL_CATALOG = catalog;
export const COMMERCIAL_POLICY = catalog.policy;
export const commercialProduct = (id: string) =>
  catalog.products.find((p) => p.id === id);

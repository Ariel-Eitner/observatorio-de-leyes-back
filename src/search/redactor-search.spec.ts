import {
  RedactorSearchService,
  articleNumberKey,
  normSuggestion,
} from "./redactor-search.service";
import {
  groupDigits,
  stripTrailingSlashes,
} from "../common/utils/text-format.util";

describe("Redactor: contextual queries and bounded cache", () => {
  let prisma: { $queryRaw: jest.Mock; $executeRaw: jest.Mock; $transaction: jest.Mock },
    version: string,
    service: RedactorSearchService;
  beforeEach(() => {
    prisma = { $queryRaw: jest.fn().mockResolvedValue([]), $executeRaw: jest.fn().mockResolvedValue(0), $transaction: jest.fn() };
    prisma.$transaction.mockImplementation((callback) => callback(prisma));
    version = "v1";
    service = new RedactorSearchService(
      prisma as never,
      { getCorpusVersion: () => version } as never,
    );
  });
  test.each(["7", "Art. 7", "artículo 7", "ART 7º"])(
    "%s resolves a number in the selected norm",
    async (q) => {
      await service.articles("constitucion-nacional", q);
      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      const query = prisma.$queryRaw.mock.calls[0][0];
      expect(query.values).toContain("constitucion-nacional");
      expect(query.values).toContain("7");
      expect(query.sql).toContain("n.visibility = 'PUBLICA'");
      expect(query.sql).not.toContain("ts_rank");
      expect(query.sql).not.toContain("count(");
      expect(query.sql).toContain("left(a.body, 160)");
      expect(query.sql).toContain("LIMIT 11");
    },
  );
  test("equivalent numbers share cache and corpus changes invalidate it", async () => {
    await service.articles("cn", "7");
    await service.articles("cn", "Art. 7");
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    version = "v2";
    await service.articles("cn", "7");
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);
    await service.articles("chaco", "7");
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(3);
  });
  test("cache expires and failed requests are not cached", async () => {
    const clock = jest.spyOn(Date, "now").mockReturnValue(100);
    try {
      await service.articles("cn", "7");
      clock.mockReturnValue(16000);
      await service.articles("cn", "7");
      expect(prisma.$queryRaw).toHaveBeenCalledTimes(2);
      prisma.$queryRaw.mockRejectedValueOnce(new Error("offline"));
      await expect(service.articles("cn", "8")).rejects.toThrow("offline");
      await service.articles("cn", "8");
      expect(prisma.$queryRaw).toHaveBeenCalledTimes(4);
    } finally {
      clock.mockRestore();
    }
  });
  test("simultaneous equal queries share one DB read; distinct requests have a ceiling", async () => {
    const resolvers: Array<(rows: unknown[]) => void> = [];
    prisma.$queryRaw.mockImplementation(
      () =>
        new Promise((r) => {
          resolvers.push(r);
        }),
    );
    const first = service.articles("cn", "7"),
      second = service.articles("cn", "Art. 7");
    await Promise.resolve();
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    resolvers.shift()!([]);
    await Promise.all([first, second]);
    const pending = Array.from({ length: 8 }, (_, i) =>
      service.articles("cn", String(i + 20)),
    );
    await Promise.resolve();
    await expect(service.articles("cn", "99")).rejects.toThrow("ocupada");
    for (const resolve of resolvers) resolve([]);
    await Promise.all(pending);
  });
  test("pagination requests just one extra row", async () => {
    prisma.$queryRaw.mockResolvedValue(
      Array.from({ length: 11 }, (_, id) => ({ id: String(id) })),
    );
    const page = await service.articles("cn", "", 10);
    expect(page.results).toHaveLength(10);
    expect(page.nextOffset).toBe(20);
  });
  test("official text always checks owner norm and visibility and is never truncated", async () => {
    const text = "Texto oficial íntegro. ".repeat(100);
    prisma.$queryRaw.mockResolvedValue([{ id: "a7", lawId: "cn", text }]);
    expect((await service.article("a7", "cn")).text).toBe(text);
    const query = prisma.$queryRaw.mock.calls[0][0];
    expect(query.values).toEqual(["a7", "cn"]);
    expect(query.sql).toContain("n.visibility = 'PUBLICA'");
    expect(query.sql).not.toContain("left(");
    prisma.$queryRaw.mockResolvedValue([]);
    await expect(service.article("a7", "foreign")).rejects.toThrow(
      "disponible",
    );
  });
  test("national and provincial display names are consistent without editing official titles", () => {
    const row = {
      id: "const-caba",
      number: "",
      title: "Título oficial",
      common_name: "constitución porteña",
      scope_slug: "caba",
      status: "VIGENTE",
      jurisdiction: "PROVINCIAL",
      norm_type: "CONSTITUCION",
    };
    expect(normSuggestion(row).title).toBe(
      "Constitución de la Ciudad Autónoma de Buenos Aires",
    );
    expect(
      normSuggestion({ ...row, id: "constitucion-nacional", scope_slug: null })
        .title,
    ).toBe("Constitución Nacional");
  });
  test("numeric normalization and linear formatting preserve identifiers", () => {
    expect(articleNumberKey("ARTÍCULO 14 BIS")).toBe("14bis");
    expect(articleNumberKey("libertad")).toBeNull();
    expect(groupDigits("12345678901234567890")).toBe(
      "12.345.678.901.234.567.890",
    );
    expect(stripTrailingSlashes("/leyes/x///")).toBe("/leyes/x");
    expect(stripTrailingSlashes("/")).toBe("");
  });
});

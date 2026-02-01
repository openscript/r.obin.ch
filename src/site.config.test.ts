import { describe, it, expect } from "vitest";
import { C, localeSlugs } from "./site.config";

describe("configuration", () => {
  it("should have a default locale, that is included in locales", () => {
    expect(localeSlugs).toContain(C.DEFAULT_LOCALE);
  });
});

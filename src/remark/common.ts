type AstroData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAstroData(obj: any): obj is AstroData {
  return obj && typeof obj === "object" && "frontmatter" in obj && typeof obj.frontmatter === "object";
}

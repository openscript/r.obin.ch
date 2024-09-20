type AstroData = {
  frontmatter: Record<string, any>;
};

export function isAstroData(obj: any): obj is AstroData {
  return (
    obj &&
    typeof obj === "object" &&
    "frontmatter" in obj &&
    typeof obj.frontmatter === "object"
  );
}

import type { Root } from "mdast";
import type { VFile } from "vfile";
import { isAstroData } from "./common";

type Options = Readonly<{
  length: number;
}>;

export function remarkExcerpt({ length }: Options) {
  return async (ast: Root, file: VFile) => {
    if (!isAstroData(file.data.astro)) return;

    const paragraphs = ast.children.filter((c) => c.type === "paragraph");
    const texts = paragraphs.flatMap((p) =>
      p.children.map((n) => n.type === "text" && n.value).filter(Boolean),
    );

    const excerpt = texts.join(" ").slice(0, length);

    file.data.astro.frontmatter.excerpt = excerpt;
  };
}

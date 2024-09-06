import type { Root } from 'mdast';
import type { VFile } from 'vfile';
import { isAstroData } from './common';

type Options = Readonly<{
  length: string;
}>;

export function remarkExcerpt({ length }: Options) {
  return async (_: Root, file: VFile) => {
    if (!isAstroData(file.data.astro)) return;

    console.log(length);
  };
}

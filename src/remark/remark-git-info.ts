import type { Root } from "mdast";
import type { VFile } from "vfile";
import simpleGit, { type SimpleGitOptions } from "simple-git";
import { isAstroData } from "./common";

export type GitInfoFrontmatter = {
  lastCommit?: { authorName: string; date: string; message: string };
  remoteEditUrl: string;
  remoteViewUrl: string;
  remoteHistoryUrl: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGitInfo = (remarkPluginFrontmatter: Record<string, any>) => {
  return remarkPluginFrontmatter.gitInfo as GitInfoFrontmatter | undefined;
};

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};
const git = simpleGit(options);

type Options = Readonly<{
  remoteUrlBase: string;
}>;

export function remarkGitInfo({ remoteUrlBase }: Options) {
  return async (_: Root, file: VFile) => {
    const log = await git.log({ file: file.path, n: 1 });
    if (!isAstroData(file.data.astro) || !log.latest) return;

    const { author_name: authorName, date, message } = log.latest;
    const filePath = file.path.replace(process.cwd(), "");
    const remoteEditUrl = `${remoteUrlBase}/edit/master${filePath}`;
    const remoteViewUrl = `${remoteUrlBase}/blob/master${filePath}`;
    const remoteHistoryUrl = `${remoteUrlBase}/commits/master${filePath}`;
    const lastCommit = { authorName, date, message };

    file.data.astro.frontmatter.gitInfo = { lastCommit, remoteEditUrl, remoteViewUrl, remoteHistoryUrl };
  };
}

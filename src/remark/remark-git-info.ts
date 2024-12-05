import type { Root } from "mdast";
import type { VFile } from "vfile";
import simpleGit, {
  type DefaultLogFields,
  type ListLogLine,
  type SimpleGitOptions,
} from "simple-git";
import { isAstroData } from "./common";

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};
const git = simpleGit(options);

export type GitInfoFrontmatter = {
  git: {
    lastCommit?: { authorName: string, date: string, message: string };
    remoteEditUrl: string;
    remoteViewUrl: string;
    remoteHistoryUrl: string;
  };
};

type Options = Readonly<{
  remoteUrlBase: string;
}>;

export function remarkGitInfo({ remoteUrlBase }: Options) {
  return async (_: Root, file: VFile) => {
    if (!isAstroData(file.data.astro)) return;
    const log = await git.log({ file: file.path, n: 1 });
    if (!log.latest) return;
    const { author_name: authorName, date, message } = log.latest;

    const filePath = file.path.replace(process.cwd(), "");
    const remoteEditUrl = `${remoteUrlBase}/edit/master${filePath}`;
    const remoteViewUrl = `${remoteUrlBase}/blob/master${filePath}`;
    const remoteHistoryUrl = `${remoteUrlBase}/commits/master${filePath}`;
    const lastCommit = { authorName, date, message };

    file.data.astro.frontmatter.git = { lastCommit, remoteEditUrl, remoteViewUrl, remoteHistoryUrl };
  };
}

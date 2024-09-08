import type { Root } from 'mdast';
import type { VFile } from 'vfile';
import simpleGit, { type DefaultLogFields, type ListLogLine, type SimpleGitOptions } from 'simple-git';
import { isAstroData } from './common';

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};
const git = simpleGit(options);

export type GitInfoFrontmatter = {
  git: {
    lastCommit: DefaultLogFields & ListLogLine;
    remoteEditUrl: string;
    remoteViewUrl: string;
    remoteHistoryUrl: string;
  };
}

type Options = Readonly<{
  remoteUrlBase: string;
}>;

export function remarkGitInfo({ remoteUrlBase }: Options) {
  return async (_: Root, file: VFile) => {
    if (!isAstroData(file.data.astro)) return;
    file.data.astro.frontmatter.git = {};

    const filePath = file.path.replace(process.cwd(), '');
    file.data.astro.frontmatter.git.remoteEditUrl = `${remoteUrlBase}/edit/master${filePath}`;
    file.data.astro.frontmatter.git.remoteViewUrl = `${remoteUrlBase}/blob/master${filePath}`;
    file.data.astro.frontmatter.git.remoteHistoryUrl = `${remoteUrlBase}/commits/master${filePath}`;

    const log = await git.log({ file: file.path, n: 1 });
    if (!log.latest) return;
    file.data.astro.frontmatter.git.lastCommit = log.latest;
  };
}

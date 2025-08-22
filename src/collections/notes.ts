import { getCollection } from "astro:content";
import type { GitInfoFrontmatter } from "../remark/remark-git-info";

export type Note = { path: string; title: string; gitInfo?: GitInfoFrontmatter };
export type NestedNotes = {
  [key: string]: NestedNotes | { note: Note };
};

export const defaultNotesCollection = await getCollection("notes");

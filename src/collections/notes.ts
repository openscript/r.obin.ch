import { getCollection, type CollectionEntry } from "astro:content";

export const defaultNotesCollection = await getCollection("notes");

export type NestedNotes = {
  [key: string]: NestedNotes | { note: CollectionEntry<'notes'> } | {};
}

export const nestedNotesCollection = defaultNotesCollection.reduce((acc, note) => {
  const path = note.id.split("/").filter(Boolean);
  let current = acc;
  for (let part of path) {
    if (part === path[path.length - 1]) part = note.data.title;
    if (!current[part]) current[part] = {};
    current = current[part]!;
  }
  current.note = note;
  return acc;
}, {} as NestedNotes);

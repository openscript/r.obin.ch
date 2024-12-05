import { getCollection } from "astro:content";

export const defaultBlogCollection = (
  await getCollection("blog", (entry) => {
    // Don't include draft entries
    if (entry.data.draft) return false;

    // Don't include entries that are scheduled to be published in the future
    if (entry.data.publishedAt.getTime() > Date.now()) return false;

    return true;
  })
).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

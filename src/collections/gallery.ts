import { getCollection } from "astro:content";

export const defaultProjectsCollection = await getCollection("gallery");

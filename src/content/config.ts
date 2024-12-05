import { defineCollection, z } from "astro:content";
import { localeSlugs, type Locale } from "../configuration";

const localized = <T extends z.ZodTypeAny>(schema: T) =>
  z.object(
    localeSlugs.reduce(
      (acc, key) => {
        acc[key] = schema;
        return acc;
      },
      {} as Record<Locale, T>,
    ),
  );

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishedAt: z.date(),
      tags: z.array(z.string()),
      draft: z.boolean().optional(),
      cover: z
        .object({
          src: image(),
          alt: z.string().optional(),
        })
        .optional(),
    }),
});
const notesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});
const galleryCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: localized(z.string()),
      cover: image(),
      images: z.array(
        z.object({
          src: image(),
          title: localized(z.string().optional()),
          description: localized(z.string().optional()),
        }),
      ),
    }),
});
const projectCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      homepage: z.string().url().optional(),
      source: z.string().url().optional(),
      cover: image().optional(),
      images: z.array(
        z.object({
          src: image(),
          title: z.string().optional(),
          description: z.string().optional(),
        }),
      ).optional(),
    }),
});
const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    path: z.string(),
    title: z.string(),
  }),
});
const navigationCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    localized(
      z.array(
        z.object({
          title: z.string(),
          path: z.string().url().or(z.string()),
          icon: image().optional(),
        }),
      ),
    ),
});

export const collections = {
  blog: blogCollection,
  notes: notesCollection,
  gallery: galleryCollection,
  projects: projectCollection,
  pages: pagesCollection,
  navigation: navigationCollection,
};

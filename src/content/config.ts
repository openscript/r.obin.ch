import { defineCollection, z } from "astro:content";

const localizedString = z.object({
  en: z.string(),
  de: z.string(),
});

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishedAt: z.date(),
      tags: z.array(z.string()),
      cover: z
        .object({
          src: image().refine((img) => img.width >= 800, {
            message: "Cover image must be at least 800 pixels wide!",
          }),
          alt: z.string().optional(),
        })
        .optional(),
    }),
});
const pagesCollection = defineCollection({
  schema: z.object({
    path: z.string(),
  }),
});
const navigationCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.array(z.object({
    title: localizedString,
    path: z.string().url().or(z.string()),
    icon: image().optional()
  }))
})

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
  navigation: navigationCollection
};

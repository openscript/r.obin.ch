import { defineCollection, reference, z } from "astro:content";
import { localeSlugs } from "./site.config";
import { glob } from "astro/loaders";
import { extendI18nLoaderSchema, i18nContentLoader, i18nLoader, localized as localizedSchema } from "astro-loader-i18n";

const localized = <T extends z.ZodTypeAny>(schema: T) => localizedSchema(schema, localeSlugs);

const blog = defineCollection({
  loader: i18nLoader({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: ({ image }) =>
    extendI18nLoaderSchema(
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
    ),
});
const notes = defineCollection({
  loader: i18nLoader({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/notes",
  }),
  schema: extendI18nLoaderSchema(
    z.object({
      title: z.string(),
    }),
  ),
});
const gallery = defineCollection({
  loader: i18nContentLoader({
    pattern: "**/[^_]*.yml",
    base: "./src/content/gallery",
  }),
  schema: ({ image }) =>
    extendI18nLoaderSchema(
      z.object({
        title: localized(z.string()),
        cover: image(),
        images: z.array(
          z.object({
            src: image(),
            title: localized(z.string().optional()).optional(),
            description: localized(z.string().optional()).optional(),
          }),
        ),
      }),
    ),
});
const projects = defineCollection({
  loader: i18nContentLoader({
    pattern: "**/[^_]*.yml",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    extendI18nLoaderSchema(
      z.object({
        homepage: z.string().url().optional(),
        source: z.string().url().optional(),
        cover: z
          .object({
            src: image(),
            alt: z.string().optional(),
          })
          .optional(),
        status: z.enum(["active", "maintenance", "archived"]),
        type: z.enum(["website", "app", "library", "tool", "other"]),
        images: z
          .array(
            z.object({
              src: image(),
              title: z.string().optional(),
              description: z.string().optional(),
            }),
          )
          .optional(),
      }),
    ),
});
const projectsContent = defineCollection({
  loader: i18nLoader({
    pattern: ["**/[^_]*.{md,mdx}", "!**/**.spotlight.*{md,mdx}"],
    base: "./src/content/projects",
  }),
  schema: extendI18nLoaderSchema(
    z.object({
      title: z.string(),
      summary: z.string(),
      spotlight: reference("projectsSpotlight").optional(),
    }),
  ),
});
const projectsSpotlight = defineCollection({
  loader: i18nLoader({
    pattern: "**/[^_]*.spotlight.*{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: extendI18nLoaderSchema(z.object({})),
});
const pages = defineCollection({
  loader: i18nLoader({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/pages",
  }),
  schema: extendI18nLoaderSchema(
    z.object({
      path: z.string(),
      title: z.string(),
      template: z.enum(["article", "article-with-aside"]).optional().default("article"),
    }),
  ),
});
const navigation = defineCollection({
  loader: i18nContentLoader({
    pattern: "**/[^_]*.yml",
    base: "./src/content/navigation",
  }),
  schema: ({ image }) =>
    extendI18nLoaderSchema(
      z.object({
        items: localized(
          z.array(
            z.object({
              title: z.string(),
              path: z.string().url().or(z.string()),
              icon: image().optional(),
            }),
          ),
        ),
      }),
    ),
});
const sections = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/sections",
  }),
  schema: z.object({}),
});

export const collections = {
  blog: blog,
  notes: notes,
  gallery: gallery,
  projects: projects,
  projectsContent: projectsContent,
  projectsSpotlight: projectsSpotlight,
  pages: pages,
  navigation: navigation,
  sections: sections,
};

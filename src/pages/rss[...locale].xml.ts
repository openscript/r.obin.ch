import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths, InferGetStaticParamsType, InferGetStaticPropsType } from "astro";
import { C, localeSlugs } from "../site.config";
import { parseLocale } from "../utils/i18n";
import { i18nPropsAndParams } from "astro-loader-i18n";
import { defaultPropsAndParamsOptions } from "../utils/paths";
import { defaultBlogCollection } from "../collections/blog";
import slug from "limax";
import { useI18n, currentLocale } from "astro-nanostores-i18n:runtime";

export const getStaticPaths = (async () => {
  const versions = [undefined, ...localeSlugs];
  return versions.map((l) => ({ params: { locale: l ? `-${l}` : undefined }, props: { locale: l } }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = async (context) => {
  const locale = parseLocale(context.props.locale);
  const blogs = defaultBlogCollection;
  const routePattern = "[...locale]/[blog]/[...slug]";
  const propsAndParams = i18nPropsAndParams(blogs, {
    ...defaultPropsAndParamsOptions,
    routePattern,
    generateSegments: (entry) => ({
      slug: `${entry.data.contentPath}/${slug(entry.data.title)}`,
    }),
  });
  currentLocale.set(locale);
  const messages = useI18n("pages.rss", {
    title: "Robin Bühlers Website",
    description:
      "On this website I collect interesting things from my adventures in the world of bits and bytes and also share some things from the analog reality.",
    author: "Robin Bühler",
  });

  return rss({
    title: messages.title,
    description: messages.description,
    site: context.site || "http://localhost:4321",
    items: propsAndParams.map(({ props: blog }) => ({
      author: messages.author,
      title: blog.data.title,
      pubDate: blog.data.publishedAt,
      link: blog.translatedPath,
    })),
    trailingSlash: false,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `
      <language>${C.LOCALES[locale]}</language>
      <atom:link rel="self" type="application/rss+xml" href="${context.url}" />
    `,
    stylesheet: "/rss.xslt",
  });
};

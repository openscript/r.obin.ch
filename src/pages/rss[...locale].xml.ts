import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths, InferGetStaticParamsType, InferGetStaticPropsType } from "astro";
import { C, localeSlugs } from "../site.config";
import { parseLocale } from "../utils/i18n";
import { i18nPropsAndParams } from "astro-loader-i18n";
import { defaultPropsAndParamsOptions } from "../utils/paths";
import { defaultBlogCollection } from "../collections/blog";
import slug from "limax";

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

  return rss({
    title: C.MESSAGES[locale]["title"],
    description: C.MESSAGES[locale]["description"],
    site: context.site || "http://localhost:4321",
    items: propsAndParams.map(({ props: blog }) => ({
      author: C.MESSAGES[locale]["author"],
      title: blog.data.title,
      pubDate: blog.data.publishedAt,
      link: blog.translatedPath,
    })),
    customData: `<language>${C.LOCALES[locale]}</language>`,
  });
};

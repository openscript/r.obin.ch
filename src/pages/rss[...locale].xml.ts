import rss from "@astrojs/rss";
import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from "astro";
import { C, localeSlugs } from "../configuration";
import {
  getContentEntryPath,
  parseLocale,
  parseLocaleFromPath,
} from "../utils/i18n";
import { getCollection, getEntry } from "astro:content";

export const getStaticPaths = (async () => {
  const versions = [undefined, ...localeSlugs];
  return versions.map((l) => ({ params: { locale: l ? `-${l}` : undefined }, props: { locale: l } }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<Props, Params> = async (context) => {
  const locale = parseLocale(context.props.locale);
  const blogs = await getCollection(
    "blog",
    (entry) =>
      !context.props.locale || parseLocaleFromPath(entry.id) === locale,
  );

  return rss({
    title: C.MESSAGES[locale]["title"],
    description: C.MESSAGES[locale]["description"],
    site: context.site || "http://localhost:4321",
    items: await Promise.all(
      blogs.map(async (blog) => ({
        title: blog.data.title,
        pubDate: blog.data.publishedAt,
        link: getContentEntryPath(await getEntry("blog", blog.id)),
      })),
    ),
    customData: `<language>${C.LOCALES[locale]}</language>`,
  });
};

import { defineConfig } from "astro/config";
import unpluginFavicons from "@openscript/unplugin-favicons/vite";
import { C } from "./src/site.config";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkGitInfo } from "./src/remark/remark-git-info";
import { remarkExcerpt } from "./src/remark/remark-excerpt";
import search from "./src/integrations/search";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  build: {
    format: "file",
  },
  i18n: {
    defaultLocale: C.DEFAULT_LOCALE,
    locales: Object.keys(C.LOCALES),
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    remarkPlugins: [
      [remarkExcerpt, { length: C.SETTINGS.BLOG.EXCERPT_LENGTH }],
      [remarkGitInfo, { remoteUrlBase: C.SETTINGS.REMOTE.BASE_URL }],
    ],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
  vite: {
    plugins: [
      unpluginFavicons({
        logo: "res/brand/icon.png",
        inject: true,
        favicons: {
          theme_color: C.SETTINGS.BROWSER.THEME_COLOR,
          icons: {
            android: true,
            appleIcon: true,
            favicons: true,
            windows: true,
            yandex: true,
            appleStartup: false,
          },
        },
      }),
    ],
  },
  integrations: [
    search(),
    mdx(),
    sitemap({ i18n: { defaultLocale: C.DEFAULT_LOCALE, locales: C.LOCALES } }),
  ],
});

import { defineConfig } from 'astro/config';
import unpluginFavicons from "@anolilab/unplugin-favicons/vite";
import { C } from './src/configuration';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [unpluginFavicons({
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
          appleStartup: false
        }
      }
    })]
  },
  integrations: [mdx()]
});
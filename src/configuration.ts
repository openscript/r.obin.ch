export const C = {
  // Key is the locale slug, value is the locale code
  LOCALES: { en: "en-US", de: "de-CH" },
  // Default locale referencing one of the keys in LOCALES
  DEFAULT_LOCALE: "en" as const,
  // Static messages for each locale
  MESSAGES: {
    en: {
      language: "English",
      title: "Robins Website",
      feedTitle: "Robins Blog",
      feedLanguage: "Robins Blog: English posts only",
      searchPlaceholder: "Type to search..."
    },
    de: {
      language: "Deutsch",
      title: "Robins Webseite",
      feedTitle: "Robins Blog",
      feedLanguage: "Robins Blog: Nur Deutsche Artikel",
      searchPlaceholder: "Tippe um zu suchen..."
    },
  } satisfies { [key: string]: { [key: string]: string } },
  // Various settings
  SETTINGS: {
    BROWSER: {
      THEME_COLOR: "#663399",
    },
    REMOTE: {
      BASE_URL: "https://r.obin.ch",
    },
    BLOG: {
      PAGE_SIZE: 20,
    },
  },
} as const;

// Configuration helpers
export type Locale = keyof typeof C.LOCALES;
export const localeSlugs = Object.keys(C.LOCALES) as Locale[];

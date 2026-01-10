export const C = {
  // Key is the locale slug, value is the locale code
  LOCALES: { en: "en-US", de: "de-CH" },
  // Default locale referencing one of the keys in LOCALES
  DEFAULT_LOCALE: "en" as const,
  // Segment translations
  SEGMENT_TRANSLATIONS: {
    de: {
      gallery: "galerie",
      projects: "projekte",
      blog: "blog",
      notes: "notizen",
    },
    en: {
      gallery: "gallery",
      projects: "projects",
      blog: "blog",
      notes: "notes",
    },
  },
  // Various settings
  SETTINGS: {
    BROWSER: {
      THEME_COLOR: "#663399",
    },
    REMOTE: {
      BASE_URL: "https://github.com/openscript/r.obin.ch",
    },
    BLOG: {
      PAGE_SIZE: 10,
      EXCERPT_LENGTH: 200,
    },
    COMMENTS: {
      HOST: "https://comments.obin.ch",
      SITE_ID: "r.obin.ch",
      ORIGINAL_URL: "https://r.obin.ch",
    },
  },
} as const;

// Configuration helpers
export type Locale = keyof typeof C.LOCALES;
export const localeSlugs = Object.keys(C.LOCALES) as Locale[];

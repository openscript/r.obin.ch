export const C = {
  // Key is the locale slug, value is the locale code
  LOCALES: { en: "en-US", de: "de-CH" },
  // Default locale referencing one of the keys in LOCALES
  DEFAULT_LOCALE: "en" as const,
  // Static messages for each locale
  MESSAGES: {
    de: {
      language: "Deutsch",
      title: "Robins Webseite",
      feedTitle: "Robins Blog",
      feedLanguage: "Robins Blog: Nur Deutsche Artikel",
      searchPlaceholder: "Tippe um zu suchen...",
      tableOfContentsLabel: "Inhaltsverzeichnis",
      tagsLabel: "Kategorien",
      gitInfoLabel: 'Zusatzinformationen',
      authorLabel: 'Autor',
      lastUpdatedLabel: 'Letzte Aktualisierung',
      linksLabel: 'Links',
      historyLabel: 'Versionen',
      sourceLabel: 'Quelle',
      editLabel: 'Bearbeiten',
      blogTitle: 'Blog',
      projectsTitle: 'Projekte',
      galleryTitle: 'Galerie',
      blogTagTitle: 'Kategorie "{tag}"',
      pageOfLabel: 'Seite {current} von {total}',
      previousLabel: 'Zurück',
      nextLabel: 'Weiter',
      blogSlug: 'blog',
    },
    en: {
      language: "English",
      title: "Robins Website",
      feedTitle: "Robins Blog",
      feedLanguage: "Robins Blog: English posts only",
      searchPlaceholder: "Type to search...",
      tableOfContentsLabel: "Table of Contents",
      tagsLabel: "Tags",
      gitInfoLabel: 'Meta information',
      authorLabel: 'Author',
      lastUpdatedLabel: 'Last updated',
      linksLabel: 'Links',
      historyLabel: 'History',
      sourceLabel: 'Source',
      editLabel: 'Edit',
      blogTitle: 'Blog',
      projectsTitle: 'Projects',
      galleryTitle: 'Gallery',
      blogTagTitle: 'Tag "{tag}"',
      pageOfLabel: 'Page {current} of {total}',
      previousLabel: 'Previous',
      nextLabel: 'Next',
      blogSlug: 'blog',
    },
  } satisfies { [key: string]: { [key: string]: string } },
  // Various settings
  SETTINGS: {
    BROWSER: {
      THEME_COLOR: "#663399",
    },
    REMOTE: {
      BASE_URL: "https://github.com/openscript/r.obin.ch",
    },
    BLOG: {
      PAGE_SIZE: 20,
      EXCERPT_LENGTH: 200,
    },
  },
} as const;

// Configuration helpers
export type Locale = keyof typeof C.LOCALES;
export const localeSlugs = Object.keys(C.LOCALES) as Locale[];

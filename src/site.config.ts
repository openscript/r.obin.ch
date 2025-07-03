export const C = {
  // Key is the locale slug, value is the locale code
  LOCALES: { en: "en-US", de: "de-CH" },
  // Default locale referencing one of the keys in LOCALES
  DEFAULT_LOCALE: "en" as const,
  // Segment translations
  SEGMENT_TRANSLATIONS: {
    de: {
      'gallery': 'galerie',
      'projects': 'projekte',
      'blog': 'blog',
      'notes': 'notizen',
    },
    en: {
      'gallery': 'gallery',
      'projects': 'projects',
      'blog': 'blog',
      'notes': 'notes',
    },
  },
  // Static messages for each locale
  MESSAGES: {
    de: {
      language: "Deutsch",
      title: "Robin Bühlers Webseite",
      description:
        "Auf dieser Webseite sammle ich interessante Dinge aus meinen Abenteuer in der Welt von Bits und Bytes und teile auch das Eine oder Andere aus der analogen Realität.",
      feedTitle: "Robins Blog",
      feedLanguage: "Robins Blog: Nur Deutsche Artikel",
      searchPlaceholder: "Tippe um zu suchen...",
      searchLoading: "Suche läuft...",
      tableOfContentsLabel: "Inhaltsverzeichnis",
      detailsLabel: "Details",
      categorizedWithLabel: "Kategorisiert mit",
      createdAtLabel: "Erstellt am",
      versioningLabel: "Versionierung",
      authorLabel: "Autor",
      lastUpdatedLabel: "Letzte Aktualisierung",
      linksLabel: "Links",
      historyLabel: "Versionen",
      sourceLabel: "Quelle",
      editLabel: "Bearbeiten",
      blogTitle: "Blog",
      projectsTitle: "Projekte",
      galleryTitle: "Galerie",
      blogTagTitle: 'Kategorie "{tag}"',
      pageOfLabel: "Seite {current} von {total}",
      previousLabel: "Zurück",
      nextLabel: "Weiter",
      latestPostsLabel: "Neueste Artikel",
      notesTitle: "Notizen",
      active: "Aktiv",
      maintenance: "Wartung",
      archived: "Archiviert",
      idea: "Idee",
    },
    en: {
      language: "English",
      title: "Robin Bühlers Website",
      description:
        "On this website I collect interesting things from my adventures in the world of bits and bytes and also share some things from the analog reality.",
      feedTitle: "Robins Blog",
      feedLanguage: "Robins Blog: English posts only",
      searchPlaceholder: "Type to search...",
      searchLoading: "Searching...",
      tableOfContentsLabel: "Table of Contents",
      detailsLabel: "Details",
      categorizedWithLabel: "Categorized with",
      createdAtLabel: "Created at",
      versioningLabel: "Versioning",
      authorLabel: "Author",
      lastUpdatedLabel: "Last updated",
      linksLabel: "Links",
      historyLabel: "History",
      sourceLabel: "Source",
      editLabel: "Edit",
      blogTitle: "Blog",
      projectsTitle: "Projects",
      galleryTitle: "Gallery",
      blogTagTitle: 'Tag "{tag}"',
      pageOfLabel: "Page {current} of {total}",
      previousLabel: "Previous",
      nextLabel: "Next",
      latestPostsLabel: "Latest posts",
      notesTitle: "Notes",
      active: "Active",
      maintenance: "Maintenance",
      archived: "Archived",
      idea: "Idea",
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

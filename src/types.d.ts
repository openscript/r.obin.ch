/// <reference types="@emotion/react/types/css-prop" />
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      bright: string;
      dark: string;
    };
    fonts: {
      paragraph: string;
      headings: string;
      listings: string;
    };
    breakpoints: {
      tiny: string;
      small: string;
      medium: string;
      big: string;
      huge: string;
    };
  }
}

export type PaginationContext = {
  currentPage: number;
  limit: number;
  pageCount: number;
  skip: number;
};

export type TableOfContentsItem = {
  url: string;
  title: string;
  items?: TableOfContentsItem[];
};

export type TableOfContents = {
  items?: TableOfContentsItem[];
};

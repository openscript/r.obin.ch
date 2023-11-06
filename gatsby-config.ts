import path from 'path';
import { GatsbyConfig } from 'gatsby';
import MarkdownIt from 'markdown-it';
import deCHMessages from './content/i18n/de-CH.json';
import enUSMessages from './content/i18n/en-US.json';
import packageJson from './package.json';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const mdparser = new MarkdownIt();
const siteUrl = process.env.SITE_URL || `https://r.obin.ch`;

const remarkPlugins = [
  'gatsby-remark-copy-linked-files',
  'gatsby-remark-autolink-headers',
  {
    resolve: 'gatsby-remark-images',
    options: {
      maxWidth: 1140,
      quality: 90,
      linkImagesToOriginal: false,
    },
  },
  {
    resolve: 'gatsby-remark-prismjs',
    options: {
      showLineNumbers: true,
    },
  },
];

const configuration: GatsbyConfig = {
  pathPrefix: process.env.PATH_PREFIX || '/',
  siteMetadata: {
    title: `Robins website`,
    description: `On this website I collect interesting findings from my adventures in the world of bits and bytes and I share sometimes also things from the analogue reality.`,
    author: `Robin Bühler`,
    siteUrl,
    version: packageJson.version,
    project: packageJson.name,
  },
  graphqlTypegen: {
    typesOutputPath: 'graphql-types.ts',
    documentSearchPaths: [`./gatsby-node.ts`, `./plugins/**/gatsby-node.ts`, `./src/**/*.ts?(x)`],
    generateOnBuild: true,
  },
  plugins: [
    // Transformers
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,

    // Sources
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.resolve(`content/data`),
      },
    },

    // Plugins
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`],
        gatsbyRemarkPlugins: remarkPlugins,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: remarkPlugins,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/statics/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }: any) => {
              return allMdx.nodes.map((node: any) => ({
                title: node.frontmatter.title,
                date: node.frontmatter.publishedAt,
                url: site.siteMetadata.siteUrl + node.fields.path,
                guid: node.id,
                custom_elements: [{ 'content:encoded': mdparser.render(node.body) }],
              }));
            },
            query: `
              {
                allMdx(
                  filter: {fields: {kind: {glob: "blog/**"}}, frontmatter: {draft: {ne: true}}}
                  sort: {frontmatter: {publishedAt: DESC}}
                ) {
                  nodes {
                    fields {
                      path
                    }
                    frontmatter {
                      title
                      publishedAt
                    }
                    id
                    body
                    excerpt
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Robins website',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-i18n-l10n`,
      options: {
        defaultLocale: `en-US`,
        siteUrl,
        locales: [
          {
            locale: `en-US`,
            prefix: `en`,
            slugs: {},
            messages: enUSMessages,
          },
          {
            locale: `de-CH`,
            prefix: `de`,
            slugs: {
              '/imprint': '/impressum',
              '/projects': '/projekte',
            },
            messages: deCHMessages,
          },
        ],
        pathBlacklist: ['/pages'],
      },
    },
  ],
};

export default configuration;

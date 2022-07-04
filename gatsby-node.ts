import { GatsbyNode } from 'gatsby';
import { createBlogPages } from './src/gatsby/createPages/createBlogPages';
import { createBlogPostPages } from './src/gatsby/createPages/createBlogPostPages';
import { createGenericPages } from './src/gatsby/createPages/createGenericPages';

export const createPages: GatsbyNode['createPages'] = async args => {
  await createBlogPages(args);
  await createBlogPostPages(args);
  await createGenericPages(args);
};

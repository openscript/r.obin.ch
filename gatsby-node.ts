import { GatsbyNode } from 'gatsby';
import { createBlogPages } from './src/gatsby/createPages/createBlogPages';
import { createGenericPages } from './src/gatsby/createPages/createGenericPages';

export const createPages: GatsbyNode['createPages'] = async args => {
  await createBlogPages(args);
  await createGenericPages(args);
};

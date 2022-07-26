import { GatsbyNode } from 'gatsby';
import { createBlogPages } from './src/gatsby/createPages/createBlogPages';
import { createBlogPostPages } from './src/gatsby/createPages/createBlogPostPages';
import { createBlogTagPages } from './src/gatsby/createPages/createBlogTagPages';
import { createGenericPages } from './src/gatsby/createPages/createGenericPages';
import { createProjectPages } from './src/gatsby/createPages/createProjectPages';

export const createPages: GatsbyNode['createPages'] = async args => {
  await createBlogPages(args);
  await createBlogPostPages(args);
  await createBlogTagPages(args);
  await createGenericPages(args);
  await createProjectPages(args);
};

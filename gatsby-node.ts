import { GatsbyNode } from 'gatsby';
import { createBlogListingPages } from './src/gatsby/createPages/createBlogListingPages';
import { createBlogPages } from './src/gatsby/createPages/createBlogPages';
import { createBlogTagPages } from './src/gatsby/createPages/createBlogTagPages';
import { createGenericPages } from './src/gatsby/createPages/createGenericPages';
import { createProjectListingPages } from './src/gatsby/createPages/createProjectListingPages';

export const createPages: GatsbyNode['createPages'] = async args => {
  await createBlogListingPages(args);
  await createBlogPages(args);
  await createBlogTagPages(args);
  await createGenericPages(args);
  await createProjectListingPages(args);
};

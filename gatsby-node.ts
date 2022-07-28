import { GatsbyNode } from 'gatsby';
import { createBlogListingPages } from './src/gatsby/createPages/createBlogListingPages';
import { createBlogPages } from './src/gatsby/createPages/createBlogPages';
import { createBlogTagPages } from './src/gatsby/createPages/createBlogTagPages';
import { createGenericPages } from './src/gatsby/createPages/createGenericPages';
import { createMediaLandingPages } from './src/gatsby/createPages/createMediaLandingPages';
import { createMediaListingPages } from './src/gatsby/createPages/createMediaListingPages';
import { createProjectListingPages } from './src/gatsby/createPages/createProjectListingPages';
import { createProjectPages } from './src/gatsby/createPages/createProjectPages';

export const createPages: GatsbyNode['createPages'] = async args => {
  await createBlogListingPages(args);
  await createBlogPages(args);
  await createBlogTagPages(args);
  await createGenericPages(args);
  await createMediaLandingPages(args);
  await createMediaListingPages(args);
  await createProjectListingPages(args);
  await createProjectPages(args);
};

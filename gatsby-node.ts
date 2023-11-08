import { GatsbyNode } from 'gatsby';
import { createBlogListingPages } from './legacy/gatsby/createPages/createBlogListingPages';
import { createBlogPages } from './legacy/gatsby/createPages/createBlogPages';
import { createBlogTagPages } from './legacy/gatsby/createPages/createBlogTagPages';
import { createGenericPages } from './legacy/gatsby/createPages/createGenericPages';
import { createMediaLandingPages } from './legacy/gatsby/createPages/createMediaLandingPages';
import { createMediaListingPages } from './legacy/gatsby/createPages/createMediaListingPages';
import { createMediaPages } from './legacy/gatsby/createPages/createMediaPages';
import { createProjectListingPages } from './legacy/gatsby/createPages/createProjectListingPages';
import { createProjectPages } from './legacy/gatsby/createPages/createProjectPages';
import { generatePageMetaData } from './legacy/gatsby/onCreatePage/generatePageMetaData';

export const createPages: GatsbyNode['createPages'] = async args => {
  await createBlogListingPages(args);
  await createBlogPages(args);
  await createBlogTagPages(args);
  await createGenericPages(args);
  await createMediaLandingPages(args);
  await createMediaListingPages(args);
  await createMediaPages(args);
  await createProjectListingPages(args);
  await createProjectPages(args);
};

export const onCreatePage: GatsbyNode<Record<string, unknown>, Queries.SitePageContext>['onCreatePage'] = async args => {
  await generatePageMetaData(args);
};

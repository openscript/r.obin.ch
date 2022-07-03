import { GatsbyNode } from 'gatsby';
import { createGenericPages } from './src/gatsby/createPages/createGenericPages';

export const createPages: GatsbyNode['createPages'] = async args => {
  await createGenericPages(args);
};

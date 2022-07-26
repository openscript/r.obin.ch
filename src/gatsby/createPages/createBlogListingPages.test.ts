import { createBlogListingPages } from './createBlogListingPages';

const createBlogListingPagesArgs = {
  graphql: jest.fn(),
  actions: {
    createPage: jest.fn(),
  },
};

describe('CreateBlogListingPages', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should generate blog pages', async () => {
    createBlogListingPagesArgs.graphql.mockResolvedValue({
      data: {
        allMdx: {
          nodes: [
            {
              fields: {
                locale: 'de-CH',
              },
            },
            {
              fields: {
                locale: 'en-US',
              },
            },
            {
              fields: {
                locale: 'de-CH',
              },
            },
            {
              fields: {
                locale: 'en-US',
              },
            },
            {
              fields: {
                locale: 'de-CH',
              },
            },
            {
              fields: {
                locale: 'en-US',
              },
            },
            {
              fields: {
                locale: 'de-CH',
              },
            },
            {
              fields: {
                locale: 'en-US',
              },
            },
            {
              fields: {
                locale: 'de-CH',
              },
            },
            {
              fields: {
                locale: 'en-US',
              },
            },
            {
              fields: {
                locale: 'de-CH',
              },
            },
            {
              fields: {
                locale: 'en-US',
              },
            },
            {
              fields: {
                locale: 'en-US',
              },
            },
          ],
        },
      },
      extensions: {},
    });

    await createBlogListingPages(createBlogListingPagesArgs as any);

    expect(createBlogListingPagesArgs.actions.createPage).toHaveBeenCalledTimes(2);
    expect(createBlogListingPagesArgs.actions.createPage).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        context: {
          adjustPath: true,
          basePath: '/blog',
          currentPage: 1,
          limit: 10,
          locale: 'de-CH',
          pageCount: 1,
          referTranslations: ['de-CH', 'en-US'],
          skip: 0,
        },
        path: '/de-CH/blog',
      })
    );
    expect(createBlogListingPagesArgs.actions.createPage).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        context: {
          adjustPath: true,
          basePath: '/blog',
          currentPage: 1,
          limit: 10,
          locale: 'en-US',
          pageCount: 1,
          referTranslations: ['de-CH', 'en-US'],
          skip: 0,
        },
        path: '/en-US/blog',
      })
    );
  });
});

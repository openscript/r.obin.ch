import { createBlogPages } from './createBlogPages';

const createBlogPagesArgs = {
  graphql: jest.fn(),
  actions: {
    createPage: jest.fn(),
  },
};

describe('CreateBlogPages', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should generate blog pages', async () => {
    createBlogPagesArgs.graphql.mockResolvedValue({
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

    await createBlogPages(createBlogPagesArgs as any);

    expect(createBlogPagesArgs.actions.createPage).toHaveBeenCalledTimes(2);
    expect(createBlogPagesArgs.actions.createPage).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        context: {
          adjustPath: true,
          basePath: '/blog',
          currentPage: 1,
          limit: 20,
          locale: 'de-CH',
          pageCount: 1,
          referTranslations: ['de-CH', 'en-US'],
          skip: 0,
        },
        path: '/de-CH/blog',
      })
    );
    expect(createBlogPagesArgs.actions.createPage).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        context: {
          adjustPath: true,
          basePath: '/blog',
          currentPage: 1,
          limit: 20,
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

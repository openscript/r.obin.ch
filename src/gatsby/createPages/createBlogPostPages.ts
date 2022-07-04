import { CreatePagesArgs } from 'gatsby';
import { resolve } from 'path';
import { CreateBlogPostPagesQuery } from '../../../graphql-types';

export async function createBlogPostPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;
  const blogPosts = await graphql<CreateBlogPostPagesQuery>(`
    query CreateBlogPostPages {
      posts: allMdx(filter: { fields: { kind: { glob: "blog/**" } } }) {
        nodes {
          id
          fields {
            path
            translations {
              locale
              path
            }
          }
        }
      }
    }
  `);

  blogPosts.data?.posts.nodes.forEach(p => {
    if (p.fields?.translations && p.fields?.path) {
      createPage({
        component: resolve(`./src/templates/BlogPost.tsx`),
        context: { id: p.id, translations: p.fields.translations },
        path: p.fields.path,
      });
    }
  });
}

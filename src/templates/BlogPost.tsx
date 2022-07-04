import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { BlogPostPageQuery } from '../../graphql-types';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function BlogPost({ data }: PageProps<BlogPostPageQuery>) {
  return (
    <DefaultLayout>
      <MDXRenderer>{data.mdx?.body || ''}</MDXRenderer>
    </DefaultLayout>
  );
}

export const query = graphql`
  query BlogPostPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`;

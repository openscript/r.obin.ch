import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { IndexPageQuery, SitePageContext } from '../../graphql-types';
import { DefaultLayout } from '../layouts/DefaultLayout';

export default function IndexPage({ data }: PageProps<IndexPageQuery, SitePageContext>) {
  return (
    <DefaultLayout>
      <MDXRenderer>{data.slogans?.body || ''}</MDXRenderer>
    </DefaultLayout>
  );
}

export const query = graphql`
  query IndexPage($locale: String) {
    slogans: mdx(fields: { locale: { eq: $locale }, kind: { eq: "sections" }, filename: { glob: "*slogan*" } }) {
      body
    }
  }
`;

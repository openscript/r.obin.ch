import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';
import { ImprintPageQuery } from '../../graphql-types';
import { DefaultLayout } from '../layouts/DefaultLayout';

type ImprintPageProps = { data: ImprintPageQuery };

export default function ImprintPage({ data }: ImprintPageProps) {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.imprint.title' });
  return (
    <DefaultLayout subtitle={title}>
      <MDXRenderer>{data.imprint?.body || ''}</MDXRenderer>
    </DefaultLayout>
  );
}

export const query = graphql`
  query ImprintPage($locale: String) {
    imprint: mdx(fields: { locale: { eq: $locale }, kind: { eq: "blocks" }, filename: { glob: "*imprint*" } }) {
      body
    }
  }
`;

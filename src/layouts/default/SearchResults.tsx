import { css } from '@emotion/react';
import { Markup } from 'interweave';
import { FormattedMessage } from 'react-intl';
import { PagefindSearchFragment } from '../../types';

const searchResultsStyles = css`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0.4rem;
  }
`;

const excerptStyles = css`
  &::before {
    content: '...';
  }
`;

type SearchResultsProps = {
  results: PagefindSearchFragment[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  console.log(results);
  return (
    <ul css={searchResultsStyles}>
      {results.length === 0 && (
        <li>
          <FormattedMessage id="search.noResults" />
        </li>
      )}
      {results.map(r => {
        return (
          <li key={r.url}>
            <a href={r.url}>
              <strong>{r.meta.title}: </strong>
              <Markup content={r.excerpt} css={excerptStyles} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

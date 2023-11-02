import { css } from '@emotion/react';
import { PagefindSearchFragment } from '../../types';

const searchResultsStyles = css`
  color: blue;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;
  }
`;

type SearchResultsProps = {
  results: PagefindSearchFragment[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <ul css={searchResultsStyles}>
      {results.map(r => {
        return (
          <li key={r.url}>
            <a href={r.url}>{r.excerpt}</a>
          </li>
        );
      })}
    </ul>
  );
}

import { Theme, css } from "@emotion/react";
import { darken, lighten } from "polished";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useClickAway, useKeyPress } from "ahooks";
import { useIntl } from "react-intl";
import { PagefindSearchFragment } from "../../types";
import SearchResults from "./SearchResults";

const searchStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;

  input {
    border: 2px solid ${darken(0.1, theme.colors.white)};
    color: ${theme.colors.white};
    border-radius: 4px;
    background-color: ${lighten(0.05, theme.colors.primary)};
    width: 100%;
    font-size: 1.2rem;
    padding: 0.4rem;

    &:focus {
      outline: none;
      box-shadow: 0 0 6px ${theme.colors.secondary};
    }
  }

  & > div {
    position: relative;
  }

  & > div > * {
    padding-top: 0.3rem;
    color: ${theme.colors.white};
    background-color: ${lighten(0.05, theme.colors.primary)};
    margin: 2px;
    z-index: 10;
    position: absolute;
    font-size: 1.2rem;
    top: 100%;
    left: 0;
    right: 0;

    & a {
    }
  }
`;

export function Search() {
  const [resultsHidden, setResultsHidden] = useState(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<PagefindSearchFragment[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  useClickAway(() => {
    setResultsHidden(true);
  }, ref);

  useKeyPress("esc", () => {
    setResultsHidden(true);
  });

  useEffect(() => {
    const runSearch = async () => {
      if (!globalThis.pagefind) {
        return;
      }
      const records = await globalThis.pagefind.debouncedSearch(search);
      if (records?.results) {
        setResults(
          await Promise.all(records.results.slice(0, 5).map((r) => r.data())),
        );
      } else {
        setResults([]);
      }
    };

    runSearch();
  }, [search]);

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.value) {
      setSearch("");
      return;
    }

    setSearch(e.target.value);
  };

  return (
    <div css={searchStyle} ref={ref}>
      <input
        type="search"
        onChange={onChange}
        onFocus={() => setResultsHidden(false)}
        placeholder={intl.formatMessage({ id: "search.placeholder" })}
      />
      <div>{!resultsHidden && <SearchResults results={results} />}</div>
    </div>
  );
}

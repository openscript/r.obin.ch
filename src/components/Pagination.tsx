import { Link } from 'gatsby';
import { Fragment } from 'react';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
};

export function Pagination({ currentPage, pageCount }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  let newestPath = '';
  let newerPath = '';
  let olderPath = '';
  let oldestPath = '';

  if (currentPage !== 1) {
    newestPath = `..`;
  }

  if (currentPage === 2) {
    newerPath = `../`;
  } else if (currentPage > 1) {
    newerPath = `../${currentPage - 2}`;
  }

  if (currentPage === 1) {
    olderPath = `./${currentPage}`;
  } else if (currentPage !== pageCount) {
    olderPath = `../${currentPage}`;
  }

  if (currentPage === 1) {
    oldestPath = `./${pageCount - 1}`;
  } else if (currentPage !== pageCount) {
    oldestPath = `../${pageCount - 1}`;
  }

  return (
    <Fragment>
      {newestPath && <Link to="..">Newest</Link>}
      {newerPath && <Link to={newerPath}>Newer</Link>}
      {olderPath && <Link to={olderPath}>Older</Link>}
      {oldestPath && <Link to={oldestPath}>Oldest</Link>}
    </Fragment>
  );
}

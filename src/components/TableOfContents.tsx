import { Link } from 'gatsby';
import { TableOfContents as TableOfContentsType, TableOfContentsItem as TableOfContentsItemType } from '../types';

type TableOfContentsItemProps = {
  items: TableOfContentsItemType[];
};

function TableOfContentsItem({ items }: TableOfContentsItemProps) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.url}>
          <Link to={item.url}>{item.title}</Link>
          {item.items && <TableOfContentsItem items={item.items} />}
        </li>
      ))}
    </ul>
  );
}

type TableOfContentsProps = {
  displayRootItem?: boolean;
  items: TableOfContentsType;
};

export function TableOfContents({ displayRootItem, items }: TableOfContentsProps) {
  if (!items.items) {
    return null;
  }

  let preparedItems = items.items;

  if (!displayRootItem && preparedItems.length === 1 && preparedItems[0].items !== undefined) {
    preparedItems = preparedItems[0].items;
  } else {
    return null;
  }

  return (
    <nav>
      <TableOfContentsItem items={preparedItems} />
    </nav>
  );
}

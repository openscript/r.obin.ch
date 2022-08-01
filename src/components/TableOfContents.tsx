import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
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

export function TableOfContents({ displayRootItem = false, items }: TableOfContentsProps) {
  if (!items.items) {
    return null;
  }

  let preparedItems = items.items;

  if (!displayRootItem && preparedItems.length <= 1 && !Array.isArray(preparedItems[0].items)) {
    return null;
  }

  if (!displayRootItem && Array.isArray(preparedItems[0].items)) {
    preparedItems = preparedItems[0].items;
  }

  return (
    <nav>
      <FormattedMessage id="component.tableOfContents.title" />
      <TableOfContentsItem items={preparedItems} />
    </nav>
  );
}

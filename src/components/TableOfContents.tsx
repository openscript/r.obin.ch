import { Link } from 'gatsby';
import { TableOfContents as TableOfContentsType, TableOfContentsItem as TableOfContentsItemType } from '../types';

type TableOfContentsItemProps = {
  items: TableOfContentsItemType[];
};

function TableOfContentsItem({ items }: TableOfContentsItemProps) {
  return (
    <ul>
      {items.map(item => (
        <li>
          <Link to={item.url}>{item.title}</Link>
          {item.items && <TableOfContentsItem items={item.items} />}
        </li>
      ))}
    </ul>
  );
}

type TableOfContentsProps = {
  items: TableOfContentsType;
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav>
      <TableOfContentsItem items={items.items} />
    </nav>
  );
}

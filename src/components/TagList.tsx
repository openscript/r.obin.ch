import { LocalizedLink } from 'gatsby-plugin-i18n-l10n';
import { CONFIGURATION } from '../configuration';

type TagListProps = {
  locale?: string;
  tags?: {
    slug?: string;
    title?: string;
  }[];
};

export function TagList({ locale, tags }: TagListProps) {
  if (!locale) {
    return null;
  }
  return (
    <ul>
      {tags?.map(t => (
        <li>
          <LocalizedLink to={`${CONFIGURATION.PATHS.TAG}/${t.slug}`}>{t.title}</LocalizedLink>
        </li>
      ))}
    </ul>
  );
}

import { css, Theme } from '@emotion/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReboundSection } from 'react-section-dividers';
import FooterNavigation from './FooterNavigation';

const footerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  color: ${theme.colors.bright};
  background-color: ${theme.colors.primary};
`;

const pageInfoStyles = css`
  width: 12.5rem;
`;

type FooterProps = {
  author?: string;
  project?: string;
  version?: string;
  buildTime?: string;
};

export function Footer({ author, project, version, buildTime }: FooterProps) {
  const intl = useIntl();
  return (
    <ReboundSection as="footer" position="top" flip="both" rebound={80} height={30} css={footerStyle}>
      <div css={pageInfoStyles}>
        <FormattedMessage
          id="pageInfoText"
          values={{ project, author, version, time: intl.formatTime(buildTime), date: intl.formatDate(buildTime) }}
        />
      </div>
      <FooterNavigation />
    </ReboundSection>
  );
}

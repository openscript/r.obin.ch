import { css, Theme } from '@emotion/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReboundSection } from 'react-section-dividers';
import FooterNavigation from './FooterNavigation';
import { useCSR } from '../../hooks/useCSR';

const footerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  color: ${theme.colors.bright};
  background-color: ${theme.colors.primary};
`;

const pageInfoStyles = css`
  width: 13rem;
`;

type FooterProps = {
  author?: string;
  project?: string;
  version?: string;
  buildTime?: string;
};

export function Footer({ author, project, version, buildTime }: FooterProps) {
  const isCSR = useCSR();
  const intl = useIntl();
  const formattedBuildTime = {
    date: intl.formatDate(buildTime, { timeZone: 'UTC' }),
    time: intl.formatTime(buildTime, { timeZone: 'UTC' }),
  };

  if (isCSR) {
    formattedBuildTime.date = intl.formatDate(buildTime);
    formattedBuildTime.time = intl.formatTime(buildTime);
  }

  return (
    <ReboundSection as="footer" position="top" flip="both" rebound={80} height={30} css={footerStyle}>
      <div css={pageInfoStyles}>
        <FormattedMessage
          id="pageInfoText"
          values={{
            project,
            author,
            version,
            ...formattedBuildTime,
          }}
        />
      </div>
      <FooterNavigation />
    </ReboundSection>
  );
}

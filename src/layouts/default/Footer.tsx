import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { FormattedDate, FormattedTime } from 'react-intl';
import { ReboundSection } from 'react-section-dividers';
import FooterNavigation from './FooterNavigation';

const footerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  color: ${theme.colors.bright};
  background-color: ${theme.colors.primary};
  font-size: 1.2rem;
`;

const pageInfoStyles = (theme: Theme) => css``;

type FooterProps = {
  author?: string;
  version?: string;
  buildTime?: string;
};

export function Footer({ author, version, buildTime }: FooterProps) {
  return (
    <ReboundSection as="footer" position="top" flip="both" rebound={80} height={30} css={footerStyle}>
      <div css={pageInfoStyles}>
        {author} {version}
        <FormattedDate value={buildTime} />
        <FormattedTime value={buildTime} />
      </div>
      <FooterNavigation />
    </ReboundSection>
  );
}

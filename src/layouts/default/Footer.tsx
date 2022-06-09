import { css, Theme } from '@emotion/react';
import { ReboundSection } from 'react-section-dividers';

const footerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  height: 8rem;
  color: ${theme.colors.bright};
  background-color: ${theme.colors.primary};
`;

type FooterProps = {
  author: string;
  version: string;
};

export function Footer({ author, version }: FooterProps) {
  return (
    <ReboundSection as="footer" position="top" flip="both" rebound={80} height={30} css={footerStyle}>
      {author} {version}
    </ReboundSection>
  );
}

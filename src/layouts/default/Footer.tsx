import { css, Theme } from '@emotion/react';
import { ReboundSection } from 'react-section-dividers';

const footerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  height: 3rem;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
`;

type FooterProps = {
  author: string;
  version: string;
};

export function Footer({ author, version }: FooterProps) {
  return (
    <ReboundSection as="footer" position="top" flip="both" rebound={20} height={30} css={footerStyle}>
      {author} {version}
    </ReboundSection>
  );
}

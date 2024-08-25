import { css, Theme } from "@emotion/react";
import { FormattedMessage, useIntl } from "react-intl";
import { Fragment } from "react";
import FooterNavigation from "./FooterNavigation";
import { useCSR } from "../../hooks/useCSR";
import { ReboundDivider } from "../../components/ReboundDivider";

const footerStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  color: ${theme.colors.bright};
  background-color: ${theme.colors.primary};
  font-size: 1.1rem;
  margin-top: -1px;
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
    date: intl.formatDate(buildTime, { timeZone: "UTC" }),
    time: intl.formatTime(buildTime, { timeZone: "UTC" }),
  };

  if (isCSR) {
    formattedBuildTime.date = intl.formatDate(buildTime);
    formattedBuildTime.time = intl.formatTime(buildTime);
  }

  return (
    <Fragment>
      <ReboundDivider flipHorizontally flipVertically />
      <footer css={footerStyle}>
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
      </footer>
    </Fragment>
  );
}

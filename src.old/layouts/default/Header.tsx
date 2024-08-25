import { Fragment } from "react";
import NavigationBar from "./NavigationBar";
import TopBar from "./TopBar";
import { ReboundDivider } from "../../components/ReboundDivider";

export function Header() {
  return (
    <Fragment>
      <TopBar />
      <NavigationBar />
      <ReboundDivider />
    </Fragment>
  );
}

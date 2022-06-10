import { Fragment } from 'react';
import NavigationBar from './NavigationBar';
import TopBar from './TopBar';

export function Header() {
  return (
    <Fragment>
      <TopBar />
      <NavigationBar />
    </Fragment>
  );
}

import { PropsWithChildren } from "react";

type AsideTitleProps = PropsWithChildren<{}>;

export function AsideHeading({ children }: AsideTitleProps) {
  return <h2>{children}</h2>;
}

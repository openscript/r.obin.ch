import { FormattedMessage } from "react-intl";
import { DefaultLayout } from "../layouts/DefaultLayout";

export default function NotFound() {
  return (
    <DefaultLayout>
      <h1>
        <FormattedMessage id="page.notFound.title" />
      </h1>
      <FormattedMessage id="page.notFound.content" />
    </DefaultLayout>
  );
}

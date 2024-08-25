import { Reporter } from "gatsby";
import { IntlShape, createIntl, createIntlCache } from "react-intl";
import deCHMessages from "../../content/i18n/de-CH.json";
import enUSMessages from "../../content/i18n/en-US.json";

const intlCache = createIntlCache();
const deCHIntl = createIntl(
  { locale: "de-CH", messages: deCHMessages },
  intlCache,
);
const enUSIntl = createIntl(
  { locale: "en-US", messages: enUSMessages },
  intlCache,
);

function getMessages(locale: string): IntlShape | undefined {
  switch (locale) {
    case "de-CH":
      return deCHIntl;
    case "en-US":
      return enUSIntl;
    default:
      return undefined;
  }
}

export function getIntl(locale: string, reporter: Reporter) {
  const intl = getMessages(locale);

  if (!intl) {
    reporter.warn(`Couldn't find messages for locale ${locale}.`);
    return undefined;
  }

  intl.onWarn = (warning: string) => reporter.warn(warning);

  return intl;
}

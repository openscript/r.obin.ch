import { Reporter } from 'gatsby';
import deCHMessages from '../../content/i18n/de-CH.json';
import enUSMessages from '../../content/i18n/en-US.json';

function getMessages(locale: string): Record<string, string> | undefined {
  switch (locale) {
    case 'de-CH':
      return deCHMessages;
    case 'en-US':
      return enUSMessages;
    default:
      return undefined;
  }
}
export function getMessage(locale: string, key: string, reporter: Reporter) {
  const messages = getMessages(locale);

  if (!messages) {
    reporter.warn(`Couldn't find messages for locale ${locale}.`);
    return undefined;
  }

  if (key in messages) {
    return messages[key];
  }
  reporter.warn(`Missing key ${key} for ${locale}.`);
  return undefined;
}

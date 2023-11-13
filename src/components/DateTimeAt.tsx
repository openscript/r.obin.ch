import { FormattedDate, FormattedTime } from 'react-intl';
import { Fragment } from 'react';
import { useCSR } from '../hooks/useCSR';

type DateTimeAtProps = {
  dateTime: string;
};

export function DateTimeAt({ dateTime }: DateTimeAtProps) {
  const isCSR = useCSR();

  return (
    <Fragment>
      <FormattedDate value={dateTime} timeZone={isCSR ? undefined : 'utc'} /> <FormattedTime value={dateTime} timeZone={isCSR ? undefined : 'utc'} />
    </Fragment>
  );
}

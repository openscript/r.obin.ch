import { FormattedMessage } from 'react-intl';

export function ShareButton() {
  if (!window?.navigator || 'share' in window.navigator === false) {
    return null;
  }

  const onShare = () => {
    navigator.share();
  };

  return (
    <button type="button" onClick={onShare}>
      <FormattedMessage id="components.shareButton.share" />
    </button>
  );
}

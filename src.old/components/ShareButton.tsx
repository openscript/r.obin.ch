import { FormattedMessage } from "react-intl";

type ShareButtonProps = {
  text?: string;
  title?: string;
  url?: string;
};

export function ShareButton({ text, title, url }: ShareButtonProps) {
  if (
    typeof window === "undefined" ||
    !window.navigator ||
    "share" in window.navigator === false
  ) {
    return null;
  }

  const shareData: ShareData = {
    title: title || document.title,
    text,
    url: url || document.location.href,
  };

  const onShare = async () => {
    await navigator.share(shareData);
  };

  return (
    <button type="button" onClick={onShare} aria-label="Share">
      <FormattedMessage id="components.shareButton.share" />
    </button>
  );
}

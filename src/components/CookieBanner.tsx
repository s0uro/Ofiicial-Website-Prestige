import * as React from 'react';
import {
  CONSENT_ACCEPTED,
  CONSENT_DECLINED,
  readConsent,
  setConsent,
} from '../lib/consent';

interface Props {
  /**
   * True when an advertising pixel is configured for this deployment. The
   * banner has to describe what it is actually asking permission for, and that
   * differs between a build with the TikTok pixel and one without.
   */
  adsEnabled?: boolean;
}

export function CookieBanner({
  adsEnabled = false,
}: Props): React.ReactElement | null {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (readConsent() === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setConsent(CONSENT_ACCEPTED);
    setVisible(false);
  }

  function decline() {
    setConsent(CONSENT_DECLINED);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)] md:bottom-4 md:left-auto md:right-4 md:inset-x-auto"
    >
      <div className="border-t border-gold/20 bg-bg/95 backdrop-blur-md px-5 py-5 shadow-card-hover md:max-w-sm md:rounded-xl md:border">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          Cookies
        </p>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {adsEnabled ? (
            <>
              We use Google Maps, which sets cookies when the map loads. If you
              accept, we also load the TikTok pixel so we can measure which of
              our ads bring people here. Decline and no advertising cookies are
              set.{' '}
            </>
          ) : (
            <>
              We use Google Maps which sets cookies when the map loads. No
              advertising or tracking cookies are used.{' '}
            </>
          )}
          <a
            href="/legal/privacy"
            className="text-gold underline-offset-2 hover:underline"
          >
            Privacy policy
          </a>
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={accept}
            className="flex-1 rounded-lg bg-gradient-to-br from-gold-soft via-gold to-gold-deep py-2.5 text-sm font-semibold text-bg shadow-glow-sm transition-opacity hover:opacity-90"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="flex-1 rounded-lg border border-gold/30 bg-gold/5 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:border-gold/50 hover:text-fg"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

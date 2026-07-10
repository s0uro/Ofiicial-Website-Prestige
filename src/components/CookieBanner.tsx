import * as React from 'react';

const STORAGE_KEY = 'sp_cookie_consent';

export function CookieBanner(): React.ReactElement | null {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
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
          We use Google Maps which sets cookies when the map loads. No
          advertising or tracking cookies are used.{' '}
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

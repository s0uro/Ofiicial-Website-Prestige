/**
 * Cookie-consent state shared by the banner and any consent-gated script.
 *
 * Default is "no decision yet", which must be treated as a refusal: under the
 * ePrivacy Directive as implemented in Cyprus, advertising cookies may only be
 * set after an affirmative opt-in.
 */

export const CONSENT_STORAGE_KEY = 'sp_cookie_consent';

/** Dispatched on `window` when the visitor answers the banner. */
export const CONSENT_EVENT = 'sp:consent';

export const CONSENT_ACCEPTED = 'accepted';
export const CONSENT_DECLINED = 'declined';

export type ConsentValue = typeof CONSENT_ACCEPTED | typeof CONSENT_DECLINED;

/** Returns the stored decision, or `null` if the visitor has not answered. */
export function readConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === CONSENT_ACCEPTED || value === CONSENT_DECLINED
      ? value
      : null;
  } catch {
    // Private mode / storage disabled — treat as undecided.
    return null;
  }
}

/** Stores the decision and notifies consent-gated scripts in the same page. */
export function setConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Ignore — the event below still gates scripts for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

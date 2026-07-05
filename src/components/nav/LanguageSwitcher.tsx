import * as React from 'react';
import { getLang, setLang, type Lang } from '../../lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'el', label: 'GR' },
  { code: 'ru', label: 'RU' },
];

export default function LanguageSwitcher(): React.ReactElement {
  const [active, setActive] = React.useState<Lang>('en');

  React.useEffect(() => {
    setActive(getLang());
    const handle = (e: Event) => setActive((e as CustomEvent<Lang>).detail);
    window.addEventListener('sprestige:lang', handle);
    return () => window.removeEventListener('sprestige:lang', handle);
  }, []);

  return (
    <div
      className="flex items-center text-[10px] font-semibold uppercase tracking-[0.15em]"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l, i) => (
        <React.Fragment key={l.code}>
          {i > 0 && (
            <span className="mx-0.5 select-none text-gold/30" aria-hidden="true">
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(l.code)}
            className={`px-1 py-0.5 transition-colors ${
              active === l.code ? 'text-gold' : 'text-fg-muted hover:text-fg'
            }`}
            aria-pressed={active === l.code}
          >
            {l.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

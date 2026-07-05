import * as React from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEL_AUTO } from '../../lib/wa';
import { ui, getLang, type Lang } from '../../lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface NavItem {
  label: string;
  href: string;
  key?: string;
}

interface Props {
  items: NavItem[];
}

function useLang(): Lang {
  const [lang, setLangState] = React.useState<Lang>(() =>
    typeof window === 'undefined' ? 'en' : getLang()
  );
  React.useEffect(() => {
    const handle = (e: Event) => setLangState((e as CustomEvent<Lang>).detail);
    window.addEventListener('sprestige:lang', handle);
    return () => window.removeEventListener('sprestige:lang', handle);
  }, []);
  return lang;
}

export default function MobileMenu({ items }: Props): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const lang = useLang();

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      document.body.dataset.menuOpen = 'true';
    } else {
      delete document.body.dataset.menuOpen;
    }
    return () => {
      document.body.style.overflow = '';
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function label(item: NavItem): string {
    if (!item.key) return item.label;
    return ui[lang].nav[item.key as keyof typeof ui.en.nav] || item.label;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 text-fg transition-colors hover:bg-fg/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex min-h-dvh flex-col bg-bg lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-gold/10 px-5">
              <span className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide text-fg">
                <img
                  src="/logo-mark.png"
                  alt=""
                  width="32"
                  height="32"
                  className="h-7 w-7"
                  aria-hidden
                />
                <span>
                  <span className="text-gold">S.</span>Prestige
                </span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-2 text-fg transition-colors hover:bg-fg/5"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-col gap-1 px-5 py-8"
            >
              {items.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="py-3 text-xl text-fg transition-colors hover:text-gold"
                >
                  {label(item)}
                </motion.a>
              ))}
            </motion.nav>
            <div className="mt-auto border-t border-gold/10 px-5 py-6">
              <div className="mb-4 flex justify-center">
                <LanguageSwitcher />
              </div>
              <a
                href={`tel:${TEL_AUTO}`}
                onClick={() => setOpen(false)}
                className="group relative flex items-center justify-center gap-3 rounded-full border border-gold/40 bg-bg/60 px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:border-gold hover:bg-gold/10"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span>{ui[lang].emergency}</span>
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

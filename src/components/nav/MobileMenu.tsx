import * as React from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEL_AUTO, WA_AUTO } from '../../lib/wa';

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  items: NavItem[];
}

export default function MobileMenu({ items }: Props): React.ReactElement {
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-fg transition-colors hover:bg-fg/5 lg:hidden"
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
                className="inline-flex items-center justify-center rounded-lg p-2 text-fg transition-colors hover:bg-fg/5"
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
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>

            <div className="flex items-center justify-center gap-4 border-t border-gold/10 px-5 py-5">
              <a
                href={`https://wa.me/${WA_AUTO}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-bg-elev text-fg-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.75.95-.92 1.14-.17.2-.34.22-.63.08-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.61.15-.15.34-.4.5-.6.17-.2.22-.34.34-.57.11-.23.06-.42-.04-.6-.1-.16-.9-2.17-1.23-2.97-.24-.6-.5-.52-.7-.53h-.6c-.2 0-.53.08-.72.4-.2.3-.75 1.15-.75 2.8 0 1.65 1.2 3.24 1.37 3.47.17.23 2.36 3.62 5.72 4.93 3.37 1.3 3.37.87 3.98.81.6-.06 1.94-.79 2.22-1.55.27-.76.27-1.42.19-1.55-.08-.14-.3-.23-.63-.38z"/>
                  <path d="M12.04 2C6.5 2 2 6.48 2 12c0 2.06.61 3.98 1.66 5.58L2 22l4.6-1.53A9.94 9.94 0 0 0 12.04 22C17.58 22 22 17.52 22 12S17.58 2 12.04 2zm0 18.1a8.1 8.1 0 0 1-4.34-1.26l-.31-.19-3.03 1 1-2.94-.2-.32A8.06 8.06 0 0 1 3.9 12c0-4.5 3.66-8.16 8.14-8.16 4.48 0 8.14 3.66 8.14 8.16 0 4.5-3.66 8.1-8.14 8.1z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/prestige_detailing.cy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="S.Prestige on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-bg-elev text-fg-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
              </a>
              <a
                href={`tel:${TEL_AUTO}`}
                aria-label="Call us"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-bg-elev text-fg-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 px-5 pb-8 text-xs font-medium uppercase tracking-[0.18em]">
              <span className="rounded-lg bg-bg-elev px-3 py-1.5 text-gold">EN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center justify-center rounded-2xl p-3 text-black transition-colors"
        aria-label="Open menu"
        aria-expanded={open}
      >
        {open ? <X className="h-9 w-9" strokeWidth={2.75} aria-hidden /> : <Menu className="h-9 w-9" strokeWidth={2.75} aria-hidden />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-[60] mt-3 w-[min(90vw,22rem)] rounded-3xl bg-bg-elev p-4 shadow-card"
          >
            <nav className="flex flex-col gap-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-lg text-fg transition-colors hover:bg-bg hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-3 flex items-center justify-center gap-4 border-t border-gold/10 pt-3">
              <a
                href={`https://wa.me/${WA_AUTO}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white"
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/Prestige-Detailing/100076279789752/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="S.Prestige on Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.49-1.46H17V4.4c-.27-.04-1.23-.12-2.34-.12-2.32 0-3.91 1.42-3.91 4.02v2.25H8v3h2.75V21h2.75Z" />
                </svg>
              </a>
              <a
                href={`tel:${TEL_AUTO}`}
                aria-label="Call us"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-bg text-fg-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </div>

            <div className="mt-3 flex items-center justify-center border-t border-gold/10 pt-3 text-xs font-medium uppercase tracking-[0.18em]">
              <span className="rounded-lg bg-bg px-3 py-1.5 text-gold">EN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

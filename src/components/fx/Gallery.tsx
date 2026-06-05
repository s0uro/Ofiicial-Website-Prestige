import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface GalleryImage {
  thumb: string;
  full: string;
  alt: string;
  width: number;
  height: number;
}

interface Props {
  images: GalleryImage[];
}

export default function Gallery({ images }: Props): React.ReactElement {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const next = React.useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );
  const prev = React.useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, next, prev]);

  const open = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-4">
        {images.map((img, i) => (
          <li
            key={i}
            className="basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.667rem)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md border border-gold/10 bg-bg-elev transition-[border-color,box-shadow] duration-300 ease-out hover:border-gold/30 hover:shadow-glow-sm"
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <img
                src={img.thumb}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && openIndex !== null && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <motion.img
              key={openIndex}
              src={open.full}
              alt={open.alt}
              className="max-h-[88vh] max-w-[92vw] select-none object-contain"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-bg/60 text-fg transition-colors hover:border-gold/60 hover:bg-gold/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-bg/60 text-fg transition-colors hover:border-gold/60 hover:bg-gold/10 md:left-8"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-bg/60 text-fg transition-colors hover:border-gold/60 hover:bg-gold/10 md:right-8"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-gold/20 bg-bg/60 px-3 py-1 font-display text-xs uppercase tracking-[0.2em] text-fg-muted"
                  aria-live="polite"
                >
                  {openIndex + 1} / {images.length}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

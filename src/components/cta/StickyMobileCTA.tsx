import * as React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWaUrl, telFor, type Lane, type TemplateKey } from '../../lib/wa';
import { cn } from '../../lib/cn';

interface Props {
  lane: 'auto' | 'tourism' | 'both';
  className?: string;
}

const CONTACT_TEMPLATE: Record<Lane, TemplateKey> = {
  auto: 'contact.auto',
  tourism: 'contact.tourism',
};

function LaneActions({ lane }: { lane: Lane }): React.ReactElement {
  return (
    <>
      <a
        href={buildWaUrl(CONTACT_TEMPLATE[lane])}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-gold transition-colors hover:bg-gold/5"
      >
        <MessageCircle className="h-3.5 w-3.5" aria-hidden />
        WhatsApp
      </a>
      <a
        href={`tel:${telFor(lane)}`}
        className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-fg transition-colors hover:bg-fg/5"
      >
        <Phone className="h-3.5 w-3.5" aria-hidden />
        Call
      </a>
    </>
  );
}

export function StickyMobileCTA({ lane, className }: Props): React.ReactElement {
  const base = cn(
    'fixed inset-x-0 bottom-0 z-40 border-t border-gold/15 bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/70 md:hidden',
    className,
  );

  if (lane === 'both') {
    return (
      <div className={base} data-sticky-cta role="toolbar" aria-label="Quick contact — Auto and Rentals">
        <div className="grid grid-cols-2 divide-x divide-gold/10">
          <div>
            <div className="px-3 pt-1.5 text-[9px] uppercase tracking-[0.2em] text-fg-muted">
              Auto
            </div>
            <div className="grid grid-cols-2 divide-x divide-gold/5">
              <LaneActions lane="auto" />
            </div>
          </div>
          <div>
            <div className="px-3 pt-1.5 text-[9px] uppercase tracking-[0.2em] text-fg-muted">
              Rentals
            </div>
            <div className="grid grid-cols-2 divide-x divide-gold/5">
              <LaneActions lane="tourism" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={base}
      data-sticky-cta
      role="toolbar"
      aria-label={lane === 'auto' ? 'Auto — quick contact' : 'Rentals — quick contact'}
    >
      <div className="grid grid-cols-2 divide-x divide-gold/10">
        <LaneActions lane={lane} />
      </div>
    </div>
  );
}

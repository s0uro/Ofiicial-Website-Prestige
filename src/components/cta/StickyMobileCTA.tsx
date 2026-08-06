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
        aria-label="Message us on WhatsApp"
        className="flex items-center justify-center py-3 text-gold transition-colors active:bg-gold/10"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
      </a>
      <a
        href={`tel:${telFor(lane)}`}
        aria-label="Call us"
        className="flex items-center justify-center py-3 text-fg-muted transition-colors active:bg-fg/5"
      >
        <Phone className="h-5 w-5" aria-hidden />
      </a>
    </>
  );
}

export function StickyMobileCTA({ lane, className }: Props): React.ReactElement {
  const base = cn(
    'fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-bg/92 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75 md:hidden pb-[env(safe-area-inset-bottom)]',
    className,
  );

  if (lane === 'both') {
    return (
      <div className={base} data-sticky-cta role="toolbar" aria-label="Quick contact — Auto and Rentals">
        <div className="grid grid-cols-2 divide-x divide-gold/12">
          <div className="grid grid-cols-2 divide-x divide-gold/8">
            <LaneActions lane="auto" />
          </div>
          <div className="grid grid-cols-2 divide-x divide-gold/8">
            <LaneActions lane="tourism" />
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
      <div className="grid grid-cols-2 divide-x divide-gold/12">
        <LaneActions lane={lane} />
      </div>
    </div>
  );
}

import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button, type ButtonSize, type ButtonVariant } from '../primitives/Button';
import { buildWaUrl, type TemplateKey } from '../../lib/wa';

interface Props {
  template: TemplateKey;
  vars?: Record<string, string | number | undefined>;
  size?: ButtonSize;
  variant?: Extract<ButtonVariant, 'primary' | 'secondary' | 'whatsapp'>;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  template,
  vars,
  size = 'md',
  variant = 'primary',
  className,
  children,
}: Props): React.ReactElement {
  const href = buildWaUrl(template, vars);
  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {children ?? 'WhatsApp'}
    </Button>
  );
}

import * as React from 'react';
import { Phone } from 'lucide-react';
import { Button, type ButtonSize, type ButtonVariant } from '../primitives/Button';
import { telHrefFor } from '../../lib/tel';
import { displayPhoneFor, type Lane } from '../../lib/wa';

interface Props {
  lane: Lane;
  size?: ButtonSize;
  variant?: Extract<ButtonVariant, 'primary' | 'secondary' | 'call' | 'ghost'>;
  showNumber?: boolean;
  className?: string;
}

export function CallButton({
  lane,
  size = 'md',
  variant = 'call',
  showNumber = true,
  className,
}: Props): React.ReactElement {
  return (
    <Button
      href={telHrefFor(lane)}
      variant={variant}
      size={size}
      className={className}
    >
      <Phone className="h-4 w-4" aria-hidden />
      {showNumber ? displayPhoneFor(lane) : 'Call'}
    </Button>
  );
}

import React from 'react';

import { cn, isStringValid } from '@/lib/utils';

export function ResumeSummary({
  summary,
  className,
  ...props
}: ResumeSummaryProps) {
  if (!isStringValid(summary)) {
    return null;
  }
  return (
    <p id="summary" className={cn('text-xs', className)} {...props}>
      {summary}
    </p>
  );
}

export type ResumeSummaryProps = React.ComponentProps<'div'> & {
  summary: string;
};

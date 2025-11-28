import type { Summary } from '@/lib/types';

import React from 'react';

import { cn } from '@/lib/utils';

export function ResumePreviewSummary({
  data,
  className,
  ...props
}: ResumeSummaryProps) {
  return (
    <p id="summary" className={cn('text-xs', className)} {...props}>
      {data.summary}
    </p>
  );
}

export type ResumeSummaryProps = React.ComponentProps<'div'> & {
  data: Summary;
};

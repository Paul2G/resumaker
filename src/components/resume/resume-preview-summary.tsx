import type { Summary } from '@/lib/types';

import { isStringValid } from '@/lib/utils';

export function ResumePreviewSummary({ data, ...props }: ResumeSummaryProps) {
  if (!isStringValid(data.summary)) return null;

  return (
    <section className="resume__section resume__section--summary" {...props}>
      <p>{data.summary}</p>
    </section>
  );
}

export type ResumeSummaryProps = React.ComponentProps<'div'> & {
  data: Summary;
};

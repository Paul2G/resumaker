import type { Language } from '@/constants/locales';
import type { ResumeIndex } from '@/types/resume';

import { TrashIcon } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumeProvider } from '@/contexts/resume-provider';
import { ResumeDeleteModalTrigger } from '@/components/resume-delete-modal-trigger';
import { ResumePreview } from '@/components/resume/resume-preview';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { useResumeThumbnailScale } from '@/hooks/use-resume-thumbnail-scale';
import { formatDate } from '@/lib/dates';
import { cn } from '@/lib/utils';
import { resumeQueryOptions } from '@/api/query-options';

export function ResumeCard({
  resumeIndex,
  className,
  ...restOfProps
}: ResumeCardProps) {
  const { t, i18n } = useTranslation();
  const { data: resume } = useQuery(resumeQueryOptions(resumeIndex.id));
  const { containerRef, scale, thumbnailHeight, resumeNaturalWidth } =
    useResumeThumbnailScale();

  if (!resume) return null;

  return (
    <Item
      variant="outline"
      size="xs"
      className={cn(
        'relative group cursor-pointer',
        'flex-col items-stretch h-full overflow-hidden p-0',
        className,
      )}
      {...restOfProps}
    >
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-t-md bg-white flex-shrink-0"
        style={{ height: thumbnailHeight }}
      >
        <ResumeProvider currentResume={resume}>
          <ResumePreview
            resume={resume}
            className="pointer-events-none select-none absolute top-0 left-0"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: resumeNaturalWidth,
            }}
          />
        </ResumeProvider>
      </div>

      {/* Content + actions */}
      <div className="flex items-center gap-2 min-w-0 max-w-full px-3 py-2">
        <ItemContent className="min-w-0 flex-1">
          <Link
            to="/resumes/$resumeId"
            params={{ resumeId: resume.id }}
            className="before:absolute before:content-[''] before:inset-0"
          >
            <ItemTitle className="max-w-full overflow-hidden truncate">
              {resume.config.name}
            </ItemTitle>
          </Link>
          <ItemDescription className="truncate">
            {`${t('resume:fields.updatedAt')}: ${formatDate(
              resumeIndex.updatedAt,
              'DD/MMMM/YYYY, HH:mm:ss',
              i18n.language as Language,
            )}`}
          </ItemDescription>
        </ItemContent>

        <ItemActions className="flex-shrink-0 z-10">
          <ResumeDeleteModalTrigger resumeId={resume.id} asChild>
            <Button variant="destructive" size="icon">
              <TrashIcon />
            </Button>
          </ResumeDeleteModalTrigger>
        </ItemActions>
      </div>
    </Item>
  );
}

export type ResumeCardProps = Omit<React.ComponentProps<typeof Item>, 'ref'> & {
  resumeIndex: ResumeIndex;
};

import type { ResumeIndex } from '@/types';

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
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { resumeQueryOptions } from '@/api/query-options';
import { localeData } from '@/constants/locales';

export function ResumeCard({ resumeIndex }: ResumeCardProps) {
  const { t } = useTranslation();

  const { data: resume } = useQuery(resumeQueryOptions(resumeIndex.id));

  if (!resume) return null;

  return (
    <Item
      key={resume.id}
      variant="outline"
      className="relative group cursor-pointer"
    >
      <ItemHeader className="relative overflow-hidden w-full rounded-sm">
        <ResumeProvider currentResume={resume} onSave={() => {}}>
          <ResumePreview
            resume={resume}
            className="w-full h-64 pointer-events-none select-none scale-[37%] origin-top-left group-hover:brightness-80 transition-all"
          />
        </ResumeProvider>
      </ItemHeader>
      <ItemContent>
        <Link
          to="/resumes/$resumeId"
          params={{ resumeId: resume.id }}
          className="before:absolute before:content-[''] before:inset-0"
        >
          <ItemTitle>{resume.config.name}</ItemTitle>
        </Link>
        <ItemDescription>
          {localeData[resume.config.language].langLabel}
          {` | `}
          {t(`resume:values.paperSize.${resume.config.paperSize}`)}
          {` | `}
          {t(`resume:values.fontFamily.${resume.config.fontFamily}`)}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="flex items-streetch z-10">
        <ResumeDeleteModalTrigger resumeId={resume.id} asChild>
          <Button variant="destructive" size="icon">
            <TrashIcon />
          </Button>
        </ResumeDeleteModalTrigger>
      </ItemActions>
    </Item>
  );
}

export type ResumeCardProps = {
  resumeIndex: ResumeIndex;
};

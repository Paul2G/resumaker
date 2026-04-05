import { PlusIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumeCard } from '@/components/resume-card';
import { ResumeCreateModalTrigger } from '@/components/resume-create-modal-trigger';
import { Item, ItemContent, ItemGroup, ItemTitle } from '@/components/ui/item';
import { Typography } from '@/components/ui/typography';
import { resumesIndexQueryOptions } from '@/api/query-options';

export const Route = createFileRoute('/resumes/')({
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const { data: resumes } = useSuspenseQuery(resumesIndexQueryOptions());

  return (
    <main className="w-full flex justify-center p-8">
      <div className=" w-full max-w-screen-lg flex flex-col gap-6">
        <Typography as="h1" variant="h3">
          {t('labels.yourSavedResumes')}
        </Typography>
        <ItemGroup className="grid grid-cols-3 gap-4">
          <ResumeCreateModalTrigger asChild>
            <Item variant="outline" asChild>
              <a className="cursor-pointer min-h-72">
                <ItemContent className="flex items-center justify-center gap-2">
                  <PlusIcon className="size-8" />
                  <ItemTitle className="text-lg">
                    {t('actions.createNewResume')}
                  </ItemTitle>
                </ItemContent>
              </a>
            </Item>
          </ResumeCreateModalTrigger>
          {resumes.map((r) => (
            <ResumeCard resumeIndex={r} />
          ))}
        </ItemGroup>
      </div>
    </main>
  );
}

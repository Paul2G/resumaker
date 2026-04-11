import { DownloadSimpleIcon, PlusIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumeCard } from '@/components/resume-card';
import { ResumeCreateModalTrigger } from '@/components/resume-create-modal-trigger';
import { ResumeImportModalTrigger } from '@/components/resume-import-modal-trigger';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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
        <Typography
          as="h1"
          variant="h3"
          className="animate-in fill-mode-backwards fade-in-0 zoom-in-95 duration-500"
        >
          {t('labels.yourSavedResumes')}
        </Typography>
        <ItemGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AspectRatio ratio={1} className="rounded flex flex-col gap-4">
            <ResumeCreateModalTrigger asChild>
              <Item
                variant="outline"
                className=" grow cursor-pointer hover:bg-secondary/50 animate-in fill-mode-backwards fade-in-0 zoom-in-95 duration-500 delay-0"
              >
                <ItemContent className="flex items-center justify-center gap-2">
                  <PlusIcon className="size-6 md:size-8" />
                  <ItemTitle className="text-base md:text-lg">
                    {t('actions.createNewResume')}
                  </ItemTitle>
                </ItemContent>
              </Item>
            </ResumeCreateModalTrigger>
            <ResumeImportModalTrigger asChild>
              <Item
                variant="outline"
                className=" grow cursor-pointer hover:bg-secondary/50 animate-in fill-mode-backwards fade-in-0 zoom-in-95 duration-500 delay-100"
              >
                <ItemContent className="flex items-center justify-center gap-2">
                  <DownloadSimpleIcon className="size-6 md:size-8" />
                  <ItemTitle className="text-base md:text-lg">
                    {t('actions.importResume')}
                  </ItemTitle>
                </ItemContent>
              </Item>
            </ResumeImportModalTrigger>
          </AspectRatio>
          {resumes.map((r, i) => (
            <AspectRatio ratio={1} key={r.id}>
              <ResumeCard
                resumeIndex={r}
                className="hover:bg-secondary/50 animate-in fill-mode-backwards fade-in-0 zoom-in-95 duration-500"
                style={{
                  animationDelay: `${(i + 2) * 100}ms`,
                }}
              />
            </AspectRatio>
          ))}
        </ItemGroup>
      </div>
    </main>
  );
}

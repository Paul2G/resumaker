import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumeCreateModalTrigger } from '@/components/resume-create-modal-trigger';
import { ResumeDeleteModalTrigger } from '@/components/resume-delete-modal-trigger';
import { ResumePreview } from '@/components/resume/resume-preview';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { Typography } from '@/components/ui/typography';
import { useResumesIndex } from '@/hooks/use-resumes-index';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const { resumes, getResume } = useResumesIndex();

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
                  <i className="ph-bold ph-plus text-5xl text-muted-foreground" />
                  <ItemTitle className="text-lg">
                    {t('actions.createNewResume')}
                  </ItemTitle>
                </ItemContent>
              </a>
            </Item>
          </ResumeCreateModalTrigger>
          {resumes.map((r) => {
            const resume = getResume(r.id)!;

            if (!resume) return null;

            return (
              <Item
                key={resume.id}
                variant="outline"
                className="relative group cursor-pointer"
              >
                <ItemHeader className="relative overflow-hidden w-full rounded-sm">
                  <ResumePreview
                    resume={resume}
                    className="w-full h-64 pointer-events-none select-none scale-[37%] origin-top-left group-hover:brightness-80 transition-all"
                  />
                </ItemHeader>
                <ItemContent>
                  <Link
                    to="/$resumeId"
                    params={{ resumeId: resume.id }}
                    className="before:absolute before:content-[''] before:inset-0"
                  >
                    <ItemTitle>{resume.config.name}</ItemTitle>
                  </Link>
                  <ItemDescription>{resume.config.name}</ItemDescription>
                </ItemContent>
                <ItemActions className="flex items-streetch z-10">
                  <ResumeDeleteModalTrigger resumeId={resume.id} asChild>
                    <Button variant="destructive" size="icon">
                      <i className="ph-light ph-trash text-lg" />
                    </Button>
                  </ResumeDeleteModalTrigger>
                </ItemActions>
              </Item>
            );
          })}
        </ItemGroup>
      </div>
    </main>
  );
}

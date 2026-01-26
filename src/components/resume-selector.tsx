import {
  CaretDownIcon,
  FileDashedIcon,
  PlusIcon,
  ReadCvLogoIcon,
} from '@phosphor-icons/react';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumeCreateModalTrigger } from '@/components/resume-create-modal-trigger';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Typography } from '@/components/ui/typography';
import { useResumesIndex } from '@/hooks/use-resumes-index';
import { stringTruncate } from '@/lib/utils';

export function ResumeSelector() {
  const { t } = useTranslation();
  const resumeApi = getRouteApi('/$resumeId');
  const navigate = useNavigate();

  const { resumes } = useResumesIndex();

  const selectedResume = resumeApi.useLoaderData()?.resume;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <div className="flex items-center gap-1">
            {selectedResume ? (
              <>
                <ReadCvLogoIcon />
                {stringTruncate(selectedResume.name)}
              </>
            ) : (
              <>
                <FileDashedIcon />
                {t('actions.selectResume')}
              </>
            )}
          </div>
          <CaretDownIcon weight="bold" className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <ResumeCreateModalTrigger>
            <DropdownMenuItem className="cursor-pointer">
              <PlusIcon />
              {t('actions.createNewResume')}
            </DropdownMenuItem>
          </ResumeCreateModalTrigger>
        </DropdownMenuGroup>
        {resumes.length > 0 && (
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <Typography variant="muted">{t('labels.allResumes')}</Typography>
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={selectedResume?.id}
              onValueChange={(value) =>
                navigate({ to: '/$resumeId', params: { resumeId: value } })
              }
            >
              {resumes.map((resume) => (
                <DropdownMenuRadioItem value={resume.id} key={resume.id}>
                  {stringTruncate(resume.name)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

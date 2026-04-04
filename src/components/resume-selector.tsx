import {
  CaretDownIcon,
  FileDashedIcon,
  PlusIcon,
  ReadCvLogoIcon,
} from '@phosphor-icons/react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { ResumeCreateModalTrigger } from '@/components/resume-create-modal-trigger';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
  const navigate = useNavigate();
  const { resumeId } = useParams({ from: '/resumes/$resumeId' });

  const { resumes, getResume } = useResumesIndex();

  const selectedResume = getResume(resumeId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <div className="flex items-center gap-1">
            {selectedResume ? (
              <>
                <ReadCvLogoIcon />
                {stringTruncate(selectedResume.config.name)}
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
            <Button type="button" variant="ghost">
              <PlusIcon />
              {t('actions.createNewResume')}
            </Button>
          </ResumeCreateModalTrigger>
        </DropdownMenuGroup>
        {resumes.length > 0 && (
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <Link to="/">
                <Typography variant="muted" className="hover:underline">
                  {t('labels.allResumes')}
                </Typography>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={selectedResume?.id}
              onValueChange={(value) =>
                navigate({
                  to: '/resumes/$resumeId',
                  params: { resumeId: value },
                })
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

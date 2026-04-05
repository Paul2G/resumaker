import {
  CaretDownIcon,
  FileDashedIcon,
  PlusIcon,
  ReadCvLogoIcon,
} from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
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
import { stringTruncate } from '@/lib/utils';
import { resumesIndexQueryOptions } from '@/api/query-options';

export function ResumeSelector() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { resumeId } = useParams({ from: '/resumes/$resumeId' });
  const { data: resumes } = useSuspenseQuery(resumesIndexQueryOptions());

  const selectedResume = resumes.find((r) => r.id === resumeId);

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

import { useState } from 'react';
import {
  CaretDownIcon,
  FileDashedIcon,
  PlusIcon,
  ReadCvLogoIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useResumesIndex } from '@/hooks/use-resumes-index';
import { stringTruncate } from '@/lib/utils';

export function ResumeSelector() {
  const { t } = useTranslation();
  const { resumes, selectedResume, setSelectedResume, createResume } =
    useResumesIndex();
  const [newResumeName, setNewResumeName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <div className="flex gap-2">
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
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <PlusIcon />
                {t('actions.createNewResume')}
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
          {resumes.length > 0 && (
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <Typography variant="muted">
                  {t('labels.allResumes')}
                </Typography>
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={selectedResume?.id}
                onValueChange={(value) => setSelectedResume(value)}
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new resume</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new resume.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            value={newResumeName}
            onChange={({ target }) => setNewResumeName(target.value)}
          ></Input>
        </Field>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={newResumeName.trim().length === 0}
            onClick={() => {
              createResume(newResumeName.trim());
              setNewResumeName('');
              setIsDialogOpen(false);
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

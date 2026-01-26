import { useState } from 'react';
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
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useResumesIndex } from '@/hooks/use-resumes-index';

export function ResumeCreateModalTrigger({
  children,
}: ResumeCreateModalTriggerProps) {
  const { t } = useTranslation();
  const { createResume } = useResumesIndex();

  const [newResumeName, setNewResumeName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('core:dialogs.createNewResume.title')}</DialogTitle>
          <DialogDescription>
            {t('core:dialogs.createNewResume.description')}
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel>{t('resume:fields.name')}</FieldLabel>
          <Input
            placeholder={t('resume:placeholders.name')}
            value={newResumeName}
            onChange={({ target }) => setNewResumeName(target.value)}
          ></Input>
        </Field>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            {t('dialogs.cancel')}
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
            {t('actions.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export type ResumeCreateModalTriggerProps = {
  children: React.ReactNode;
};

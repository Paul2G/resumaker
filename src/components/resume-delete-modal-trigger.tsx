import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useResumesIndex } from '@/hooks/use-resumes-index';

export function ResumeDeleteModalTrigger({
  resumeId,
  children,
  asChild,
}: ResumeDeleteModalTriggerProps) {
  const { t } = useTranslation();
  const { removeResume } = useResumesIndex();

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dialogs.deleteResume.title')}</DialogTitle>
          <DialogDescription>
            {t('dialogs.deleteResume.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">{t('dialogs.cancel')}</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => removeResume(resumeId)}>
            {t('actions.delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export type ResumeDeleteModalTriggerProps = {
  resumeId: string;
  asChild?: boolean;
  children?: React.ReactNode;
};

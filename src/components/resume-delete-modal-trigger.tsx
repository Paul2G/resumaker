import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { onMutationError, onMutationSuccess } from '@/lib/mutation-toast';
import { resumeDeleteMutationOptions } from '@/api/query-options';

export function ResumeDeleteModalTrigger({
  resumeId,
  children,
  asChild,
}: ResumeDeleteModalTriggerProps) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutate: deleteResume } = useMutation({
    ...resumeDeleteMutationOptions(resumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      onMutationSuccess(t, 'dialogs.deleteResume.wasDeleted')();
    },
    onError: onMutationError(t, 'dialogs.deleteResume.wasNotDeleted'),
  });

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
          <Button variant="destructive" onClick={() => deleteResume()}>
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

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

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
import { resumeDeleteMutationOptions } from '@/api/query-options';

export function ResumeDeleteModalTrigger({
  resumeId,
  children,
  asChild,
}: ResumeDeleteModalTriggerProps) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutate: deleteResume } = useMutation({
    ...resumeDeleteMutationOptions({ t, resumeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast.success(t('dialogs.deleteResume.wasDeleted'));
    },
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

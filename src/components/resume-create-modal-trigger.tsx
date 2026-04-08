import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { GeneralForm } from '@/components/forms/config/general-form';
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
import { defaultResume } from '@/lib/data';
import { resumeCreateMutationOptions } from '@/api/query-options';

export function ResumeCreateModalTrigger({
  children,
  asChild,
}: ResumeCreateModalTriggerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: createResume } = useMutation({
    ...resumeCreateMutationOptions({ t }),
    onSuccess: (resumeId) => {
      setIsDialogOpen(false);
      toast.success(t('dialogs.createNewResume.wasCreated'));
      navigate({ to: '/resumes/$resumeId', params: { resumeId } });
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('core:dialogs.createNewResume.title')}</DialogTitle>
          <DialogDescription>
            {t('core:dialogs.createNewResume.description')}
          </DialogDescription>
        </DialogHeader>
        <GeneralForm
          onSubmit={({ name, language }) =>
            createResume({
              ...defaultResume,
              config: { ...defaultResume.config, name, language },
            })
          }
        >
          {(isSubmitting) => (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => setIsDialogOpen(false)}
              >
                {t('dialogs.cancel')}
              </Button>
              <Button type="submit">{t('actions.create')}</Button>
            </DialogFooter>
          )}
        </GeneralForm>
      </DialogContent>
    </Dialog>
  );
}

export type ResumeCreateModalTriggerProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

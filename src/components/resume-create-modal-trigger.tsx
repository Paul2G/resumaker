import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInput } from '@/components/form-fields/form-input';
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
import { onMutationError, onMutationSuccess } from '@/lib/mutation-toast';
import { resumeCreateMutationOptions } from '@/api/query-options';

export function ResumeCreateModalTrigger({
  children,
  asChild,
}: ResumeCreateModalTriggerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: createResume } = useMutation({
    ...resumeCreateMutationOptions(),
    onSuccess: (resumeId) => {
      setIsDialogOpen(false);
      onMutationSuccess(t, 'dialogs.createNewResume.wasCreated')();
      navigate({ to: '/resumes/$resumeId', params: { resumeId } });
    },
    onError: onMutationError(t, 'dialogs.createNewResume.wasNotCreated'),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const schema = z.object({ name: z.string().min(1) });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    createResume({
      ...defaultResume,
      config: { ...defaultResume.config, name: values.name },
    });
  }

  const isSubmitting = form.formState.isSubmitting;

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
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
          <FormInput
            control={form.control}
            name="name"
            label={t('resume:fields.name')}
            placeholder={t('resume:placeholders.name')}
            disabled={isSubmitting}
          />

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
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type ResumeCreateModalTriggerProps = {
  children: React.ReactNode;
  asChild?: boolean;
};

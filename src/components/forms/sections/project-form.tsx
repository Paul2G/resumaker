import type { Project } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { projectSchema } from '@/types/schemas';

export function ProjectForm({
  defaultValues,
  onSave,
  isLoading,
}: ProjectFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: projectSchema.parse(defaultValues),
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('projects:fields.title')}
          placeholder={t('projects:placeholders.title')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('projects:fields.organization')}
          placeholder={t('projects:placeholders.organization')}
          disabled={isSubmitting}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormDatePicker
            control={form.control}
            name="startDate"
            label={t('projects:fields.startDate')}
            placeholder={t('projects:placeholders.startDate')}
            disabled={isSubmitting}
          />
          <FormDatePicker
            control={form.control}
            name="endDate"
            label={t('projects:fields.endDate')}
            placeholder={t('projects:placeholders.endDate')}
            disabled={isSubmitting}
          />
        </div>
        <FormInput
          control={form.control}
          name="link"
          label={t('projects:fields.link')}
          placeholder={t('projects:placeholders.link')}
          type="url"
          disabled={isSubmitting}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('projects:fields.description')}
          placeholder={t('projects:placeholders.description')}
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {t('actions.save')}
        </Button>
      </FieldGroup>
    </form>
  );
}

export type ProjectFormProps = {
  defaultValues: Project;
  onSave: (values: Project) => void;
  isLoading?: boolean;
};

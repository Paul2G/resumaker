import type { Project } from '@/types/resume';
import type { UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { projectSchema } from '@/types/schemas';

export function ProjectForm({ defaultValues, onSave }: ProjectFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: projectSchema.parse(defaultValues),
    mode: 'onChange',
  });

  useFormSubmitter(form as UseFormReturn<Project>, onSave);

  return (
    <form className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('projects:fields.title')}
          placeholder={t('projects:placeholders.title')}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('projects:fields.organization')}
          placeholder={t('projects:placeholders.organization')}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormDatePicker
            control={form.control}
            name="startDate"
            label={t('projects:fields.startDate')}
            placeholder={t('projects:placeholders.startDate')}
          />
          <FormDatePicker
            control={form.control}
            name="endDate"
            label={t('projects:fields.endDate')}
            placeholder={t('projects:placeholders.endDate')}
          />
        </div>
        <FormInput
          control={form.control}
          name="link"
          label={t('projects:fields.link')}
          placeholder={t('projects:placeholders.link')}
          type="url"
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('projects:fields.description')}
          placeholder={t('projects:placeholders.description')}
        />
      </FieldGroup>
    </form>
  );
}

export type ProjectFormProps = {
  defaultValues: Project;
  onSave: (values: Project) => void;
};

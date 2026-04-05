import type { EducationItem } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { educationItemSchema } from '@/types/schemas';

export function EducationItemForm({
  defaultValues,
  onSave,
  isLoading,
}: EducationItemFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(educationItemSchema),
    defaultValues: educationItemSchema.parse(defaultValues),
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('education:fields.title')}
          placeholder={t('education:placeholders.title')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('education:fields.organization')}
          placeholder={t('education:placeholders.organization')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="location"
          label={t('education:fields.location')}
          placeholder={t('education:placeholders.location')}
          disabled={isSubmitting}
        />
        <FormDatePicker
          control={form.control}
          name="completionDate"
          label={t('courses:fields.completionDate')}
          placeholder={t('courses:placeholders.completionDate')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="minor"
          label={t('education:fields.minor')}
          placeholder={t('education:fields.minor')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="gpa"
          label={t('education:fields.gpa')}
          placeholder={t('education:placeholders.gpa')}
          disabled={isSubmitting}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('education:fields.description')}
          placeholder={t('education:placeholders.description')}
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

export type EducationItemFormProps = {
  defaultValues: EducationItem;
  onSave: (values: EducationItem) => void;
  isLoading?: boolean;
};

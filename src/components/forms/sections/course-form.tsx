import type { Course } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { courseSchema } from '@/types/schemas';

export function CourseForm({
  defaultValues,
  onSave,
  isLoading,
}: CourseFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: courseSchema.parse(defaultValues),
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('courses:fields.title')}
          placeholder={t('courses:placeholders.title')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('courses:fields.organization')}
          placeholder={t('courses:placeholders.organization')}
          disabled={isSubmitting}
        />
        <FormDatePicker
          control={form.control}
          name="completionDate"
          label={t('courses:fields.completionDate')}
          placeholder={t('courses:placeholders.completionDate')}
          disabled={isSubmitting}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('courses:fields.description')}
          placeholder={t('courses:placeholders.description')}
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

export type CourseFormProps = {
  defaultValues: Course;
  onSave: (values: Course) => void;
  isLoading?: boolean;
};

import type { Course } from '@/types';
import type { UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { courseSchema } from '@/types/schemas';

export function CourseForm({ defaultValues, onSave }: CourseFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: courseSchema.parse(defaultValues),
    mode: 'onChange',
  });

  useFormSubmitter(form as UseFormReturn<Course>, onSave);

  return (
    <form className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('courses:fields.title')}
          placeholder={t('courses:placeholders.title')}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('courses:fields.organization')}
          placeholder={t('courses:placeholders.organization')}
        />
        <FormDatePicker
          control={form.control}
          name="completionDate"
          label={t('courses:fields.completionDate')}
          placeholder={t('courses:placeholders.completionDate')}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('courses:fields.description')}
          placeholder={t('courses:placeholders.description')}
        />
      </FieldGroup>
    </form>
  );
}

export type CourseFormProps = {
  defaultValues: Course;
  onSave: (values: Course) => void;
};

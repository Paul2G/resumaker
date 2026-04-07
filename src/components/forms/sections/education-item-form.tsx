import type { EducationItem } from '@/types';
import type { UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { educationItemSchema } from '@/types/schemas';

export function EducationItemForm({
  defaultValues,
  onSave,
}: EducationItemFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(educationItemSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  useFormSubmitter(form as UseFormReturn<EducationItem>, onSave);

  return (
    <form className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('education:fields.title')}
          placeholder={t('education:placeholders.title')}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('education:fields.organization')}
          placeholder={t('education:placeholders.organization')}
        />
        <FormInput
          control={form.control}
          name="location"
          label={t('education:fields.location')}
          placeholder={t('education:placeholders.location')}
        />
        <FormDatePicker
          control={form.control}
          name="completionDate"
          label={t('courses:fields.completionDate')}
          placeholder={t('courses:placeholders.completionDate')}
        />
        <FormInput
          control={form.control}
          name="minor"
          label={t('education:fields.minor')}
          placeholder={t('education:fields.minor')}
        />
        <FormInput
          control={form.control}
          name="gpa"
          label={t('education:fields.gpa')}
          placeholder={t('education:placeholders.gpa')}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('education:fields.description')}
          placeholder={t('education:placeholders.description')}
        />
      </FieldGroup>
    </form>
  );
}

export type EducationItemFormProps = {
  defaultValues: EducationItem;
  onSave: (values: EducationItem) => void;
};

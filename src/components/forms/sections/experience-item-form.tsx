import type { ExperienceItem } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { FormSwitch } from '@/components/form-fields/form-switch';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { experienceItemSchema } from '@/types/schemas';

export function ExperienceItemForm({
  defaultValues,
  onSave,
  isLoading,
}: ExperienceItemFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(experienceItemSchema),
    defaultValues: experienceItemSchema.parse(defaultValues),
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;
  const isCurrentlyWorkingHere = form.watch('isCurrentlyWorkingHere');

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('experience:fields.title')}
          placeholder={t('experience:fields.title')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('experience:fields.organization')}
          placeholder={t('experience:placeholders.organization')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="location"
          label={t('experience:fields.location')}
          placeholder={t('experience:placeholders.location')}
          disabled={isSubmitting}
        />
        <FormDatePicker
          control={form.control}
          name="startDate"
          label={t('experience:fields.startDate')}
          placeholder={t('experience:placeholders.startDate')}
          disabled={isSubmitting}
        />
        <FormSwitch
          control={form.control}
          name="isCurrentlyWorkingHere"
          label={t('experience:fields.isCurrentlyWorkingHere')}
          disabled={isSubmitting}
        />
        <FormDatePicker
          control={form.control}
          name="endDate"
          label={t('experience:fields.endDate')}
          placeholder={t('experience:placeholders.endDate')}
          disabled={isSubmitting || isCurrentlyWorkingHere}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('experience:fields.description')}
          placeholder={t('experience:placeholders.description')}
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

export type ExperienceItemFormProps = {
  defaultValues: ExperienceItem;
  onSave: (values: ExperienceItem) => void;
  isLoading?: boolean;
};

import type { Certification } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { certificationSchema } from '@/types/schemas';

export function CertificationForm({
  isLoading,
  defaultValues,
  onSave,
}: CertificationFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: certificationSchema.parse(defaultValues),
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSave)} className={'space-y-4'}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('certifications:fields.title')}
          placeholder={t('certifications:placeholders.title')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('certifications:fields.organization')}
          placeholder={t('certifications:placeholders.organization')}
          disabled={isSubmitting}
        />
        <FormDatePicker
          control={form.control}
          name="issueDate"
          label={t('certifications:fields.issueDate')}
          placeholder={t('certifications:placeholders.issueDate')}
          disabled={isSubmitting}
        />
        <FormDatePicker
          control={form.control}
          name="expirationDate"
          label={t('certifications:fields.expirationDate')}
          placeholder={t('certifications:placeholders.expirationDate')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="credentialId"
          label={t('certifications:fields.credentialId')}
          placeholder={t('certifications:placeholders.credentialId')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="credentialUrl"
          label={t('certifications:fields.credentialUrl')}
          placeholder={t('certifications:placeholders.credentialUrl')}
          disabled={isSubmitting}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('certifications:fields.description')}
          placeholder={t('certifications:placeholders.description')}
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

export type CertificationFormProps = {
  isLoading?: boolean;
  defaultValues: Certification;
  onSave: (values: Certification) => void;
};

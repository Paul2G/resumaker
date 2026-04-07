import type { Certification } from '@/types';
import type { UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FormDatePicker } from '@/components/form-fields/form-date-picker';
import { FormInput } from '@/components/form-fields/form-input';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { certificationSchema } from '@/types/schemas';

export function CertificationForm({
  defaultValues,
  onSave,
}: CertificationFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: certificationSchema.parse(defaultValues),
    mode: 'onChange',
  });

  useFormSubmitter(form as UseFormReturn<Certification>, onSave);

  return (
    <form className={'space-y-4'}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="title"
          label={t('certifications:fields.title')}
          placeholder={t('certifications:placeholders.title')}
        />
        <FormInput
          control={form.control}
          name="organization"
          label={t('certifications:fields.organization')}
          placeholder={t('certifications:placeholders.organization')}
        />
        <FormDatePicker
          control={form.control}
          name="issueDate"
          label={t('certifications:fields.issueDate')}
          placeholder={t('certifications:placeholders.issueDate')}
        />
        <FormDatePicker
          control={form.control}
          name="expirationDate"
          label={t('certifications:fields.expirationDate')}
          placeholder={t('certifications:placeholders.expirationDate')}
        />
        <FormInput
          control={form.control}
          name="credentialId"
          label={t('certifications:fields.credentialId')}
          placeholder={t('certifications:placeholders.credentialId')}
        />
        <FormInput
          control={form.control}
          name="credentialUrl"
          label={t('certifications:fields.credentialUrl')}
          placeholder={t('certifications:placeholders.credentialUrl')}
        />
        <FormBulletPoints
          control={form.control}
          name="description"
          label={t('certifications:fields.description')}
          placeholder={t('certifications:placeholders.description')}
        />
      </FieldGroup>
    </form>
  );
}

export type CertificationFormProps = {
  isLoading?: boolean;
  defaultValues: Certification;
  onSave: (values: Certification) => void;
};

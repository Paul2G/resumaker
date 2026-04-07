import type { ContactInfo } from '@/types';
import type { UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/components/form-fields/form-input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { contactInfoSchema } from '@/types/schemas';

export function ContactInfoForm({
  defaultValues,
  onSave,
}: ContactInfoFormProps) {
  const { t } = useTranslation();

  const form = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues,
    mode: 'onChange',
  });

  useFormSubmitter(form as UseFormReturn<ContactInfo>, onSave);

  return (
    <form className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="fullName"
          label={t('contact:fields.fullName')}
          placeholder={t('contact:placeholders.fullName')}
        />
        <FormInput
          control={form.control}
          name="emailAddress"
          label={t('contact:fields.emailAddress')}
          placeholder={t('contact:placeholders.emailAddress')}
          type="email"
        />
        <FormInput
          control={form.control}
          name="phoneNumber"
          label={t('contact:fields.phoneNumber')}
          placeholder={t('contact:placeholders.phoneNumber')}
        />
        <FormInput
          control={form.control}
          name="address"
          label={t('contact:fields.address')}
          placeholder={t('contact:placeholders.address')}
        />
        <FormInput
          control={form.control}
          name="website"
          label={t('contact:fields.website')}
          placeholder={t('contact:placeholders.website')}
          type="url"
        />

        <Controller
          name="linkedin"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>{t('contact:fields.linkedin')}</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>https://linkedin.com/in/</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  placeholder={t('contact:placeholders.linkedin')}
                  className="!pl-0.5"
                  {...field}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}

export type ContactInfoFormProps = {
  defaultValues: ContactInfo;
  onSave: (values: ContactInfo) => void;
};

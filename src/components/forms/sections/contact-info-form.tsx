import type { ContactInfo } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/components/form-fields/form-input';
import { Button } from '@/components/ui/button';
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
import { Spinner } from '@/components/ui/spinner';
import { contactInfoSchema } from '@/types/schemas';

export function ContactInfoForm({
  isLoading,
  defaultValues,
  onSave,
}: ContactInfoFormProps) {
  const { t } = useTranslation();

  const form = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="fullName"
          label={t('contact:fields.fullName')}
          placeholder={t('contact:placeholders.fullName')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="emailAddress"
          label={t('contact:fields.emailAddress')}
          placeholder={t('contact:placeholders.emailAddress')}
          type="email"
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="phoneNumber"
          label={t('contact:fields.phoneNumber')}
          placeholder={t('contact:placeholders.phoneNumber')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="address"
          label={t('contact:fields.address')}
          placeholder={t('contact:placeholders.address')}
          disabled={isSubmitting}
        />
        <FormInput
          control={form.control}
          name="website"
          label={t('contact:fields.website')}
          placeholder={t('contact:placeholders.website')}
          type="url"
          disabled={isSubmitting}
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {t('actions.save')}
        </Button>
      </FieldGroup>
    </form>
  );
}

export type ContactInfoFormProps = {
  isLoading?: boolean;
  defaultValues: ContactInfo;
  onSave: (values: ContactInfo) => void;
};

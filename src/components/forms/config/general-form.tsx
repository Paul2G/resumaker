import type { Locale } from '@/constants/locales';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInput } from '@/components/form-fields/form-input';
import { FormSelect } from '@/components/form-fields/form-select';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { DEFAULT_LOCALE_KEY, localeData, locales } from '@/constants/locales';
import { resumeConfigSchema } from '@/types/schemas';

const configGeneralSchema = resumeConfigSchema.pick({
  name: true,
  language: true,
});

export function GeneralForm({
  isLoading,
  defaultValues,
  children,
  onSave = () => {},
  onSubmit = () => {},
}: ConfigGeneralFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(configGeneralSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      language: DEFAULT_LOCALE_KEY,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || Boolean(isLoading);

  const languageOptions = locales.map((locale) => ({
    value: locale,
    label: localeData[locale as Locale].langLabel,
  }));

  useFormSubmitter(form, onSave);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('resume:fields.name')}
          placeholder={t('resume:placeholders.name')}
          disabled={isSubmitting}
        />
        <FormSelect
          control={form.control}
          name="language"
          label={t('resume:fields.language')}
          options={languageOptions}
          placeholder={t('resume:placeholders.language')}
          disabled={isSubmitting}
        />
        {children && <>{children(isSubmitting)}</>}
      </FieldGroup>
    </form>
  );
}

export type ConfigGeneralFormProps = {
  isLoading?: boolean;
  defaultValues?: z.infer<typeof configGeneralSchema>;
  onSave?: (values: z.infer<typeof configGeneralSchema>) => void;
  onSubmit?: (values: z.infer<typeof configGeneralSchema>) => void;
  children?: (isSubmitting: boolean) => React.ReactNode;
};

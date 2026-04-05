import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInputNumber } from '@/components/form-fields/form-input-number';
import { FormSelect } from '@/components/form-fields/form-select';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { resumeFontFamiliesKeys } from '@/constants/resume';
import { resumeConfigSchema } from '@/types/schemas';

const configTypographySchema = resumeConfigSchema.pick({
  fontFamily: true,
  fontSize: true,
  titleSizeMultiplier: true,
  sectionTitleSizeMultiplier: true,
  itemTitleMultiplier: true,
});

export function TypographyForm({
  isLoading,
  defaultValues,
  onSave,
}: ConfigTypographyFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(configTypographySchema),
    defaultValues: {
      fontFamily: resumeFontFamiliesKeys[0],
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || Boolean(isLoading);

  const fontFamilyOptions = resumeFontFamiliesKeys.map((key) => ({
    value: key,
    label: t(`resume:values.fontFamily.${key}`),
  }));

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4" noValidate>
      <FieldGroup className="gap-4">
        <FormSelect
          control={form.control}
          name="fontFamily"
          label={t('resume:fields.fontFamily')}
          options={fontFamilyOptions}
          placeholder={t('resume:placeholders.fontFamily')}
          disabled={isSubmitting}
        />
        <FormInputNumber
          control={form.control}
          name="fontSize"
          label={t('resume:fields.fontSize')}
          unit="pt"
          min={6}
          max={72}
          disabled={isSubmitting}
        />
        <FormInputNumber
          control={form.control}
          name="titleSizeMultiplier"
          label={t('resume:fields.titleSizeMultiplier')}
          unit="x"
          step={0.1}
          min={0.5}
          max={5}
          disabled={isSubmitting}
        />
        <FormInputNumber
          control={form.control}
          name="sectionTitleSizeMultiplier"
          label={t('resume:fields.sectionTitleSizeMultiplier')}
          unit="x"
          step={0.1}
          min={0.5}
          max={5}
          disabled={isSubmitting}
        />
        <FormInputNumber
          control={form.control}
          name="itemTitleMultiplier"
          label={t('resume:fields.itemTitleMultiplier')}
          unit="x"
          step={0.1}
          min={0.5}
          max={5}
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

export type ConfigTypographyFormProps = {
  isLoading?: boolean;
  defaultValues?: z.infer<typeof configTypographySchema>;
  onSave: (values: z.infer<typeof configTypographySchema>) => void;
};

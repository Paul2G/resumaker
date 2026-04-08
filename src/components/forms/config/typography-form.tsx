import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInputNumber } from '@/components/form-fields/form-input-number';
import { FormSelect } from '@/components/form-fields/form-select';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
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
  defaultValues,
  onSave,
}: ConfigTypographyFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(configTypographySchema),
    mode: 'onChange',
    defaultValues: {
      fontFamily: resumeFontFamiliesKeys[0],
      fontSize: 11,
      titleSizeMultiplier: 1.3,
      sectionTitleSizeMultiplier: 1.2,
      itemTitleMultiplier: 1.1,
      ...defaultValues,
    },
  });

  const fontFamilyOptions = resumeFontFamiliesKeys.map((key) => ({
    value: key,
    label: t(`resume:values.fontFamily.${key}`),
  }));

  useFormSubmitter(form, onSave);

  return (
    <form className="space-y-4" noValidate>
      <FieldGroup className="gap-4">
        <FormSelect
          control={form.control}
          name="fontFamily"
          label={t('resume:fields.fontFamily')}
          options={fontFamilyOptions}
          placeholder={t('resume:placeholders.fontFamily')}
        />
        <FormInputNumber
          control={form.control}
          name="fontSize"
          label={t('resume:fields.fontSize')}
          unit="pt"
          min={6}
          max={72}
        />
        <FormInputNumber
          control={form.control}
          name="titleSizeMultiplier"
          label={t('resume:fields.titleSizeMultiplier')}
          unit="x"
          step={0.1}
          min={0.5}
          max={5}
        />
        <FormInputNumber
          control={form.control}
          name="sectionTitleSizeMultiplier"
          label={t('resume:fields.sectionTitleSizeMultiplier')}
          unit="x"
          step={0.1}
          min={0.5}
          max={5}
        />
        <FormInputNumber
          control={form.control}
          name="itemTitleMultiplier"
          label={t('resume:fields.itemTitleMultiplier')}
          unit="x"
          step={0.1}
          min={0.5}
          max={5}
        />
      </FieldGroup>
    </form>
  );
}

export type ConfigTypographyFormProps = {
  defaultValues?: z.infer<typeof configTypographySchema>;
  onSave: (values: z.infer<typeof configTypographySchema>) => void;
};

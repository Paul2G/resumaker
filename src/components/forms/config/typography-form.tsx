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
  titleSize: true,
  sectionTitleSize: true,
  itemTitleSize: true,
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
      fontSize: 9,
      titleSize: 18,
      sectionTitleSize: 14,
      itemTitleSize: 10,
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
          max={18}
        />
        <FormInputNumber
          control={form.control}
          name="titleSize"
          label={t('resume:fields.titleSize')}
          unit="pt"
          min={6}
          max={72}
        />
        <FormInputNumber
          control={form.control}
          name="sectionTitleSize"
          label={t('resume:fields.sectionTitleSize')}
          unit="pt"
          min={6}
          max={48}
        />
        <FormInputNumber
          control={form.control}
          name="itemTitleSize"
          label={t('resume:fields.itemTitleSize')}
          unit="pt"
          min={6}
          max={36}
        />
      </FieldGroup>
    </form>
  );
}

export type ConfigTypographyFormProps = {
  defaultValues?: z.infer<typeof configTypographySchema>;
  onSave: (values: z.infer<typeof configTypographySchema>) => void;
};

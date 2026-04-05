import type { DateFormatKey } from '@/constants/dates';
import type { Language, Locale } from '@/constants/locales';
import type { ResumeConfig } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/components/form-fields/form-input';
import { FormInputNumber } from '@/components/form-fields/form-input-number';
import { FormSelect } from '@/components/form-fields/form-select';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { formatDate } from '@/lib/dates';
import { toSentenceCase } from '@/lib/utils';
import { dateFormatsKeys, dateFormatValue } from '@/constants/dates';
import { localeData, locales } from '@/constants/locales';
import {
  resumeFontFamiliesKeys,
  resumePaperSizesKeys,
} from '@/constants/resume';
import { resumeConfigSchema } from '@/types/schemas';

export function ResumeConfigForm({
  currentConfig,
  onSave,
  isLoading,
}: ResumeConfigFormProps) {
  const { t, i18n } = useTranslation();

  const form = useForm({
    resolver: zodResolver(resumeConfigSchema),
    defaultValues: resumeConfigSchema.parse(currentConfig),
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  const languageOptions = locales.map((locale) => ({
    value: locale,
    label: localeData[locale as Locale].langLabel,
  }));

  const paperSizeOptions = resumePaperSizesKeys.map((key) => ({
    value: key,
    label: t(`resume:values.paperSize.${key}`),
  }));

  const fontFamilyOptions = resumeFontFamiliesKeys.map((key) => ({
    value: key,
    label: t(`resume:values.fontFamily.${key}`),
  }));

  const dateFormatOptions = dateFormatsKeys.map((key) => ({
    value: key,
    label: `${t(`resume:values.dateFormat.${key}`)} — ${toSentenceCase(
      formatDate(
        new Date(),
        dateFormatValue[key as DateFormatKey],
        i18n.language as Language,
      ),
    )}`,
  }));

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4" noValidate>
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

        <Typography variant="large">{t('resume:sheetFormat')}</Typography>

        <FormSelect
          control={form.control}
          name="paperSize"
          label={t('resume:fields.paperSize')}
          options={paperSizeOptions}
          placeholder={t('resume:placeholders.paperSize')}
          disabled={isSubmitting}
        />

        <FormInputNumber
          control={form.control}
          name="margin"
          label={t('resume:fields.margin')}
          unit="mm"
          min={0}
          max={50}
          disabled={isSubmitting}
        />

        <Typography variant="large">{t('resume:typography')}</Typography>

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

        <Typography variant="large">{t('resume:spacing')}</Typography>

        <FormInputNumber
          control={form.control}
          name="sectionsGap"
          label={t('resume:fields.sectionsGap')}
          unit="mm"
          min={0}
          disabled={isSubmitting}
        />
        <FormInputNumber
          control={form.control}
          name="itemsGap"
          label={t('resume:fields.itemsGap')}
          unit="mm"
          min={0}
          disabled={isSubmitting}
        />
        <FormInputNumber
          control={form.control}
          name="itemsTitleContentGap"
          label={t('resume:fields.itemsTitleContentGap')}
          unit="mm"
          min={0}
          disabled={isSubmitting}
        />

        <Typography variant="large">{t('resume:dates')}</Typography>

        <FormSelect
          control={form.control}
          name="dateFormat"
          label={t('resume:fields.dateFormat')}
          options={dateFormatOptions}
          placeholder={t('resume:placeholders.dateFormat')}
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

export type ResumeConfigFormProps = {
  currentConfig: ResumeConfig;
  onSave: (newConfig: ResumeConfig) => void;
  isLoading?: boolean;
};

import type { DateFormatKey } from '@/constants/dates';
import type { Language } from '@/constants/locales';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormSelect } from '@/components/form-fields/form-select';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/dates';
import { toSentenceCase } from '@/lib/utils';
import { dateFormatsKeys, dateFormatValue } from '@/constants/dates';
import { resumeConfigSchema } from '@/types/schemas';

const configDatesSchema = resumeConfigSchema.pick({
  dateFormat: true,
});

export function DatesForm({
  isLoading,
  defaultValues,
  onSave,
}: ConfigDatesFormProps) {
  const { t, i18n } = useTranslation();

  const form = useForm({
    resolver: zodResolver(configDatesSchema),
    defaultValues: {
      dateFormat: dateFormatsKeys[0],
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || Boolean(isLoading);

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

export type ConfigDatesFormProps = {
  isLoading?: boolean;
  defaultValues?: z.infer<typeof configDatesSchema>;
  onSave: (values: z.infer<typeof configDatesSchema>) => void;
};

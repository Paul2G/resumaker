import type { DateFormatKey } from '@/constants/dates';
import type { Language } from '@/constants/locales';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormSelect } from '@/components/form-fields/form-select';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { defaultResume } from '@/lib/data';
import { formatDate } from '@/lib/dates';
import { toSentenceCase } from '@/lib/utils';
import { dateFormatsKeys, dateFormatValue } from '@/constants/dates';
import { resumeConfigSchema } from '@/types/schemas';

const configDatesSchema = resumeConfigSchema.pick({
  dateFormat: true,
});

export function DatesForm({ defaultValues, onSave }: ConfigDatesFormProps) {
  const { t, i18n } = useTranslation();

  const form = useForm({
    resolver: zodResolver(configDatesSchema),
    mode: 'onChange',
    defaultValues: {
      ...defaultResume.config,
      ...defaultValues,
    },
  });

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

  useFormSubmitter(form, onSave);

  return (
    <form className="space-y-4" noValidate>
      <FieldGroup className="gap-4">
        <FormSelect
          control={form.control}
          name="dateFormat"
          label={t('resume:fields.dateFormat')}
          options={dateFormatOptions}
          placeholder={t('resume:placeholders.dateFormat')}
        />
      </FieldGroup>
    </form>
  );
}

export type ConfigDatesFormProps = {
  defaultValues?: z.infer<typeof configDatesSchema>;
  onSave: (values: z.infer<typeof configDatesSchema>) => void;
};

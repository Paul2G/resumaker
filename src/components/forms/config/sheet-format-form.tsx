import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInputNumber } from '@/components/form-fields/form-input-number';
import { FormSelect } from '@/components/form-fields/form-select';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { resumePaperSizesKeys, resumePaperSizeValue } from '@/constants/resume';
import { resumeConfigSchema } from '@/types/schemas';

const ConfigSheetFormatSchema = resumeConfigSchema.pick({
  paperSize: true,
  margin: true,
});

export function SheetFormatForm({
  defaultValues,
  onSave,
}: ConfigSheetFormatFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(ConfigSheetFormatSchema),
    mode: 'onChange',
    defaultValues: {
      paperSize: resumePaperSizeValue.a4,
      margin: 14,
      ...defaultValues,
    },
  });

  const paperSizeOptions = resumePaperSizesKeys.map((key) => ({
    value: key,
    label: t(`resume:values.paperSize.${key}`),
  }));

  useFormSubmitter(form, onSave);

  return (
    <form className="space-y-4" noValidate>
      <FieldGroup className="gap-4">
        <FormSelect
          control={form.control}
          name="paperSize"
          label={t('resume:fields.paperSize')}
          options={paperSizeOptions}
          placeholder={t('resume:placeholders.paperSize')}
        />

        <FormInputNumber
          control={form.control}
          name="margin"
          label={t('resume:fields.margin')}
          unit="mm"
          min={0}
          max={50}
        />
      </FieldGroup>
    </form>
  );
}

export type ConfigSheetFormatFormProps = {
  defaultValues?: z.infer<typeof ConfigSheetFormatSchema>;
  onSave: (values: z.infer<typeof ConfigSheetFormatSchema>) => void;
};

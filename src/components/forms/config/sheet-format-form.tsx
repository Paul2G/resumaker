import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInputNumber } from '@/components/form-fields/form-input-number';
import { FormSelect } from '@/components/form-fields/form-select';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { resumePaperSizesKeys, resumePaperSizeValue } from '@/constants/resume';
import { resumeConfigSchema } from '@/types/schemas';

const ConfigSheetFormatSchema = resumeConfigSchema.pick({
  paperSize: true,
  margin: true,
});

export function SheetFormatForm({
  isLoading,
  defaultValues,
  onSave,
}: ConfigSheetFormatFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(ConfigSheetFormatSchema),
    defaultValues: {
      paperSize: resumePaperSizeValue.a4,
      margin: 14,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || Boolean(isLoading);
  const paperSizeOptions = resumePaperSizesKeys.map((key) => ({
    value: key,
    label: t(`resume:values.paperSize.${key}`),
  }));

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4" noValidate>
      <FieldGroup className="gap-4">
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {t('actions.save')}
        </Button>
      </FieldGroup>
    </form>
  );
}

export type ConfigSheetFormatFormProps = {
  isLoading?: boolean;
  defaultValues?: z.infer<typeof ConfigSheetFormatSchema>;
  onSave: (values: z.infer<typeof ConfigSheetFormatSchema>) => void;
};

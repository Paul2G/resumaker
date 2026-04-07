import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { FormInputNumber } from '@/components/form-fields/form-input-number';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { resumeConfigSchema } from '@/types/schemas';

const configSpacingSchema = resumeConfigSchema.pick({
  sectionsGap: true,
  itemsGap: true,
  itemsTitleContentGap: true,
});

export function SpacingForm({ defaultValues, onSave }: ConfigSpacingFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(configSpacingSchema),
    mode: 'onChange',
    defaultValues: {
      sectionsGap: 4,
      itemsGap: 2,
      itemsTitleContentGap: 1,
      ...defaultValues,
    },
  });

  useFormSubmitter(form, onSave);

  return (
    <form className="space-y-4" noValidate>
      <FieldGroup className="gap-4">
        <FormInputNumber
          control={form.control}
          name="sectionsGap"
          label={t('resume:fields.sectionsGap')}
          unit="mm"
          min={0}
        />
        <FormInputNumber
          control={form.control}
          name="itemsGap"
          label={t('resume:fields.itemsGap')}
          unit="mm"
          min={0}
        />
        <FormInputNumber
          control={form.control}
          name="itemsTitleContentGap"
          label={t('resume:fields.itemsTitleContentGap')}
          unit="mm"
          min={0}
        />
      </FieldGroup>
    </form>
  );
}

export type ConfigSpacingFormProps = {
  defaultValues?: z.infer<typeof configSpacingSchema>;
  onSave: (values: z.infer<typeof configSpacingSchema>) => void;
};

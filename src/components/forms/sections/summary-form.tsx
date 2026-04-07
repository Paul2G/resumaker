import type { Summary } from '@/types';
import type { UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormTextarea } from '@/components/form-fields/form-text-area';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { summarySchema } from '@/types/schemas';

export function SummaryForm({ defaultValues, onSave }: SummaryFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues,
    mode: 'onChange',
  });

  useFormSubmitter(form as UseFormReturn<Summary>, onSave);

  return (
    <form className="space-y-4">
      <FieldGroup className="gap-4">
        <FormTextarea
          control={form.control}
          name="summary"
          label={t('summary:fields.summary')}
          placeholder={t('summary:placeholders.summary')}
        />
      </FieldGroup>
    </form>
  );
}

export type SummaryFormProps = {
  defaultValues: Summary;
  onSave: (values: Summary) => void;
};

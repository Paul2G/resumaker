import type { Summary } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormTextarea } from '@/components/form-fields/form-text-area';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { summarySchema } from '@/types/schemas';

export function SummaryForm({
  defaultValues,
  onSave,
  isLoading,
}: SummaryFormProps) {
  const { t } = useTranslation();

  const form = useForm<Summary>({
    resolver: zodResolver(summarySchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormTextarea
          control={form.control}
          name="summary"
          label={t('summary:fields.summary')}
          placeholder={t('summary:placeholders.summary')}
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

export type SummaryFormProps = {
  defaultValues: Summary;
  onSave: (values: Summary) => void;
  isLoading?: boolean;
};

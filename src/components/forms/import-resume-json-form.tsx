import type { ImportResumeJson } from '@/types/resume';
import type { UseFormSetError } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormTextarea } from '@/components/form-fields/form-text-area';
import { FieldGroup } from '@/components/ui/field';
import { importResumeJsonSchema } from '@/types/schemas';

export function ImportResumeJsonForm({
  onSubmit,
  children,
}: ImportResumeJsonFormProps) {
  const { t } = useTranslation();

  const form = useForm<ImportResumeJson>({
    resolver: zodResolver(importResumeJsonSchema),
    mode: 'onChange',
  });

  return (
    <form
      onSubmit={form.handleSubmit((values) => onSubmit(values, form.setError))}
      className="space-y-4"
    >
      <FieldGroup>
        <FormTextarea
          control={form.control}
          name="json"
          label={t('core:dialogs.importResume.fields.json')}
          placeholder={t('core:dialogs.importResume.placeholders.json')}
          className="max-h-32"
        />
        {children(form.formState.isSubmitting)}
      </FieldGroup>
    </form>
  );
}

export type ImportResumeJsonFormProps = {
  onSubmit: (
    values: ImportResumeJson,
    setError: UseFormSetError<ImportResumeJson>,
  ) => void;
  children: (isSubmitting: boolean) => React.ReactNode;
};

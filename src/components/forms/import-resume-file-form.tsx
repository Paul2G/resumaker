import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function ImportResumeFileForm({ onSave }: ImportResumeFileFormProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    onSave(file, setError);
  }

  return (
    <Field data-invalid={!!error || undefined}>
      <FieldLabel>{t('core:dialogs.importResume.fields.file')}</FieldLabel>
      <Input
        type="file"
        accept=".json,application/json"
        aria-invalid={!!error || undefined}
        className="cursor-pointer"
        onChange={handleChange}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}

export type ImportResumeFileFormProps = {
  onSave: (file: File, setError: (msg: string) => void) => void;
};

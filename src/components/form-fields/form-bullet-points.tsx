import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { BulletPointsEditor } from '@/components/ui/bullet-points-editor';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type FormBulletPointsProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
};

export function FormBulletPoints<T extends FieldValues>({
  name,
  control,
  label,
  disabled,
  placeholder,
}: FormBulletPointsProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <BulletPointsEditor
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

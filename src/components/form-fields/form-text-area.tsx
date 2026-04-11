import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  ...nativeProps
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Textarea {...nativeProps} {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

type OwnProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};

type NativeTextareaProps = Omit<
  React.ComponentProps<'textarea'>,
  'name' | 'ref' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'
>;

export type FormTextareaProps<T extends FieldValues> = OwnProps<T> &
  NativeTextareaProps;

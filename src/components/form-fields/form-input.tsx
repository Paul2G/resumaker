import type { Control, FieldValues, Path } from 'react-hook-form';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  ...nativeProps
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Input
            {...nativeProps}
            {...field}
            type={type}
            onChange={
              type === 'number'
                ? (e) => field.onChange(e.target.valueAsNumber)
                : field.onChange
            }
          />
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

type NativeInputProps = Omit<
  React.ComponentProps<'input'>,
  // omit react-hook-form controlled props
  'name' | 'ref' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'
>;

export type FormInputProps<T extends FieldValues> = OwnProps<T> &
  NativeInputProps;

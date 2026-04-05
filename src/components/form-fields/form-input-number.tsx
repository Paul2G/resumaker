// core/components/ui/form-input-unit.tsx
import type { Control, FieldValues, Path } from 'react-hook-form';

import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { round } from '@/lib/utils';

export function FormInputNumber<T extends FieldValues>({
  name,
  control,
  label,
  unit,
  step = 1,
  min,
  max,
  disabled,
  placeholder,
}: FormInputUnitProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...rest }, fieldState }) => {
        const current = Number(value) || 0;

        function increment() {
          const next = round(current + step, step);
          if (max === undefined || next <= max) onChange(next);
        }

        function decrement() {
          const next = round(current - step, step);
          if (min === undefined || next >= min) onChange(next);
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={decrement}
                  disabled={disabled || (min !== undefined && current <= min)}
                >
                  <MinusIcon />
                </Button>
              </InputGroupAddon>

              <InputGroupInput
                type="number"
                placeholder={placeholder}
                value={value?.toString()}
                onChange={(e) => {
                  const parsed = Number(e.target.value);
                  if (min !== undefined && parsed < min) return onChange(min);
                  if (max !== undefined && parsed > max) return onChange(max);
                  onChange(parsed);
                }}
                disabled={disabled}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                {...rest}
              />

              {unit && (
                <InputGroupAddon align="inline-end">
                  <InputGroupText>{unit}</InputGroupText>
                </InputGroupAddon>
              )}

              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={increment}
                  disabled={disabled || (max !== undefined && current >= max)}
                >
                  <PlusIcon />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

export type FormInputUnitProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
};

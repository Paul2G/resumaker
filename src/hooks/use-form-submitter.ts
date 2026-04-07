import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

import { useEffect } from 'react';

export function useFormSubmitter<T extends FieldValues>(
  form: UseFormReturn<T>,
  onValid: SubmitHandler<T>,
) {
  useEffect(() => {
    const sub = form.watch(() => {
      form.handleSubmit(onValid)();
    });

    return () => sub.unsubscribe();
  }, [form, onValid]);
}

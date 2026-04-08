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
      // Create a debounce timer
      const timer = setTimeout(() => {
        form.handleSubmit(onValid)();
      }, 300); // 300ms delay

      return () => clearTimeout(timer);
    });

    return () => sub.unsubscribe();
  }, [form, onValid]);
}

import type { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useEffect } from 'react';

type FieldValues = Record<string, any>;

export function useFormSubmitter<
  TFieldValues extends FieldValues = FieldValues,
>(form: UseFormReturn<TFieldValues>, onValid: SubmitHandler<TFieldValues>) {
  useEffect(() => {
    const sub = form.watch(() => {
      form.handleSubmit(onValid)();
    });

    return () => sub.unsubscribe();
  }, [form]);
}

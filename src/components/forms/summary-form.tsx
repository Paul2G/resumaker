import type { Summary } from '@/lib/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { summarySchema } from '@/lib/schemas';

export function SummaryForm({ defaultValues, onSave }: SummaryFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: Summary) {
    onSave(values);
    toast.success(t('dialogs.dataSaved'));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('summary:fields.summary')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('summary:placeholders.summary')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t('actions.save')}</Button>
      </form>
    </Form>
  );
}

export type SummaryFormProps = {
  defaultValues: Summary;
  onSave: (values: Summary) => void;
};

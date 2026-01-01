import type { Summary } from '@/lib/types';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
import { useResume } from '@/hooks/use-resume';
import { summarySchema } from '@/lib/schemas';
import { SectionKey } from '@/lib/types';

export function SummaryForm() {
  const { t } = useTranslation();
  const { getSectionData, setSectionData } = useResume();

  const defaultValues = useMemo(() => getSectionData(SectionKey.Summary), []);

  const form = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues,
  });

  function onSave(values: Summary) {
    setSectionData(SectionKey.Summary, values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className={'space-y-4'}>
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

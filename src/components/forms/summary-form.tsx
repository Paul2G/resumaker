import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/hooks/use-resume';

export function SummaryForm() {
  const { summary, setSummary } = useResume();

  const form = useForm({
    defaultValues: { summary },
    resolver: zodResolver(z.object({ summary: z.string().optional() })),
  });

  function onSave(values: { summary?: string }) {
    console.log(values);
    setSummary(values.summary);
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSave)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Write about your career" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

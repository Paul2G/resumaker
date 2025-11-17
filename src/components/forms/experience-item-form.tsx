import type { ExperienceItem } from '@/lib/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResume } from '@/hooks/use-resume';
import { experienceItemSchema } from '@/lib/schemas';

export function ExperienceItemForm({
  experienceItem,
}: ExperienceItemFormProps) {
  const { updateExperienceItem } = useResume();

  const form = useForm({
    resolver: zodResolver(experienceItemSchema),
    defaultValues: experienceItem,
  });

  function onSave(values: ExperienceItem) {
    updateExperienceItem(values);
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSave)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Microsoft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export type ExperienceItemFormProps = {
  experienceItem: ExperienceItem;
};

import type { ExperienceItem } from '@/lib/types';

import { useMemo } from 'react';
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
import { IterableSectionKey, SectionKey } from '@/lib/types';

export function ExperienceItemForm({ itemId }: ExperienceItemFormProps) {
  const { getSectionDataItem, updateSectionDataItem } = useResume();

  const defaultValues = useMemo(
    () => getSectionDataItem(SectionKey.Experience, itemId)!,
    [],
  );

  const form = useForm({
    resolver: zodResolver(experienceItemSchema),
    defaultValues,
  });

  function onSave(values: ExperienceItem) {
    updateSectionDataItem(IterableSectionKey.Experience, values);
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSave)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="title"
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
          name="organization"
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
  itemId: string;
};

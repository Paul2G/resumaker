import type { Certification } from '@/lib/types';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DatePicker } from '@/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { useResume } from '@/hooks/use-resume';
import { certificationSchema } from '@/lib/schemas';
import { IterableSectionKey, SectionKey } from '@/lib/types';

export function CertificationForm({ itemId }: CertificationFormProps) {
  const { getSectionDataItem, updateSectionDataItem } = useResume();

  const defaultValues = useMemo(
    () => getSectionDataItem(SectionKey.Certifications, itemId)!,
    [],
  );

  const form = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues,
  });

  function onSave(values: Certification) {
    updateSectionDataItem(IterableSectionKey.Certifications, values);
  }

  useFormSubmitter(form, onSave);

  return (
    <Form {...form}>
      <form className={'space-y-4'}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification name</FormLabel>
              <FormControl>
                <Input placeholder="Data Science with Python" {...field} />
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
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="Meta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue date</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration date</FormLabel>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credentialId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credential ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="f7acb5c3-d17b-4fa5-81df-a35150fddec3"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credentialUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credential URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://coursera.org/verify/professional-cert/1DIP3IC7DHMO"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification relevance</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what you learned and achieved with this certification..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export type CertificationFormProps = {
  itemId: string;
};

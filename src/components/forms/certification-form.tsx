import type { Certification } from '@/lib/types';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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

  console.log(certificationSchema);

  return (
    <Form {...form}>
      <form className={'space-y-4'}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('certifications:fields.title')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('certifications:placeholders.title')}
                  {...field}
                />
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
              <FormLabel>{t('certifications:fields.organization')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('certifications:placeholders.organization')}
                  {...field}
                />
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
              <FormLabel>{t('certifications:fields.issueDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('certifications:placeholders.issueDate')}
                  {...field}
                />
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
              <FormLabel>{t('certifications:fields.expirationDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('certifications:placeholders.expirationDate')}
                  {...field}
                />
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
              <FormLabel>{t('certifications:fields.credentialId')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('certifications:placeholders.credentialId')}
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
              <FormLabel>{t('certifications:fields.credentialUrl')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('certifications:placeholders.credentialUrl')}
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
              <FormLabel>{t('certifications:fields.description')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('certifications:placeholders.description')}
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

import type { EducationItem } from '@/lib/types';

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
import { educationItemSchema } from '@/lib/schemas';
import { IterableSectionKey, SectionKey } from '@/lib/types';

export function EducationItemForm({ itemId }: EducationItemFormProps) {
  const { t } = useTranslation();
  const { getSectionDataItem, updateSectionDataItem } = useResume();

  const defaultValues = useMemo(
    () => getSectionDataItem(SectionKey.Education, itemId)!,
    [],
  );

  const form = useForm({
    resolver: zodResolver(educationItemSchema),
    defaultValues,
  });

  function onSave(values: EducationItem) {
    updateSectionDataItem(IterableSectionKey.Education, values);
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
              <FormLabel>{t('education:fields.title')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('education:placeholders.title')}
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
              <FormLabel>{t('education:fields.organization')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('education:placeholders.organization')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('education:fields.location')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('education:placeholders.location')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('courses:fields.completionDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('courses:placeholders.completionDate')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('education:fields.minor')}</FormLabel>
              <FormControl>
                <Input placeholder={t('education:fields.minor')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gpa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('education:fields.gpa')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('education:placeholders.gpa')}
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
              <FormLabel>{t('education:fields.description')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('education:placeholders.description')}
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

export type EducationItemFormProps = {
  itemId: string;
};

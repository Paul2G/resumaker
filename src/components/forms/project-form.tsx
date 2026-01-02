import type { Project } from '@/lib/types';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BulletPointsEditor } from '@/components/ui/bullet-points-editor';
import { Button } from '@/components/ui/button';
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
import { useResume } from '@/hooks/use-resume';
import { projectSchema } from '@/lib/schemas';
import { IterableSectionKey, SectionKey } from '@/lib/types';

export function ProjectForm({ itemId }: ProjectFormProps) {
  const { t } = useTranslation();
  const { getSectionDataItem, updateSectionDataItem } = useResume();

  const defaultValues = useMemo(
    () => getSectionDataItem(SectionKey.Projects, itemId)!,
    [],
  );

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  function onSave(values: Project) {
    updateSectionDataItem(IterableSectionKey.Projects, values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('projects:fields.title')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('projects:placeholders.title')}
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
              <FormLabel>{t('projects:fields.organization')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('projects:placeholders.organization')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('projects:fields.startDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('projects:placeholders.startDate')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('projects:placeholders.endDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('projects:placeholders.endDate')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('projects:fields.link')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('projects:placeholders.link')}
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
              <FormLabel>{t('projects:fields.description')}</FormLabel>
              <FormControl>
                <BulletPointsEditor
                  placeholder={t('projects:placeholders.description')}
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

export type ProjectFormProps = {
  itemId: string;
};

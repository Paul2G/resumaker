import type { ExperienceItem } from '@/lib/types';

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
import { Switch } from '@/components/ui/switch';
import { useResume } from '@/hooks/use-resume';
import { experienceItemSchema } from '@/lib/schemas';
import { IterableSectionKey, SectionKey } from '@/lib/types';

export function ExperienceItemForm({ itemId }: ExperienceItemFormProps) {
  const { t } = useTranslation();
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
      <form onSubmit={form.handleSubmit(onSave)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('experience:fields.title')}</FormLabel>
              <FormControl>
                <Input placeholder={t('experience:fields.title')} {...field} />
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
              <FormLabel>{t('experience:fields.organization')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('experience:placeholders.organization')}
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
              <FormLabel>{t('experience:fields.location')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('experience:placeholders.location')}
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
              <FormLabel>{t('experience:fields.startDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('experience:placeholders.startDate')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isCurrentlyWorkingHere"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between">
              <FormLabel>
                {t('experience:fields.isCurrentlyWorkingHere')}
              </FormLabel>
              <FormControl>
                <Switch
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('experience:fields.endDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('experience:placeholders.endDate')}
                  disabled={form.getValues('isCurrentlyWorkingHere')}
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
              <FormLabel>{t('experience:fields.description')}</FormLabel>
              <FormControl>
                <BulletPointsEditor
                  placeholder={t('experience:placeholders.description')}
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

export type ExperienceItemFormProps = {
  itemId: string;
};

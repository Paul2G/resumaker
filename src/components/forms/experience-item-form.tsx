import type { ExperienceItem } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

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
import { experienceItemSchema } from '@/types/schemas';

export function ExperienceItemForm({
  defaultValues,
  onSave,
}: ExperienceItemFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(experienceItemSchema),
    defaultValues: experienceItemSchema.parse(defaultValues),
  });

  function onSubmit(values: ExperienceItem) {
    onSave(values);
    toast.success(t('dialogs.dataSaved'));
  }

  const isCurrentlyWorkingHere = form.watch('isCurrentlyWorkingHere');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
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
                  value={field.value as Date}
                  onChange={field.onChange}
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
                  disabled={isCurrentlyWorkingHere}
                  value={field.value as Date}
                  onChange={field.onChange}
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
  defaultValues: ExperienceItem;
  onSave: (values: ExperienceItem) => void;
};

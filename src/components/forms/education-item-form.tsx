import type { EducationItem } from '@/lib/types';

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
import { educationItemSchema } from '@/lib/schemas';

export function EducationItemForm({
  defaultValues,
  onSave,
}: EducationItemFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(educationItemSchema),
    defaultValues: educationItemSchema.parse(defaultValues),
  });

  function onSubmit(values: EducationItem) {
    onSave(values);
    toast.success(t('dialogs.dataSaved'));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
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
                <BulletPointsEditor
                  placeholder={t('education:placeholders.description')}
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

export type EducationItemFormProps = {
  defaultValues: EducationItem;
  onSave: (values: EducationItem) => void;
};

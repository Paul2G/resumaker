import type { Course } from '@/types';

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
import { courseSchema } from '@/types';

export function CourseForm({ defaultValues, onSave }: CourseFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: courseSchema.parse(defaultValues),
  });

  function onSubmit(values: Course) {
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
              <FormLabel>{t('courses:fields.title')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('courses:placeholders.title')}
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
              <FormLabel>{t('courses:fields.organization')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('courses:placeholders.organization')}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('courses:fields.description')}</FormLabel>
              <FormControl>
                <BulletPointsEditor
                  placeholder={t('courses:placeholders.description')}
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

export type CourseFormProps = {
  defaultValues: Course;
  onSave: (values: Course) => void;
};

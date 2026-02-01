import type { Project } from '@/types';

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
import { projectSchema } from '@/types/schemas';

export function ProjectForm({ defaultValues, onSave }: ProjectFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: projectSchema.parse(defaultValues),
  });

  function onSubmit(values: Project) {
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
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('projects:placeholders.endDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('projects:placeholders.endDate')}
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
  defaultValues: Project;
  onSave: (values: Project) => void;
};

import type { Certification } from '@/types';

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
import { certificationSchema } from '@/types';

export function CertificationForm({
  defaultValues,
  onSave,
}: CertificationFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: certificationSchema.parse(defaultValues),
  });

  function onSubmit(values: Certification) {
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
          name="expirationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('certifications:fields.expirationDate')}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={t('certifications:placeholders.expirationDate')}
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
                <BulletPointsEditor
                  placeholder={t('certifications:placeholders.description')}
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

export type CertificationFormProps = {
  defaultValues: Certification;
  onSave: (values: Certification) => void;
};

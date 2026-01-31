import type { ContactInfo } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { contactInfoSchema } from '@/types';

export function ContactInfoForm({
  defaultValues,
  onSave,
}: ContactInfoFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(contactInfoSchema),
    defaultValues,
  });

  function onSubmit(values: ContactInfo) {
    onSave(values);
    toast.success(t('dialogs.dataSaved'));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact:fields.fullName')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('contact:placeholders.fullName')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact:fields.emailAddress')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('contact:placeholders.emailAddress')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact:fields.phoneNumber')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('contact:placeholders.phoneNumber')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact:fields.address')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('contact:placeholders.address')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact:fields.linkedin')}</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>https://linkedin.com/in/</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder={t('contact:placeholders.linkedin')}
                    className="!pl-0.5"
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact:fields.website')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('contact:placeholders.website')}
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

export type ContactInfoFormProps = {
  defaultValues: ContactInfo;
  onSave: (values: ContactInfo) => void;
};

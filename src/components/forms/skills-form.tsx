import type { Skills } from '@/lib/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { BulletPointsEditor } from '@/components/ui/bullet-points-editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { skillsSchema } from '@/lib/schemas';

export function SkillsForm({ defaultValues, onSave }: SkillsFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: Skills) {
    onSave(values);
    toast.success(t('dialogs.dataSaved'));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('skills:fields.skills')}</FormLabel>
              <FormControl>
                <BulletPointsEditor
                  placeholder="<ul><li>Enter bullet points...</li></ul>"
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

export type SkillsFormProps = {
  defaultValues: Skills;
  onSave: (values: Skills) => void;
};

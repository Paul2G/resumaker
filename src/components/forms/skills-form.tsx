import type { Skills } from '@/lib/types';

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/hooks/use-resume';
import { skillsSchema } from '@/lib/schemas';
import { SectionKey } from '@/lib/types';

export function SkillsForm() {
  const { t } = useTranslation();
  const { getSectionData, setSectionData } = useResume();

  const defaultValues = useMemo(() => getSectionData(SectionKey.Skills), []);

  const form = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues,
  });

  function onSave(values: Skills) {
    setSectionData(SectionKey.Skills, values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className={'space-y-4'}>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('skills:fields.skills')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('skills:placeholders.skills')}
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

import type { Skills } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { skillsSchema } from '@/types/schemas';

export function SkillsForm({
  defaultValues,
  onSave,
  isLoading,
}: SkillsFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
      <FieldGroup className="gap-4">
        <FormBulletPoints
          control={form.control}
          name="skills"
          label={t('skills:fields.skills')}
          placeholder={t('skills:placeholders.skills')}
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {t('actions.save')}
        </Button>
      </FieldGroup>
    </form>
  );
}

export type SkillsFormProps = {
  defaultValues: Skills;
  onSave: (values: Skills) => void;
  isLoading?: boolean;
};

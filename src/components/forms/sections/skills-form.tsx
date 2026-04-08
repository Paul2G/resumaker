import type { Skills } from '@/types/resume';
import type { UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormBulletPoints } from '@/components/form-fields/form-bullet-points';
import { FieldGroup } from '@/components/ui/field';
import { useFormSubmitter } from '@/hooks/use-form-submitter';
import { skillsSchema } from '@/types/schemas';

export function SkillsForm({ defaultValues, onSave }: SkillsFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues,
    mode: 'onChange',
  });

  useFormSubmitter(form as UseFormReturn<Skills>, onSave);

  return (
    <form className="space-y-4">
      <FieldGroup className="gap-4">
        <FormBulletPoints
          control={form.control}
          name="skills"
          label={t('skills:fields.skills')}
          placeholder={t('skills:placeholders.skills')}
        />
      </FieldGroup>
    </form>
  );
}

export type SkillsFormProps = {
  defaultValues: Skills;
  onSave: (values: Skills) => void;
};

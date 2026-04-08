import type { Skills } from '@/types/resume';

import { usePreviewUtils } from '@/hooks/use-preview-utils';

export function ResumePreviewSkills({
  data,
  ...props
}: ResumePreviewSkillsProps) {
  const { t } = usePreviewUtils();

  if (!data?.skills || data.skills.length === 0) return null;

  return (
    <section className="resume__section resume__section--skills" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">
        {t('sections.skills')}
      </h2>
      <ul className="resume__bullet-list">
        {data.skills.map((skill, ix) => (
          <li dangerouslySetInnerHTML={{ __html: skill }} key={ix} />
        ))}
      </ul>
    </section>
  );
}

export type ResumePreviewSkillsProps = React.ComponentProps<'div'> & {
  data: Skills;
};

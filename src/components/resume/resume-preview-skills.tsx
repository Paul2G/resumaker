import type { Skills } from '@/lib/types';

export function ResumePreviewSkills({
  data,
  ...props
}: ResumePreviewSkillsProps) {
  if (!data?.skills || data.skills.length === 0) return null;

  return (
    <section className="resume__section resume__section--skills" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">Skills</h2>
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

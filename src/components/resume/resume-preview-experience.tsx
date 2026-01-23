import type { ExperienceItem } from '@/lib/types';

import { usePreviewUtils } from '@/hooks/use-preview-utils';

export function ResumePreviewExperience({
  data,
  ...props
}: ResumeExperienceProps) {
  const { t, getDuration } = usePreviewUtils();

  if (!data.some((item) => item.visible)) return null;

  return (
    <section className="resume__section resume__section--experience" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">
        {t('sections.experience')}
      </h2>
      <div className="resume__items">
        {data.map((item) => {
          if (!item.visible) return null;

          return (
            <div className="resume__item" key={item.id}>
              <div className="resume__item-header">
                <h2 className="resume__item-title">{item.title}</h2>
                {item.location && <span>{item.location}</span>}
              </div>
              <div className="resume__item-subheader">
                <span>{item.organization}</span>
                <span>
                  {getDuration(
                    item.startDate,
                    item.endDate,
                    item.isCurrentlyWorkingHere,
                  )}
                </span>
              </div>
              <div className="resume__item-body">
                {item?.description && item.description.length > 0 && (
                  <ul className="resume__bullet-list">
                    {item.description.map((responsibility, ix) => (
                      <li
                        dangerouslySetInnerHTML={{ __html: responsibility }}
                        key={ix}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export type ResumeExperienceProps = React.ComponentProps<'div'> & {
  data: ExperienceItem[];
};

import type { ExperienceItem } from '@/lib/types';

import { formatDate } from '@/lib/dates';

export function ResumePreviewExperience({
  data,
  ...props
}: ResumeExperienceProps) {
  function getDuration(item: ExperienceItem) {
    if (item.startDate && (!item.endDate || item.isCurrentlyWorkingHere)) {
      return `${formatDate(item.startDate)} - Present`;
    }

    if (item.startDate && item.endDate) {
      return `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
    }

    if (item.endDate) {
      return `Until ${formatDate(item.endDate)}`;
    }

    return '';
  }

  if (!data.some((item) => item.visible)) return null;

  return (
    <section className="resume__section resume__section--experience" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">
        Experience
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
                <span>{getDuration(item)}</span>
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

import type { Project } from '@/lib/types';

import { usePreviewUtils } from '@/hooks/use-preview-utils';
import { isStringValid } from '@/lib/utils';

export function ResumePreviewProjects({
  data,
  ...props
}: ResumePreviewProjectsProps) {
  const { t, getDuration } = usePreviewUtils();

  function getItemDetails(item: Project) {
    const details = [
      item.organization,
      item.link,
      getDuration(item.startDate, item.endDate),
    ];

    return details.filter((detail) => Boolean(detail) && isStringValid(detail));
  }

  if (!data.some((item) => item.visible)) return null;

  return (
    <section className="resume__section resume__section--projects" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">
        {t('sections.projects')}
      </h2>
      <div className="resume__items">
        {data.map((item) => {
          if (!item.visible) return null;

          return (
            <div className="resume__item" key={item.id}>
              <div className="resume__item-header">
                <h2 className="resume__item-title">{item.title}</h2>
              </div>
              <div className="resume__item-subheader">
                <ul className="resume__item-details">
                  {getItemDetails(item).map((detail, ix) => (
                    <li key={ix}>{detail}</li>
                  ))}
                </ul>
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

export type ResumePreviewProjectsProps = React.ComponentProps<'div'> & {
  data: Project[];
};

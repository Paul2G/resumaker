import type { Project } from '@/lib/types';

import { usePreviewUtils } from '@/hooks/use-preview-utils';
import { isStringValid } from '@/lib/utils';

export function ResumePreviewProjects({
  data,
  ...props
}: ResumePreviewProjectsProps) {
  const { t, getDuration } = usePreviewUtils();

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
                  {isStringValid(item.organization) && (
                    <li>
                      <span>{item.organization}</span>
                    </li>
                  )}
                  {isStringValid(item.link) && (
                    <li>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link?.replace('https://', '')}
                        <i className="ph-bold ph-arrow-square-out" />
                      </a>
                    </li>
                  )}
                  {isStringValid(getDuration(item.startDate, item.endDate)) && (
                    <li>
                      <span>{getDuration(item.startDate, item.endDate)}</span>
                    </li>
                  )}
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

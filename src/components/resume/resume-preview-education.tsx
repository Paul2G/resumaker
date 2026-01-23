import type { EducationItem } from '@/lib/types';

import { usePreviewUtils } from '@/hooks/use-preview-utils';
import { getYear, isDateValid } from '@/lib/dates';
import { isStringValid } from '@/lib/utils';

export function ResumePreviewEducation({
  data,
  ...props
}: ResumePreviewEducationProps) {
  const { t } = usePreviewUtils();

  if (!data.some((item) => item.visible)) return null;

  return (
    <section className="resume__section resume__section--experience" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">
        {t('sections.education')}
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
                  {isStringValid(item.minor) && (
                    <li>
                      <span>{item.gpa}</span>
                    </li>
                  )}
                  {isStringValid(item.organization) && (
                    <li>
                      <span>{item.organization} </span>
                    </li>
                  )}
                  {isStringValid(item.location) && (
                    <li>
                      <span>{item.location}</span>
                    </li>
                  )}
                  {isDateValid(item.completionDate) && (
                    <li>
                      <span>{getYear(item.completionDate)}</span>
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

export type ResumePreviewEducationProps = React.ComponentProps<'div'> & {
  data: EducationItem[];
};

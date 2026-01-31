import type { Course } from '@/types';

import { usePreviewUtils } from '@/hooks/use-preview-utils';
import { getYear } from '@/lib/dates';
import { isStringValid } from '@/lib/utils';

export function ResumePreviewCourses({
  data,
  ...props
}: ResumePreviewCoursesProps) {
  const { t } = usePreviewUtils();

  if (!data.some((item) => item.visible)) return null;

  return (
    <section className="resume__section resume__section--courses" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">
        {t('sections.courses')}
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
                    <span>{item.organization}</span>
                  )}
                  {item.completionDate && (
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

export type ResumePreviewCoursesProps = React.ComponentProps<'div'> & {
  data: Course[];
};

import type { Course } from '@/lib/types';

import { isDateValid } from '@/lib/dates';
import { isStringValid } from '@/lib/utils';

export function ResumePreviewCourses({
  data,
  ...props
}: ResumePreviewCoursesProps) {
  function getItemDetails(item: Course) {
    const fullYear = isDateValid(item?.completionDate)
      ? new Date(item.completionDate!).getFullYear().toString()
      : '';

    const details = [item.organization, fullYear];

    return details.filter((detail) => Boolean(detail) && isStringValid(detail));
  }

  return (
    <section className="resume__section resume__section--courses" {...props}>
      <h2 className="resume__subtitle resume__subtitle--underlined">Courses</h2>
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

export type ResumePreviewCoursesProps = React.ComponentProps<'div'> & {
  data: Course[];
};

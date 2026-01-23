import type { EducationItem } from '@/lib/types';

import { useTranslation } from 'react-i18next';

import { isDateValid } from '@/lib/dates';
import { isStringValid } from '@/lib/utils';

export function ResumePreviewEducation({
  data,
  ...props
}: ResumePreviewEducationProps) {
  const { t } = useTranslation('preview');

  function getItemDetails(item: EducationItem) {
    const fullYear = isDateValid(item?.completionDate)
      ? new Date(item.completionDate!).getFullYear().toString()
      : '';

    const details = [
      item.minor,
      item.organization,
      item.location,
      fullYear,
      item.gpa,
    ];

    return details.filter((detail) => Boolean(detail) && isStringValid(detail));
  }

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

export type ResumePreviewEducationProps = React.ComponentProps<'div'> & {
  data: EducationItem[];
};

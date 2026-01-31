import type { Certification } from '@/types';

import { usePreviewUtils } from '@/hooks/use-preview-utils';
import { formatDate, isDateValid } from '@/lib/dates';
import { isStringValid } from '@/lib/utils';

export function ResumePreviewCertifications({
  data,
  ...props
}: ResumePreviewCertificationsProps) {
  const { t } = usePreviewUtils();

  if (!data.some((item) => item.visible)) return null;

  return (
    <section
      className="resume__section resume__section--certifications"
      {...props}
    >
      <h2 className="resume__subtitle resume__subtitle--underlined">
        {t('sections.certifications')}
      </h2>
      <div className="resume__items">
        {data.map((item) => {
          if (!item.visible) return null;

          return (
            <div className="resume__item" key={item.id}>
              <div className="resume__item-header">
                <h2 className="resume__item-title">
                  {item.title}
                  {isStringValid(item.credentialId) &&
                    (isStringValid(item.credentialUrl) ? (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <small>
                          ({item.credentialId}
                          <i className="ph-bold ph-arrow-square-out" />)
                        </small>
                      </a>
                    ) : (
                      <small>{`(${item.credentialId})`}</small>
                    ))}
                </h2>
              </div>
              <div className="resume__item-subheader">
                <ul className="resume__item-details">
                  {isStringValid(item.organization) && (
                    <span>{item.organization}</span>
                  )}
                  {isDateValid(item.issueDate) && (
                    <li>
                      <span>{`${t('dates.issued')} ${formatDate(item.issueDate)}`}</span>
                    </li>
                  )}
                  {isDateValid(item.expirationDate) && (
                    <li>
                      <span>{`${t('dates.expiry')} ${formatDate(item.expirationDate)}`}</span>
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

export type ResumePreviewCertificationsProps = React.ComponentProps<'div'> & {
  data: Certification[];
};

import type { ContactInfo } from '@/types/resume';

import { isStringValid } from '@/lib/utils';

export function ResumePreviewContactInfo({
  data,
  ...props
}: ResumeContactInfoProps) {
  return (
    <section className="resume__section resume__section--contact" {...props}>
      <h1 className="resume__title">{data.fullName}</h1>
      <div className="resume__contact-items">
        {isStringValid(data.address) && (
          <span>
            <i className="ph-fill ph-map-pin" />
            <div>{data.address}</div>
          </span>
        )}
        {isStringValid(data.emailAddress) && (
          <span>
            <i className="ph-fill ph-envelope" />
            <a
              href={`mailto:${data.emailAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.emailAddress}
            </a>
          </span>
        )}
        {isStringValid(data.phoneNumber) && (
          <span>
            <i className="ph-fill ph-phone" />
            <div>{data.phoneNumber}</div>
          </span>
        )}
        {isStringValid(data.linkedin) && (
          <span>
            <i className="ph-fill ph-linkedin-logo" />
            <a
              href={'https://www.linkedin.com/in/' + data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'in/' + data.linkedin}
            </a>
          </span>
        )}
        {isStringValid(data.website) && (
          <span>
            <i className="ph-fill ph-globe" />
            <a href={data.website} target="_blank" rel="noopener noreferrer">
              {data.website?.replace('https://', '')}
            </a>
          </span>
        )}
      </div>
    </section>
  );
}

export type ResumeContactInfoProps = React.ComponentProps<'div'> & {
  data: ContactInfo;
};

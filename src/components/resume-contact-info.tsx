import type { ContactInfo } from '@/lib/types';

import {
  EnvelopeIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from '@phosphor-icons/react';

import { cn, isStringValid } from '@/lib/utils';

export function ResumeContactInfo({
  contactInfo,
  className,
  ...props
}: ResumeContactInfoProps) {
  return (
    <div id="contact" className={cn('contents', className)} {...props}>
      <h1 id="fullname" className="text-2xl text-center font-bold">
        {contactInfo.fullName}
      </h1>
      <div
        id="contact-items"
        className="w-full flex gap-1 items-center justify-center text-xs"
      >
        {isStringValid(contactInfo.address) && (
          <>
            <MapPinIcon weight="fill" className="size-3" />
            <span>{contactInfo.address}</span>
          </>
        )}
        {isStringValid(contactInfo.emailAddress) && (
          <>
            <EnvelopeIcon weight="fill" className="size-3" />
            <span>{contactInfo.emailAddress}</span>
          </>
        )}
        {isStringValid(contactInfo.phoneNumber) && (
          <>
            <PhoneIcon weight="fill" className="size-3" />
            <span>{contactInfo.phoneNumber}</span>
          </>
        )}
        {isStringValid(contactInfo.linkedin) && (
          <a
            href={'https://www.linkedin.com/in/' + contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contents"
          >
            <LinkedinLogoIcon weight="fill" className="size-3" />
            <span>{'in/' + contactInfo.linkedin}</span>
          </a>
        )}
        {isStringValid(contactInfo.website) && (
          <a
            href={contactInfo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="contents"
          >
            <GlobeIcon weight="fill" className="size-3" />
            <span>{contactInfo.website?.replace('https://', '')}</span>
          </a>
        )}
      </div>
    </div>
  );
}

export type ResumeContactInfoProps = React.ComponentProps<'div'> & {
  contactInfo: ContactInfo;
};

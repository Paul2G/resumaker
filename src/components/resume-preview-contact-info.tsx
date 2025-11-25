import type { ContactInfo } from '@/lib/types';

import {
  EnvelopeIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from '@phosphor-icons/react';

import { cn, isStringValid } from '@/lib/utils';

export function ResumePreviewContactInfo({
  data,
  className,
  ...props
}: ResumeContactInfoProps) {
  return (
    <div id="contact" className={cn('contents', className)} {...props}>
      <h1 id="fullname" className="text-2xl text-center font-bold">
        {data.fullName}
      </h1>
      <div
        id="contact-items"
        className="w-full flex gap-1 items-center justify-center text-xs"
      >
        {isStringValid(data.address) && (
          <>
            <MapPinIcon weight="fill" className="size-3" />
            <span>{data.address}</span>
          </>
        )}
        {isStringValid(data.emailAddress) && (
          <>
            <EnvelopeIcon weight="fill" className="size-3" />
            <span>{data.emailAddress}</span>
          </>
        )}
        {isStringValid(data.phoneNumber) && (
          <>
            <PhoneIcon weight="fill" className="size-3" />
            <span>{data.phoneNumber}</span>
          </>
        )}
        {isStringValid(data.linkedin) && (
          <a
            href={'https://www.linkedin.com/in/' + data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contents"
          >
            <LinkedinLogoIcon weight="fill" className="size-3" />
            <span>{'in/' + data.linkedin}</span>
          </a>
        )}
        {isStringValid(data.website) && (
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="contents"
          >
            <GlobeIcon weight="fill" className="size-3" />
            <span>{data.website?.replace('https://', '')}</span>
          </a>
        )}
      </div>
    </div>
  );
}

export type ResumeContactInfoProps = React.ComponentProps<'div'> & {
  data: ContactInfo;
};

import {
  EnvelopeIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from '@phosphor-icons/react';

import { Separator } from '@/components/ui/separator';
import { useResume } from '@/hooks/use-resume';

export function ResumePreview() {
  const { contactInfo, summary } = useResume();

  return (
    <div className="font-[Times_New_Roman] text-black/70 p-4">
      <div
        id="sheet-1"
        className="bg-white max-w-full w-[50rem] aspect-[17/22] mx-auto flex flex-col gap-2 shadow-md border py-16 px-12"
      >
        <div id="contact" className="contents">
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
        <Separator className="bg-black/30" />
        {isStringValid(summary) && (
          <p id="summary" className="text-xs">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
}

function isStringValid(value: string | undefined): boolean {
  return value !== undefined && value.trim() !== '';
}

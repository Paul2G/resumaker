import '@/styles/resume-pdf.css';

import { ResumePreviewCertifications } from '@/components/resume/resume-preview-certifications';
import { ResumePreviewContactInfo } from '@/components/resume/resume-preview-contact-info';
import { ResumePreviewCourses } from '@/components/resume/resume-preview-courses';
import { ResumePreviewEducation } from '@/components/resume/resume-preview-education';
import { ResumePreviewExperience } from '@/components/resume/resume-preview-experience';
import { ResumePreviewProjects } from '@/components/resume/resume-preview-projects';
import { ResumePreviewSkills } from '@/components/resume/resume-preview-skills';
import { ResumePreviewSummary } from '@/components/resume/resume-preview-summary';
import { useResume } from '@/hooks/use-resume';
import { SectionKey } from '@/lib/types';
import { cn } from '@/lib/utils';

export function ResumePreview({ className, ...props }: ResumePreviewProps) {
  const { sections } = useResume();

  return (
    <div className={cn('resume resume--letter', className)} {...props}>
      <div className="resume__sheet">
        {sections.map(({ key, data, visible }) => {
          if (!visible) return null;

          switch (key) {
            case SectionKey.ContactInfo:
              return <ResumePreviewContactInfo data={data} key={key} />;
            case SectionKey.Summary:
              return <ResumePreviewSummary data={data} key={key} />;
            case SectionKey.Experience:
              return <ResumePreviewExperience data={data} key={key} />;
            case SectionKey.Education:
              return <ResumePreviewEducation data={data} key={key} />;
            case SectionKey.Projects:
              return <ResumePreviewProjects data={data} key={key} />;
            case SectionKey.Courses:
              return <ResumePreviewCourses data={data} key={key} />;
            case SectionKey.Certifications:
              return <ResumePreviewCertifications data={data} key={key} />;
            case SectionKey.Skills:
              return <ResumePreviewSkills data={data} key={key} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export type ResumePreviewProps = React.ComponentProps<'div'> & {};

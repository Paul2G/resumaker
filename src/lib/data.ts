import type { Resume } from '@/types/resume';

import { DEFAULT_DATE_FORMAT_KEY } from '@/constants/dates';
import { DEFAULT_LOCALE_KEY } from '@/constants/locales';
import {
  CURRENT_RESUME_VERSION,
  DEFAULT_RESUME_FONT_FAMILY_KEY,
  DEFAULT_RESUME_PAPER_SIZE_KEY,
} from '@/constants/resume';

export const defaultResume: Resume = {
  id: 'pm1pzLz04ldR',
  version: CURRENT_RESUME_VERSION,
  config: {
    name: 'Lorem Ipsum',
    language: DEFAULT_LOCALE_KEY,
    paperSize: DEFAULT_RESUME_PAPER_SIZE_KEY,
    margin: 12,
    fontFamily: DEFAULT_RESUME_FONT_FAMILY_KEY,
    fontSize: 9,
    titleSize: 18,
    sectionTitleSize: 14,
    itemTitleSize: 10,
    sectionsGap: 2,
    itemsGap: 1,
    itemsTitleContentGap: 0,
    dateFormat: DEFAULT_DATE_FORMAT_KEY,
  },
  sections: [
    {
      key: 'contact',
      visible: true,
      data: {
        fullName: 'Lorem Ipsum Dolor',
        emailAddress: 'lorem.ipsum@example.com',
        phoneNumber: '+1234567890',
        address: 'Sit Amet, Consectetur, Adipiscing',
        linkedin: 'lorem-ipsum-dolor',
      },
    },
    {
      key: 'summary',
      visible: true,
      data: {
        summary:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      },
    },
    {
      key: 'experience',
      visible: true,
      data: [
        {
          title: 'Senior Lorem Developer',
          organization: 'Ipsum Industries',
          visible: true,
          id: 'fa-6xTq-cvIQ',
          location: 'Dolor Sit Amet',
          startDate: new Date('2023-03-21T07:00:00.000Z'),
          endDate: new Date('2025-08-08T07:00:00.000Z'),
          description: [
            '<p>Ut enim ad minima veniam, quis nostrum <strong>exercitationem</strong> ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>',
            '<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>',
            '<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>',
          ],
        },
        {
          title: 'Junior Sit Associate',
          organization: 'Amet Corp',
          visible: true,
          id: '7NVpzRjqQfqx',
          description: [
            '<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>',
            '<p>Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>',
          ],
          location: 'Consectetur, Adipiscing',
          startDate: new Date('2022-06-15T07:00:00.000Z'),
          endDate: new Date('2022-12-18T08:00:00.000Z'),
        },
      ],
    },
    {
      key: 'education',
      visible: true,
      data: [
        {
          title: 'Bachelor of Lorem Science',
          organization: 'University of Ipsum',
          visible: true,
          id: '7C4sMoUFEikm',
          location: 'Dolor City',
          completionDate: new Date('2022-05-14T07:00:00.000Z'),
          description: [
            '<p><strong>Relevant coursework:</strong> Consectetur Adipiscing, Elit Sed Do, Eiusmod Tempor, Incididunt Ut Labore, Et Dolore Magna Aliqua.</p>',
          ],
        },
      ],
    },
    {
      key: 'projects',
      visible: true,
      data: [
        {
          title: 'Project Lorem-Maker',
          organization: 'Open Source',
          visible: true,
          id: 'do1sHcsbLSa7',
          description: [
            '<p><strong>Description: </strong>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>',
            '<p><strong>Technologies: </strong>Lorem, Ipsum, Dolor, Sit</p>',
          ],
          link: 'https://example.com/lorem-ipsum',
        },
      ],
    },
    {
      key: 'certifications',
      visible: true,
      data: [
        {
          title: 'Certified Lorem Expert',
          organization: 'Ipsum Foundation',
          visible: true,
          id: 'ZdRzGfqC0acw',
          issueDate: new Date('2025-11-06T08:00:00.000Z'),
          credentialId: 'LOREM-123-IPSUM',
          credentialUrl: 'https://example.com/verify/lorem',
          description: [
            '<p>Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>',
          ],
        },
      ],
    },
    {
      key: 'skills',
      visible: true,
      data: {
        skills: [
          '<p><strong>Frontend Ipsum:</strong> Lorem, Ipsum, Dolor, Sit, Amet</p>',
          '<p><strong>Backend Dolor:</strong> Consectetur, Adipiscing, Elit, Sed</p>',
          '<p><strong>Database Sit:</strong> Eiusmod, Tempor, Incididunt</p>',
          '<p><strong>General Amet:</strong> Labore, Et Dolore, Magna, Aliqua</p>',
        ],
      },
    },
  ],
} as const;

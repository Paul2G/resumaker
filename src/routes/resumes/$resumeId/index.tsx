import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resumes/$resumeId/')({
  component: RouteComponent,
  loader: ({ params }) => {
    throw redirect({
      to: '/resumes/$resumeId/sections/{-$sectionKey}/{-$itemId}',
      params,
    });
  },
});

function RouteComponent() {
  return null;
}

import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/$resumeId/')({
  component: RouteComponent,
  loader: ({ params }) => {
    throw redirect({ to: '/$resumeId/sections', params });
  },
});

function RouteComponent() {
  return null;
}

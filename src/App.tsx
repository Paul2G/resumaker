import type { Resume } from '@/lib/types';

import { ResumeProvider } from '@/context/resume-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { Header } from '@/components/header';
import { ResumePreview } from '@/components/resume-preview';

const placeholderResume: Resume = {
  id: '1',
  title: 'New Resume',
  sectionsOrder: [],
  contactInfo: {
    fullName: 'Juanito',
  },
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  courses: [],
};

function saveResumeOnLocalStorage(resume: Resume) {
  localStorage.setItem('resume', JSON.stringify(resume));
}

function loadResumeFromLocalStorage(): Resume {
  const storedResume = localStorage.getItem('resume');

  return storedResume ? JSON.parse(storedResume) : placeholderResume;
}

function App() {
  const loadedResume = loadResumeFromLocalStorage();

  return (
    <ThemeProvider>
      <ResumeProvider
        currentResume={loadedResume}
        onSave={saveResumeOnLocalStorage}
      >
        <div className="flex flex-col relative  min-h-screen bg-background text-foreground">
          <Header />
          <main className="grow px-1 flex items-stretch divide-x py-2">
            <div className="flex-2">
              <ResumePreview />
            </div>
          </main>
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;

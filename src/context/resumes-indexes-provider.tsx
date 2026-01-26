import type { AppData, Resume, ResumeIndex } from '@/lib/types';

import { createContext, useEffect, useState } from 'react';

import { defaultResume } from '@/lib/data';
import { deleteResume, loadResume, saveResume } from '@/repositories/resumes';

export const ResumesIndexContext = createContext<ResumesIndexProviderValue>({
  resumes: [],
  getResume: () => null,
  createResume: () => {},
  removeResume: () => {},
  updateResume: () => {},
});

export function ResumesIndexProvider({
  appData,
  onSaveAppData,
  children,
}: ResumesIndexProviderProps) {
  const [resumes, setResumes] = useState(appData.resumes);

  function getResume(resumeId: string) {
    return loadResume(resumeId);
  }

  function createResume(name: string) {
    const newResumeId = crypto.randomUUID();

    const newResume = { ...defaultResume, id: newResumeId, name };

    saveResume(newResume);

    // setSelectedResumeId(newResumeId);
    setResumes((prev) => [...prev, { id: newResumeId, name }]);
  }

  function removeResume(resumeId: string) {
    // if (selectedResumeId === resumeId) setSelectedResumeId(undefined);

    deleteResume(resumeId);

    setResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
  }

  function updateResume(resume: Resume) {
    const isResumeIndexed = true;
    //     resumes.some(
    //   (resume) => resume.id === selectedResumeId,
    // );

    saveResume(resume);

    if (isResumeIndexed) {
      const isNameChanged = resumes.some(
        (r) => r.id === resume.id && r.name !== resume.name,
      );

      if (isNameChanged) {
        setResumes((prev) =>
          prev.map((r) =>
            r.id === resume.id ? { ...r, name: resume.name } : r,
          ),
        );
      }
    } else {
      setResumes((prev) => [...prev, { id: resume.id, name: resume.name }]);
    }
  }

  useEffect(() => {
    onSaveAppData({
      resumes,
    });
  }, [resumes]);

  return (
    <ResumesIndexContext.Provider
      value={{
        resumes,
        getResume,
        createResume,
        removeResume,
        updateResume,
      }}
    >
      {children instanceof Function
        ? children({
            resumes,
            getResume,
            createResume,
            removeResume,
            updateResume,
          })
        : children}
    </ResumesIndexContext.Provider>
  );
}

export type ResumesIndexProviderValue = {
  resumes: ResumeIndex[];
  getResume: (id: string) => Resume | null;
  createResume: (name: string) => void;
  removeResume: (id: string) => void;
  updateResume: (resume: Resume) => void;
};

export type ResumesIndexProviderProps = {
  appData: AppData;
  onSaveAppData: (appData: AppData) => void;
  children:
    | React.ReactNode
    | ((args: ResumesIndexProviderValue) => React.ReactNode);
};

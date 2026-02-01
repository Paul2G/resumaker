import type { AppData, Resume, ResumeIndex } from '@/types';

import { createContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { defaultResume } from '@/lib/data';
import { deleteResume, loadResume, saveResume } from '@/repositories/resumes';

export const ResumesIndexContext = createContext<ResumesIndexProviderValue>({
  resumes: [],
  getResume: () => null,
  createResume: () => Promise.resolve(''),
  removeResume: () => Promise.resolve(),
  updateResume: () => Promise.resolve(),
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

  async function createResume(name: string) {
    const newResumeId = nanoid(16);

    const newResume = { ...defaultResume, id: newResumeId, name };

    saveResume(newResume);

    setResumes((prev) => [...prev, { id: newResumeId, name }]);

    return newResumeId;
  }

  async function removeResume(resumeId: string) {
    deleteResume(resumeId);

    setResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
  }

  async function updateResume(resume: Resume) {
    const isResumeIndexed = true;

    saveResume(resume);

    if (isResumeIndexed) {
      const isNameChanged = resumes.some(
        (r) => r.id === resume.id && r.name !== resume.config.name,
      );

      if (isNameChanged) {
        setResumes((prev) =>
          prev.map((r) =>
            r.id === resume.id ? { ...r, name: resume.config.name } : r,
          ),
        );
      }
    } else {
      setResumes((prev) => [
        ...prev,
        { id: resume.id, name: resume.config.name },
      ]);
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
  createResume: (name: string) => Promise<string>;
  removeResume: (id: string) => Promise<void>;
  updateResume: (resume: Resume) => Promise<void>;
};

export type ResumesIndexProviderProps = {
  appData: AppData;
  onSaveAppData: (appData: AppData) => void;
  children:
    | React.ReactNode
    | ((args: ResumesIndexProviderValue) => React.ReactNode);
};

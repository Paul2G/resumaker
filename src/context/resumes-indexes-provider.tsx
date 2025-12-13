import type { AppData, Resume, ResumeIndex } from '@/lib/types';

import { createContext, useEffect, useState } from 'react';

import { defaultResume } from '@/lib/data';
import { deleteResume, loadResume, saveResume } from '@/repositories/resumes';

export const ResumesIndexContext = createContext<ResumesIndexProviderValue>({
  resumes: [],
  setSelectedResume: () => {},
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
  const [selectedResumeId, setSelectedResumeId] = useState<string | undefined>(
    appData?.selectedResumeId,
  );
  const [currentResume, setCurrentResume] = useState<Resume | undefined>();

  function setSelectedResume(resumeId: string) {
    const isResumeIndexed = resumes.some((resume) => resume.id === resumeId);

    if (isResumeIndexed) {
      setSelectedResumeId(resumeId);
    } else {
      removeResume(resumeId);
    }
  }

  function createResume(name: string) {
    const newResumeId = crypto.randomUUID();

    const newResume = { ...defaultResume, id: newResumeId, name };

    saveResume(newResume);

    setSelectedResumeId(newResumeId);
    setResumes((prev) => [...prev, { id: newResumeId, name }]);
  }

  function removeResume(resumeId: string) {
    if (selectedResumeId === resumeId) setSelectedResumeId(undefined);

    deleteResume(resumeId);

    setResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
  }

  function updateResume(resume: Resume) {
    const isResumeIndexed = resumes.some(
      (resume) => resume.id === selectedResumeId,
    );

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
      selectedResumeId,
    });
  }, [resumes, selectedResumeId]);

  useEffect(() => {
    if (selectedResumeId) {
      const resume = loadResume(selectedResumeId);
      if (!resume) removeResume(selectedResumeId);
      else setCurrentResume(resume);
    } else {
      setCurrentResume(undefined);
    }
  }, [selectedResumeId]);

  return (
    <ResumesIndexContext.Provider
      value={{
        resumes,
        selectedResume: currentResume,
        setSelectedResume,
        createResume,
        removeResume,
        updateResume,
      }}
    >
      {children instanceof Function
        ? children({
            resumes,
            selectedResume: currentResume,
            setSelectedResume,
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
  selectedResume?: Resume;
  setSelectedResume: (resumeId: string) => void;
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

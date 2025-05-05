
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Solution {
  ui: string; 
  database: string; 
  automation: string;
  expertInsights?: Record<string, string>;
}

interface SolutionContextType {
  businessDescription: string;
  setBusinessDescription: (description: string) => void;
  solution: Solution | null;
  setSolution: (solution: Solution | null) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  solutionTitle: string;
  setSolutionTitle: (title: string) => void;
  selectedRoles: string[];
  setSelectedRoles: (roles: string[]) => void;
  roleNames: Record<string, string>;
  setRoleNames: (names: Record<string, string>) => void;
  contentInsights: string;
  setContentInsights: (insights: string) => void;
  isImprovingPrompt: boolean;
  setIsImprovingPrompt: (isImproving: boolean) => void;
}

const SolutionContext = createContext<SolutionContextType | undefined>(undefined);

export const SolutionProvider = ({ children }: { children: ReactNode }) => {
  const [businessDescription, setBusinessDescription] = useState("");
  const [solution, setSolution] = useState<Solution | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [solutionTitle, setSolutionTitle] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [roleNames, setRoleNames] = useState<Record<string, string>>({});
  const [contentInsights, setContentInsights] = useState("");
  const [isImprovingPrompt, setIsImprovingPrompt] = useState(false);

  return (
    <SolutionContext.Provider value={{
      businessDescription,
      setBusinessDescription,
      solution,
      setSolution,
      isGenerating,
      setIsGenerating,
      progress,
      setProgress,
      solutionTitle,
      setSolutionTitle,
      selectedRoles,
      setSelectedRoles,
      roleNames,
      setRoleNames,
      contentInsights,
      setContentInsights,
      isImprovingPrompt,
      setIsImprovingPrompt
    }}>
      {children}
    </SolutionContext.Provider>
  );
};

export const useSolution = () => {
  const context = useContext(SolutionContext);
  if (context === undefined) {
    throw new Error("useSolution must be used within a SolutionProvider");
  }
  return context;
};

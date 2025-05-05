
import { useEffect } from "react";
import { useSolution } from "@/contexts/SolutionContext";

export const useProgressTracking = () => {
  const { isGenerating, progress, setProgress } = useSolution();

  // Reset progress when not generating
  useEffect(() => {
    if (!isGenerating) setProgress(0);
  }, [isGenerating, setProgress]);

  // Update progress bar while generating
  useEffect(() => {
    let progressTimer: number | null = null;
    
    if (isGenerating && progress < 95) {
      progressTimer = window.setTimeout(() => {
        // Create an incremental progress that slows down as it approaches 95%
        const increment = Math.max(0.5, (95 - progress) * 0.1);
        setProgress(Math.min(95, progress + increment));
      }, 300);
    }
    
    return () => {
      if (progressTimer !== null) {
        clearTimeout(progressTimer);
      }
    };
  }, [isGenerating, progress, setProgress]);

  return { progress, isGenerating };
};

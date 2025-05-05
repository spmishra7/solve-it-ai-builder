
// This main file imports and re-exports the specific feature hooks
import { useSolutionGenerator } from "./solution/useSolutionGenerator";

// Re-export the main hook - this serves as backward compatibility
// for components that import from the original path
export { useSolutionGenerator };

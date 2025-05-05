
import { ExpertInsights } from "./ExpertInsights";

interface SolutionPreviewProps {
  solution: {
    ui: string;
    database: string;
    automation: string;
    expertInsights?: Record<string, string>;
  } | null;
}

const SolutionPreview = ({ solution }: SolutionPreviewProps) => {
  if (!solution) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3 bg-white border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gray-100 border-b p-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-500">Preview</div>
        </div>
        <div className="p-4">
          <div dangerouslySetInnerHTML={{ __html: solution.ui }} />
        </div>
      </div>
      <div className="md:w-1/3">
        <ExpertInsights insights={solution.expertInsights} />
      </div>
    </div>
  );
};

export default SolutionPreview;

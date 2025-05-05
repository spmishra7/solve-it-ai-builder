
import N8nConfigForm from "./N8nConfigForm";
import WorkflowConversionSettings from "./WorkflowConversionSettings";

const N8nTabContent = () => {
  return (
    <div className="space-y-6 pt-6">
      <N8nConfigForm />
      <WorkflowConversionSettings />
    </div>
  );
};

export default N8nTabContent;

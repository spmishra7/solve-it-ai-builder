
interface AutomationCodeProps {
  content: string;
}

const AutomationCode = ({ content }: AutomationCodeProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Workflow Automation</h3>
      <div className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-auto max-h-[500px] font-mono text-sm">
        <pre>{content}</pre>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>These automation workflows handle key business processes in your application.</p>
      </div>
    </div>
  );
};

export default AutomationCode;


interface AutomationCodeProps {
  code: string;
}

const AutomationCode = ({ code }: AutomationCodeProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
      <pre>{code}</pre>
    </div>
  );
};

export default AutomationCode;

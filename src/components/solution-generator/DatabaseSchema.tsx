
interface DatabaseSchemaProps {
  content: string;
}

const DatabaseSchema = ({ content }: DatabaseSchemaProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Database Schema</h3>
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-[500px] font-mono text-sm">
        <pre>{content}</pre>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>This schema represents the database structure needed for your solution.</p>
      </div>
    </div>
  );
};

export default DatabaseSchema;


interface DatabaseSchemaProps {
  schema: string;
}

const DatabaseSchema = ({ schema }: DatabaseSchemaProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
      <pre>{schema}</pre>
    </div>
  );
};

export default DatabaseSchema;

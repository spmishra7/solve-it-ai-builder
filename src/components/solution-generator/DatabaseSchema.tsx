
import { useEffect, useState } from 'react';
import { Copy, Check, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DatabaseSchemaProps {
  schema: string;
}

const DatabaseSchema = ({ schema }: DatabaseSchemaProps) => {
  const [copied, setCopied] = useState(false);
  
  // Reset copy status after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(schema);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy schema: ', err);
    }
  };
  
  // Highlighting SQL syntax
  const highlightSQLSyntax = (sql: string) => {
    return sql
      .replace(/\b(CREATE|TABLE|INSERT|SELECT|UPDATE|DELETE|FROM|WHERE|AND|OR|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP BY|ORDER BY|HAVING|AS|ON|NOT|NULL|PRIMARY KEY|FOREIGN KEY|REFERENCES|CASCADE|DEFAULT|CONSTRAINT|INDEX|UNIQUE|CHECK)\b/gi, 
        '<span class="text-blue-400">$1</span>')
      .replace(/\b(INTEGER|VARCHAR|TEXT|TIMESTAMP|DATE|BOOLEAN|FLOAT|DOUBLE|DECIMAL|UUID|JSON|JSONB|ARRAY)\b/gi, 
        '<span class="text-yellow-400">$1</span>')
      .replace(/(["'`])(.*?)\1/g, 
        '<span class="text-green-400">$1$2$1</span>')
      .replace(/\b(\d+)\b/g, 
        '<span class="text-purple-400">$1</span>')
      .replace(/--(.*)$/gm, 
        '<span class="text-gray-500">-- $1</span>');
  };

  // Extract and visualize tables from the schema
  const extractTableInfo = (schema: string) => {
    // This is a simple extraction - in a real app you'd want more robust parsing
    const tableMatches = schema.match(/CREATE\s+TABLE\s+(\w+|\w+\.\w+)\s*\(([\s\S]*?\n\);)/gi);
    if (!tableMatches) return null;
    
    return (
      <div className="mt-6 space-y-6">
        <h3 className="text-sm font-medium text-gray-100">Detected Tables:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tableMatches.map((table, index) => {
            const tableNameMatch = table.match(/CREATE\s+TABLE\s+(\w+|\w+\.\w+)/i);
            const tableName = tableNameMatch ? tableNameMatch[1] : `Table ${index + 1}`;
            
            return (
              <div key={index} className="border border-gray-700 rounded-lg p-3 bg-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-4 w-4 text-blue-400" />
                  <span className="font-medium text-blue-400">{tableName}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {table.includes('id') && <div>• Has ID field</div>}
                  {table.includes('FOREIGN KEY') && <div>• Has foreign key references</div>}
                  {table.includes('TIMESTAMP') && <div>• Includes timestamps</div>}
                  {table.includes('PRIMARY KEY') && <div>• Has primary key defined</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Database Schema</h3>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 mr-1 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 mr-1" />
          )}
          {copied ? "Copied" : "Copy Schema"}
        </Button>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
        <pre 
          dangerouslySetInnerHTML={{ __html: highlightSQLSyntax(schema) }} 
          className="whitespace-pre-wrap break-words"
        />
        {extractTableInfo(schema)}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        This schema defines the database structure for your solution. You can implement it in your preferred database system.
      </div>
    </div>
  );
};

export default DatabaseSchema;

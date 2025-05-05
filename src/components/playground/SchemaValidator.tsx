
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Check, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SchemaValidatorProps {
  schema: string;
}

const SchemaValidator = ({ schema }: SchemaValidatorProps) => {
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    messages: string[];
  } | null>(null);
  const [validating, setValidating] = useState(false);
  const { toast } = useToast();

  // A simple client-side SQL validator - detects common SQL issues
  const validateSchema = (sqlSchema: string): {
    isValid: boolean;
    messages: string[];
  } => {
    const messages: string[] = [];
    let isValid = true;

    // Split schema into individual statements
    const statements = sqlSchema.split(';').filter(s => s.trim());

    // Check for common SQL syntax issues
    statements.forEach((statement, index) => {
      const trimmedStatement = statement.trim().toLowerCase();
      
      // Check for CREATE TABLE statements without proper parentheses
      if (trimmedStatement.includes('create table') && 
          (!trimmedStatement.includes('(') || !trimmedStatement.includes(')'))) {
        messages.push(`Statement ${index + 1}: CREATE TABLE missing parentheses for column definitions`);
        isValid = false;
      }

      // Check for incomplete ALTER TABLE statements
      if (trimmedStatement.includes('alter table') && 
          !trimmedStatement.includes('add') && 
          !trimmedStatement.includes('drop') && 
          !trimmedStatement.includes('modify') && 
          !trimmedStatement.includes('alter')) {
        messages.push(`Statement ${index + 1}: ALTER TABLE missing action (ADD, DROP, MODIFY, ALTER)`);
        isValid = false;
      }
      
      // Check for missing table names in CREATE TABLE
      if (trimmedStatement.includes('create table') && 
          !trimmedStatement.match(/create\s+table\s+(\w+)/)) {
        messages.push(`Statement ${index + 1}: CREATE TABLE missing table name`);
        isValid = false;
      }
      
      // Check for potential SQL injection in table or column names
      if (trimmedStatement.includes("'") || trimmedStatement.includes('"')) {
        if ((trimmedStatement.match(/'/g) || []).length % 2 !== 0) {
          messages.push(`Statement ${index + 1}: Unmatched single quotes detected`);
          isValid = false;
        }
        if ((trimmedStatement.match(/"/g) || []).length % 2 !== 0) {
          messages.push(`Statement ${index + 1}: Unmatched double quotes detected`);
          isValid = false;
        }
      }
      
      // Check for missing column types in CREATE TABLE
      if (trimmedStatement.includes('create table') && trimmedStatement.includes('(')) {
        const columnDefs = trimmedStatement.split('(')[1]?.split(')')[0]?.trim();
        if (columnDefs) {
          const columns = columnDefs.split(',').map(c => c.trim());
          columns.forEach(column => {
            const parts = column.split(/\s+/);
            if (parts.length < 2 && !column.toLowerCase().includes('primary') && !column.toLowerCase().includes('foreign')) {
              messages.push(`Invalid column definition: "${column}" - missing data type`);
              isValid = false;
            }
          });
        }
      }
    });

    // If no explicit issues found and there's content, it's probably valid
    if (messages.length === 0) {
      if (statements.length > 0) {
        messages.push("Schema appears valid. No obvious syntax errors detected.");
      } else {
        messages.push("Schema is empty or contains no valid SQL statements.");
        isValid = false;
      }
    }

    return {
      isValid,
      messages,
    };
  };

  const handleValidate = () => {
    setValidating(true);
    
    setTimeout(() => {
      try {
        const result = validateSchema(schema);
        setValidationResult(result);
        
        if (result.isValid) {
          toast({
            title: "Schema Validation",
            description: "Database schema appears to be valid.",
          });
        } else {
          toast({
            title: "Schema Validation",
            description: "Issues found in database schema.",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Validation Error",
          description: "Failed to validate schema.",
          variant: "destructive"
        });
      } finally {
        setValidating(false);
      }
    }, 500);
  };

  return (
    <Card className="border-t-4 border-t-brand-600">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-brand-600" />
            <h3 className="font-medium">Database Schema Validator</h3>
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={handleValidate}
            disabled={validating}
          >
            {validating ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Database className="h-4 w-4 mr-2" />
            )}
            Validate Schema
          </Button>
        </div>
        
        {validationResult && (
          <div className={`mt-4 p-4 rounded-md ${
            validationResult.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {validationResult.isValid ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <h4 className={`font-medium ${validationResult.isValid ? 'text-green-700' : 'text-red-700'}`}>
                {validationResult.isValid ? 'Schema Appears Valid' : 'Issues Found'}
              </h4>
            </div>
            <ul className="space-y-1 text-sm">
              {validationResult.messages.map((message, index) => (
                <li key={index} className="ml-6 list-disc">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 text-sm text-gray-500 py-3">
        Note: This is a basic validator and may not catch all schema issues.
      </CardFooter>
    </Card>
  );
};

export default SchemaValidator;

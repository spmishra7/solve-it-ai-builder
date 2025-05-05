
import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AutomationCodeProps {
  code: string;
}

const AutomationCode = ({ code }: AutomationCodeProps) => {
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
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };
  
  // Simple syntax highlighting by wrapping keywords
  const highlightSyntax = (code: string) => {
    return code
      .replace(/\b(function|return|const|let|var|if|else|for|while|try|catch|async|await|import|export|from|class|new|this)\b/g, 
        '<span class="text-purple-600">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, 
        '<span class="text-amber-600">$1</span>')
      .replace(/(["'`])(.*?)\1/g, 
        '<span class="text-green-600">$1$2$1</span>')
      .replace(/\b(\d+)\b/g, 
        '<span class="text-blue-600">$1</span>')
      .replace(/\/\/(.*)/g, 
        '<span class="text-gray-500">// $1</span>');
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Automation Code</h3>
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
          {copied ? "Copied" : "Copy Code"}
        </Button>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
        <pre 
          dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }} 
          className="whitespace-pre-wrap break-words"
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        This code provides automation workflows for your solution. You can implement it in your preferred backend environment.
      </div>
    </div>
  );
};

export default AutomationCode;

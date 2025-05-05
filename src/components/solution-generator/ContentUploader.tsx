
import { useState } from 'react';
import { Upload, Link, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContentUploaderProps {
  onContentAnalyzed: (insights: string) => void;
  isGenerating: boolean;
}

const ContentUploader = ({ onContentAnalyzed, isGenerating }: ContentUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (limit to 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 10MB.");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const analyzeContent = async () => {
    if (isGenerating || isAnalyzing) return;
    
    setIsAnalyzing(true);
    
    try {
      let insights = '';
      
      if (uploadType === 'file' && file) {
        // File upload and analysis logic
        const formData = new FormData();
        formData.append('file', file);
        
        // Upload file to Supabase storage
        const fileName = `uploads/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('user_content')
          .upload(fileName, file);
          
        if (uploadError) throw new Error('Failed to upload file');
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('user_content')
          .getPublicUrl(fileName);
          
        // Call Edge Function to analyze the file
        const { data, error } = await supabase.functions.invoke('analyze-content', {
          body: { 
            contentType: 'file',
            fileUrl: urlData.publicUrl,
            fileName: file.name
          }
        });
        
        if (error) throw error;
        insights = data?.insights || '';
        
      } else if (uploadType === 'url' && url) {
        // URL analysis logic
        if (!url.startsWith('http')) {
          toast.error("Please enter a valid URL starting with http:// or https://");
          setIsAnalyzing(false);
          return;
        }
        
        // Call Edge Function to analyze the URL
        const { data, error } = await supabase.functions.invoke('analyze-content', {
          body: { 
            contentType: 'url',
            url 
          }
        });
        
        if (error) throw error;
        insights = data?.insights || '';
      }
      
      if (insights) {
        onContentAnalyzed(insights);
        toast.success("Content analyzed successfully!");
      } else {
        toast.error("No insights could be generated from the content.");
      }
      
    } catch (error) {
      console.error("Error analyzing content:", error);
      toast.error("Failed to analyze content. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button 
          variant={uploadType === 'file' ? "default" : "outline"} 
          size="sm"
          onClick={() => setUploadType('file')}
          disabled={isAnalyzing || isGenerating}
        >
          <Upload className="mr-1 h-4 w-4" />
          Upload File
        </Button>
        <Button 
          variant={uploadType === 'url' ? "default" : "outline"} 
          size="sm"
          onClick={() => setUploadType('url')}
          disabled={isAnalyzing || isGenerating}
        >
          <Link className="mr-1 h-4 w-4" />
          Website URL
        </Button>
      </div>
      
      {uploadType === 'file' ? (
        <Card className="p-4">
          <div className="space-y-4">
            <Input 
              type="file" 
              onChange={handleFileChange}
              accept=".txt,.pdf,.docx,.html,.css,.js,.json,.xml,.csv"
              disabled={isAnalyzing || isGenerating}
            />
            
            {file && (
              <p className="text-sm text-gray-600">
                Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
            
            <Button
              onClick={analyzeContent}
              disabled={!file || isAnalyzing || isGenerating}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze File"
              )}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                type="url" 
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isAnalyzing || isGenerating}
              />
            </div>
            
            <Button
              onClick={analyzeContent}
              disabled={!url || isAnalyzing || isGenerating}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Website"
              )}
            </Button>
          </div>
        </Card>
      )}
      
      <p className="text-xs text-gray-500">
        Upload your existing content to enhance the generated solution. We support various file formats including text, PDF, HTML, CSS, JavaScript, and more. Maximum file size: 10MB.
      </p>
    </div>
  );
};

export default ContentUploader;

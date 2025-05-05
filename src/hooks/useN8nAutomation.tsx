import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
}

export interface UseN8nAutomationReturn {
  isLoading: boolean;
  workflows: N8nWorkflow[];
  error: string | null;
  fetchWorkflows: () => Promise<void>;
  createWorkflow: (automationCode: string, workflowData?: any) => Promise<any>;
  executeWorkflow: (workflowId: string, data?: any) => Promise<any>;
  convertAutomationToWorkflow: (automationCode: string) => Promise<any>;
}

export function useN8nAutomation(): UseN8nAutomationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workflows, setWorkflows] = useState<N8nWorkflow[]>([]);
  const { toast } = useToast();

  const fetchWorkflows = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await supabase.functions.invoke('n8n-automation', {
        body: { action: "getWorkflows" }
      });

      if (apiError) {
        throw new Error(apiError.message);
      }

      if (data?.workflows) {
        setWorkflows(data.workflows);
      }
      
      return data;
    } catch (error: any) {
      console.error("Error fetching n8n workflows:", error);
      setError(error.message || "Failed to fetch workflows");
      toast({
        title: "Error",
        description: "Failed to fetch workflows",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkflow = async (automationCode: string, workflowData?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await supabase.functions.invoke('n8n-automation', {
        body: { 
          action: "createWorkflow",
          automationCode,
          workflowData
        }
      });

      if (apiError) {
        throw new Error(apiError.message);
      }

      toast({
        title: "Success",
        description: "Workflow created successfully",
      });
      
      // Refresh the workflow list
      fetchWorkflows();
      
      return data;
    } catch (error: any) {
      console.error("Error creating n8n workflow:", error);
      setError(error.message || "Failed to create workflow");
      toast({
        title: "Error",
        description: "Failed to create workflow",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const executeWorkflow = async (workflowId: string, workflowData?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await supabase.functions.invoke('n8n-automation', {
        body: { 
          action: "executeWorkflow",
          workflowId,
          workflowData
        }
      });

      if (apiError) {
        throw new Error(apiError.message);
      }

      toast({
        title: "Success",
        description: "Workflow executed successfully",
      });
      
      return data;
    } catch (error: any) {
      console.error("Error executing n8n workflow:", error);
      setError(error.message || "Failed to execute workflow");
      toast({
        title: "Error",
        description: "Failed to execute workflow",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convertAutomationToWorkflow = async (automationCode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await supabase.functions.invoke('n8n-automation', {
        body: { 
          action: "convertAutomationToWorkflow",
          automationCode
        }
      });

      if (apiError) {
        throw new Error(apiError.message);
      }

      toast({
        title: "Success",
        description: "Automation code converted to workflow",
      });
      
      return data;
    } catch (error: any) {
      console.error("Error converting automation code:", error);
      setError(error.message || "Failed to convert automation code");
      toast({
        title: "Error",
        description: "Failed to convert automation code",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    workflows,
    error,
    fetchWorkflows,
    createWorkflow,
    executeWorkflow,
    convertAutomationToWorkflow
  };
}

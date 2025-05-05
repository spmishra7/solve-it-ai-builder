
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { toast } from 'sonner';

export interface GuardrailData {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export const GuardrailsTable = ({ 
  guardrails, 
  setGuardrails 
}: { 
  guardrails: GuardrailData[],
  setGuardrails: React.Dispatch<React.SetStateAction<GuardrailData[]>> 
}) => {
  const toggleGuardrailStatus = async (id: string, currentStatus: boolean) => {
    try {
      // Update local state
      setGuardrails(guardrails.map(guardrail => 
        guardrail.id === id ? { ...guardrail, enabled: !currentStatus } : guardrail
      ));
      
      // In a real app, update the database
      toast.success(`Guardrail ${currentStatus ? 'disabled' : 'enabled'} successfully`);
    } catch (error) {
      console.error('Error toggling guardrail status:', error);
      toast.error('Failed to update guardrail status');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Guardrails</CardTitle>
        <Button>Add New Guardrail</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guardrails.map((guardrail) => (
              <TableRow key={guardrail.id}>
                <TableCell>{guardrail.name}</TableCell>
                <TableCell>{guardrail.description}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    guardrail.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {guardrail.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleGuardrailStatus(guardrail.id, guardrail.enabled)}
                  >
                    {guardrail.enabled ? 'Disable' : 'Enable'}
                  </Button>
                  <Button variant="outline" size="sm">Configure</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

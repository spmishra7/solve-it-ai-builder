
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { toast } from 'sonner';

export interface TemplateData {
  id: string;
  title: string;
  category: string;
  active: boolean;
}

export const TemplatesTable = ({ 
  templates, 
  setTemplates 
}: { 
  templates: TemplateData[],
  setTemplates: React.Dispatch<React.SetStateAction<TemplateData[]>>
}) => {
  const toggleTemplateStatus = async (id: string, currentStatus: boolean) => {
    try {
      // Update local state first for immediate feedback
      setTemplates(templates.map(template => 
        template.id === id ? { ...template, active: !currentStatus } : template
      ));
      
      // In a real app, you would update this in the database
      toast.success(`Template ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error('Error toggling template status:', error);
      toast.error('Failed to update template status');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sector Templates</CardTitle>
        <Button>Add New Template</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>{template.title}</TableCell>
                <TableCell>{template.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    template.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {template.active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleTemplateStatus(template.id, template.active)}
                  >
                    {template.active ? 'Disable' : 'Enable'}
                  </Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

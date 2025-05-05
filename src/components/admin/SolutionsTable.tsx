
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export interface SolutionData {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  business_prompt: string;
}

export const SolutionsTable = ({ solutions }: { solutions: SolutionData[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Solutions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solutions.length > 0 ? (
              solutions.map((solution) => (
                <TableRow key={solution.id}>
                  <TableCell>{solution.title}</TableCell>
                  <TableCell>{new Date(solution.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{solution.user_id}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No solutions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

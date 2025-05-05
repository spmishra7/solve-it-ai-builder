
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Stepper, Step } from '@/components/ui/stepper';

interface StatsProps {
  totalUsers: number;
  totalSolutions: number;
  activeSubscriptions: number;
  usageLast30Days: number;
}

export const AdminOverview = ({ stats }: { stats: StatsProps }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Generated Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalSolutions}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeSubscriptions}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usage (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.usageLast30Days}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Platform Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper activeStep={3} orientation="horizontal">
            <Step label="System Health" description="All systems operational" />
            <Step label="API Status" description="APIs responding normally" />
            <Step label="Database" description="0 pending migrations" />
            <Step label="AI Models" description="All models available" />
          </Stepper>
        </CardContent>
      </Card>
    </>
  );
};

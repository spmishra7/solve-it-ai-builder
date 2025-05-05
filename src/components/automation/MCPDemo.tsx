
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MCPIntegration from "./MCPIntegration";

const MCPDemo = () => {
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Model Context Protocol Demo</CardTitle>
          <CardDescription>
            This demo showcases the Model Context Protocol (MCP) that integrates expert perspectives,
            LLM model selection, n8n automation, and UI preview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            The MCP allows you to select expert perspectives, assess SaaS app complexity,
            choose the appropriate LLM model, automate with n8n, and review the UI in the playground.
          </p>
        </CardContent>
      </Card>
      
      <MCPIntegration />
    </div>
  );
};

export default MCPDemo;

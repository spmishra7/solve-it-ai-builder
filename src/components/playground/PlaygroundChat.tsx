import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2, Bot, User, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWithLLM } from "@/lib/api";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  codeSnippet?: string;
  isApplied?: boolean;
}

interface PlaygroundChatProps {
  solutionId: string;
  onApplyChanges?: (changes: string) => void;
}

// Updated interface to make codeSnippet optional but consistent
interface MockResponse {
  response: string;
  codeSnippet?: string;
}

// Mock responses for offline functionality
const mockResponses = {
  uiChanges: [
    {
      response: "I can update the header color for you. Here's the code change needed:\n\n```css\nheader {\n  background-color: #3b82f6;\n  color: white;\n}\n```\nThis will make the header blue with white text.",
      codeSnippet: "header {\n  background-color: #3b82f6;\n  color: white;\n}"
    },
    {
      response: "I can add a new button to the navigation menu. Here's the code:\n\n```html\n<button class=\"btn btn-primary\">New Feature</button>\n```\nThis will add a primary styled button.",
      codeSnippet: "<button class=\"btn btn-primary\">New Feature</button>"
    },
    {
      response: "Let me create a modal dialog component for you:\n\n```jsx\nfunction Modal({isOpen, onClose, children}) {\n  if (!isOpen) return null;\n  return (\n    <div className=\"modal-overlay\">\n      <div className=\"modal-content\">\n        <button onClick={onClose} className=\"close-btn\">×</button>\n        {children}\n      </div>\n    </div>\n  );\n}\n```\nYou can use this Modal component to display popup content.",
      codeSnippet: "function Modal({isOpen, onClose, children}) {\n  if (!isOpen) return null;\n  return (\n    <div className=\"modal-overlay\">\n      <div className=\"modal-content\">\n        <button onClick={onClose} className=\"close-btn\">×</button>\n        {children}\n      </div>\n    </div>\n  );\n}"
    }
  ],
  dbChanges: [
    {
      response: "I can add a new table for user profiles. Here's the SQL:\n\n```sql\nCREATE TABLE user_profiles (\n  id SERIAL PRIMARY KEY,\n  user_id UUID REFERENCES auth.users(id),\n  display_name VARCHAR(255),\n  bio TEXT,\n  avatar_url VARCHAR(255),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n```\nThis will create a new table to store user profile information.",
      codeSnippet: "CREATE TABLE user_profiles (\n  id SERIAL PRIMARY KEY,\n  user_id UUID REFERENCES auth.users(id),\n  display_name VARCHAR(255),\n  bio TEXT,\n  avatar_url VARCHAR(255),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);"
    },
    {
      response: "Let me add an index to improve query performance:\n\n```sql\nCREATE INDEX idx_solutions_user_id ON solutions(user_id);\n```\nThis will make queries filtering by user_id much faster.",
      codeSnippet: "CREATE INDEX idx_solutions_user_id ON solutions(user_id);"
    }
  ],
  automationChanges: [
    {
      response: "I can create an automation workflow for sending email notifications:\n\n```javascript\nasync function sendNotificationEmail(userId, eventType) {\n  const user = await getUser(userId);\n  const template = getEmailTemplate(eventType);\n  \n  return await sendEmail({\n    to: user.email,\n    subject: template.subject,\n    body: template.body\n  });\n}\n```\nThis function will send notification emails based on event types.",
      codeSnippet: "async function sendNotificationEmail(userId, eventType) {\n  const user = await getUser(userId);\n  const template = getEmailTemplate(eventType);\n  \n  return await sendEmail({\n    to: user.email,\n    subject: template.subject,\n    body: template.body\n  });\n}"
    },
    {
      response: "Here's a scheduled task for data cleanup:\n\n```javascript\nfunction scheduleDataCleanup() {\n  return cron('0 0 * * *', async () => {\n    const threshold = new Date();\n    threshold.setDate(threshold.getDate() - 30);\n    \n    await db.from('temp_data')\n      .delete()\n      .lt('created_at', threshold.toISOString());\n    \n    console.log('Cleanup complete: Removed temporary data older than 30 days');\n  });\n}\n```\nThis creates a daily cron job to remove data older than 30 days.",
      codeSnippet: "function scheduleDataCleanup() {\n  return cron('0 0 * * *', async () => {\n    const threshold = new Date();\n    threshold.setDate(threshold.getDate() - 30);\n    \n    await db.from('temp_data')\n      .delete()\n      .lt('created_at', threshold.toISOString());\n    \n    console.log('Cleanup complete: Removed temporary data older than 30 days');\n  });\n}"
    }
  ],
  general: [
    "I'm happy to help you modify your app. What specific changes would you like to make?",
    "Let me know what aspect of your application you'd like to improve. I can help with UI, database, or automation workflows.",
    "I'd be glad to assist with your app development. Would you like to modify the UI, update the database schema, or enhance your automation workflows?"
  ]
};

const getRandomResponse = (category: string, prompt: string): MockResponse => {
  // Simple keyword matching for more relevant responses
  if (prompt.toLowerCase().includes('color') || prompt.toLowerCase().includes('style') || prompt.toLowerCase().includes('ui')) {
    return mockResponses.uiChanges[Math.floor(Math.random() * mockResponses.uiChanges.length)];
  } else if (prompt.toLowerCase().includes('table') || prompt.toLowerCase().includes('database') || prompt.toLowerCase().includes('sql')) {
    return mockResponses.dbChanges[Math.floor(Math.random() * mockResponses.dbChanges.length)];
  } else if (prompt.toLowerCase().includes('workflow') || prompt.toLowerCase().includes('automation') || prompt.toLowerCase().includes('function')) {
    return mockResponses.automationChanges[Math.floor(Math.random() * mockResponses.automationChanges.length)];
  } else {
    // Default to general responses - ensure we return a consistent object shape
    const generalResponse = mockResponses.general[Math.floor(Math.random() * mockResponses.general.length)];
    return { response: generalResponse };
  }
};

const PlaygroundChat = ({ solutionId, onApplyChanges }: PlaygroundChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to the App Playground! I can help you modify your app. Describe what changes you'd like to make to your frontend or backend.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCodeSnippet, setSelectedCodeSnippet] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      // Try to use the real API first
      let response = "";
      let codeSnippet: string | undefined = undefined;
      
      try {
        // Create system prompt for specialized app development assistance
        const systemPrompt = 
          "You are an App Development Assistant specialized in helping users modify their SaaS applications. " +
          "When users request changes, provide specific code suggestions that could implement their requested feature. " +
          "Focus on both frontend (UI/UX) and backend (database schema, APIs) modifications as needed. " +
          "Format your response with code examples when appropriate.";
        
        const apiResponse = await generateWithLLM(
          input,
          "openai",
          "gpt-4o-mini",
          systemPrompt
        );
        
        if (apiResponse) {
          response = apiResponse;
          
          // Extract code snippet if present (between ``` markers)
          const codeMatch = response.match(/```(?:html|css|jsx|js|javascript|sql|tsx|typescript)?([\s\S]*?)```/);
          if (codeMatch && codeMatch[1]) {
            codeSnippet = codeMatch[1].trim();
          }
        }
      } catch (apiError) {
        console.log("API error, falling back to mock responses:", apiError);
        // If API fails, use our mock responses
        const mockResponse = getRandomResponse("general", input);
        response = mockResponse.response;
        codeSnippet = mockResponse.codeSnippet;
      }
      
      // If we still don't have a response, use mock as fallback
      if (!response) {
        const mockResponse = getRandomResponse("general", input);
        response = mockResponse.response || "I understand what you're asking for. Let me help you implement that change.";
        codeSnippet = mockResponse.codeSnippet;
      }
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        codeSnippet: codeSnippet,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      if (codeSnippet) {
        setSelectedCodeSnippet(codeSnippet);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      
      // Add fallback message
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I'm having trouble connecting to the AI. Please try again or check your connection.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyChanges = () => {
    // Find the message with the selected code snippet or use the latest assistant message
    const messageWithCode = selectedCodeSnippet 
      ? messages.find(msg => msg.codeSnippet === selectedCodeSnippet)
      : [...messages].reverse().find(msg => msg.role === "assistant" && msg.codeSnippet);
      
    if (messageWithCode && messageWithCode.codeSnippet && onApplyChanges) {
      onApplyChanges(messageWithCode.codeSnippet);
      
      // Mark this message as applied
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageWithCode.id 
            ? { ...msg, isApplied: true } 
            : msg
        )
      );
      
      toast({
        title: "Changes Applied",
        description: "The suggested changes have been applied to your app."
      });
    } else {
      toast({
        title: "No Changes to Apply",
        description: "There are no code suggestions to apply.",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageContent = (content: string) => {
    // Split content by code blocks and render them differently
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).trim();
        const language = code.split('\n')[0].trim();
        const codeContent = language.match(/^[a-zA-Z0-9]+$/) 
          ? code.substring(language.length).trim()
          : code;
        
        return (
          <div key={index} className="bg-gray-900 text-gray-100 p-3 rounded-md my-2 overflow-x-auto font-mono text-sm">
            {codeContent}
          </div>
        );
      }
      
      return <p key={index} className="whitespace-pre-wrap">{part}</p>;
    });
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <Bot size={18} className="text-brand-600" />
          App Development Assistant
        </h3>
      </div>
      
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant" ? "bg-brand-100 border border-brand-300" : "bg-gray-100"
                  }`}>
                    {message.role === "assistant" ? (
                      <Bot className="h-5 w-5 text-brand-600" />
                    ) : (
                      <User className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg p-3 ${
                    message.role === "assistant" 
                      ? "bg-white border border-gray-200" 
                      : "bg-brand-600 text-white"
                  }`}>
                    <div>
                      {renderMessageContent(message.content)}
                    </div>
                    
                    <div className={`flex items-center justify-between mt-2 ${
                      message.role === "assistant" ? "text-gray-500" : "text-brand-200"
                    }`}>
                      <span className="text-xs">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      {message.isApplied && message.role === "assistant" && (
                        <span className="text-xs flex items-center text-green-600">
                          <Check size={12} className="mr-1" />
                          Applied
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the changes you want to make..."
              className="min-h-[80px] resize-none"
              disabled={isProcessing}
            />
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isProcessing} 
                className="h-10 px-3"
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                onClick={handleApplyChanges}
                className="h-10 px-3"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaygroundChat;

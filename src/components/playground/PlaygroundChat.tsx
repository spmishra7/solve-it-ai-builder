
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWithLLM } from "@/lib/api";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface PlaygroundChatProps {
  solutionId: string;
  onApplyChanges?: (changes: string) => void;
}

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
      // Create system prompt for specialized app development assistance
      const systemPrompt = 
        "You are an App Development Assistant specialized in helping users modify their SaaS applications. " +
        "When users request changes, provide specific code suggestions that could implement their requested feature. " +
        "Focus on both frontend (UI/UX) and backend (database schema, APIs) modifications as needed. " +
        "Format your response with code examples when appropriate.";
      
      const response = await generateWithLLM(
        input,
        "openai",
        "gpt-4o-mini",
        systemPrompt
      );
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response || "Sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
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
    // Get the latest assistant message with code suggestions
    const latestAssistantMessage = [...messages]
      .reverse()
      .find(msg => msg.role === "assistant");
      
    if (latestAssistantMessage && onApplyChanges) {
      onApplyChanges(latestAssistantMessage.content);
      toast({
        title: "Changes Applied",
        description: "The suggested changes have been applied to your app."
      });
    } else {
      toast({
        title: "No Changes to Apply",
        description: "There are no recent suggestions to apply.",
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
                  <Avatar className={message.role === "assistant" ? "bg-brand-100 border border-brand-300" : "bg-gray-100"}>
                    {message.role === "assistant" ? (
                      <Bot className="h-5 w-5 text-brand-600" />
                    ) : (
                      <User className="h-5 w-5 text-gray-600" />
                    )}
                  </Avatar>
                  
                  <div className={`rounded-lg p-3 ${
                    message.role === "assistant" 
                      ? "bg-white border border-gray-200" 
                      : "bg-brand-600 text-white"
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === "assistant" ? "text-gray-500" : "text-brand-200"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
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

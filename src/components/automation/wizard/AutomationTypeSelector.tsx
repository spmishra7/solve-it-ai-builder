
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, Calendar, BellRing, Clock } from "lucide-react";

interface AutomationTypeSelectorProps {
  implementingType: string;
  setImplementingType: (type: string) => void;
}

const AutomationTypeSelector = ({
  implementingType,
  setImplementingType,
}: AutomationTypeSelectorProps) => {
  const automationTypes = [
    { id: "email", name: "Email Notifications", icon: <Mail className="h-5 w-5" /> },
    { id: "schedule", name: "Scheduled Tasks", icon: <Calendar className="h-5 w-5" /> },
    { id: "alerts", name: "User Alerts", icon: <BellRing className="h-5 w-5" /> },
    { id: "cron", name: "Cron Jobs", icon: <Clock className="h-5 w-5" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {automationTypes.map((type) => (
        <Card 
          key={type.id}
          className={`cursor-pointer transition-all ${
            implementingType === type.id ? "border-brand-500 bg-brand-50" : "hover:border-brand-200"
          }`}
          onClick={() => setImplementingType(type.id)}
        >
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="bg-brand-100 text-brand-700 p-2 rounded-full">
              {type.icon}
            </div>
            <div>
              <h3 className="font-medium">{type.name}</h3>
              <p className="text-sm text-gray-500">Implement {type.name.toLowerCase()}</p>
            </div>
            {implementingType === type.id && <CheckCircle2 className="h-5 w-5 ml-auto text-brand-600" />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AutomationTypeSelector;


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface TemplateProps {
  title: string;
  description: string;
  icon: string;
  category: string;
}

const TemplateCard = ({ title, description, icon, category }: TemplateProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-brand-200">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-brand-100 text-brand-600 text-xl">
              {icon}
            </div>
          </div>
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-600">
              {category}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
          <Button variant="outline" className="w-full justify-between group">
            Use Template
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;

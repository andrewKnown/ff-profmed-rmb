
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface ProfessionalToolProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  isActive: boolean;
  onClick: () => void;
}

const ProfessionalTool = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  isActive, 
  onClick 
}: ProfessionalToolProps) => {
  return (
    <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="bg-primary/10 p-3 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="ghost" size="sm" className="mt-4">
          {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfessionalTool;

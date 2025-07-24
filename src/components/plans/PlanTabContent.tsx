
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface PlanTabContentProps {
  title: string;
  badge: string;
  benefits: string[];
  description: string;
  monthlyPremium: string;
}

const PlanTabContent = ({ title, badge, benefits, description, monthlyPremium }: PlanTabContentProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold">{title}</h4>
          <Badge variant="secondary">{badge}</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-2">Key Benefits</h5>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Ideal For</h5>
            <p className="text-muted-foreground">{description}</p>
            <div className="mt-4">
              <span className="text-sm font-medium">Monthly premium from:</span>
              <p className="text-xl font-bold text-primary">{monthlyPremium}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanTabContent;

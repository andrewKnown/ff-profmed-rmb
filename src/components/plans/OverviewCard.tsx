
import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardProps {
  description: string;
}

const OverviewCard = ({ description }: OverviewCardProps) => {
  return (
    <Card className="mb-12 bg-card shadow-lg">
      <CardContent className="p-6">
        <p className="text-lg text-center text-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;

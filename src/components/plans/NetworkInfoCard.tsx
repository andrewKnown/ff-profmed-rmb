
import { Card, CardContent } from "@/components/ui/card";

interface NetworkInfoCardProps {
  title: string;
  description: string;
}

const NetworkInfoCard = ({ title, description }: NetworkInfoCardProps) => {
  return (
    <Card className="mb-12 bg-card shadow-lg">
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-4 text-primary">{title}</h3>
        <p className="text-foreground/80">{description}</p>
      </CardContent>
    </Card>
  );
};

export default NetworkInfoCard;

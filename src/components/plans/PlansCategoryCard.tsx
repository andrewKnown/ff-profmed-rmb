
import { Card, CardContent } from "@/components/ui/card";
import { Hospital, Stethoscope, Network, PlusCircle } from "lucide-react";

interface PlansCategoryCardProps {
  imageSrc: string;
  altText: string;
}

const PlansCategoryCard = ({ imageSrc, altText }: PlansCategoryCardProps) => {
  return (
    <Card className="bg-medical-background overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={imageSrc}
            alt={altText}
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
            <div className="flex gap-4 mt-4">
              <Hospital className="text-white" size={24} />
              <Stethoscope className="text-white" size={24} />
              <Network className="text-white" size={24} />
              <PlusCircle className="text-white" size={24} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansCategoryCard;

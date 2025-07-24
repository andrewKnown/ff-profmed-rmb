
import { Progress } from "@/components/ui/progress";

interface FAQLoadingIndicatorProps {
  loadingProgress: number;
  loadingStatus: string;
}

const FAQLoadingIndicator = ({ loadingProgress, loadingStatus }: FAQLoadingIndicatorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Progress value={loadingProgress} className="h-2" />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {loadingProgress}%
        </span>
      </div>
      {loadingStatus && (
        <p className="text-xs text-muted-foreground">{loadingStatus}</p>
      )}
    </div>
  );
};

export default FAQLoadingIndicator;


import { Skeleton } from "@/components/ui/skeleton";

const FAQSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2 animate-pulse">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
    </div>
  );
};

export default FAQSkeleton;

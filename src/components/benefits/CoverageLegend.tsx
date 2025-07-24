
import { CheckCircle, XCircle, HelpCircle, ArrowLeftRight } from "lucide-react";

const CoverageLegend = () => {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium mb-2">Coverage Legend:</h4>
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
          <span>Full coverage</span>
        </div>
        <div className="flex items-center">
          <HelpCircle className="h-4 w-4 text-amber-500 mr-2" /> 
          <span>Partial coverage</span>
        </div>
        <div className="flex items-center">
          <XCircle className="h-4 w-4 text-red-500 mr-2" /> 
          <span>Not covered</span>
        </div>
        <div className="flex items-center">
          <ArrowLeftRight className="h-4 w-4 text-slate-500 mr-2" /> 
          <span>Direct comparison</span>
        </div>
      </div>
    </div>
  );
};

export default CoverageLegend;

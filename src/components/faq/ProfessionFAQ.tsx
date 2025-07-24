
import { Card, CardContent } from "@/components/ui/card";
import { formatProfessionName } from "../ThemeSelector";
import FAQSkeleton from "./FAQSkeleton";
import FAQLoadingIndicator from "./FAQLoadingIndicator";
import FAQList from "./FAQList";
import { useFAQData } from "./useFAQData";

interface ProfessionFAQProps {
  profession: string;
}

// Helper function to pluralize profession names
const pluralizeProfession = (profession: string): string => {
  const formattedName = formatProfessionName(profession);
  
  // Special cases for irregular plurals
  if (formattedName.toLowerCase().endsWith('attorney')) {
    return formattedName.replace(/attorney$/i, 'attorneys');
  }
  if (formattedName.toLowerCase().endsWith('dentist')) {
    return formattedName.replace(/dentist$/i, 'dentists');
  }
  if (formattedName.toLowerCase().endsWith('doctor')) {
    return formattedName.replace(/doctor$/i, 'doctors');
  }
  if (formattedName.toLowerCase().endsWith('architect')) {
    return formattedName.replace(/architect$/i, 'architects');
  }
  if (formattedName.toLowerCase().endsWith('accountant')) {
    return formattedName.replace(/accountant$/i, 'accountants');
  }
  if (formattedName.toLowerCase().endsWith('engineer')) {
    return formattedName.replace(/engineer$/i, 'engineers');
  }
  if (formattedName.toLowerCase().endsWith('paramedic')) {
    return formattedName.replace(/paramedic$/i, 'paramedics');
  }
  
  // General cases - add 's' if it doesn't already end with 's'
  if (!formattedName.endsWith('s')) {
    return `${formattedName}s`;
  }
  
  return formattedName;
};

const ProfessionFAQ = ({ profession }: ProfessionFAQProps) => {
  const {
    faqs,
    isLoading,
    loadingProgress,
    loadingStatus
  } = useFAQData(profession);

  return (
    <Card className="mb-8 shadow-md">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold">Profession-Specific FAQs</h3>
        </div>
        
        {profession !== 'default' && (
          <p className="mb-4 text-muted-foreground">
            Frequently asked questions for {pluralizeProfession(profession)}
          </p>
        )}

        {isLoading && (
          <div className="space-y-4">
            <FAQLoadingIndicator 
              loadingProgress={loadingProgress} 
              loadingStatus={loadingStatus} 
            />
            <FAQSkeleton />
          </div>
        )}

        {!isLoading && <FAQList faqs={faqs} />}
      </CardContent>
    </Card>
  );
};

export default ProfessionFAQ;

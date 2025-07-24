
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQListProps {
  faqs: FAQ[];
}

const FAQList = ({ faqs }: FAQListProps) => {
  if (faqs.length === 0) {
    return (
      <Alert>
        <AlertTitle>No FAQs Available</AlertTitle>
        <AlertDescription>
          We couldn't find any FAQs for this profession. Please try refreshing or contact support.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger className="font-medium text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQList;

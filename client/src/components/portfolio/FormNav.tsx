import { Button } from "@/components/ui/button";
import { TabType } from "@/types/portfolio";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";

interface FormNavProps {
  activeTab: TabType;
  prevTab: () => void;
  nextTab: () => void;
  loadExampleData: () => void;
  generatePortfolio: () => void;
}

export default function FormNav({ 
  activeTab, 
  prevTab, 
  nextTab, 
  loadExampleData, 
  generatePortfolio 
}: FormNavProps) {
  return (
    <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
      <Button 
        onClick={loadExampleData} 
        variant="outline" 
        className="flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v10l5-5"></path>
          <path d="M21 12v10l-5-5"></path>
          <path d="M13 2h-2.5A1.5 1.5 0 0 0 9 3.5V4"></path>
          <path d="M13 20v1.5a1.5 1.5 0 0 1-1.5 1.5H9"></path>
          <path d="M17 2h2.5A1.5 1.5 0 0 1 21 3.5V4"></path>
          <path d="M17 20v1.5a1.5 1.5 0 0 0 1.5 1.5H21"></path>
        </svg>
        Load Example Data
      </Button>
      
      <div className="flex gap-2">
        {activeTab !== 'personal' && (
          <Button 
            onClick={prevTab} 
            variant="outline" 
            className="flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>
        )}
        
        {activeTab !== 'contact' ? (
          <Button 
            onClick={nextTab} 
            className="flex items-center gap-1"
          >
            Next
            <ArrowRight size={16} />
          </Button>
        ) : (
          <Button 
            onClick={generatePortfolio} 
            className="flex items-center gap-1"
          >
            <Wand2 size={16} />
            Generate Portfolio
          </Button>
        )}
      </div>
    </div>
  );
}

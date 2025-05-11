import { Dispatch, SetStateAction } from "react";
import { PortfolioData } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface EducationFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: Dispatch<SetStateAction<PortfolioData>>;
  addCertification: () => void;
  removeCertification: (index: number) => void;
}

export default function EducationForm({ 
  portfolioData, 
  setPortfolioData, 
  addCertification, 
  removeCertification 
}: EducationFormProps) {
  const handleEducationChange = (value: string) => {
    setPortfolioData({
      ...portfolioData,
      education: value
    });
  };

  const handleCertificationChange = (index: number, value: string) => {
    const newCertifications = [...portfolioData.certifications];
    newCertifications[index] = value;
    setPortfolioData({
      ...portfolioData,
      certifications: newCertifications
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Education & Certifications</h2>
      
      <div>
        <Label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Education <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="education" 
          type="text" 
          value={portfolioData.education} 
          onChange={(e) => handleEducationChange(e.target.value)}
          placeholder="e.g., BSc Computer Science - University (2022-2026)"
          className="w-full mt-1"
        />
      </div>
      
      <div className="pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-medium">Certifications</h3>
          <Button onClick={addCertification} size="sm" variant="outline" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Add Certification</span>
          </Button>
        </div>
        
        {portfolioData.certifications.map((cert, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-2 py-2 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="flex-grow">
              <Input 
                type="text" 
                value={cert} 
                onChange={(e) => handleCertificationChange(index, e.target.value)}
                placeholder="Certification name"
                className="w-full"
              />
            </div>
            <Button 
              onClick={() => removeCertification(index)} 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {portfolioData.certifications.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <p>No certifications added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

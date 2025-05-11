import { Dispatch, SetStateAction } from "react";
import { PortfolioData, Experience } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: Dispatch<SetStateAction<PortfolioData>>;
  addExperience: () => void;
  removeExperience: (index: number) => void;
}

export default function ExperienceForm({ 
  portfolioData, 
  setPortfolioData, 
  addExperience, 
  removeExperience 
}: ExperienceFormProps) {
  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...portfolioData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    setPortfolioData({
      ...portfolioData,
      experience: newExperience
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Work Experience / Internships</h2>
        <Button onClick={addExperience} size="sm" variant="outline" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Experience</span>
        </Button>
      </div>
      
      {portfolioData.experience.map((job, index) => (
        <div 
          key={index} 
          className="p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-medium">
              {job.company || `Experience ${index + 1}`}
            </h3>
            <Button 
              onClick={() => removeExperience(index)} 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company
              </Label>
              <Input 
                type="text" 
                value={job.company} 
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </Label>
              <Input 
                type="text" 
                value={job.role} 
                onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration
              </Label>
              <Input 
                type="text" 
                value={job.duration} 
                onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                placeholder="e.g., Jan 2023 - June 2023"
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Key Achievements
              </Label>
              <Textarea 
                value={job.description} 
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                rows={3}
                placeholder="Use bullet points for achievements"
                className="w-full"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Use new lines to create bullet points
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {portfolioData.experience.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No experience added yet. Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  );
}

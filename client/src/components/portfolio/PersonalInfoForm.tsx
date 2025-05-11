import { Dispatch, SetStateAction } from "react";
import { PortfolioData } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PersonalInfoFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: Dispatch<SetStateAction<PortfolioData>>;
}

export default function PersonalInfoForm({ portfolioData, setPortfolioData }: PersonalInfoFormProps) {
  const handleChange = (field: string, value: string) => {
    setPortfolioData({
      ...portfolioData,
      personal: {
        ...portfolioData.personal,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="name" 
            type="text" 
            value={portfolioData.personal.name} 
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Professional Title <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="title" 
            type="text" 
            value={portfolioData.personal.title} 
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., CS Student | Full-Stack Developer"
            className="w-full mt-1"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="bio" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Short Bio <span className="text-red-500">*</span>
        </Label>
        <Textarea 
          id="bio" 
          value={portfolioData.personal.bio} 
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="2-3 sentences about yourself"
          className="w-full mt-1"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Location <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="location" 
          type="text" 
          value={portfolioData.personal.location} 
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, Country"
          className="w-full mt-1"
        />
      </div>
    </div>
  );
}

import { Dispatch, SetStateAction } from "react";
import { PortfolioData } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: Dispatch<SetStateAction<PortfolioData>>;
}

export default function ContactForm({ portfolioData, setPortfolioData }: ContactFormProps) {
  const handleChange = (field: string, value: string) => {
    setPortfolioData({
      ...portfolioData,
      contact: {
        ...portfolioData.contact,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Contact & Social Links</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="email" 
            type="email" 
            value={portfolioData.contact.email} 
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            LinkedIn
          </Label>
          <Input 
            id="linkedin" 
            type="url" 
            value={portfolioData.contact.linkedin} 
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            GitHub <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="github" 
            type="url" 
            value={portfolioData.contact.github} 
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Twitter
          </Label>
          <Input 
            id="twitter" 
            type="url" 
            value={portfolioData.contact.twitter} 
            onChange={(e) => handleChange('twitter', e.target.value)}
            className="w-full mt-1"
          />
        </div>
      </div>
    </div>
  );
}

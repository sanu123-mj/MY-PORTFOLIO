import { Dispatch, SetStateAction } from "react";
import { PortfolioData, Skill } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SkillsFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: Dispatch<SetStateAction<PortfolioData>>;
  addSkill: () => void;
  removeSkill: (index: number) => void;
}

export default function SkillsForm({ 
  portfolioData, 
  setPortfolioData, 
  addSkill, 
  removeSkill 
}: SkillsFormProps) {
  const handleSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...portfolioData.skills];
    newSkills[index] = {
      ...newSkills[index],
      [field]: value
    };
    setPortfolioData({
      ...portfolioData,
      skills: newSkills
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Technical Skills</h2>
        <Button onClick={addSkill} size="sm" variant="outline" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Skill</span>
        </Button>
      </div>
      
      {portfolioData.skills.map((skill, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-4 py-2 border-b border-gray-100 dark:border-gray-700"
        >
          <div className="flex-grow">
            <Input 
              type="text" 
              value={skill.name} 
              onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
              placeholder="Skill name"
              className="w-full"
            />
          </div>
          <div className="w-40">
            <Label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Level: {skill.level}/10
            </Label>
            <Slider
              value={[skill.level]}
              min={1}
              max={10}
              step={1}
              onValueChange={values => handleSkillChange(index, 'level', values[0])}
              className="w-full"
            />
          </div>
          <div className="w-10 flex justify-center">
            <Button 
              onClick={() => removeSkill(index)} 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      {portfolioData.skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No skills added yet. Click "Add Skill" to get started.</p>
        </div>
      )}
    </div>
  );
}

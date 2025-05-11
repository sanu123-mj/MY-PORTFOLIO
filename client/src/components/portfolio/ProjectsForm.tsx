import { Dispatch, SetStateAction } from "react";
import { PortfolioData, Project } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProjectsFormProps {
  portfolioData: PortfolioData;
  setPortfolioData: Dispatch<SetStateAction<PortfolioData>>;
  addProject: () => void;
  removeProject: (index: number) => void;
}

export default function ProjectsForm({ 
  portfolioData, 
  setPortfolioData, 
  addProject, 
  removeProject 
}: ProjectsFormProps) {
  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...portfolioData.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    };
    setPortfolioData({
      ...portfolioData,
      projects: newProjects
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Projects</h2>
        <Button onClick={addProject} size="sm" variant="outline" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>
      
      {portfolioData.projects.map((project, index) => (
        <div 
          key={index} 
          className="p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-medium">
              {project.name || `Project ${index + 1}`}
            </h3>
            <Button 
              onClick={() => removeProject(index)} 
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
                Project Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                type="text" 
                value={project.name} 
                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea 
                value={project.description} 
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                rows={2}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Technologies Used <span className="text-red-500">*</span>
              </Label>
              <Input 
                type="text" 
                value={project.tech} 
                onChange={(e) => handleProjectChange(index, 'tech', e.target.value)}
                placeholder="e.g., React, Node.js, MongoDB"
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub Link <span className="text-red-500">*</span>
                </Label>
                <Input 
                  type="text" 
                  value={project.github} 
                  onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Live Demo URL
                </Label>
                <Input 
                  type="text" 
                  value={project.demo} 
                  onChange={(e) => handleProjectChange(index, 'demo', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {portfolioData.projects.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No projects added yet. Click "Add Project" to get started.</p>
        </div>
      )}
    </div>
  );
}

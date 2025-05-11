import { Template } from "@/types/portfolio";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  template: Template;
  index: number;
  selectTemplate: (index: number) => void;
}

export default function TemplateSelector({ template, index, selectTemplate }: TemplateSelectorProps) {
  return (
    <div 
      onClick={() => selectTemplate(index)} 
      className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
        template.selected 
          ? 'border-primary ring-2 ring-primary-200 dark:ring-primary-900' 
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      <img 
        src={template.image} 
        alt={template.name} 
        className="w-full h-32 object-cover" 
      />
      <div className="p-3 flex justify-between items-center">
        <span className="font-medium">{template.name}</span>
        {template.selected && <Check size={16} className="text-primary" />}
      </div>
    </div>
  );
}

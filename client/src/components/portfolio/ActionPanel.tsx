import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Edit, CheckCircle } from "lucide-react";

interface ActionPanelProps {
  togglePreviewMode: () => void;
  exportPortfolio: () => void;
}

export default function ActionPanel({ togglePreviewMode, exportPortfolio }: ActionPanelProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h2 className="text-lg font-medium">Portfolio Actions</h2>
        
        <div className="space-y-3">
          <Button 
            onClick={togglePreviewMode} 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Edit size={16} />
            Edit Portfolio
          </Button>
          
          <Button 
            onClick={exportPortfolio} 
            className="w-full flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Export Portfolio
          </Button>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-md font-medium mb-2">Deployment Options</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle size={16} className="text-secondary-500 mt-1 mr-2" />
              <div>
                <span className="font-medium">GitHub Pages</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Free hosting directly from your GitHub repository
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle size={16} className="text-secondary-500 mt-1 mr-2" />
              <div>
                <span className="font-medium">Vercel</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  One-click deployment with Next.js optimization
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle size={16} className="text-secondary-500 mt-1 mr-2" />
              <div>
                <span className="font-medium">Netlify</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Simple deployment with continuous integration
                </p>
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

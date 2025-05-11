import { PortfolioData } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitPullRequest, Mail, Linkedin, Twitter, MapPin, Award } from "lucide-react";

interface PortfolioPreviewProps {
  portfolioData: PortfolioData;
  selectedTemplate: string;
}

export default function PortfolioPreview({ portfolioData, selectedTemplate }: PortfolioPreviewProps) {
  return (
    <Card className="rounded-xl shadow-md overflow-hidden">
      {/* Portfolio Header */}
      <div className="relative">
        <div className="h-32 md:h-48 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=300" 
            alt="Tech background header" 
            className="w-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-end items-end p-4">
          <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex space-x-2">
              {portfolioData.contact.github && (
                <a 
                  href={portfolioData.contact.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-400"
                >
                  <GitPullRequest size={16} />
                </a>
              )}
              
              {portfolioData.contact.linkedin && (
                <a 
                  href={portfolioData.contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-400"
                >
                  <Linkedin size={16} />
                </a>
              )}
              
              {portfolioData.contact.email && (
                <a 
                  href={`mailto:${portfolioData.contact.email}`}
                  className="p-2 rounded-full text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-400"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl md:text-3xl font-bold">
              {portfolioData.personal.name || 'Your Name'}
            </h1>
            <p className="text-lg text-primary dark:text-primary-400 mt-1">
              {portfolioData.personal.title || 'Your Title'}
            </p>
            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
              <MapPin size={16} className="mr-2" />
              <span>{portfolioData.personal.location || 'Your Location'}</span>
            </div>
            <div className="mt-4 text-gray-700 dark:text-gray-300">
              {portfolioData.personal.bio || 'Your short bio will appear here.'}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {portfolioData.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.name || 'Skill Name'}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {skill.level}/10
                  </span>
                </div>
                <Progress value={skill.level * 10} className="h-2" />
              </div>
            ))}
            
            {portfolioData.skills.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 italic">
                No skills added yet
              </div>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.projects.map((project, index) => (
              <div 
                key={index} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-5">
                  <h3 className="text-lg font-medium mb-2">
                    {project.name || 'Project Name'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {project.description || 'Project description will appear here.'}
                  </p>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Technologies
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {project.tech || 'Tech stack'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm flex items-center px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <GitPullRequest size={14} className="mr-1" /> GitPullRequest
                      </a>
                    )}
                    
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm flex items-center px-3 py-1 rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                      >
                        <ExternalLink size={14} className="mr-1" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {portfolioData.projects.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 italic">
                No projects added yet
              </div>
            )}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            Education & Certifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Education</h3>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <Award className="text-primary mb-2" size={20} />
                <div>
                  {portfolioData.education || 'Your education will appear here.'}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Certifications</h3>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {portfolioData.certifications.map((cert, index) => (
                    <li key={index}>{cert || 'Certification'}</li>
                  ))}
                  
                  {portfolioData.certifications.length === 0 && (
                    <li className="text-gray-500 dark:text-gray-400 italic">
                      Your certifications will appear here
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            Experience
          </h2>
          
          <div className="space-y-6">
            {portfolioData.experience.map((job, index) => (
              <div key={index} className="border-l-2 border-primary pl-4 ml-2">
                <div className="mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {job.role || 'Position'}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300"> at </span>
                  <span className="font-medium text-primary-700 dark:text-primary-400">
                    {job.company || 'Company'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {job.duration || 'Duration'}
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
                  {job.description || 'Job description'}
                </div>
              </div>
            ))}
            
            {portfolioData.experience.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 italic">
                No experience added yet
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            Contact
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioData.contact.email && (
              <a 
                href={`mailto:${portfolioData.contact.email}`} 
                className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Mail className="text-lg text-primary mr-3" size={20} />
                <span className="text-gray-800 dark:text-gray-200 text-sm truncate">
                  {portfolioData.contact.email}
                </span>
              </a>
            )}
            
            {portfolioData.contact.linkedin && (
              <a 
                href={portfolioData.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Linkedin className="text-lg text-primary mr-3" size={20} />
                <span className="text-gray-800 dark:text-gray-200 text-sm">
                  LinkedIn
                </span>
              </a>
            )}
            
            {portfolioData.contact.github && (
              <a 
                href={portfolioData.contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <GitPullRequest className="text-lg text-primary mr-3" size={20} />
                <span className="text-gray-800 dark:text-gray-200 text-sm">
                  GitPullRequest
                </span>
              </a>
            )}
            
            {portfolioData.contact.twitter && (
              <a 
                href={portfolioData.contact.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Twitter className="text-lg text-primary mr-3" size={20} />
                <span className="text-gray-800 dark:text-gray-200 text-sm">
                  Twitter
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Portfolio Footer */}
        <div className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} {portfolioData.personal.name || 'Your Name'}. 
            Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </Card>
  );
}

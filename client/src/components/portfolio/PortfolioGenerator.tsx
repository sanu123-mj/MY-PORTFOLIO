import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  DEFAULT_PORTFOLIO_DATA, 
  DEFAULT_TEMPLATES, 
  PortfolioData, 
  TabType, 
  Template 
} from "@/types/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "./ThemeToggle";
import PortfolioPreview from "./PortfolioPreview";
import PersonalInfoForm from "./PersonalInfoForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ContactForm from "./ContactForm";
import TemplateSelector from "./TemplateSelector";
import ActionPanel from "./ActionPanel";
import FormNav from "./FormNav";

export default function PortfolioGenerator() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [templates, setTemplates] = useState<Template[]>(DEFAULT_TEMPLATES);
  const [previewMode, setPreviewMode] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        setPortfolioData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }

    const savedActiveTab = localStorage.getItem('activeTab');
    if (savedActiveTab && ['personal', 'skills', 'projects', 'education', 'experience', 'contact'].includes(savedActiveTab)) {
      setActiveTab(savedActiveTab as TabType);
    }

    // Initialize empty arrays if they don't exist
    if (!portfolioData.skills.length) addSkill();
    if (!portfolioData.projects.length) addProject();
    if (!portfolioData.certifications.length) addCertification();
    if (!portfolioData.experience.length) addExperience();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const addSkill = () => {
    setPortfolioData({
      ...portfolioData,
      skills: [...portfolioData.skills, { name: '', level: 5 }]
    });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...portfolioData.skills];
    newSkills.splice(index, 1);
    setPortfolioData({ ...portfolioData, skills: newSkills });
  };

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [...portfolioData.projects, { name: '', description: '', tech: '', github: '', demo: '' }]
    });
  };

  const removeProject = (index: number) => {
    const newProjects = [...portfolioData.projects];
    newProjects.splice(index, 1);
    setPortfolioData({ ...portfolioData, projects: newProjects });
  };

  const addCertification = () => {
    setPortfolioData({
      ...portfolioData,
      certifications: [...portfolioData.certifications, '']
    });
  };

  const removeCertification = (index: number) => {
    const newCerts = [...portfolioData.certifications];
    newCerts.splice(index, 1);
    setPortfolioData({ ...portfolioData, certifications: newCerts });
  };

  const addExperience = () => {
    setPortfolioData({
      ...portfolioData,
      experience: [...portfolioData.experience, { company: '', role: '', duration: '', description: '' }]
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...portfolioData.experience];
    newExperience.splice(index, 1);
    setPortfolioData({ ...portfolioData, experience: newExperience });
  };

  const validateForm = () => {
    const personal = portfolioData.personal;
    if (!personal.name || !personal.title || !personal.bio || !personal.location) {
      return false;
    }
    if (portfolioData.skills.length === 0 || portfolioData.skills.some(skill => !skill.name)) {
      return false;
    }
    if (portfolioData.projects.length === 0 || 
        portfolioData.projects.some(project => !project.name || !project.description || !project.tech || !project.github)) {
      return false;
    }
    if (!portfolioData.education) {
      return false;
    }
    if (!portfolioData.contact.email || !portfolioData.contact.github) {
      return false;
    }
    return true;
  };

  const generatePortfolio = () => {
    const isValid = validateForm();
    setFormComplete(isValid);
    
    if (isValid) {
      setPreviewMode(true);
      toast({
        title: "Portfolio generated!",
        description: "Your portfolio is ready to preview.",
      });
    } else {
      toast({
        title: "Form incomplete",
        description: "Please fill in all required fields before generating your portfolio.",
        variant: "destructive",
      });
    }
  };

  const exportPortfolio = async () => {
    try {
      // Save portfolio data to the server
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save portfolio data');
      }
      
      const result = await response.json();
      
      toast({
        title: "Portfolio exported!",
        description: "Your portfolio data has been exported successfully.",
      });
      
      // Download the JSON file
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "portfolio-data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your portfolio data.",
        variant: "destructive",
      });
    }
  };

  const loadExampleData = () => {
    import('@/types/portfolio').then(({ EXAMPLE_PORTFOLIO_DATA }) => {
      setPortfolioData(EXAMPLE_PORTFOLIO_DATA);
      toast({
        title: "Example data loaded",
        description: "Example portfolio data has been loaded successfully.",
      });
    });
  };

  const selectTemplate = (index: number) => {
    const updatedTemplates = templates.map((template, i) => ({
      ...template,
      selected: i === index
    }));
    setTemplates(updatedTemplates);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  const nextTab = () => {
    if (activeTab === 'personal') setActiveTab('skills');
    else if (activeTab === 'skills') setActiveTab('projects');
    else if (activeTab === 'projects') setActiveTab('education');
    else if (activeTab === 'education') setActiveTab('experience');
    else if (activeTab === 'experience') setActiveTab('contact');
  };

  const prevTab = () => {
    if (activeTab === 'contact') setActiveTab('experience');
    else if (activeTab === 'experience') setActiveTab('education');
    else if (activeTab === 'education') setActiveTab('projects');
    else if (activeTab === 'projects') setActiveTab('skills');
    else if (activeTab === 'skills') setActiveTab('personal');
  };

  return (
    <>
      <Helmet>
        <title>IT Portfolio Generator | Create your professional developer portfolio</title>
        <meta name="description" content="Create a professional portfolio for your IT career with our easy-to-use generator. Showcase your skills, projects, and experience." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="m18 16 4-4-4-4"></path>
                <path d="m6 8-4 4 4 4"></path>
                <path d="m14.5 4-5 16"></path>
              </svg>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">IT Portfolio Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePreviewMode}
                className="flex items-center px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
              >
                {previewMode ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                    </svg>
                    <span>Edit</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>Preview</span>
                  </>
                )}
              </button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column: Form or Preview */}
            <div className="w-full lg:w-2/3 space-y-6">
              {!previewMode ? (
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                      <button 
                        onClick={() => setActiveTab('personal')} 
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                          activeTab === 'personal' 
                            ? 'border-primary text-primary dark:text-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Personal
                      </button>
                      <button 
                        onClick={() => setActiveTab('skills')} 
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                          activeTab === 'skills' 
                            ? 'border-primary text-primary dark:text-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Skills
                      </button>
                      <button 
                        onClick={() => setActiveTab('projects')} 
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                          activeTab === 'projects' 
                            ? 'border-primary text-primary dark:text-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Projects
                      </button>
                      <button 
                        onClick={() => setActiveTab('education')} 
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                          activeTab === 'education' 
                            ? 'border-primary text-primary dark:text-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Education
                      </button>
                      <button 
                        onClick={() => setActiveTab('experience')} 
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                          activeTab === 'experience' 
                            ? 'border-primary text-primary dark:text-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Experience
                      </button>
                      <button 
                        onClick={() => setActiveTab('contact')} 
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 ${
                          activeTab === 'contact' 
                            ? 'border-primary text-primary dark:text-primary-400' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Contact
                      </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'personal' && (
                      <PersonalInfoForm 
                        portfolioData={portfolioData} 
                        setPortfolioData={setPortfolioData} 
                      />
                    )}
                    
                    {activeTab === 'skills' && (
                      <SkillsForm 
                        portfolioData={portfolioData} 
                        setPortfolioData={setPortfolioData}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                      />
                    )}
                    
                    {activeTab === 'projects' && (
                      <ProjectsForm 
                        portfolioData={portfolioData} 
                        setPortfolioData={setPortfolioData}
                        addProject={addProject}
                        removeProject={removeProject}
                      />
                    )}
                    
                    {activeTab === 'education' && (
                      <EducationForm 
                        portfolioData={portfolioData} 
                        setPortfolioData={setPortfolioData}
                        addCertification={addCertification}
                        removeCertification={removeCertification}
                      />
                    )}
                    
                    {activeTab === 'experience' && (
                      <ExperienceForm 
                        portfolioData={portfolioData} 
                        setPortfolioData={setPortfolioData}
                        addExperience={addExperience}
                        removeExperience={removeExperience}
                      />
                    )}
                    
                    {activeTab === 'contact' && (
                      <ContactForm 
                        portfolioData={portfolioData} 
                        setPortfolioData={setPortfolioData} 
                      />
                    )}
                    
                    <FormNav 
                      activeTab={activeTab}
                      prevTab={prevTab}
                      nextTab={nextTab}
                      loadExampleData={loadExampleData}
                      generatePortfolio={generatePortfolio}
                    />
                  </CardContent>
                </Card>
              ) : (
                <PortfolioPreview 
                  portfolioData={portfolioData} 
                  selectedTemplate={templates.find(t => t.selected)?.name || 'Modern Developer'} 
                />
              )}
            </div>
            
            {/* Right column: Instructions & Templates */}
            <div className="w-full lg:w-1/3 space-y-6">
              {previewMode ? (
                <ActionPanel 
                  togglePreviewMode={togglePreviewMode}
                  exportPortfolio={exportPortfolio}
                />
              ) : (
                <>
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <h2 className="text-lg font-medium">How To Use</h2>
                      
                      <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                        <li>Fill in your <span className="font-medium text-primary dark:text-primary-400">personal information</span> in each tab</li>
                        <li>Add your <span className="font-medium text-primary dark:text-primary-400">skills</span>, <span className="font-medium text-primary dark:text-primary-400">projects</span>, <span className="font-medium text-primary dark:text-primary-400">education</span> and <span className="font-medium text-primary dark:text-primary-400">experience</span></li>
                        <li>Click <span className="font-medium text-primary dark:text-primary-400">Generate Portfolio</span> to preview your portfolio</li>
                        <li>Export your portfolio for use with Next.js templates</li>
                      </ol>
                      
                      <div className="flex items-center p-3 bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-lg mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" x2="12" y1="16" y2="12"></line>
                          <line x1="12" x2="12.01" y1="8" y2="8"></line>
                        </svg>
                        <p className="text-sm">Use the <span className="font-medium">Load Example Data</span> button to see how a completed portfolio looks!</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <h2 className="text-lg font-medium">Portfolio Templates</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Choose a template for your portfolio</p>
                      
                      <div className="space-y-4 mt-2">
                        {templates.map((template, index) => (
                          <TemplateSelector 
                            key={index}
                            template={template}
                            index={index}
                            selectTemplate={selectTemplate}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <h2 className="text-lg font-medium">Portfolio Features</h2>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                            <path d="M22 2 11 13"></path>
                            <path d="M22 2 15 22 11 13 2 9 22 2z"></path>
                          </svg>
                          <div>
                            <span className="font-medium">Next.js (React)</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">For fast performance & SEO benefits</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                            <circle cx="13.5" cy="6.5" r="2.5"></circle>
                            <circle cx="19" cy="17" r="2"></circle>
                            <circle cx="5" cy="17" r="2"></circle>
                            <path d="M13.5 9 19 15"></path>
                            <path d="M13.5 9 5 15"></path>
                            <path d="M5 15v4"></path>
                            <path d="M19 15v4"></path>
                          </svg>
                          <div>
                            <span className="font-medium">Tailwind CSS</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">For modern, responsive design</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                          </svg>
                          <div>
                            <span className="font-medium">GitHub Integration</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">For easy deployment & hosting</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                          </svg>
                          <div>
                            <span className="font-medium">Dark/Light Mode</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">For better user experience</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                            <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                            <path d="M9 22v-4h6v4"></path>
                            <path d="M8 6h.01"></path>
                            <path d="M16 6h.01"></path>
                            <path d="M12 6h.01"></path>
                            <path d="M12 10h.01"></path>
                            <path d="M8 10h.01"></path>
                            <path d="M16 10h.01"></path>
                            <path d="M12 14h.01"></path>
                            <path d="M8 14h.01"></path>
                            <path d="M16 14h.01"></path>
                          </svg>
                          <div>
                            <span className="font-medium">Responsive Design</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Looks great on all devices</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-800 shadow-sm mt-8 py-6">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>IT Portfolio Generator &copy; {new Date().getFullYear()} | Built with ❤️ for tech students</p>
          </div>
        </footer>
      </div>
      <Toaster />
    </>
  );
}

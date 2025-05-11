import { Layout } from "../components/shared/Layout";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Skills() {
  // Technical skills with proficiency levels - Mubassir's skills
  const technicalSkills = [
    { category: "AI Engineering", skills: [
      { name: "Python", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Rust for AI", level: 85 },
      { name: "Computer Vision", level: 90 },
    ]},
    { category: "Cybersecurity", skills: [
      { name: "Network Security", level: 85 },
      { name: "Red Team Exercises", level: 80 },
      { name: "Ethical Hacking", level: 85 },
      { name: "Identity & Access Management", level: 75 },
      { name: "Security Analysis", level: 80 },
    ]},
    { category: "Sustainable Tech", skills: [
      { name: "IoT Systems", level: 85 },
      { name: "Waste Management Solutions", level: 90 },
      { name: "Carbon Footprint Calculation", level: 85 },
      { name: "Solar Energy Optimization", level: 75 },
      { name: "Real-time Detection Systems", level: 80 },
    ]},
    { category: "Development & Tools", skills: [
      { name: "Django", level: 80 },
      { name: "Flask", level: 85 },
      { name: "MySQL/SQL", level: 80 },
      { name: "Git/GitHub", level: 85 },
      { name: "Google Cloud", level: 75 },
    ]},
  ];

  // Soft skills
  const softSkills = [
    "Leadership",
    "Cross-Domain Expertise",
    "Client Communication",
    "Multi-lingual (English, Malayalam, Arabic, Hindi, Spanish)",
    "Project Management",
    "Problem Solving",
    "Innovative Thinking",
    "Research & Analysis",
    "Public Speaking",
    "Team Training",
  ];

  return (
    <Layout title="Skills" description="Technical and soft skills showcase">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive overview of my technical abilities and expertise
          </p>
        </div>

        <Tabs defaultValue="technical" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="technical">Technical Skills</TabsTrigger>
            <TabsTrigger value="soft">Soft Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="technical" className="mt-6">
            {technicalSkills.map((category, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-xl font-bold mb-4">{category.category}</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      {category.skills.map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="soft" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {softSkills.map((skill, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mr-3"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Certifications & Continuous Learning</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">AI/ML Credentials</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Harvard CS50</span>
                    <p className="text-sm text-muted-foreground">Machine Learning with Python</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Google Cloud</span>
                    <p className="text-sm text-muted-foreground">TensorFlow Image Classification</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Cybersecurity Authority</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">CISCO</span>
                    <p className="text-sm text-muted-foreground">Ethical Hacking</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">IBM</span>
                    <p className="text-sm text-muted-foreground">Security Verify Administrator</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground mt-4">
            Currently focusing on advancing my expertise in sustainable technology solutions and exploring the integration of AI with IoT for environmental applications.
          </p>
        </div>
      </div>
    </Layout>
  );
}
import { Layout } from "../components/shared/Layout";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Skills() {
  // Technical skills with proficiency levels - Mubassir's skills
  const technicalSkills = [
    { category: "AI Frameworks & ML", skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "Keras", level: 82 },
      { name: "Scikit-learn", level: 88 },
      { name: "Rasa", level: 80 },
    ]},
    { category: "Cybersecurity Tools", skills: [
      { name: "Nmap", level: 90 },
      { name: "Wireshark", level: 85 },
      { name: "Metasploit", level: 82 },
      { name: "Burp Suite", level: 80 },
      { name: "OWASP ZAP", level: 78 },
    ]},
    { category: "Network & Cloud Security", skills: [
      { name: "Firewall Configuration", level: 85 },
      { name: "VPN Setup", level: 82 },
      { name: "IDS/IPS", level: 80 },
      { name: "AWS Security", level: 83 },
      { name: "Google Cloud Security", level: 81 },
    ]},
    { category: "Programming Languages", skills: [
      { name: "Python", level: 95 },
      { name: "Rust", level: 88 },
      { name: "C++", level: 80 },
      { name: "SQL", level: 85 },
      { name: "Go", level: 78 },
    ]},
    { category: "Web & IoT Development", skills: [
      { name: "HTML/CSS/JavaScript", level: 83 },
      { name: "IoT Systems", level: 86 },
      { name: "Carbon Footprint Calculation", level: 85 },
      { name: "Real-time Detection Systems", level: 82 },
      { name: "Sustainable Tech Solutions", level: 89 },
    ]},
    { category: "Tools & Project Management", skills: [
      { name: "Jira", level: 85 },
      { name: "Asana", level: 80 },
      { name: "MS Office Suite", level: 90 },
      { name: "Power BI", level: 88 },
      { name: "Git/GitHub", level: 85 },
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
          <h2 className="text-xl font-bold mb-4 text-center">Certifications & Professional Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">AI & Data Science</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">CS50 Introduction</span>
                    <p className="text-sm text-muted-foreground">Harvard University</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Classify Images with TensorFlow</span>
                    <p className="text-sm text-muted-foreground">Google Cloud</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Introduction to Machine Learning</span>
                    <p className="text-sm text-muted-foreground">Google Cloud</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Data Analytics Essentials</span>
                    <p className="text-sm text-muted-foreground">CISCO</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Google Cloud Computing Foundations</span>
                    <p className="text-sm text-muted-foreground">Data, ML, and AI in Google Cloud</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-3">Cybersecurity</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Certificate of Ethical Hacking</span>
                    <p className="text-sm text-muted-foreground">CISCO</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">IBM Security Verify SaaS v1 Administrator</span>
                    <p className="text-sm text-muted-foreground">IBM</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Mitigate Threats and Vulnerabilities</span>
                    <p className="text-sm text-muted-foreground">Security Command Center</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Cybersecurity Analyst</span>
                    <p className="text-sm text-muted-foreground">TATA Forage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Cybercrime Project</span>
                    <p className="text-sm text-muted-foreground">Abu Dhabi Police</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-bold text-green-600 dark:text-green-400 mb-3">IoT & Specialized Training</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">IOT Network Specialist</span>
                    <p className="text-sm text-muted-foreground">Reliance Foundation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Crime Scene Management</span>
                    <p className="text-sm text-muted-foreground">Abu Dhabi Police</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-3">Business & Analytics</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Entrepreneurship and Innovation</span>
                    <p className="text-sm text-muted-foreground">City of Moreton Bay</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium">Power BI</span>
                    <p className="text-sm text-muted-foreground">PWC Forage</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-lg p-4 mt-4">
            <h3 className="font-bold text-center mb-3">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-blue-100 dark:border-blue-900 rounded-lg p-3">
                <h4 className="font-medium">Bachelor of Computer Science & Cybersecurity</h4>
                <p className="text-sm text-muted-foreground">Lincoln University College</p>
                <p className="text-xs text-muted-foreground">08/2022 - 06/2025</p>
              </div>
              <div className="border border-blue-100 dark:border-blue-900 rounded-lg p-3">
                <h4 className="font-medium">Diploma in Cybersecurity</h4>
                <p className="text-sm text-muted-foreground">Oxford Home Study Center OHSC</p>
                <p className="text-xs text-muted-foreground">02/2023 - 06/2024</p>
              </div>
              <div className="border border-blue-100 dark:border-blue-900 rounded-lg p-3">
                <h4 className="font-medium">High School Diploma</h4>
                <p className="text-sm text-muted-foreground">Department of Education</p>
                <p className="text-xs text-muted-foreground">06/2019 - 04/2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
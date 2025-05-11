import { Layout } from "@/components/shared/Layout";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Skills() {
  // Technical skills with proficiency levels
  const technicalSkills = [
    { category: "Programming Languages", skills: [
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Python", level: 75 },
      { name: "Java", level: 65 },
      { name: "C++", level: 60 },
    ]},
    { category: "Web Technologies", skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3/SCSS", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
    ]},
    { category: "Database & Tools", skills: [
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
    ]},
  ];

  // Soft skills
  const softSkills = [
    "Team Collaboration",
    "Problem Solving",
    "Communication",
    "Time Management",
    "Adaptability",
    "Critical Thinking",
    "Attention to Detail",
    "Leadership",
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

        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Continuous Learning</h2>
          <p className="text-muted-foreground">
            I'm constantly improving my skills and learning new technologies. Currently exploring cloud architecture and machine learning.
          </p>
        </div>
      </div>
    </Layout>
  );
}
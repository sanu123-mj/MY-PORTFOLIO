import { Layout } from "@/components/shared/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Portfolio() {
  // Personal details - Replace these with your own information
  const personalInfo = {
    name: "Alex Johnson",
    title: "Computer Science Student | Front-End Developer",
    location: "Boston, USA",
    email: "alex.johnson@example.com",
    github: "https://github.com/alexj",
    linkedin: "https://linkedin.com/in/alexjohnson",
    bio: `Passionate CS student specializing in web development. I love building intuitive 
          interfaces and solving complex problems with clean code. Currently seeking 
          internship opportunities in software development.`
  };

  // Featured skills - these will be shown on the home page
  const featuredSkills = [
    "JavaScript", "React", "Node.js", "TypeScript", "CSS/Tailwind", 
    "Python", "Git", "UI/UX Design"
  ];

  // Featured projects - these will be shown on the home page
  const featuredProjects = [
    {
      name: "Weather Dashboard",
      description: "Real-time weather application with location-based forecasts and interactive maps",
      tech: ["React", "OpenWeather API", "Leaflet.js"],
      demo: "https://weather-dash.netlify.app",
      github: "https://github.com/alexj/weather-dashboard",
    },
    {
      name: "Task Master",
      description: "Productivity application with Kanban board, calendar integration, and notification system",
      tech: ["React", "Firebase", "Node.js"],
      demo: "https://taskmaster-app.vercel.app",
      github: "https://github.com/alexj/task-master",
    }
  ];

  return (
    <Layout 
      title="Home" 
      description="Personal portfolio of a Computer Science student and Front-End Developer"
    >
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 py-8 md:py-12">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">{personalInfo.title}</p>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            {personalInfo.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild>
              <Link href="/contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-60 h-60 md:w-80 md:h-80 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-muted"></div>
            {/* Will contain your profile image */}
            <div className="absolute inset-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
              {personalInfo.name.charAt(0)}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
            My Skills
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/skills">
              See all skills <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {featuredSkills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1 text-base">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
            Featured Projects
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">
              See all projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="px-2 py-0.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  {project.demo && (
                    <Button size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 md:py-12">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
import { Layout } from "../components/shared/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Download, Github, Linkedin, Mail, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "wouter";

export default function Portfolio() {
  // Personal details - Mubassir's information
  const personalInfo = {
    name: "MUBASSIR JAVAD MUJEEB",
    title: "AI-Cybersecurity Innovator | Sustainable Tech Evangelist | Cross-Domain Leader",
    location: "Abu Dhabi",
    email: "mubassirpoduvanni@gmail.com",
    phone: "+971 569723931",
    github: "https://github.com/sanu123-mj",
    linkedin: "https://linkedin.com/in/mubassir-javad",
    website: "#",
    bio: `Innovative IT professional with expertise in AI Engineering, Cybersecurity Operations, and Sustainable Technology solutions. 
          Built multiple production-grade AI systems, conducted red team exercises for network security, and pioneered IoT-enabled 
          waste management solutions. Passionate about leveraging technology for sustainable development and creating impactful solutions.`
  };

  // Featured skills - Mubassir's core skills
  const featuredSkills = [
    "AI Engineering", "Cybersecurity", "Rust", "Python", "TensorFlow", 
    "PyTorch", "IoT", "Sustainability Tech", "Leadership", "NLP"
  ];

  // Featured projects - Mubassir's projects
  const featuredProjects = [
    {
      name: "MedScan-AI: Advanced Disease Prediction System",
      description: "Multi-disease prediction system using CNN and Transfer Learning. Predicts 5 cancer types, 8 skin diseases, and various other conditions with 92% accuracy across all categories.",
      tech: ["Python", "TensorFlow", "PyTorch", "Flask", "OpenCV"],
      demo: "#",
      github: "https://github.com/sanu123-mj/MedScan-AI",
    },
    {
      name: "Explore Abu Dhabi: Tourism Portal",
      description: "Comprehensive tourism portal with real-time chatbot integration, unified booking system for attractions and transport, and client-server architecture for scalability.",
      tech: ["HTML/CSS/JavaScript", "Bootstrap", "Django", "MySQL", "Google Maps API"],
      demo: "#",
      github: "#",
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
            <div className="flex items-center text-muted-foreground mt-1">
              <Mail className="h-4 w-4 mr-1" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center text-muted-foreground mt-1">
              <Phone className="h-4 w-4 mr-1" />
              <a href={`tel:${personalInfo.phone}`} className="hover:text-primary transition-colors">
                {personalInfo.phone}
              </a>
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
              {personalInfo.website && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-5 w-5" />
                  </a>
                </Button>
              )}
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

      {/* JAVAD AI Section */}
      <section className="py-8 md:py-12">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-1 flex flex-col justify-center items-center text-center p-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-6 mb-4">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">JAVAD AI</h2>
              <p className="text-lg font-medium">Founder</p>
              <p className="text-sm text-muted-foreground">Mar 2025 - Present · 3 mos</p>
              <p className="text-sm font-medium mt-4">AI for Sustainable Impact | Climate Tech Innovator</p>
            </div>
            
            <div className="md:col-span-2 flex flex-col justify-center p-4">
              <h3 className="text-xl font-bold mb-4">AI-Powered Environmental Solutions</h3>
              <p className="text-muted-foreground mb-4">
                At JAVAD, we leverage cutting-edge AI to drive real-world environmental solutions. Our mission is to bridge the gap between 
                sustainability goals and actionable results by developing intelligent tools that empower businesses, governments, and communities.
              </p>
              <p className="text-muted-foreground mb-4">
                We specialize in AI-driven accountability, creating systems that monitor, analyze, and enforce sustainable practices—turning 
                data into measurable impact. From resource optimization to environmental protection, our technology is designed to deliver 
                transparency and efficiency where it matters most.
              </p>
              <p className="font-medium text-primary">Join us in redefining sustainability through innovation.</p>
              
              <div className="flex space-x-3 mt-6">
                <Button variant="default" size="sm">
                  Learn More
                </Button>
                <Button variant="outline" size="sm">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 md:py-12">
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Let's Build Innovative Solutions Together</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Whether you need expertise in AI systems, cybersecurity enhancements, or sustainable tech solutions, 
              I'm ready to collaborate on transformative projects that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Discuss a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
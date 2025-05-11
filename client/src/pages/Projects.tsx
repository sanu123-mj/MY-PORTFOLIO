import { Layout } from "../components/shared/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Projects() {
  // Project data - Mubassir's projects
  const projects = [
    {
      name: "MedScan-AI: Advanced Disease Prediction System",
      description: "Multi-disease prediction system using CNN and Transfer Learning architectures like ResNet50 and VGG16. Predicts 5 cancer types, 8 skin diseases, and various other conditions with 92% accuracy across all categories. Supports multiple imaging inputs including CT, MRI, X-ray, Ultrasound and Retinal images.",
      tech: ["Python", "TensorFlow", "PyTorch", "Flask", "OpenCV", "Pandas", "Scikit-learn"],
      image: "https://images.unsplash.com/photo-1576671495234-3291ecf2a576?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "#",
      github: "https://github.com/sanu123-mj/MedScan-AI",
      featured: true
    },
    {
      name: "Explore Abu Dhabi: Tourism Portal",
      description: "Comprehensive tourism portal with real-time chatbot integration, unified booking system for attractions and transport, and client-server architecture for scalability. Improves tourist navigation efficiency and provides centralized reservation management.",
      tech: ["HTML/CSS/JavaScript", "Bootstrap", "Django", "Python", "MySQL", "Google Maps API"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "#",
      github: "#",
      featured: true
    },
    {
      name: "Mubi AI Chatbot",
      description: "Specialized AI chatbot using the Rasa NLP framework with supervised learning for context-aware responses. Features dynamic adaptation to user preferences and multi-intent conversation handling, focused on tourism and transportation recommendations.",
      tech: ["Python", "Rasa NLP", "Machine Learning", "RESTful APIs", "Docker"],
      image: "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "#",
      github: "#",
      featured: true
    },
    {
      name: "Carbon Footprint Calculator",
      description: "Sustainability tool that helps individuals and businesses calculate their carbon emissions based on various activities and consumption patterns. Provides personalized recommendations for reducing environmental impact.",
      tech: ["Python", "Flask", "Chart.js", "SQLite", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "#",
      github: "#",
      featured: false
    },
    {
      name: "Real-Time Plastic Detection System",
      description: "Computer vision application for identifying and classifying plastic waste in various environments. Uses deep learning to detect different types of plastics and estimates their environmental impact.",
      tech: ["Python", "TensorFlow", "OpenCV", "YOLO", "Raspberry Pi"],
      image: "https://images.unsplash.com/photo-1588349482083-036b31c6eca3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "#",
      github: "#",
      featured: false
    },
    {
      name: "Solar Energy Optimization Algorithm",
      description: "Smart algorithm that maximizes solar panel efficiency by predicting optimal positioning based on weather forecasts, time of day, and geographical location. Increases energy output by up to 18%.",
      tech: ["Python", "NumPy", "SciPy", "Weather API", "IoT Integration"],
      image: "https://images.unsplash.com/photo-1458142833999-7bde63073128?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "#",
      github: "#",
      featured: false
    }
  ];

  return (
    <Layout 
      title="Projects" 
      description="Showcase of my web development and programming projects"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A collection of my notable work and coding adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden transition-all hover:shadow-lg ${
                project.featured ? 'border-blue-500/20' : ''
              }`}
            >
              <div className="relative h-48 w-full">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="h-full w-full object-cover"
                />
                {project.featured && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                
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
                        <ExternalLink className="mr-2 h-4 w-4" /> Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 text-center mb-6">
          <h2 className="text-xl font-bold mb-2">Innovative Solutions for Complex Challenges</h2>
          <p className="text-muted-foreground mb-4">
            Explore more of my projects and contributions on GitHub. I specialize in AI-powered applications, 
            cybersecurity solutions, and sustainable technology innovations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <a href="https://github.com/sanu123-mj" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View GitHub Profile
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" /> Discuss a Collaboration
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
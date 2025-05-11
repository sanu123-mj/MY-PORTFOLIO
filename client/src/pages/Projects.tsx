import { Layout } from "@/components/shared/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  // Project data - Replace with your own projects
  const projects = [
    {
      name: "Weather Dashboard",
      description: "A real-time weather application that provides location-based forecasts and interactive maps. Users can search for any city worldwide and get detailed weather information including temperature, humidity, wind speed, and a 5-day forecast.",
      tech: ["React", "OpenWeather API", "Leaflet.js", "Tailwind CSS", "Axios"],
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "https://weather-dash.netlify.app",
      github: "https://github.com/alexj/weather-dashboard",
      featured: true
    },
    {
      name: "Task Master",
      description: "A comprehensive productivity application featuring a Kanban board for task management, calendar integration for scheduling, and a notification system for reminders. It includes drag-and-drop functionality and task filtering.",
      tech: ["React", "Firebase", "Node.js", "Express", "Mongoose", "React DnD"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "https://taskmaster-app.vercel.app",
      github: "https://github.com/alexj/task-master",
      featured: true
    },
    {
      name: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, shopping cart, secure checkout, and user authentication. Includes an admin dashboard for product and order management.",
      tech: ["Next.js", "MongoDB", "Stripe API", "AWS S3", "Redux"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "https://next-ecommerce-demo.vercel.app",
      github: "https://github.com/alexj/next-ecommerce",
      featured: false
    },
    {
      name: "Code Mentor Platform",
      description: "An educational platform connecting programming students with mentors. Features include video chat, code sharing, and a scheduling system for booking mentoring sessions.",
      tech: ["React", "Socket.io", "WebRTC", "MongoDB", "Express", "Node.js"],
      image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "https://code-mentor-platform.netlify.app",
      github: "https://github.com/alexj/code-mentor",
      featured: false
    },
    {
      name: "Budget Tracker",
      description: "A personal finance application for tracking income, expenses, and savings goals. Includes data visualization for spending patterns and budget forecasting.",
      tech: ["Vue.js", "Chart.js", "Firebase", "Vuex", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "https://budget-tracker-app.netlify.app",
      github: "https://github.com/alexj/budget-tracker",
      featured: false
    },
    {
      name: "Recipe Finder",
      description: "A recipe discovery application that allows users to search for recipes based on ingredients, dietary restrictions, and cuisine type. Includes save functionality and meal planning.",
      tech: ["React", "Spoonacular API", "Redux Toolkit", "Styled Components"],
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      demo: "https://recipe-finder-app.netlify.app",
      github: "https://github.com/alexj/recipe-finder",
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
          <h2 className="text-xl font-bold mb-2">Want to see more?</h2>
          <p className="text-muted-foreground mb-4">
            Check out my GitHub profile for more projects and contributions
          </p>
          <Button asChild>
            <a href="https://github.com/alexj" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> View GitHub Profile
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
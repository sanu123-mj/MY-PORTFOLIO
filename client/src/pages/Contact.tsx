import { Layout } from "@/components/shared/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact information - Replace with your own
  const contactInfo = {
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "Boston, Massachusetts, USA",
    github: "https://github.com/alexj",
    linkedin: "https://linkedin.com/in/alexjohnson"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout 
      title="Contact" 
      description="Get in touch with me for collaborations, job opportunities, or just to say hello"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Let's connect! Reach out for project inquiries, job opportunities, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Send Me a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    placeholder="Project Inquiry" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Hi, I'd like to discuss a project opportunity..." 
                    rows={6} 
                    required 
                  />
                </div>
                
                <Button className="w-full" disabled={isSubmitting} type="submit">
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <a 
                        href={`tel:${contactInfo.phone}`} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Connect Online</h2>
                <div className="flex flex-col space-y-4">
                  <a 
                    href={contactInfo.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Github className="h-5 w-5 mr-3 text-blue-600" />
                    <span>GitHub</span>
                  </a>
                  
                  <a 
                    href={contactInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Linkedin className="h-5 w-5 mr-3 text-blue-600" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Availability</h2>
              <p className="text-muted-foreground">
                Currently available for freelance projects, internships, and full-time positions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
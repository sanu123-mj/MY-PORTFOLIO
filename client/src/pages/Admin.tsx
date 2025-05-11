import { useState, useEffect } from "react";
import { Layout } from "../components/shared/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  RefreshCw, 
  Check, 
  X,
  Eye
} from "lucide-react";
import { getQueryFn } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Type definitions for database entities
interface User {
  id: number;
  username: string;
  email: string;
  name: string | null;
  bio: string | null;
  createdAt: string;
}

interface Skill {
  id: number;
  userId: number;
  name: string;
  category: string;
  level: number;
  createdAt: string;
}

interface Project {
  id: number;
  userId: number;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  image: string | null;
  isFeatured: boolean;
  createdAt: string;
}

interface Education {
  id: number;
  userId: number;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  createdAt: string;
}

interface Certification {
  id: number;
  userId: number;
  name: string;
  issuer: string;
  issueDate: string | null;
  category: string | null;
  description: string | null;
  createdAt: string;
}

// Fetch function with error handling
const fetchData = getQueryFn<any>({ on401: "throw" });

export default function Admin() {
  // Currently hardcoded to user ID 1 - in a real app, this would come from auth
  const userId = 1;
  const [activeTab, setActiveTab] = useState("overview");
  
  // Queries
  const { 
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser
  } = useQuery({
    queryKey: ['api/users', userId],
    queryFn: () => fetchData(`/api/users/${userId}`),
  });

  const { 
    data: skillsData,
    isLoading: isLoadingSkills,
    error: skillsError,
    refetch: refetchSkills
  } = useQuery({
    queryKey: ['api/skills', userId],
    queryFn: () => fetchData(`/api/skills?userId=${userId}`),
  });

  const { 
    data: projectsData,
    isLoading: isLoadingProjects,
    error: projectsError,
    refetch: refetchProjects
  } = useQuery({
    queryKey: ['api/projects', userId],
    queryFn: () => fetchData(`/api/projects?userId=${userId}`),
  });

  const { 
    data: educationsData,
    isLoading: isLoadingEducations,
    error: educationsError,
    refetch: refetchEducations
  } = useQuery({
    queryKey: ['api/educations', userId],
    queryFn: () => fetchData(`/api/educations?userId=${userId}`),
  });

  const { 
    data: certificationsData,
    isLoading: isLoadingCertifications,
    error: certificationsError,
    refetch: refetchCertifications
  } = useQuery({
    queryKey: ['api/certifications', userId],
    queryFn: () => fetchData(`/api/certifications?userId=${userId}`),
  });

  // Check if there's any error
  const hasError = userError || skillsError || projectsError || educationsError || certificationsError;

  // Get actual data from the responses
  const user = userData?.data;
  const skills = skillsData?.data || [];
  const projects = projectsData?.data || [];
  const educations = educationsData?.data || [];
  const certifications = certificationsData?.data || [];

  // Refresh all data
  const refreshAllData = () => {
    refetchUser();
    refetchSkills();
    refetchProjects();
    refetchEducations();
    refetchCertifications();
  };

  // Calculate totals for the overview
  const totalSkills = skills.length;
  const totalProjects = projects.length;
  const totalEducations = educations.length;
  const totalCertifications = certifications.length;

  return (
    <Layout 
      title="Admin Dashboard" 
      description="Manage your portfolio content"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Portfolio Admin</h1>
          
          <Button 
            onClick={refreshAllData} 
            variant="outline"
            disabled={isLoadingUser || isLoadingSkills || isLoadingProjects || isLoadingEducations || isLoadingCertifications}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${
              (isLoadingUser || isLoadingSkills || isLoadingProjects || isLoadingEducations || isLoadingCertifications) ? 
              'animate-spin' : ''
            }`} />
            Refresh Data
          </Button>
        </div>

        {hasError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an error loading some data. Please try refreshing or check your connection.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingSkills ? <Skeleton className="h-8 w-16" /> : totalSkills}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingProjects ? <Skeleton className="h-8 w-16" /> : totalProjects}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Education Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingEducations ? <Skeleton className="h-8 w-16" /> : totalEducations}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingCertifications ? <Skeleton className="h-8 w-16" /> : totalCertifications}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingSkills || isLoadingProjects || isLoadingEducations || isLoadingCertifications ? (
                    <>
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      View the Skills, Projects, Education, and Certifications tabs to manage your portfolio content.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Skills</h2>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Skill
              </Button>
            </div>

            {isLoadingSkills ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : skills.length === 0 ? (
              <Card>
                <CardContent className="py-8 flex flex-col items-center">
                  <p className="text-muted-foreground mb-4">No skills found.</p>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Skill
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skills.map((skill: Skill) => (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell>{skill.category}</TableCell>
                      <TableCell>{skill.level}%</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Projects</h2>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>

            {isLoadingProjects ? (
              <div className="space-y-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
            ) : projects.length === 0 ? (
              <Card>
                <CardContent className="py-8 flex flex-col items-center">
                  <p className="text-muted-foreground mb-4">No projects found.</p>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {projects.map((project: Project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{project.name}</h3>
                            {project.isFeatured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mt-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                // Toggle featured status
                                console.log('Toggle featured for project', project.id);
                              }}
                            >
                              {project.isFeatured ? (
                                <>
                                  <X className="mr-2 h-4 w-4" /> Remove from featured
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" /> Make featured
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Education</h2>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </div>

            {isLoadingEducations ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : educations.length === 0 ? (
              <Card>
                <CardContent className="py-8 flex flex-col items-center">
                  <p className="text-muted-foreground mb-4">No education entries found.</p>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Education
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {educations.map((education: Education) => (
                  <Card key={education.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{education.degree}</h3>
                          <p className="text-muted-foreground">{education.institution}</p>
                          <p className="text-sm">
                            {education.startDate} - {education.isCurrent ? 'Present' : education.endDate}
                          </p>
                          {education.fieldOfStudy && (
                            <Badge className="mt-2" variant="outline">{education.fieldOfStudy}</Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Certifications</h2>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Certification
              </Button>
            </div>

            {isLoadingCertifications ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : certifications.length === 0 ? (
              <Card>
                <CardContent className="py-8 flex flex-col items-center">
                  <p className="text-muted-foreground mb-4">No certifications found.</p>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Certification
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {certifications.map((certification: Certification) => (
                  <Card key={certification.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{certification.name}</h3>
                          <p className="text-muted-foreground">
                            {certification.issuer}
                            {certification.issueDate && ` • ${certification.issueDate}`}
                          </p>
                          {certification.category && (
                            <Badge className="mt-2" variant="outline">{certification.category}</Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Profile Information</h2>
              <Button size="sm" variant="outline">
                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>

            {isLoadingUser ? (
              <div className="space-y-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
            ) : !user ? (
              <Card>
                <CardContent className="py-8 flex flex-col items-center">
                  <p className="text-muted-foreground mb-4">Error loading profile information.</p>
                  <Button size="sm" onClick={refetchUser}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Account Details</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{user.name || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Username</p>
                          <p className="font-medium">{user.username}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Portfolio Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Biography</p>
                          <p>{user.bio || 'No biography set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Joined</p>
                          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>View Public Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  See how your portfolio appears to visitors.
                </p>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" /> View Portfolio
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
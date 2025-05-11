export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  name: string;
  description: string;
  tech: string;
  github: string;
  demo: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface Template {
  name: string;
  image: string;
  selected: boolean;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  education: string;
  certifications: string[];
  experience: Experience[];
  contact: ContactInfo;
}

export type TabType = 'personal' | 'skills' | 'projects' | 'education' | 'experience' | 'contact';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: '',
    title: '',
    bio: '',
    location: '',
  },
  skills: [],
  projects: [],
  education: '',
  certifications: [],
  experience: [],
  contact: {
    email: '',
    linkedin: '',
    github: '',
    twitter: '',
  },
};

export const EXAMPLE_PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: 'Alex Johnson',
    title: 'Computer Science Student | Front-End Developer',
    bio: 'Passionate CS student specializing in web development. I love building intuitive interfaces and solving complex problems with clean code. Currently seeking internship opportunities.',
    location: 'Boston, USA',
  },
  skills: [
    { name: 'JavaScript', level: 8 },
    { name: 'React', level: 7 },
    { name: 'Node.js', level: 6 },
    { name: 'Python', level: 8 },
    { name: 'CSS/Tailwind', level: 9 },
  ],
  projects: [
    {
      name: 'Weather Dashboard',
      description: 'Real-time weather application with location-based forecasts and interactive maps',
      tech: 'React, OpenWeather API, Leaflet.js',
      github: 'https://github.com/alexj/weather-dashboard',
      demo: 'https://weather-dash.netlify.app',
    },
    {
      name: 'Task Master',
      description: 'Productivity application with Kanban board, calendar integration, and notification system',
      tech: 'React, Firebase, Node.js',
      github: 'https://github.com/alexj/task-master',
      demo: 'https://taskmaster-app.vercel.app',
    },
  ],
  education: 'BSc Computer Science - Boston University (2021-2025)',
  certifications: [
    'AWS Certified Cloud Practitioner',
    'Meta Front-End Developer Professional Certificate',
    'Google Data Analytics Certificate',
  ],
  experience: [
    {
      company: 'TechStart Inc.',
      role: 'Front-End Development Intern',
      duration: 'May 2023 - Aug 2023',
      description: '• Developed responsive UI components using React\n• Implemented state management with Redux\n• Collaborated with design team on user experience improvements',
    },
    {
      company: 'Boston University IT Department',
      role: 'Student Developer',
      duration: 'Sep 2022 - Present',
      description: '• Maintained university web applications\n• Assisted with migration to modern front-end framework\n• Provided technical support for student portals',
    },
  ],
  contact: {
    email: 'alex.johnson@example.com',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexj',
    twitter: 'https://twitter.com/alexjdev',
  },
};

export const DEFAULT_TEMPLATES: Template[] = [
  {
    name: 'Modern Developer',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
    selected: true,
  },
  {
    name: 'Minimal Portfolio',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
    selected: false,
  },
  {
    name: 'Creative Tech',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
    selected: false,
  },
];

export interface BasicInfo {
  name: string;
  photo: string;
  email: string;
  phone: string;
  github: string;
  blog: string;
  location: string;
}

export type Skills = Record<string, string[]>;

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  startDate: string;
  endDate: string;
  links: {
    github: string;
    demo: string;
  };
  details: string[];
}

export interface Education {
  institution: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  note: string;
}

export interface Activity {
  name: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

export interface Resume {
  basicInfo: BasicInfo;
  introduction: string;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  activities: Activity[];
  certificates: Certificate[];
}

export interface PortfolioSection {
  title: string;
  content?: string;
  items?: string[];
}

export interface Portfolio {
  slug: string;
  side: string;
  title: string;
  summary: string;
  thumbnail: string;
  techStack: string[];
  startDate: string;
  endDate: string;
  links: {
    github: string;
    demo: string;
  };
  sections: PortfolioSection[];
}

export interface Retrospective {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: object;
}

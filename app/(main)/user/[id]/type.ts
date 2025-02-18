export interface ActivityType {
  activity: {
    user: {
      name: string;
      profile_image: string;
    };
    original_post: {
      author: {
        name: string;
        followers?: number;
        title?: string;
      };
      content: string;
      image: string;
      engagement: {
        likes: number;
        comments: number;
        reposts: number;
      };
    };
    timestamp: string;
  };
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  company_logo: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  institution_logo: string;
  start_date: string;
  end_date: string;
}

export interface Profile {
  id: number;
  name: string;
  headline: string;
  avatar: string;
  location: string;
  connections: number;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: { id: number; title: string; description: string; url: string }[];
  contact: {
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    telegram: string;
    twitter: string;
    github: string;
  };
}

export interface Achievement {
  award_id: number;
  title: string;
  event_name?: string;
  community_name?: string;
  event_date?: string;
  year?: string;
  category: string;
  description: string;
}

export interface AttendedEvent {
  event_id: number;
  event_name: string;
  event_date: string;
  location: string;
  description: string;
  participation_type: string;
  team_name?: string;
  session_topic?: string;
  organization?: string;
  ranking?: string;
  team_mentored?: string;
  result?: string;
}

export interface User {
  name: string;
  profile_image: string;
}

export interface PostAuthor {
  name: string;
  followers?: number;
  title?: string;
}

export interface PostEngagement {
  likes: number;
  comments: number;
  reposts: number;
}

export interface OriginalPost {
  author: PostAuthor;
  content: string;
  image: string;
  engagement: PostEngagement;
}

export interface ActivityType {
  user: User;
  original_post: OriginalPost;
  timestamp: string;
}

export interface ActivityProps {
  activity: ActivityType;
}

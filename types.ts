
export type Category = 'home' | 'about' | 'webpages' | 'webapps' | 'webtools' | 'articles';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  featured?: boolean;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  demoUrl: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export interface DesignItem {
  id: string;
  title: string;
  image: string;
  type: 'Landing' | 'Mobile' | 'System' | 'Branding';
  date: string;
  description: string;
  tags: string[];
}

export interface DrawerContent {
  title: string;
  description: string;
  path: string;
}

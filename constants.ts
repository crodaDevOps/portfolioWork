
import { Project, Tool, Article, DesignItem, DrawerContent } from './types';

export const DRAWER_CONTENT: Record<string, DrawerContent> = {
  home: {
    title: 'Welcome',
    description: 'This is the desktop environment of Christopher A. Rodriguez. Use the dock below to navigate through my digital workspace.',
    path: 'root/home.tsx'
  },
  about: {
    title: 'Profile',
    description: 'Christopher A. Rodriguez. Senior Frontend Architect specialized in React, WebGL, and High-Performance Interfaces.',
    path: 'root/users/chris/profile.md'
  },
  webpages: {
    title: 'Webpages & UI',
    description: 'A collection of visual experiences and interface designs. These projects focus on aesthetics, user experience, and visual storytelling.',
    path: 'src/pages/design/websites.tsx'
  },
  webapps: {
    title: 'Web Applications',
    description: 'Full-scale applications built to solve complex problems. These demonstrate architecture, state management, and backend integration.',
    path: 'src/apps/builds/production.tsx'
  },
  webtools: {
    title: 'Developer Tools',
    description: 'These are webtools which I have created for my own use, or was asked to create. A webtool is a specialized, single-function utility designed to automate repetitive tasks.',
    path: 'src/utils/tools.ts'
  },
  articles: {
    title: 'Documentation',
    description: 'Technical writing, research papers, and architectural decisions. A look into the theory behind the code.',
    path: 'src/content/posts.md'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Nebula Stream',
    category: 'Architecture',
    description: 'High-throughput event streaming architecture for financial data analysis, processing 50k+ events/sec.',
    image: 'https://picsum.photos/id/16/800/600?grayscale',
    tech: ['Kafka', 'Rust', 'WebAssembly'],
    featured: true,
  },
  {
    id: 'p2',
    title: 'Aether UI',
    category: 'Design System',
    description: 'A composable, headless component library for enterprise dashboards used across 4 internal products.',
    image: 'https://picsum.photos/id/24/800/800?grayscale',
    tech: ['React', 'TypeScript', 'Storybook'],
  },
  {
    id: 'p3',
    title: 'Void Runner',
    category: 'Game Dev',
    description: 'WebGL-based procedural runner exploring atmospheric depth and reactive audio visualization.',
    image: 'https://picsum.photos/id/34/800/500?grayscale',
    tech: ['Three.js', 'GLSL', 'React-Three-Fiber'],
    featured: true,
  },
  {
    id: 'p4',
    title: 'Chronos',
    category: 'DevOps',
    description: 'Kubernetes operator for temporal job scheduling at scale with self-healing capabilities.',
    image: 'https://picsum.photos/id/42/800/700?grayscale',
    tech: ['Go', 'K8s', 'Prometheus'],
  },
  {
    id: 'p5',
    title: 'Echo Chat',
    category: 'AI Integration',
    description: 'RAG-based chat interface with localized memory vectors and context-aware prompt engineering.',
    image: 'https://picsum.photos/id/56/800/600?grayscale',
    tech: ['Python', 'LangChain', 'Postgres'],
  },
  {
    id: 'p6',
    title: 'Monolith Migration',
    category: 'Backend',
    description: 'Legacy migration strategy and strangler fig implementation case study for a Series B fintech.',
    image: 'https://picsum.photos/id/60/800/900?grayscale',
    tech: ['Java', 'Node.js', 'AWS'],
  },
];

export const TOOLS: Tool[] = [
  { id: 't1', name: 'JSON Diff', description: 'Semantic visual differ.', icon: 'Braces', demoUrl: '#' },
  { id: 't2', name: 'JWT Decode', description: 'Client-side token inspector.', icon: 'Key', demoUrl: '#' },
  { id: 't3', name: 'RegEx Viz', description: 'Visual state machine graph.', icon: 'Regex', demoUrl: '#' },
  { id: 't4', name: 'Contrast', description: 'APCA contrast checker.', icon: 'Eye', demoUrl: '#' },
  { id: 't5', name: 'Grid Gen', description: 'Tailwind grid layouts.', icon: 'Grid', demoUrl: '#' },
  { id: 't6', name: 'Shadows', description: 'Smooth shadow layered generator.', icon: 'Layers', demoUrl: '#' },
];

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'The Death of the Loading Spinner',
    date: 'Oct 12, 2023',
    readTime: '5 min',
    excerpt: 'Why skeletal UIs and optimistic updates are the only acceptable standard in modern web applications.',
    content: 'Full MDX content simulation would go here...',
  },
  {
    id: 'a2',
    title: 'TypeScript at Scale',
    date: 'Nov 04, 2023',
    readTime: '8 min',
    excerpt: 'Managing monorepos with 100k+ lines of code without losing your sanity or build speed.',
    content: '...',
  },
  {
    id: 'a3',
    title: 'Designing for Dark Mode',
    date: 'Dec 15, 2023',
    readTime: '4 min',
    excerpt: 'It is not just inverting colors. A deep dive into contrast ratios and saturation.',
    content: '...',
  },
  {
    id: 'a4',
    title: 'AI as a Co-Pilot, not a Captain',
    date: 'Jan 10, 2024',
    readTime: '6 min',
    excerpt: 'Integrating LLMs into developer workflows requires a human-in-the-loop philosophy.',
    content: '...',
  },
  {
    id: 'a5',
    title: 'State Management in 2024',
    date: 'Feb 22, 2024',
    readTime: '10 min',
    excerpt: 'Do we still need Redux? Exploring Signals, Atoms, and React Context.',
    content: '...',
  },
  {
    id: 'a6',
    title: 'The Fixed Frame Manifesto',
    date: 'Mar 01, 2024',
    readTime: '3 min',
    excerpt: 'Why I chose to stop scrolling the body and start framing the content.',
    content: '...',
  },
];

export const DESIGNS: DesignItem[] = [
  { 
    id: 'd1', 
    title: 'Apex Finance Dashboard', 
    image: 'https://picsum.photos/id/101/600/800?grayscale', 
    type: 'System',
    date: '2023',
    description: 'A comprehensive financial data visualization suite for high-frequency traders. Focused on data density and legibility under high cognitive load.',
    tags: ['Figma', 'Prototyping', 'Dark Mode']
  },
  { 
    id: 'd2', 
    title: 'Lumina E-Commerce', 
    image: 'https://picsum.photos/id/202/600/900?grayscale', 
    type: 'Landing',
    date: '2023',
    description: 'Minimalist luxury fashion landing page. The goal was to reduce friction and let the photography speak for itself. Implements micro-interactions for cart management.',
    tags: ['UI/UX', 'Animation', 'Web']
  },
  { 
    id: 'd3', 
    title: 'NeoBank Mobile App', 
    image: 'https://picsum.photos/id/301/600/1000?grayscale', 
    type: 'Mobile',
    date: '2024',
    description: 'A mobile-first banking experience designed for Gen Z. Features gesture-based money transfers and social splitting features.',
    tags: ['iOS', 'Mobile Design', 'App']
  },
  { 
    id: 'd4', 
    title: 'Vortex Analytics SaaS', 
    image: 'https://picsum.photos/id/401/600/700?grayscale', 
    type: 'System',
    date: '2022',
    description: 'B2B Analytics platform interface. Created a custom graph library and design tokens to ensure consistency across the platform.',
    tags: ['SaaS', 'B2B', 'Design System']
  },
  { 
    id: 'd5', 
    title: 'Portfolio V1 (Legacy)', 
    image: 'https://picsum.photos/id/501/600/600?grayscale', 
    type: 'Landing',
    date: '2021',
    description: 'The previous iteration of my personal brand. Brutalist typography mixed with soft gradients.',
    tags: ['Personal', 'Branding', 'Web']
  },
  { 
    id: 'd6', 
    title: 'Sonic Stream Player', 
    image: 'https://picsum.photos/id/600/600/850?grayscale', 
    type: 'Mobile',
    date: '2024',
    description: 'Concept for a high-fidelity music streaming app. Focus on album art and immersive background adaptation.',
    tags: ['Mobile', 'Concept', 'Music']
  },
];

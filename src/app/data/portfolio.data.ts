export type Lang = 'fr' | 'en';

export interface Skill {
  name: string;
  category: 'dev' | 'agile' | 'tools';
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: 'private' | 'notDeployed';
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  description: string;
}

export interface PortfolioContent {
  name: string;
  roles: string[];
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  availability: string;
  nav: { id: string; label: string }[];
  hero: {
    ctaExperience: string;
    ctaProjects: string;
    ctaContact: string;
  };
  sections: {
    about: { label: string; title: string };
    skills: { label: string; title: string; dev: string; agile: string; tools: string };
    experience: { label: string; title: string };
    projects: { label: string; title: string; private: string; notDeployed: string };
    agile: { label: string; title: string; intro: string };
    contact: { label: string; title: string; intro: string };
  };
  education: {
    degree: string;
    level: string;
    school: string;
    period: string;
    description: string;
  };
  about: string[];
  skills: Skill[];
  timeline: TimelineItem[];
  projects: Project[];
  scrumHighlights: { label: string; icon: string }[];
  footer: { builtWith: string };
}

const SHARED = {
  name: 'Julien Devienne-Ousmer',
  email: 'julienousmer46090@gmail.com',
  github: 'https://github.com/julienousmer',
  linkedin: 'https://www.linkedin.com/in/julien-devienne-ousmer-854611223/',
  skills: [
    { name: 'Angular', category: 'dev' as const },
    { name: 'TypeScript', category: 'dev' as const },
    { name: 'PHP / Symfony', category: 'dev' as const },
    { name: 'JavaScript', category: 'dev' as const },
    { name: 'HTML / CSS', category: 'dev' as const },
    { name: 'MySQL', category: 'dev' as const },
    { name: 'Tailwind CSS', category: 'dev' as const },
    { name: 'Tests unitaires', category: 'dev' as const },
    { name: 'Vue JS', category: 'dev' as const },
    { name: 'Scrum', category: 'agile' as const },
    { name: 'Kanban', category: 'agile' as const },
    { name: 'Sprint Planning', category: 'agile' as const },
    { name: 'Rétrospectives', category: 'agile' as const },
    { name: 'Docker', category: 'tools' as const },
    { name: 'Git', category: 'tools' as const },
    { name: 'Github', category: 'tools' as const },
    { name: 'Gitlab CI/CD', category: 'tools' as const },
    { name: 'Jira', category: 'tools' as const },
    { name: 'PhpStorm', category: 'tools' as const },
    { name: 'Postman', category: 'tools' as const },
  ],
  scrumHighlights: [
    { label: 'Sprint Planning', icon: '📋' },
    { label: 'Daily', icon: '☀️' },
    { label: 'Review & Retro', icon: '🔄' },
    { label: 'Backlog', icon: '🎯' },
  ],
};

const FR: PortfolioContent = {
  ...SHARED,
  roles: ['Développeur Web', 'Scrum Master Junior'],
  tagline:
    'Du Symfony en entreprise aux interfaces Angular — Je construis des outils utiles en répondant à des besoins métiers complexes.',
  location: 'Toulouse, France',
  availability: 'Ouvert aux opportunités',
  nav: [
    { id: 'hero', label: 'Accueil' },
    { id: 'experience', label: 'Expérience' },
    { id: 'projects', label: 'Projets' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'agile', label: 'Agile' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    ctaExperience: 'Voir mon expérience',
    ctaProjects: 'Voir mes projets',
    ctaContact: 'Me contacter',
  },
  sections: {
    about: { label: 'À propos', title: 'Qui suis-je ?' },
    skills: {
      label: 'Compétences',
      title: 'Stack & méthodes',
      dev: 'Développement',
      agile: 'Agile / Scrum',
      tools: 'Outils',
    },
    experience: { label: 'Expérience', title: 'Expérience professionnelle' },
    projects: {
      label: 'Projets',
      title: 'Réalisations',
      private: 'Projet interne',
      notDeployed: 'Non déployé',
    },
    agile: {
      label: 'Scrum Master',
      title: 'Facilitation agile',
      intro:
        'Chez Cerfrance Lot, j’ai participé aux cérémonies Scrum : daily, sprint planning, reviews et rétrospectives — en lien direct avec la livraison produit.',
    },
    contact: {
      label: 'Contact',
      title: 'Travaillons ensemble',
      intro: 'Un projet, une mission ou un simple échange ? Écrivez-moi.',
    },
  },
  education: {
    degree: 'Master Ingénierie Logicielle',
    level: 'Bac+5',
    school: 'IPI Blagnac',
    period: '2023 — 2025',
    description:
      'Formation d’ingénieur : architecture logicielle, qualité, tests, méthodes agiles et gestion de projet technique.',
  },
  about: [
    'Développeur web avec plus de 3 ans d’expérience chez Cerfrance Lot : intranets et outils métiers complexes (production, suivi, statistiques, etc.).',
    'Spécialisé PHP/Symfony et de plus en plus orienté front moderne (Angular, TypeScript avec Vue JS et React, Tailwind CSS).',
    'Scrum Master junior en devenir : j\'espère pouvoir animer des équipes en mode agile et mettre à profit mes compétences en management.',
  ],
  timeline: [
    {
      period: 'Sept. — Déc. 2025',
      title: 'Développeur Web / Chef de projet Junior',
      org: 'Cerfrance Lot — CDD',
      description:
        'Nouveaux outils métiers et fonctionnalités internes (FAQ, actualités, devis clients, statistiques, suivi de production). Mise en place de tests automatisés et animation des cérémonies Scrum.',
    },
    {
      period: '2023 — 2025',
      title: 'Développeur Web Full-Stack',
      org: 'Cerfrance Lot — Alternance',
      description:
        'Intranet avec Symfony PHP , outils métiers pour ~130 collaborateurs au service de 3 000+ adhérents (production comptable, statistiques d’écritures, pesage de dossiers...). Tests unitaires/intégration et administration MySQL.',
    },
    {
      period: '2022 — 2023',
      title: 'Développeur Web',
      org: 'Cerfrance Lot — Alternance',
      description:
        'Reprise et modernisation d’un intranet legacy (HTML, PHP, JS sans framework). Refonte de l’architecture puis développement d’un nouvel outil interne from scratch.',
    },
    {
      period: '2023 — 2025',
      title: 'Master Ingénierie Logicielle',
      org: 'IPI Blagnac',
      description: 'Bac+5 — Ingénierie logicielle, architecture, tests et pratiques agiles (projet Fighter Stats en Scrum).',
    },
  ],
  projects: [
    {
      title: 'Intranet Cerfrance',
      description:
        'Intranet complet pour ~130 employés : suivi de production comptable, devis clients, statistiques d’écritures, FAQ/actualités et outils métiers. Tests unitaires et d’intégration automatisés.',
      tags: ['PHP', 'Symfony', 'MySQL', 'JavaScript'],
      status: 'private',
    },
    {
      title: 'Outil de pesage de dossiers',
      description:
        'Calcul de charge comptable et indicateurs de productivité (TTX, temps de traitement, statistiques globales) pour comptables et managers.',
      tags: ['Symfony', 'PHP', 'MySQL', 'JavaScript'],
      status: 'private',
    },
    {
      title: 'Fighter Stats',
      description:
        'Projet école sur l’UFC : classements, stats combattants, catégories de poids. Interface responsive moderne, gestion de projet en Scrum/Kanban.',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
      status: 'notDeployed',
    },
    {
      title: 'Modernisation intranet legacy',
      description:
        'Refactoring d’un intranet historique sans framework : nouvelle architecture, meilleures perfs et maintenance, puis nouvel outil interne développé from scratch.',
      tags: ['PHP', 'JavaScript', 'HTML/CSS'],
      status: 'private',
    },
  ],
  footer: { builtWith: 'Développé avec Angular & Tailwind CSS' },
};

const EN: PortfolioContent = {
  ...SHARED,
  roles: ['Web Developer', 'Junior Scrum Master'],
  tagline:
    'From Symfony in production to Angular interfaces — I build useful tools and help teams ship with agility.',
  location: 'Occitanie, France',
  availability: 'Open to opportunities',
  nav: [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'agile', label: 'Agile' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    ctaExperience: 'View experience',
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
  },
  sections: {
    about: { label: 'About', title: 'Who am I?' },
    skills: {
      label: 'Skills',
      title: 'Stack & methods',
      dev: 'Development',
      agile: 'Agile / Scrum',
      tools: 'Tools',
    },
    experience: { label: 'Experience', title: 'Professional experience' },
    projects: {
      label: 'Projects',
      title: 'Selected work',
      private: 'Internal project',
      notDeployed: 'Not deployed yet',
    },
    agile: {
      label: 'Scrum Master',
      title: 'Agile facilitation',
      intro:
        'At Cerfrance Lot, I took part in Scrum ceremonies — daily, sprint planning, reviews and retrospectives — tied directly to product delivery.',
    },
    contact: {
      label: 'Contact',
      title: "Let's work together",
      intro: 'A project, a role, or just a chat? Drop me a line.',
    },
  },
  education: {
    degree: 'Master in Software Engineering',
    level: 'MSc (Bac+5)',
    school: 'IPI Blagnac',
    period: '2023 — 2025',
    description:
      'Engineering degree: software architecture, quality, testing, agile methods and technical project management.',
  },
  about: [
    'Web developer with 3+ years at Cerfrance Lot across work-study and a short fixed-term contract: intranets, business tools and complex MySQL databases.',
    'Strong in PHP/Symfony, increasingly focused on modern front-end (Angular, TypeScript, Tailwind).',
    'Junior Scrum Master: I run ceremonies, clarify priorities and help teams deliver value iteratively.',
  ],
  timeline: [
    {
      period: 'Sep — Dec 2025',
      title: 'Junior Web Developer / Project Lead',
      org: 'Cerfrance Lot — Fixed-term',
      description:
        'New business tools and internal features (FAQ, news, client quotes, stats, production tracking). Automated tests and Scrum ceremonies facilitation.',
    },
    {
      period: '2023 — 2025',
      title: 'Full-Stack Web Developer',
      org: 'Cerfrance Lot — Work-study',
      description:
        'Corporate Symfony intranet (~130 staff), tools for 3,000+ members (accounting production, entry stats, file weighting, quotes). Unit/integration tests and MySQL administration.',
    },
    {
      period: '2022 — 2023',
      title: 'Web Developer',
      org: 'Cerfrance Lot — Work-study',
      description:
        'Took over and modernized a legacy intranet (HTML, PHP, JS, no framework). Restructured architecture then built a new internal tool from scratch.',
    },
    {
      period: '2023 — 2025',
      title: 'Master in Software Engineering',
      org: 'IPI Blagnac',
      description: 'MSc — software engineering, architecture, testing and agile practices (Fighter Stats project in Scrum/Kanban).',
    },
  ],
  projects: [
    {
      title: 'Cerfrance Internal Intranet',
      description:
        'Full intranet for ~130 employees: accounting production tracking, client quotes, writing statistics, FAQ/news and business tools. Automated unit and integration tests.',
      tags: ['PHP', 'Symfony', 'MySQL', 'JavaScript'],
      status: 'private',
    },
    {
      title: 'Accounting File Weighting Tool',
      description:
        'Workload and productivity indicators (TTX, processing time, global file stats) for accountants and managers.',
      tags: ['Symfony', 'PHP', 'MySQL', 'JavaScript'],
      status: 'private',
    },
    {
      title: 'Fighter Stats',
      description:
        'School project on UFC: rankings, fighter stats, weight classes. Modern responsive UI, project managed with Scrum/Kanban.',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
      status: 'notDeployed',
    },
    {
      title: 'Legacy Intranet Modernization',
      description:
        'Refactored a framework-less legacy intranet: improved architecture, performance and maintainability, then a brand-new internal tool.',
      tags: ['PHP', 'JavaScript', 'HTML/CSS'],
      status: 'private',
    },
  ],
  footer: { builtWith: 'Built with Angular & Tailwind CSS' },
};

// EN skills need English labels for test/integration
EN.skills = [
  { name: 'Angular', category: 'dev' },
  { name: 'TypeScript', category: 'dev' },
  { name: 'PHP / Symfony', category: 'dev' },
  { name: 'JavaScript', category: 'dev' },
  { name: 'HTML / CSS', category: 'dev' },
  { name: 'MySQL', category: 'dev' },
  { name: 'Tailwind CSS', category: 'dev' },
  { name: 'Unit & integration tests', category: 'dev' },
  { name: 'Scrum', category: 'agile' },
  { name: 'Kanban', category: 'agile' },
  { name: 'Sprint Planning', category: 'agile' },
  { name: 'Retrospectives', category: 'agile' },
  { name: 'Docker', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Jira', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Github', category: 'tools' },
  { name: 'PHPStorm', category: 'tools' },
  { name: 'Gitlab CI/CD', category: 'tools' },
];

export const PORTFOLIO_I18N: Record<Lang, PortfolioContent> = { fr: FR, en: EN };

export const AVATAR_PATH = 'avatar.png';

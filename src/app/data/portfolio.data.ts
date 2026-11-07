export type Lang = 'fr' | 'en';

/** A label that is identical in every language, or translated per language. */
type Localized = string | Record<Lang, string>;

export interface SkillGroup {
  title: string;
  accent?: boolean;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  role: string;
  tags: string[];
  status: 'private' | 'school';
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  description: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  school: string;
  description?: string;
}

export interface PortfolioContent {
  name: string;
  roles: string[];
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  cvPath: string;
  location: string;
  availability: string;
  meta: { title: string; description: string };
  photoAlt: string;
  nav: { id: string; label: string }[];
  hero: {
    ctaCv: string;
    ctaContact: string;
  };
  stats: { value: string; label: string }[];
  sections: {
    about: { label: string; title: string; languages: string };
    skills: { label: string; title: string };
    experience: { label: string; title: string; intro: string };
    projects: { label: string; title: string; private: string; school: string; role: string };
    education: { label: string };
    contact: { label: string; title: string; intro: string; cv: string };
  };
  education: EducationItem[];
  languages: string[];
  about: string[];
  skills: SkillGroup[];
  timeline: TimelineItem[];
  projects: Project[];
  footer: { builtWith: string };
}

const SHARED = {
  name: 'Julien Devienne-Ousmer',
  email: 'julienousmer46090@gmail.com',
  github: 'https://github.com/julienousmer',
  linkedin: 'https://www.linkedin.com/in/julien-devienne-ousmer-854611223/',
  cvPath: 'CV_Julien_Devienne-Ousmer.pdf',
};

/** Single source for skills, so both languages always list the same items. */
const SKILL_GROUPS: { title: Record<Lang, string>; accent?: boolean; items: Localized[] }[] = [
  {
    title: { fr: 'Back-end', en: 'Back-end' },
    items: ['PHP 8', 'Symfony', 'Doctrine ORM', 'Twig', 'Node.js'],
  },
  {
    title: { fr: 'Front-end', en: 'Front-end' },
    items: ['Angular', 'TypeScript', 'JavaScript', 'React', 'Vue.js', 'Stimulus', 'Tailwind CSS'],
  },
  {
    title: { fr: 'Données, qualité & DevOps', en: 'Data, quality & DevOps' },
    items: [
      'MySQL',
      'PHPUnit',
      { fr: 'Tests unitaires & d’intégration', en: 'Unit & integration tests' },
      'Git',
      'GitLab CI/CD',
      'Docker',
      'Linux',
    ],
  },
  {
    title: { fr: 'Méthodes', en: 'Ways of working' },
    accent: true,
    items: [
      'Scrum',
      'Kanban',
      'Jira',
      { fr: 'Animation de réunions', en: 'Meeting facilitation' },
      { fr: 'Documentation technique', en: 'Technical documentation' },
    ],
  },
];

const localize = (value: Localized, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang];

const skillsFor = (lang: Lang): SkillGroup[] =>
  SKILL_GROUPS.map((group) => ({
    title: group.title[lang],
    accent: group.accent,
    items: group.items.map((item) => localize(item, lang)),
  }));

const FR: PortfolioContent = {
  ...SHARED,
  roles: ['Développeur Web Full-Stack', 'Symfony · Angular'],
  tagline:
    'Je conçois des intranets et des outils métiers fiables, de la base de données jusqu’à l’interface, avec Symfony et Angular.',
  location: 'Toulouse, France',
  availability: 'En CDI · à l’écoute d’opportunités',
  meta: {
    title: 'Julien Devienne-Ousmer — Développeur Web Full-Stack (Symfony, Angular)',
    description:
      'Portfolio de Julien Devienne-Ousmer, développeur web full-stack à Toulouse : PHP/Symfony, Angular, TypeScript, MySQL. 4 ans d’expérience, Master Ingénierie Logicielle.',
  },
  photoAlt: 'Photo de Julien Devienne-Ousmer',
  nav: [
    { id: 'hero', label: 'Accueil' },
    { id: 'experience', label: 'Expérience' },
    { id: 'projects', label: 'Projets' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    ctaCv: 'Télécharger mon CV',
    ctaContact: 'Me contacter',
  },
  stats: [
    { value: '4 ans', label: 'd’expérience en entreprise' },
    { value: '130', label: 'collaborateurs utilisent mon intranet' },
    { value: 'Bac+5', label: 'Master Ingénierie Logicielle' },
  ],
  sections: {
    about: { label: 'À propos', title: 'Qui suis-je ?', languages: 'Langues' },
    skills: { label: 'Compétences', title: 'Stack & méthodes' },
    experience: {
      label: 'Expérience',
      title: 'Expérience professionnelle',
      intro:
        'Depuis 2022 chez Cerfrance Lot, de l’alternance au CDI : modernisation d’un intranet legacy, puis conception d’un nouvel intranet et d’outils métiers.',
    },
    projects: {
      label: 'Projets',
      title: 'Réalisations',
      private: 'Projet interne',
      school: 'Projet d’études',
      role: 'Mon rôle',
    },
    education: { label: 'Formation' },
    contact: {
      label: 'Contact',
      title: 'Travaillons ensemble',
      intro: 'Un poste, un projet ou un simple échange ? Écrivez-moi, je réponds rapidement.',
      cv: 'Mon CV (PDF)',
    },
  },
  education: [
    {
      period: '2023 — 2025',
      degree: 'Master Ingénierie Logicielle',
      school: 'IPI Blagnac (IGENSIA)',
      description:
        'Développement full-stack, architecture, tests, CI/CD, DevOps (Docker, Ansible, Terraform, AWS) et méthodes agiles.',
    },
    {
      period: '2022 — 2023',
      degree: 'Licence pro APSIO — Analyste programmeur',
      school: 'IUT de Blagnac',
    },
    {
      period: '2020 — 2022',
      degree: 'DUT Informatique',
      school: 'IUT Paul Sabatier',
    },
  ],
  languages: ['Français — langue maternelle', 'Anglais — courant (TOEIC 795/990)'],
  about: [
    'Développeur web full-stack depuis 4 ans chez Cerfrance Lot, un cabinet comptable. J’ai conçu et je fais évoluer seul un intranet utilisé par 130 collaborateurs, avec une base MySQL complexe et des tests automatisés.',
    'Mon socle est PHP/Symfony ; côté front, je travaille avec Angular, TypeScript et Tailwind CSS, et j’ai aussi pratiqué React et Vue.js.',
    'À l’aise en environnement agile, je participe aux cérémonies Scrum et j’en anime ponctuellement. Je cherche une équipe où approfondir l’architecture et la qualité logicielle.',
  ],
  skills: skillsFor('fr'),
  timeline: [
    {
      period: 'Depuis juil. 2026',
      title: 'Développeur Web Full-Stack',
      org: 'Cerfrance Lot — CDI',
      description:
        'Évolution de l’intranet et des outils métiers : nouvelles fonctionnalités Symfony, tests automatisés et participation aux cérémonies Scrum.',
    },
    {
      period: 'Sept. 2025 — juin 2026',
      title: 'Développeur Web Full-Stack',
      org: 'Cerfrance Lot — CDD (sept.–déc. 2025, avr.–juin 2026)',
      description:
        'Fonctionnalités métier avec Symfony et JavaScript : suivi de production comptable, statistiques d’écritures, FAQ, actualités, génération de devis clients. Tests unitaires et d’intégration, participation et animation ponctuelle des cérémonies Scrum.',
    },
    {
      period: '2023 — 2025',
      title: 'Développeur Web Full-Stack',
      org: 'Cerfrance Lot — Alternance',
      description:
        'Conception from scratch d’un intranet d’entreprise (Symfony, PHP 8, Doctrine, Twig, Tailwind CSS) utilisé par 130 collaborateurs, de la modélisation de la base à la mise en production. Outils métiers au service de 3 000 adhérents, tests PHPUnit exécutés dans une pipeline GitLab CI/CD.',
    },
    {
      period: '2022 — 2023',
      title: 'Développeur Web',
      org: 'Cerfrance Lot — Alternance',
      description:
        'Reprise et modernisation d’un intranet historique sans framework (HTML, PHP, JavaScript) : restructuration de l’architecture, maintenabilité et performances. Développement d’un nouvel outil interne.',
    },
  ],
  projects: [
    {
      title: 'Intranet Cerfrance',
      description:
        'Intranet complet pour 130 collaborateurs : suivi de production comptable, statistiques d’écritures, devis clients, FAQ et actualités. Base MySQL relationnelle complexe, tests unitaires et d’intégration dans la CI.',
      role: 'Conception et développement en autonomie, de la base de données à la mise en production.',
      tags: ['Symfony', 'PHP 8', 'Doctrine', 'MySQL', 'Tailwind CSS', 'GitLab CI'],
      status: 'private',
    },
    {
      title: 'Outil de pesage de dossiers',
      description:
        'Mesure de la charge de travail comptable : temps de traitement par dossier, indicateurs de productivité et statistiques globales pour les comptables et leurs managers.',
      role: 'Recueil du besoin avec les équipes métier, développement et mise en production.',
      tags: ['Symfony', 'PHP', 'MySQL', 'JavaScript'],
      status: 'private',
    },
    {
      title: 'Modernisation d’un intranet legacy',
      description:
        'Reprise d’un intranet historique écrit sans framework : nouvelle architecture, code plus maintenable et meilleures performances, puis un nouvel outil interne développé from scratch.',
      role: 'Analyse de l’existant, refonte progressive sans interrompre le service.',
      tags: ['PHP', 'JavaScript', 'HTML/CSS'],
      status: 'private',
    },
    {
      title: 'Fighter Stats',
      description:
        'Application sur l’UFC : classements, statistiques des combattants et catégories de poids, avec une interface responsive.',
      role: 'Développement front Angular et gestion de projet en Scrum/Kanban.',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
      status: 'school',
    },
  ],
  footer: { builtWith: 'Développé avec Angular & Tailwind CSS' },
};

const EN: PortfolioContent = {
  ...SHARED,
  roles: ['Full-Stack Web Developer', 'Symfony · Angular'],
  tagline:
    'I build reliable intranets and business tools, from the database to the interface, with Symfony and Angular.',
  location: 'Toulouse, France',
  availability: 'Permanent role · open to opportunities',
  meta: {
    title: 'Julien Devienne-Ousmer — Full-Stack Web Developer (Symfony, Angular)',
    description:
      'Portfolio of Julien Devienne-Ousmer, full-stack web developer in Toulouse, France: PHP/Symfony, Angular, TypeScript, MySQL. 4 years of experience, Master’s in Software Engineering.',
  },
  photoAlt: 'Photo of Julien Devienne-Ousmer',
  nav: [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    ctaCv: 'Download my CV',
    ctaContact: 'Get in touch',
  },
  stats: [
    { value: '4 yrs', label: 'of industry experience' },
    { value: '130', label: 'employees use my intranet' },
    { value: 'MSc', label: 'Software Engineering' },
  ],
  sections: {
    about: { label: 'About', title: 'Who am I?', languages: 'Languages' },
    skills: { label: 'Skills', title: 'Stack & methods' },
    experience: {
      label: 'Experience',
      title: 'Professional experience',
      intro:
        'At Cerfrance Lot since 2022, from work-study to a permanent role: modernising a legacy intranet, then designing a new intranet and business tools.',
    },
    projects: {
      label: 'Projects',
      title: 'Selected work',
      private: 'Internal project',
      school: 'School project',
      role: 'My role',
    },
    education: { label: 'Education' },
    contact: {
      label: 'Contact',
      title: "Let's work together",
      intro: 'A role, a project or just a chat? Drop me a line, I reply quickly.',
      cv: 'My CV (PDF, French)',
    },
  },
  education: [
    {
      period: '2023 — 2025',
      degree: 'Master’s in Software Engineering',
      school: 'IPI Blagnac (IGENSIA)',
      description:
        'Full-stack development, architecture, testing, CI/CD, DevOps (Docker, Ansible, Terraform, AWS) and agile methods.',
    },
    {
      period: '2022 — 2023',
      degree: 'Professional Bachelor’s — Software Analyst Programmer',
      school: 'IUT de Blagnac',
    },
    {
      period: '2020 — 2022',
      degree: 'Two-year Technical Degree in Computer Science (DUT)',
      school: 'IUT Paul Sabatier',
    },
  ],
  languages: ['French — native', 'English — fluent (TOEIC 795/990)'],
  about: [
    'Full-stack web developer for 4 years at Cerfrance Lot, an accounting firm. I designed, and still evolve on my own, an intranet used by 130 employees, backed by a complex MySQL database and automated tests.',
    'My core is PHP/Symfony; on the front end I work with Angular, TypeScript and Tailwind CSS, and I have also used React and Vue.js.',
    'Comfortable in agile teams: I take part in Scrum ceremonies and facilitate some of them. I am looking for a team where I can go deeper into software architecture and quality.',
  ],
  skills: skillsFor('en'),
  timeline: [
    {
      period: 'Since Jul 2026',
      title: 'Full-Stack Web Developer',
      org: 'Cerfrance Lot — Permanent',
      description:
        'Evolving the intranet and business tools: new Symfony features, automated tests and Scrum ceremonies.',
    },
    {
      period: 'Sep 2025 — Jun 2026',
      title: 'Full-Stack Web Developer',
      org: 'Cerfrance Lot — Fixed-term (Sep–Dec 2025, Apr–Jun 2026)',
      description:
        'Business features with Symfony and JavaScript: accounting production tracking, accounting entry statistics, FAQ, news, client quote generation. Unit and integration tests; took part in and occasionally facilitated Scrum ceremonies.',
    },
    {
      period: '2023 — 2025',
      title: 'Full-Stack Web Developer',
      org: 'Cerfrance Lot — Work-study',
      description:
        'Designed a company intranet from scratch (Symfony, PHP 8, Doctrine, Twig, Tailwind CSS) used by 130 employees, from database modelling to production. Business tools serving 3,000 client members, PHPUnit tests running in a GitLab CI/CD pipeline.',
    },
    {
      period: '2022 — 2023',
      title: 'Web Developer',
      org: 'Cerfrance Lot — Work-study',
      description:
        'Took over and modernised a framework-less legacy intranet (HTML, PHP, JavaScript): restructured the architecture, improved maintainability and performance. Built a new internal tool.',
    },
  ],
  projects: [
    {
      title: 'Cerfrance Intranet',
      description:
        'Full intranet for 130 employees: accounting production tracking, accounting entry statistics, client quotes, FAQ and news. Complex relational MySQL database, unit and integration tests in CI.',
      role: 'Designed and built it on my own, from the database to production.',
      tags: ['Symfony', 'PHP 8', 'Doctrine', 'MySQL', 'Tailwind CSS', 'GitLab CI'],
      status: 'private',
    },
    {
      title: 'Accounting Workload Tool',
      description:
        'Measures accounting workload: processing time per client file, productivity indicators and overall statistics for accountants and their managers.',
      role: 'Gathered needs with business teams, built and shipped it.',
      tags: ['Symfony', 'PHP', 'MySQL', 'JavaScript'],
      status: 'private',
    },
    {
      title: 'Legacy Intranet Modernisation',
      description:
        'Took over a framework-less legacy intranet: new architecture, more maintainable code and better performance, then a brand-new internal tool built from scratch.',
      role: 'Analysed the existing code and refactored it step by step without service interruption.',
      tags: ['PHP', 'JavaScript', 'HTML/CSS'],
      status: 'private',
    },
    {
      title: 'Fighter Stats',
      description: 'UFC app: rankings, fighter statistics and weight classes, with a responsive interface.',
      role: 'Angular front-end development and project management with Scrum/Kanban.',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS'],
      status: 'school',
    },
  ],
  footer: { builtWith: 'Built with Angular & Tailwind CSS' },
};

export const PORTFOLIO_I18N: Record<Lang, PortfolioContent> = { fr: FR, en: EN };

export const PHOTO = { webp: 'photo.webp', jpg: 'photo.jpg' };

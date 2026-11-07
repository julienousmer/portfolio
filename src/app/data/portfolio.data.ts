export type Lang = 'fr' | 'en';

/** A label that is identical in every language, or translated per language. */
type Localized = string | Record<Lang, string>;

/** A tool with its real logo, fetched by the taste-skill icon resolver into public/assets/icons. */
export interface Tool {
  name: string;
  icon: string;
  /** Wordmark logos (PHP) get a wide tile. */
  wide?: boolean;
  /** Black marks (none today) would invert on dark. */
  ink?: boolean;
}

export interface StackItem extends Tool {
  meta: string;
}

export interface StackLayer {
  name: string;
  note: string;
  tools: StackItem[];
}

export interface Project {
  title: string;
  kind: string;
  description: string;
  role: string;
  tools: Tool[];
}

export interface Row {
  period: string;
  title: string;
  org: string;
}

export interface Fact {
  term: string;
  value: string;
}

export interface PortfolioContent {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  cvPath: string;
  meta: { title: string; description: string };
  skip: string;
  nav: { id: string; label: string }[];
  ui: { menu: string; langLabel: string; themeToDark: string; themeToLight: string };
  photoAlt: string;
  hero: {
    notice: string;
    title: string;
    lead: string;
    ctaCv: string;
    ctaContact: string;
    /** The float card on the photo cycles through these, one every few seconds. */
    floats: { live: string; when: string; title: string }[];
    facts: Fact[];
  };
  intranet: {
    label: string;
    title: string;
    titleMuted: string;
    lead: string;
    points: Fact[];
    diagram: { alt: string; center: string; spokes: { label: string; icon: string }[] };
  };
  statement: { label: string; before: string; strong: string; after: string };
  projects: { label: string; title: string; roleLabel: string; toolsLabel: string; items: Project[] };
  path: {
    label: string;
    title: string;
    work: string;
    education: string;
    languages: string;
    jobs: Row[];
    schools: Row[];
    spoken: Fact[];
  };
  stack: {
    label: string;
    title: string;
    titleMuted: string;
    methods: string;
    request: string;
    response: string;
    layers: StackLayer[];
  };
  close: { title: string; lead: string };
  footer: { lede: string; contact: string; sections: string; trademarks: string; built: string };
}

const SHARED = {
  name: 'Julien Devienne-Ousmer',
  email: 'julienousmer46090@gmail.com',
  github: 'https://github.com/julienousmer',
  linkedin: 'https://www.linkedin.com/in/julien-devienne-ousmer-854611223/',
  cvPath: 'CV_Julien_Devienne-Ousmer.pdf',
};

const T = {
  symfony: { name: 'Symfony', icon: 'symfony' },
  php: { name: 'PHP 8', icon: 'php', wide: true },
  doctrine: { name: 'Doctrine', icon: 'doctrine' },
  twig: { name: 'Twig', icon: 'twig' },
  angular: { name: 'Angular', icon: 'angular' },
  typescript: { name: 'TypeScript', icon: 'typescript' },
  react: { name: 'React', icon: 'react' },
  vue: { name: 'Vue.js', icon: 'vue' },
  tailwind: { name: 'Tailwind CSS', icon: 'tailwindcss' },
  mysql: { name: 'MySQL', icon: 'mysql' },
  phpunit: { name: 'PHPUnit', icon: 'phpunit' },
  docker: { name: 'Docker', icon: 'docker' },
  gitlab: { name: 'GitLab CI/CD', icon: 'gitlab' },
  git: { name: 'Git', icon: 'git' },
  linux: { name: 'Linux', icon: 'linux-tux' },
  jira: { name: 'Jira', icon: 'jira' },
} satisfies Record<string, Tool>;

/** One layered stack for both languages, so FR and EN always list the same tools. */
const LAYERS: { name: Record<Lang, string>; note: Record<Lang, string>; tools: { tool: Tool; meta: Localized }[] }[] = [
  {
    name: { fr: 'Front', en: 'Front end' },
    note: { fr: 'Des interfaces typées et responsives', en: 'Typed, responsive interfaces' },
    tools: [
      { tool: T.angular, meta: { fr: 'Ce site, Fighter Stats', en: 'This site, Fighter Stats' } },
      { tool: T.typescript, meta: { fr: 'Tout mon code front', en: 'All my front-end code' } },
      { tool: T.tailwind, meta: { fr: 'L’intranet et ce site', en: 'The intranet and this site' } },
      { tool: T.react, meta: { fr: 'Projets de formation', en: 'Training projects' } },
      { tool: T.vue, meta: { fr: 'Projets de formation', en: 'Training projects' } },
    ],
  },
  {
    name: { fr: 'Back-end', en: 'Back end' },
    note: { fr: 'Le cœur métier de l’intranet', en: 'The intranet’s business core' },
    tools: [
      { tool: T.symfony, meta: { fr: 'Mon socle depuis 2022', en: 'My core since 2022' } },
      { tool: T.php, meta: { fr: 'PHP 8, depuis 2020', en: 'PHP 8, since 2020' } },
      { tool: T.doctrine, meta: { fr: 'ORM et migrations', en: 'ORM and migrations' } },
      { tool: T.twig, meta: { fr: 'Les gabarits de l’intranet', en: 'The intranet’s templates' } },
    ],
  },
  {
    name: { fr: 'Données', en: 'Data' },
    note: { fr: 'Une base relationnelle modélisée de zéro', en: 'A relational database modelled from scratch' },
    tools: [{ tool: T.mysql, meta: { fr: 'La base de l’intranet', en: 'The intranet’s database' } }],
  },
  {
    name: { fr: 'Qualité & livraison', en: 'Quality & delivery' },
    note: { fr: 'Testé à chaque push, livré en sprints', en: 'Tested on every push, shipped in sprints' },
    tools: [
      { tool: T.phpunit, meta: { fr: 'Tests unitaires et d’intégration', en: 'Unit and integration tests' } },
      { tool: T.gitlab, meta: { fr: 'Les tests à chaque push', en: 'Tests on every push' } },
      { tool: T.docker, meta: { fr: 'Environnements locaux', en: 'Local environments' } },
      { tool: T.git, meta: { fr: 'Branches et revues', en: 'Branches and reviews' } },
      { tool: T.linux, meta: { fr: 'Serveurs et terminal', en: 'Servers and shell' } },
      { tool: T.jira, meta: { fr: 'Sprints Scrum', en: 'Scrum sprints' } },
    ],
  },
];

const localize = (value: Localized, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang];

const layersFor = (lang: Lang): StackLayer[] =>
  LAYERS.map((l) => ({
    name: l.name[lang],
    note: l.note[lang],
    tools: l.tools.map(({ tool, meta }) => ({ ...tool, meta: localize(meta, lang) })),
  }));

const SPOKE_ICONS = ['ui:clipboard-list', 'ui:bar-chart-3', 'ui:file-text', 'ui:scale', 'ui:newspaper'];
const spokes = (labels: string[]) => labels.map((label, i) => ({ label, icon: SPOKE_ICONS[i] }));

const FR: PortfolioContent = {
  ...SHARED,
  meta: {
    title: 'Julien Devienne-Ousmer — Développeur Web Full-Stack (Symfony, Angular)',
    description:
      'Développeur web full-stack à Toulouse : j’ai construit seul l’intranet de Cerfrance Lot, utilisé par 130 collaborateurs. PHP/Symfony, Angular, MySQL, Master Ingénierie Logicielle.',
  },
  skip: 'Aller au contenu',
  nav: [
    { id: 'intranet', label: 'Intranet' },
    { id: 'projets', label: 'Projets' },
    { id: 'parcours', label: 'Parcours' },
    { id: 'stack', label: 'Compétences' },
  ],
  ui: {
    menu: 'Menu',
    langLabel: 'Langue',
    themeToDark: 'Passer en thème sombre',
    themeToLight: 'Passer en thème clair',
  },
  photoAlt: 'Julien Devienne-Ousmer, en t-shirt blanc, sourit face à l’objectif',
  hero: {
    notice: 'En CDI chez Cerfrance Lot, à l’écoute d’un nouveau poste',
    title: 'Développeur web full-stack à Toulouse',
    lead: 'Je conçois des intranets et des outils métiers avec Symfony et Angular. Le dernier, je l’ai construit seul : 130 collaborateurs l’ouvrent chaque jour.',
    ctaCv: 'Télécharger mon CV',
    ctaContact: 'Me contacter',
    floats: [
      { live: 'CDI', when: 'Depuis juillet 2026', title: 'Développeur full-stack, Cerfrance Lot' },
      { live: 'Intranet', when: 'Chaque jour', title: '130 collaborateurs l’utilisent' },
      { live: 'Qualité', when: 'À chaque push', title: 'Tests PHPUnit dans GitLab CI' },
    ],
    facts: [
      { term: 'Expérience', value: '4 ans en entreprise' },
      { term: 'Diplôme', value: 'Master Ingénierie Logicielle' },
      { term: 'Anglais', value: 'Courant, TOEIC 795' },
    ],
  },
  intranet: {
    label: 'Intranet',
    title: 'Un intranet pour 130 collaborateurs.',
    titleMuted: 'Construit seul, de la base à la production.',
    lead: 'Chez Cerfrance Lot, un cabinet comptable, j’ai tout pris en main : la modélisation MySQL, le code Symfony, les tests et la mise en production.',
    points: [
      { term: 'Back-end', value: 'PHP 8, Symfony, Doctrine, Twig' },
      { term: 'Données', value: 'Une base MySQL relationnelle complexe' },
      { term: 'Qualité', value: 'Tests PHPUnit dans GitLab CI/CD' },
      { term: 'Portée', value: 'Des outils au service de 3 000 adhérents' },
    ],
    diagram: {
      alt: 'L’intranet relie le suivi de production, les statistiques d’écritures, les devis clients, le pesage de dossiers, la FAQ et les actualités.',
      center: 'Intranet',
      spokes: spokes([
        'Suivi de production',
        'Statistiques d’écritures',
        'Devis clients',
        'Pesage de dossiers',
        'FAQ et actualités',
      ]),
    },
  },
  statement: {
    label: 'Ma façon de travailler',
    before:
      'Je préfère un outil simple que les équipes ouvrent',
    strong: 'chaque jour',
    after:
      'à une démo brillante que personne n’utilise. Alors j’écoute le métier, je teste, puis je livre par petites étapes.',
  },
  projects: {
    label: 'Projets',
    title: 'Trois autres projets, deux en interne.',
    roleLabel: 'Mon rôle',
    toolsLabel: 'Outils :',
    items: [
      {
        title: 'Outil de pesage de dossiers',
        kind: 'Projet interne, Cerfrance Lot',
        description:
          'Il mesure la charge de travail comptable : temps par dossier, indicateurs de productivité et statistiques pour les managers.',
        role: 'Recueil du besoin avec les équipes, développement, mise en production.',
        tools: [T.symfony, T.mysql, T.php],
      },
      {
        title: 'Modernisation d’un intranet legacy',
        kind: 'Projet interne, Cerfrance Lot',
        description:
          'Un intranet historique écrit sans framework : nouvelle architecture, code maintenable, meilleures performances, sans couper le service.',
        role: 'Analyse de l’existant et refonte progressive.',
        tools: [T.php, T.mysql, T.git],
      },
      {
        title: 'Fighter Stats',
        kind: 'Projet de formation',
        description:
          'Une application sur l’UFC : classements, statistiques des combattants et catégories de poids, sur mobile comme sur ordinateur.',
        role: 'Front Angular et gestion de projet en Scrum.',
        tools: [T.angular, T.typescript, T.tailwind],
      },
    ],
  },
  path: {
    label: 'Parcours',
    title: 'Quatre ans chez Cerfrance Lot, de l’alternance au CDI.',
    work: 'Expérience',
    education: 'Formation',
    languages: 'Langues',
    jobs: [
      { period: 'Depuis juil. 2026', title: 'Développeur web full-stack', org: 'CDI' },
      { period: '2025 — 2026', title: 'Développeur web full-stack', org: 'CDD, sept.–déc. puis avr.–juin' },
      { period: '2023 — 2025', title: 'Création de l’intranet', org: 'Alternance' },
      { period: '2022 — 2023', title: 'Modernisation de l’intranet legacy', org: 'Alternance' },
    ],
    schools: [
      { period: '2023 — 2025', title: 'Master Ingénierie Logicielle', org: 'IPI Blagnac' },
      { period: '2022 — 2023', title: 'Licence pro APSIO', org: 'IUT de Blagnac' },
      { period: '2020 — 2022', title: 'DUT Informatique', org: 'IUT Paul Sabatier' },
    ],
    spoken: [
      { term: 'Français', value: 'Langue maternelle' },
      { term: 'Anglais', value: 'Courant, TOEIC 795/990' },
    ],
  },
  stack: {
    label: 'Compétences',
    title: 'Ma stack, couche par couche.',
    titleMuted: 'De l’interface à la mise en production.',
    methods: 'Scrum et Kanban au quotidien. Je participe aux cérémonies et j’en anime certaines.',
    request: 'requête',
    response: 'réponse',
    layers: layersFor('fr'),
  },
  close: {
    title: 'Télécharger mon CV',
    lead: 'Ou écrivez-moi à l’adresse ci-dessous : je réponds à chaque message.',
  },
  footer: {
    lede: 'Développeur web full-stack à Toulouse.',
    contact: 'Contact',
    sections: 'Sur cette page',
    trademarks: 'Les noms et logos de produits appartiennent à leurs propriétaires.',
    built: 'Site construit avec Angular et Tailwind CSS.',
  },
};

const EN: PortfolioContent = {
  ...SHARED,
  meta: {
    title: 'Julien Devienne-Ousmer — Full-Stack Web Developer (Symfony, Angular)',
    description:
      'Full-stack web developer in Toulouse, France: I built the Cerfrance Lot intranet on my own, used by 130 employees. PHP/Symfony, Angular, MySQL, Master’s in Software Engineering.',
  },
  skip: 'Skip to content',
  nav: [
    { id: 'intranet', label: 'Intranet' },
    { id: 'projets', label: 'Projects' },
    { id: 'parcours', label: 'Career' },
    { id: 'stack', label: 'Skills' },
  ],
  ui: {
    menu: 'Menu',
    langLabel: 'Language',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
  },
  photoAlt: 'Julien Devienne-Ousmer in a white T-shirt, smiling at the camera',
  hero: {
    notice: 'In a permanent role at Cerfrance Lot, open to a new position',
    title: 'Full-stack web developer in Toulouse',
    lead: 'I build intranets and business tools with Symfony and Angular. I built the latest one on my own: 130 employees open it every day.',
    ctaCv: 'Download my CV',
    ctaContact: 'Get in touch',
    floats: [
      { live: 'Permanent', when: 'Since July 2026', title: 'Full-stack developer, Cerfrance Lot' },
      { live: 'Intranet', when: 'Every day', title: 'Used by 130 employees' },
      { live: 'Quality', when: 'On every push', title: 'PHPUnit tests in GitLab CI' },
    ],
    facts: [
      { term: 'Experience', value: '4 years in industry' },
      { term: 'Degree', value: 'Master’s in Software Engineering' },
      { term: 'English', value: 'Fluent, TOEIC 795' },
    ],
  },
  intranet: {
    label: 'Intranet',
    title: 'An intranet for 130 employees.',
    titleMuted: 'Built on my own, from database to production.',
    lead: 'At Cerfrance Lot, an accounting firm, I owned all of it: the MySQL model, the Symfony code, the tests and the release to production.',
    points: [
      { term: 'Back end', value: 'PHP 8, Symfony, Doctrine, Twig' },
      { term: 'Data', value: 'A complex relational MySQL database' },
      { term: 'Quality', value: 'PHPUnit tests in GitLab CI/CD' },
      { term: 'Reach', value: 'Tools serving 3,000 client members' },
    ],
    diagram: {
      alt: 'The intranet links production tracking, entry statistics, client quotes, workload weighing, the FAQ and the news.',
      center: 'Intranet',
      spokes: spokes([
        'Production tracking',
        'Entry statistics',
        'Client quotes',
        'Workload weighing',
        'FAQ and news',
      ]),
    },
  },
  statement: {
    label: 'How I work',
    before: 'I would rather ship a simple tool that teams open',
    strong: 'every day',
    after:
      'than a brilliant demo nobody uses. So I listen to the business, I test, and I deliver in small steps.',
  },
  projects: {
    label: 'Projects',
    title: 'Three more projects, two in-house.',
    roleLabel: 'My role',
    toolsLabel: 'Tools:',
    items: [
      {
        title: 'Accounting workload tool',
        kind: 'Internal project, Cerfrance Lot',
        description:
          'It measures accounting workload: time per client file, productivity indicators and statistics for managers.',
        role: 'Gathered needs with the teams, built it and shipped it.',
        tools: [T.symfony, T.mysql, T.php],
      },
      {
        title: 'Legacy intranet modernisation',
        kind: 'Internal project, Cerfrance Lot',
        description:
          'A framework-less legacy intranet: new architecture, maintainable code, better performance, with no service downtime.',
        role: 'Analysed the existing code and refactored it step by step.',
        tools: [T.php, T.mysql, T.git],
      },
      {
        title: 'Fighter Stats',
        kind: 'School project',
        description:
          'An app about the UFC: rankings, fighter statistics and weight classes, on phone and desktop alike.',
        role: 'Angular front end and Scrum project management.',
        tools: [T.angular, T.typescript, T.tailwind],
      },
    ],
  },
  path: {
    label: 'Career',
    title: 'Four years at Cerfrance Lot, from work-study to a permanent role.',
    work: 'Experience',
    education: 'Education',
    languages: 'Languages',
    jobs: [
      { period: 'Since Jul 2026', title: 'Full-stack web developer', org: 'Permanent' },
      { period: '2025 — 2026', title: 'Full-stack web developer', org: 'Fixed-term, Sep–Dec then Apr–Jun' },
      { period: '2023 — 2025', title: 'Built the intranet', org: 'Work-study' },
      { period: '2022 — 2023', title: 'Modernised the legacy intranet', org: 'Work-study' },
    ],
    schools: [
      { period: '2023 — 2025', title: 'Master’s in Software Engineering', org: 'IPI Blagnac' },
      { period: '2022 — 2023', title: 'Professional Bachelor’s, APSIO', org: 'IUT de Blagnac' },
      { period: '2020 — 2022', title: 'Technical degree in Computer Science', org: 'IUT Paul Sabatier' },
    ],
    spoken: [
      { term: 'French', value: 'Native' },
      { term: 'English', value: 'Fluent, TOEIC 795/990' },
    ],
  },
  stack: {
    label: 'Skills',
    title: 'My stack, layer by layer.',
    titleMuted: 'From the interface to production.',
    methods: 'Scrum and Kanban day to day. I take part in the ceremonies and facilitate some of them.',
    request: 'request',
    response: 'response',
    layers: layersFor('en'),
  },
  close: {
    title: 'Download my CV',
    lead: 'Or write to me at the address below: I answer every message.',
  },
  footer: {
    lede: 'Full-stack web developer in Toulouse, France.',
    contact: 'Contact',
    sections: 'On this page',
    trademarks: 'Product names and logos are trademarks of their owners.',
    built: 'Built with Angular and Tailwind CSS.',
  },
};

export const PORTFOLIO_I18N: Record<Lang, PortfolioContent> = { fr: FR, en: EN };

export const PHOTO = { webp: 'photo.webp', jpg: 'photo.jpg' };

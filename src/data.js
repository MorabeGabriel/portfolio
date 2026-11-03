// Edit your content here. The page rebuilds itself from this file.
export const profile = {
  name: 'Gabriel M. Morabe',
  short: 'Gabriel',
  field: 'Computer Science',
  location: 'Angeles City, Pampanga',
  email: 'morabegab@gmail.com',
  github: 'https://github.com/MorabeGabriel',
  cvUrl: 'https://drive.google.com/file/d/1rLZoEKC8-WjeeNuA0LdGmkVnXD6cMAPc/view?usp=sharing', // paste a public link to your CV PDF here and a "Download CV" button appears
  intro:
    'I build full-stack web apps with React, Node.js and PostgreSQL, and I use AI tools to plan, build, test and debug them. I’m looking for an OJT placement in software or web development for my 2nd semester.',
  status: 'OJT / internship',
  statusRest: 'in software or web development',
  about: [
    'Hello, I’m Gabriel, a 4th-year BS Computer Science student at Holy Angel University in Angeles City, Pampanga.',
    'I’m a fast, resourceful learner. I work on real projects, from a full-stack web app to a thesis system, and I use AI tools to plan, build, test and debug them. I bring problem-solving, clear communication and a strong willingness to learn from a real engineering team.',
    'Languages: Kapampangan, Tagalog, English.',
  ],
  contactText:
    'I’m looking for an OJT or internship placement in software or web development for my 2nd semester. If you have an opening or want to talk about my work, send me a message.',
}

export const projects = [
  {
    title: 'JobFinder',
    image: '/images/jobfinder.jpg',
    alt: 'JobFinder home page with the headline Your skills. Your place. Your next job. and a job search bar',
    stack: 'Ontology graph, Dijkstra’s algorithm, web app',
    summary:
      'Undergraduate thesis (group project): ontology-based skill and geographic accessibility matching for opportunity recommendation. Defended September 2026.',
    bullets: [
      'Matches job seekers and employers with an ontology-based skill graph, so related skills count as partial matches instead of exact keywords only.',
      'Ranks jobs by distance with Dijkstra’s algorithm on a weighted road-network graph covering all 33 barangays.',
      'Combines both into one ranking score (70% skill match, 30% geographic accessibility) and works on desktop and mobile browsers.',
    ],
    links: [{ label: 'Live site', href: 'https://jobfinderangeles.site', primary: true }],
  },
  {
    title: 'Shiori',
    image: '/images/shiori.jpg',
    alt: 'Shiori library page showing game cards with status tags for completed, playing and backlog',
    stack: 'React, Vite, Tailwind CSS, Express, PostgreSQL',
    summary:
      'Game backlog tracker and final project for my React course. A full-stack web app built with AI assistance.',
    bullets: [
      'Scoped and designed the app: feature planning, wireframes, component tree and a dark-theme design system.',
      'Directed AI-assisted development of the library grid, game detail page, add/edit form and status tracking.',
      'Reviewed and tested the REST API end-to-end against a real PostgreSQL database, and switched setup from Docker to native PostgreSQL to fix blockers.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/MorabeGabriel/shiorii' }],
  },
  {
    title: 'mediGO',
    stack: 'Flutter, Dart',
    summary:
      'A Flutter app for finding nearby hospitals, clinics and pharmacies in Angeles City, Pampanga. A front-end prototype that runs on phones and in the browser, using sample data.',
    bullets: [
      'Search by facility name, address, type or service, and filter by hospital, clinic or pharmacy, with results sorted nearest first.',
      'Facility details show rating, distance, estimated wait, open or closed and 24-hour status, and the full list of services.',
      'Call a facility from the phone dialer or open turn-by-turn directions in Google Maps.',
      'Includes a login screen with form validation, and widget tests for the login, search and filter flows.',
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/MorabeGabriel/medi-go' }],
  },
  {
    title: 'Retro Rewind',
    image: '/images/retro-rewind.jpg',
    alt: 'Retro Rewind home page with a vintage Polaroid camera and the shop navigation',
    stack: 'Web app, deployed on Vercel',
    summary:
      'An online shop for restored vintage cameras, turntables and cassette players.',
    bullets: [],
    links: [{ label: 'Live site', href: 'https://retro-rewind-iota.vercel.app', primary: true }],
  },
]

export const skills = [
  { title: 'Languages and frameworks', items: 'JavaScript, Python, React, Vite, Tailwind CSS, Node.js, Express' },
  { title: 'Database and tools', items: 'PostgreSQL, pgAdmin, REST APIs, Git and GitHub, VS Code, Canva' },
  { title: 'AI-assisted engineering', items: 'Claude: prompting, code review, debugging, and testing AI-generated code' },
  { title: 'Concepts', items: 'Graph algorithms (Dijkstra’s), ontology-based matching, networking fundamentals, data analytics (Excel, SQL, Tableau), statistics' },
]

export const certifications = [
  { title: 'Builds Full-Stack JavaScript and AI', issuer: 'Holy Angel University, School of Computing', date: 'Nov 2026', href: 'https://tjakoen.github.io/b/1f355428f4a01ba6' },
  { title: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy (CICT, HAU)', date: 'Jun 2025', href: 'https://www.credly.com/users/gabriel-morabe/badges' },
  { title: 'AI Fundamentals with IBM SkillsBuild', issuer: 'Cisco Networking Academy / IBM', date: 'Feb 2026', href: 'https://www.credly.com/users/gabriel-morabe/badges' },
  { title: 'Data Analytics Essentials', issuer: 'Cisco Networking Academy (HAU School of Computing)', date: 'Mar 2026', href: 'https://www.credly.com/users/gabriel-morabe/badges' },
  { title: 'Legacy Responsive Web Design V8', issuer: 'freeCodeCamp, about 300 hours', date: 'Sep 2024', href: 'https://www.freecodecamp.org/certification/morabegab/responsive-web-design' },
]

export const education = [
  { title: 'BS Computer Science, Holy Angel University', note: '2023 to present, 4th year' },
  { title: 'Senior High School, Holy Angel University', note: '2017 to 2023, graduated May 2023 with honors' },
]

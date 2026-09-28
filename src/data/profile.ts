export const profile = {
  name: 'Arjun P K',
  role: 'Software engineer',
  focus: ['.NET', 'Azure', 'SaaS', 'Integrations'],
  headline:
    'I build secure, scalable software systems for banking, fintech, education, payroll and modern digital products.',
  statement:
    'I build production-grade applications and integration-heavy systems using .NET, Azure, SQL Server and modern frontend technologies — from multi-tenant SaaS platforms and payment infrastructure to education, payroll and marketplace systems.',
  bio: [
    'I studied mechanical engineering, started my career in data operations, and moved into software at Infosys in December 2021 — delivering C# and ASP.NET Core features, SQL Server data work and production support for enterprise clients, and working with Azure integration services along the way.',
    'Since August 2025 I have been at Tecnostac, building modules across five enterprise platforms: cooperative core banking, education, vacation rental, church finance and HR/payroll. Outside work I design and ship my own products; four of them are live.',
  ],
  location: 'Kerala, India',
  email: 'aryanarju26@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arjun-p-k-77604912a/',
  linkedinLabel: 'linkedin.com/in/arjun-p-k-77604912a',
  github: 'https://github.com/coder-arjun',
  githubLabel: 'github.com/coder-arjun',
} as const;

/** Supported by the résumé: 5+ years (Jan 2020 – present), five Tecnostac platforms, four live products,
 *  and nine-country localization shipped in Edustac. */
export const impactMetrics = [
  { value: '5+', label: 'Years of professional experience' },
  { value: '5', label: 'Enterprise platforms at Tecnostac' },
  { value: '4', label: 'Independent products, all live' },
  { value: '9', label: 'Countries covered by localization I built' },
] as const;

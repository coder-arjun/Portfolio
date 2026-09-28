export type Role = {
  company: string;
  location: string;
  title: string;
  period: string;
  summary: string;
  points: string[];
  /** Case-study slugs to link from this role. */
  work?: string[];
};

export const experience: Role[] = [
  {
    company: 'Tecnostac Pvt. Ltd.',
    location: 'Ernakulam, India',
    title: 'Software Engineer',
    period: 'Aug 2025 – Present',
    summary:
      'Develop and own enterprise modules across five .NET 9/10 platforms spanning cooperative banking, education, vacation rental, church finance and HR/payroll.',
    points: [
      'Multi-tenant SaaS architecture, payment integrations, financial ledgers and rules engines.',
      'AI-assisted agentic development workflows on PayStacGlobal, Edustac and VoyStac.',
    ],
    work: ['cobankpluspro', 'edustac', 'voystac', 'churchyetu', 'paystacglobal'],
  },
  {
    company: 'Infosys Ltd.',
    location: 'Trivandrum, India',
    title: 'Technology Analyst',
    period: 'Dec 2021 – Jul 2025',
    summary:
      'Full-stack C# and ASP.NET Core delivery for enterprise clients, SQL Server data operations and L2 production support, working with Azure Logic Apps, Function Apps, Data Factory, Event Hubs, Service Bus and API Management.',
    points: [
      'Fulfilled 200+ data change requests a quarter with T-SQL, within SLAs.',
      'Automated report tracking and distribution with Selenium and Jenkins, saving an estimated 24+ hours a week.',
      'Monitored application health through Azure dashboards, sustaining 99.5%+ uptime for client-facing services.',
    ],
  },
  {
    company: 'Greet Tech. Pvt. Ltd.',
    location: 'Bangalore, India',
    title: 'Data Operations Analyst',
    period: 'Jan 2020 – Aug 2021',
    summary: 'High-volume lead data operations in the company CRM, keeping accuracy above 99%.',
    points: [],
  },
];

export const education = {
  degree: 'B.Tech in Mechanical Engineering',
  school: 'APJ Abdul Kalam Kerala Technological University',
  period: '2015 – 2019',
};

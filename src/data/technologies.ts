/** "What I build" — six capability areas, each grounded in the résumé. */
export const capabilities = [
  {
    id: 'backend',
    title: 'Backend systems',
    body: 'APIs and business modules for multi-tenant enterprise platforms.',
    items: ['ASP.NET Core', 'Web API', 'EF Core', 'REST'],
  },
  {
    id: 'cloud',
    title: 'Cloud & integration',
    body: 'Azure integration services, from workflows to messaging and API gateways.',
    items: ['Azure Functions', 'Logic Apps', 'ADF', 'Service Bus', 'Event Hubs', 'APIM'],
  },
  {
    id: 'data',
    title: 'Data',
    body: 'Transactional schemas, migrations and SQL for financial and operational data.',
    items: ['SQL Server', 'T-SQL', 'Cosmos DB', 'Data modeling'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    body: 'Systems with clear boundaries: layers, bounded contexts and tenant isolation.',
    items: ['Clean Architecture', 'CQRS', 'Multi-tenancy', 'Modular systems'],
  },
  {
    id: 'security',
    title: 'Security',
    body: 'Authentication, encryption and hardening built in from the start.',
    items: ['JWT', 'OAuth', 'RBAC', 'Encryption', 'Rate limiting', 'Security headers'],
  },
  {
    id: 'payments',
    title: 'Payments',
    body: 'Mobile-money and gateway integrations that post to a ledger exactly once.',
    items: ['M-Pesa', 'Airtel Money', 'KCB', 'Equity Bank', 'Razorpay'],
  },
] as const;

/** Full technical expertise for the About page — mirrors the résumé's skills section. */
export const expertise = [
  { group: 'Languages & .NET', items: ['C#', 'ASP.NET Core', 'MVC', 'Web API', 'Razor Pages', 'Entity Framework Core', 'REST APIs'] },
  { group: 'Azure & integration', items: ['Logic Apps', 'Function Apps', 'Data Factory', 'Event Hubs', 'Service Bus', 'API Management', 'Azure monitoring'] },
  { group: 'Databases', items: ['SQL Server', 'T-SQL', 'Cosmos DB', 'Database design', 'Data migration', 'Performance tuning'] },
  { group: 'DevOps', items: ['CI/CD pipelines', 'Jenkins', 'GitHub Actions', 'Git', 'ARM templates'] },
  { group: 'Automation & testing', items: ['xUnit', 'Playwright', 'Selenium', 'Swagger/OpenAPI', 'Testcontainers'] },
  { group: 'Security & payments', items: ['ASP.NET Identity', 'JWT', 'OAuth', 'OTP recovery', 'RBAC', 'Rate limiting', 'Security headers', 'M-Pesa', 'Airtel Money', 'Equity Bank', 'USSD'] },
  { group: 'Architecture & practices', items: ['Clean Architecture', 'CQRS/MediatR', 'Microservices', 'Object-oriented design', 'Agile/Scrum', 'SDLC', 'L2 application support'] },
  { group: 'AI & LLM', items: ['Semantic Kernel', 'Ollama', 'LLM integration', 'AI-assisted development'] },
] as const;

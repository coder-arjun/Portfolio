import type { DiagramSpec } from '../types';

/*
 * Every professional-work diagram is simplified and representative — it shows the shape of the
 * system, not its production topology. Coordinates are node centres in viewBox units.
 */

// ── Hero: how a request moves through the systems I build ─────────────────────
export const heroSystem: DiagramSpec = {
  width: 500,
  height: 430,
  minWidth: 420,
  title: 'System architecture overview',
  description:
    'Clients connect to an API and web layer, which routes work to payments, events and background workers; all three persist to shared data and services.',
  nodes: [
    { id: 'clients', label: 'Clients', sub: 'web · mobile · USSD', x: 250, y: 36, w: 190 },
    { id: 'api', label: 'API / Web', sub: 'ASP.NET Core', x: 250, y: 136, w: 200, tone: 'accent' },
    { id: 'payments', label: 'Payments', sub: 'mobile money · gateways', x: 86, y: 256, w: 158 },
    { id: 'events', label: 'Events', sub: 'outbox · queues', x: 250, y: 256, w: 136 },
    { id: 'workers', label: 'Workers', sub: 'jobs · notifications', x: 414, y: 256, w: 158 },
    { id: 'data', label: 'Data / Services', sub: 'SQL Server · Azure', x: 250, y: 380, w: 220, shape: 'store' },
  ],
  edges: [
    { from: 'clients', to: 'api' },
    { from: 'api', to: 'payments' },
    { from: 'api', to: 'events' },
    { from: 'api', to: 'workers' },
    { from: 'payments', to: 'data' },
    { from: 'events', to: 'data' },
    { from: 'workers', to: 'data' },
  ],
};

/** Narrow-screen version of the hero diagram: same topology, sized to render 1:1 on a phone. */
export const heroSystemCompact: DiagramSpec = {
  width: 340,
  height: 400,
  title: heroSystem.title,
  description: heroSystem.description,
  nodes: [
    { id: 'clients', label: 'Clients', sub: 'web · mobile · USSD', x: 170, y: 34, w: 200 },
    { id: 'api', label: 'API / Web', sub: 'ASP.NET Core', x: 170, y: 124, w: 220, tone: 'accent' },
    { id: 'payments', label: 'Payments', x: 60, y: 232, w: 104, h: 40 },
    { id: 'events', label: 'Events', x: 170, y: 232, w: 96, h: 40 },
    { id: 'workers', label: 'Workers', x: 280, y: 232, w: 104, h: 40 },
    { id: 'data', label: 'Data / Services', sub: 'SQL Server · Azure', x: 170, y: 350, w: 220, shape: 'store' },
  ],
  edges: heroSystem.edges,
};

// ── Card thumbnails (one per case study) ──────────────────────────────────────
const thumb = { width: 300, height: 190 } as const;

export const cobankThumb: DiagramSpec = {
  ...thumb,
  title: 'CobankPlusPro tenancy model',
  description: 'A control database drives tenant provisioning, which creates a separate database for each tenant.',
  nodes: [
    { id: 'control', label: 'Control DB', x: 150, y: 26, w: 120, h: 32, shape: 'store' },
    { id: 'prov', label: 'Provisioning', x: 150, y: 94, w: 130, h: 32, tone: 'accent' },
    { id: 'a', label: 'Tenant A', x: 58, y: 162, w: 88, h: 32, shape: 'store' },
    { id: 'b', label: 'Tenant B', x: 150, y: 162, w: 88, h: 32, shape: 'store' },
    { id: 'c', label: 'Tenant C', x: 242, y: 162, w: 88, h: 32, shape: 'store' },
  ],
  edges: [
    { from: 'control', to: 'prov' },
    { from: 'prov', to: 'a' },
    { from: 'prov', to: 'b' },
    { from: 'prov', to: 'c' },
  ],
};

export const edustacThumb: DiagramSpec = {
  ...thumb,
  title: 'Edustac shared rule engine',
  description: 'Examinations, promotion and timetabling modules share one tenant-configurable rule engine backed by a database per organization.',
  nodes: [
    { id: 'exams', label: 'Exams', x: 56, y: 26, w: 88, h: 32 },
    { id: 'promo', label: 'Promotion', x: 150, y: 26, w: 88, h: 32 },
    { id: 'time', label: 'Timetable', x: 244, y: 26, w: 88, h: 32 },
    { id: 'rules', label: 'Rule engine', x: 150, y: 94, w: 130, h: 32, tone: 'accent' },
    { id: 'db', label: 'Org databases', x: 150, y: 162, w: 140, h: 32, shape: 'store' },
  ],
  edges: [
    { from: 'exams', to: 'rules' },
    { from: 'promo', to: 'rules' },
    { from: 'time', to: 'rules' },
    { from: 'rules', to: 'db' },
  ],
};

export const voystacThumb: DiagramSpec = {
  ...thumb,
  title: 'VoyStac settlement flow',
  description: 'A booking is settled only after check-in is verified; settlement then posts to the ledger and releases the owner payout.',
  nodes: [
    { id: 'booking', label: 'Booking', x: 150, y: 22, w: 110, h: 30 },
    { id: 'checkin', label: 'Check-in verified', x: 150, y: 72, w: 150, h: 30 },
    { id: 'settle', label: 'Settlement', x: 150, y: 122, w: 120, h: 30, tone: 'accent' },
    { id: 'ledger', label: 'Ledger', x: 78, y: 170, w: 100, h: 30, shape: 'store' },
    { id: 'payout', label: 'Owner payout', x: 222, y: 170, w: 116, h: 30 },
  ],
  edges: [
    { from: 'booking', to: 'checkin' },
    { from: 'checkin', to: 'settle' },
    { from: 'settle', to: 'ledger' },
    { from: 'settle', to: 'payout' },
  ],
};

export const churchyetuThumb: DiagramSpec = {
  ...thumb,
  title: 'Churchyetu payment fan-in',
  description: 'M-Pesa, Airtel Money, KCB and Equity Bank payments converge on one integration layer that posts to the ledger.',
  nodes: [
    { id: 'mpesa', label: 'M-Pesa', x: 40, y: 26, w: 68, h: 32 },
    { id: 'airtel', label: 'Airtel', x: 113, y: 26, w: 64, h: 32 },
    { id: 'kcb', label: 'KCB', x: 187, y: 26, w: 60, h: 32 },
    { id: 'equity', label: 'Equity', x: 260, y: 26, w: 68, h: 32 },
    { id: 'layer', label: 'Integration layer', x: 150, y: 94, w: 160, h: 32, tone: 'accent' },
    { id: 'ledger', label: 'Ledger', x: 150, y: 162, w: 110, h: 32, shape: 'store' },
  ],
  edges: [
    { from: 'mpesa', to: 'layer' },
    { from: 'airtel', to: 'layer' },
    { from: 'kcb', to: 'layer' },
    { from: 'equity', to: 'layer' },
    { from: 'layer', to: 'ledger' },
  ],
};

export const paystacThumb: DiagramSpec = {
  ...thumb,
  title: 'PayStacGlobal country calculators',
  description: 'A payroll run resolves pay components, then applies the India or Kenya statutory calculator.',
  nodes: [
    { id: 'run', label: 'Payroll run', x: 150, y: 26, w: 120, h: 32 },
    { id: 'calc', label: 'Country calculator', x: 150, y: 94, w: 164, h: 32, tone: 'accent' },
    { id: 'in', label: 'India', x: 92, y: 162, w: 92, h: 32 },
    { id: 'ke', label: 'Kenya', x: 208, y: 162, w: 92, h: 32 },
  ],
  edges: [
    { from: 'run', to: 'calc' },
    { from: 'calc', to: 'in' },
    { from: 'calc', to: 'ke' },
  ],
};

// Product card thumbnails, following the shapes sketched in the portfolio brief.
export const daypilotThumb: DiagramSpec = {
  width: 300,
  height: 226,
  title: 'DayPilot architecture',
  description:
    'DayPilot has an ASP.NET Core API and a React Native app. The API uses JWT and Hangfire and hosts a Semantic Kernel assistant; the app receives Firebase Cloud Messaging notifications.',
  nodes: [
    { id: 'dp', label: 'DayPilot', x: 150, y: 20, w: 110, h: 30, tone: 'accent' },
    { id: 'api', label: 'ASP.NET Core API', x: 82, y: 84, w: 136, h: 30 },
    { id: 'rn', label: 'React Native', x: 228, y: 84, w: 116, h: 30 },
    { id: 'jwt', label: 'JWT / Hangfire', x: 82, y: 144, w: 136, h: 30 },
    { id: 'fcm', label: 'FCM', x: 228, y: 144, w: 80, h: 30 },
    { id: 'sk', label: 'Semantic Kernel', x: 82, y: 204, w: 136, h: 30 },
  ],
  edges: [
    { from: 'dp', to: 'api' },
    { from: 'dp', to: 'rn' },
    { from: 'api', to: 'jwt' },
    { from: 'rn', to: 'fcm' },
    { from: 'jwt', to: 'sk' },
  ],
};

export const opbtThumb: DiagramSpec = {
  width: 300,
  height: 226,
  title: 'OPBT architecture',
  description:
    'A React PWA calls an ASP.NET Core API secured with JWT and rate limiting; inside it, MediatR CQRS handlers call a deterministic domain engine, following Clean Architecture.',
  nodes: [
    { id: 'pwa', label: 'React PWA', x: 150, y: 20, w: 120, h: 30 },
    { id: 'api', label: 'ASP.NET Core API', sub: 'JWT · rate limiting', x: 150, y: 82, w: 176, h: 42, tone: 'accent' },
    { id: 'app', label: 'MediatR / CQRS', x: 150, y: 146, w: 150, h: 30 },
    { id: 'domain', label: 'Domain engine', x: 150, y: 204, w: 150, h: 30 },
  ],
  edges: [
    { from: 'pwa', to: 'api' },
    { from: 'api', to: 'app' },
    { from: 'app', to: 'domain' },
  ],
};

// ── Case-study architecture (representative, not production topology) ───────
export const cobankLayers: DiagramSpec = {
  width: 640,
  height: 400,
  minWidth: 560,
  title: 'CobankPlusPro application layers',
  description:
    'An ASP.NET Core MVC web UI and a Web API share a business layer and a data layer; the data layer reads a control database and one database per tenant.',
  nodes: [
    { id: 'web', label: 'ASP.NET Core MVC', sub: 'web UI', x: 200, y: 36, w: 190 },
    { id: 'api', label: 'Web API', sub: 'REST', x: 440, y: 36, w: 170 },
    { id: 'biz', label: 'Business layer', sub: 'booking · KYC · loans', x: 320, y: 128, w: 220 },
    { id: 'data', label: 'Data layer', sub: 'repositories', x: 320, y: 220, w: 190 },
    { id: 'control', label: 'Control database', sub: 'tenants · configuration', x: 200, y: 350, w: 210, shape: 'store' },
    { id: 'tenants', label: 'Tenant databases', sub: 'one per institution', x: 440, y: 350, w: 200, shape: 'store' },
  ],
  edges: [
    { from: 'web', to: 'biz' },
    { from: 'api', to: 'biz' },
    { from: 'biz', to: 'data' },
    { from: 'data', to: 'control' },
    { from: 'data', to: 'tenants' },
  ],
};

export const cobankTenancy: DiagramSpec = {
  width: 640,
  height: 330,
  minWidth: 560,
  title: 'CobankPlusPro tenancy model',
  description:
    'The control database holds the institution registry and configuration. Tenant provisioning places each institution on a database pool and creates its own tenant database.',
  nodes: [
    { id: 'control', label: 'Control database', sub: 'institution registry', x: 320, y: 36, w: 220, shape: 'store' },
    { id: 'prov', label: 'Tenant provisioning', sub: 'placement · configuration', x: 320, y: 138, w: 240, tone: 'accent' },
    { id: 'a', label: 'Tenant A', sub: 'database', x: 150, y: 280, w: 150, shape: 'store' },
    { id: 'b', label: 'Tenant B', sub: 'database', x: 320, y: 280, w: 150, shape: 'store' },
    { id: 'c', label: 'Tenant C', sub: 'database', x: 490, y: 280, w: 150, shape: 'store' },
  ],
  edges: [
    { from: 'control', to: 'prov' },
    { from: 'prov', to: 'a' },
    { from: 'prov', to: 'b' },
    { from: 'prov', to: 'c' },
  ],
};

export const edustacArch: DiagramSpec = {
  width: 660,
  height: 440,
  minWidth: 580,
  title: 'Edustac module architecture',
  description:
    'A Blazor UI calls ASP.NET Core with MediatR handlers, which dispatch to the examinations, academics, promotion and timetabling modules. Promotion and timetabling use the shared rule engine; examinations publishes through the event outbox and uses the governed AI gateway. Data lives in a database per organization.',
  nodes: [
    { id: 'ui', label: 'Blazor UI', sub: 'per-tenant portals', x: 330, y: 36, w: 190 },
    { id: 'api', label: 'ASP.NET Core', sub: 'MediatR handlers', x: 330, y: 122, w: 200, tone: 'accent' },
    { id: 'exams', label: 'Examinations', x: 90, y: 216, w: 140, h: 40 },
    { id: 'acad', label: 'Academics', x: 250, y: 216, w: 140, h: 40 },
    { id: 'promo', label: 'Promotion', x: 410, y: 216, w: 140, h: 40 },
    { id: 'time', label: 'Timetabling', x: 570, y: 216, w: 140, h: 40 },
    { id: 'ai', label: 'AI gateway', sub: 'kill switch · registry', x: 110, y: 310, w: 180 },
    { id: 'outbox', label: 'Event outbox', sub: 'transactional', x: 300, y: 310, w: 160 },
    { id: 'rules', label: 'Rule engine', sub: 'tenant JSON rules', x: 500, y: 310, w: 180 },
    { id: 'db', label: 'Database per organization', x: 330, y: 400, w: 260, h: 40, shape: 'store' },
  ],
  edges: [
    { from: 'ui', to: 'api' },
    { from: 'api', to: 'exams' },
    { from: 'api', to: 'acad' },
    { from: 'api', to: 'promo' },
    { from: 'api', to: 'time' },
    { from: 'exams', to: 'ai' },
    { from: 'exams', to: 'outbox' },
    { from: 'promo', to: 'rules' },
    { from: 'time', to: 'rules' },
    { from: 'outbox', to: 'db' },
    { from: 'rules', to: 'db' },
  ],
};

export const voystacArch: DiagramSpec = {
  width: 640,
  height: 400,
  minWidth: 560,
  title: 'VoyStac modular monolith',
  description:
    'A React 19 storefront calls a .NET 10 Web API structured as a modular monolith. The settlement, property-and-owners and community contexts each own a schema in SQL Server; settlement releases payouts through Razorpay Route.',
  nodes: [
    { id: 'store', label: 'React 19 storefront', sub: 'TypeScript · Vite', x: 320, y: 36, w: 220 },
    { id: 'api', label: '.NET 10 Web API', sub: 'modular monolith', x: 320, y: 126, w: 220, tone: 'accent' },
    { id: 'settle', label: 'Settlement', sub: 'ledger · payouts', x: 120, y: 226, w: 170 },
    { id: 'owners', label: 'Property & owners', sub: 'KYC · pricing', x: 320, y: 226, w: 180 },
    { id: 'community', label: 'Community', sub: 'Q&A · trip circles', x: 520, y: 226, w: 170 },
    { id: 'razorpay', label: 'Razorpay Route', x: 120, y: 350, w: 170, h: 40, tone: 'quiet' },
    { id: 'db', label: 'SQL Server', sub: 'schema per context', x: 410, y: 350, w: 220, shape: 'store' },
  ],
  edges: [
    { from: 'store', to: 'api' },
    { from: 'api', to: 'settle' },
    { from: 'api', to: 'owners' },
    { from: 'api', to: 'community' },
    { from: 'settle', to: 'razorpay', quiet: true },
    { from: 'settle', to: 'db' },
    { from: 'owners', to: 'db' },
    { from: 'community', to: 'db' },
  ],
};

export const churchyetuArch: DiagramSpec = {
  width: 660,
  height: 440,
  minWidth: 580,
  title: 'Churchyetu payment integration and notifications',
  description:
    'M-Pesa, Airtel Money, KCB and Equity Bank callbacks enter one integration layer, pass signature verification and idempotent double-entry posting, and land in the member ledger or, if unmatched, a suspense account. Posted payments queue receipts for a worker service that sends SMS, push and email.',
  nodes: [
    { id: 'mpesa', label: 'M-Pesa', sub: 'C2B · STK Push', x: 90, y: 36, w: 140 },
    { id: 'airtel', label: 'Airtel Money', sub: 'via IntaSend', x: 250, y: 36, w: 140 },
    { id: 'kcb', label: 'KCB', sub: 'Buni STK · IPN', x: 410, y: 36, w: 140 },
    { id: 'equity', label: 'Equity Bank', sub: 'biller webhooks', x: 570, y: 36, w: 140 },
    { id: 'layer', label: 'Integration layer', sub: 'tokens · routing', x: 330, y: 132, w: 220, tone: 'accent' },
    { id: 'verify', label: 'Signature check', sub: 'RSA · HMAC', x: 330, y: 218, w: 200 },
    { id: 'post', label: 'Idempotent posting', sub: 'double entry', x: 330, y: 304, w: 200 },
    { id: 'queue', label: 'Receipt queue', sub: 'prioritized', x: 560, y: 304, w: 160 },
    { id: 'ledger', label: 'Member ledger', x: 200, y: 400, w: 160, h: 40, shape: 'store' },
    { id: 'suspense', label: 'Suspense account', x: 400, y: 400, w: 160, h: 40, shape: 'store', tone: 'quiet' },
    { id: 'worker', label: 'Worker service', x: 572, y: 400, w: 150, h: 40 },
  ],
  edges: [
    { from: 'mpesa', to: 'layer' },
    { from: 'airtel', to: 'layer' },
    { from: 'kcb', to: 'layer' },
    { from: 'equity', to: 'layer' },
    { from: 'layer', to: 'verify' },
    { from: 'verify', to: 'post' },
    { from: 'post', to: 'ledger' },
    { from: 'post', to: 'suspense', quiet: true },
    { from: 'post', to: 'queue' },
    { from: 'queue', to: 'worker' },
  ],
};

export const paystacArch: DiagramSpec = {
  width: 640,
  height: 420,
  minWidth: 560,
  title: 'PayStacGlobal payroll and leave architecture',
  description:
    'ASP.NET Core MVC dispatches through MediatR to the payroll engine and to leave approval. Payroll applies India or Kenya statutory calculators; leave approval escalates through an hourly Hangfire job. Data lives in SQL Server with Redis caching.',
  nodes: [
    { id: 'ui', label: 'ASP.NET Core MVC', sub: 'per-tenant', x: 320, y: 36, w: 210 },
    { id: 'cqrs', label: 'MediatR', sub: 'commands · queries', x: 320, y: 124, w: 200, tone: 'accent' },
    { id: 'payroll', label: 'Payroll engine', sub: 'pay components', x: 180, y: 218, w: 190 },
    { id: 'leave', label: 'Leave approval', sub: 'planner · router', x: 480, y: 218, w: 190 },
    { id: 'in', label: 'India rules', x: 90, y: 306, w: 130, h: 40 },
    { id: 'ke', label: 'Kenya rules', x: 250, y: 306, w: 130, h: 40 },
    { id: 'job', label: 'Escalation job', sub: 'Hangfire · hourly', x: 480, y: 306, w: 190 },
    { id: 'db', label: 'SQL Server · Redis', x: 320, y: 390, w: 220, h: 40, shape: 'store' },
  ],
  edges: [
    { from: 'ui', to: 'cqrs' },
    { from: 'cqrs', to: 'payroll' },
    { from: 'cqrs', to: 'leave' },
    { from: 'payroll', to: 'in' },
    { from: 'payroll', to: 'ke' },
    { from: 'leave', to: 'job' },
    { from: 'in', to: 'db' },
    { from: 'ke', to: 'db' },
    { from: 'job', to: 'db' },
  ],
};

// ── Independent products (my own, public code — real architecture) ───────────
export const cinoraArch: DiagramSpec = {
  width: 680,
  height: 420,
  minWidth: 580,
  title: 'Cinora architecture',
  description:
    'The browser talks to the Cinora.Web MVC app and its SignalR hubs. Web depends on the Application layer, which depends on the Domain. Infrastructure implements Application ports for SQL Server, the TMDB API and the local Ollama model.',
  nodes: [
    { id: 'browser', label: 'Browser', sub: 'Razor · HTMX · PWA', x: 340, y: 36, w: 210 },
    { id: 'web', label: 'Cinora.Web', sub: 'MVC · SignalR hubs', x: 340, y: 122, w: 210, tone: 'accent' },
    { id: 'app', label: 'Application', sub: 'mediator · validation', x: 340, y: 208, w: 210 },
    { id: 'domain', label: 'Domain', sub: 'entities · rules', x: 190, y: 294, w: 170 },
    { id: 'infra', label: 'Infrastructure', sub: 'EF Core · Hangfire · push', x: 490, y: 294, w: 210 },
    { id: 'sql', label: 'SQL Server', x: 330, y: 384, w: 130, h: 40, shape: 'store' },
    { id: 'tmdb', label: 'TMDB API', x: 480, y: 384, w: 120, h: 40, tone: 'quiet' },
    { id: 'ollama', label: 'Ollama LLM', x: 616, y: 384, w: 116, h: 40, tone: 'quiet' },
  ],
  edges: [
    { from: 'browser', to: 'web' },
    { from: 'web', to: 'app' },
    { from: 'app', to: 'domain' },
    { from: 'app', to: 'infra' },
    { from: 'infra', to: 'sql' },
    { from: 'infra', to: 'tmdb', quiet: true },
    { from: 'infra', to: 'ollama', quiet: true },
  ],
};

export const daypilotArch: DiagramSpec = {
  width: 680,
  height: 300,
  minWidth: 560,
  title: 'DayPilot architecture',
  description:
    'A web app and a React Native Android app share one ASP.NET Core 10 backend, which serves MVC pages and a JWT REST API, persists to SQL Server, runs Hangfire jobs, hosts a Semantic Kernel assistant and delivers push through Web Push and Firebase Cloud Messaging.',
  nodes: [
    { id: 'web', label: 'Web app', sub: 'MVC · PWA', x: 220, y: 36, w: 180 },
    { id: 'android', label: 'Android app', sub: 'React Native · Expo', x: 460, y: 36, w: 200 },
    { id: 'api', label: 'ASP.NET Core 10', sub: 'MVC + JWT REST API', x: 340, y: 132, w: 240, tone: 'accent' },
    { id: 'db', label: 'SQL Server', x: 100, y: 250, w: 150, h: 42, shape: 'store' },
    { id: 'jobs', label: 'Hangfire', sub: 'recurring jobs', x: 265, y: 250, w: 150 },
    { id: 'sk', label: 'Semantic Kernel', sub: 'AI assistant', x: 430, y: 250, w: 160 },
    { id: 'push', label: 'Push delivery', sub: 'Web Push · FCM', x: 595, y: 250, w: 150 },
  ],
  edges: [
    { from: 'web', to: 'api' },
    { from: 'android', to: 'api' },
    { from: 'api', to: 'db' },
    { from: 'api', to: 'jobs' },
    { from: 'api', to: 'sk' },
    { from: 'api', to: 'push' },
  ],
};

export const finomaArch: DiagramSpec = {
  width: 640,
  height: 340,
  minWidth: 560,
  title: 'Finoma architecture',
  description:
    'The browser uses an ASP.NET Core 10 MVC app with Identity. Services for financial analysis, statements, exports and isolated event budgets sit behind it, all persisting to SQL Server in Finoma’s own schema.',
  nodes: [
    { id: 'browser', label: 'Browser', sub: 'Razor · PWA', x: 320, y: 36, w: 190 },
    { id: 'app', label: 'ASP.NET Core 10 MVC', sub: 'Identity · antiforgery', x: 320, y: 124, w: 240, tone: 'accent' },
    { id: 'analyzer', label: 'Analyzer', sub: 'insights', x: 90, y: 214, w: 140 },
    { id: 'statements', label: 'Statements', sub: 'QuestPDF · email', x: 245, y: 214, w: 140 },
    { id: 'exports', label: 'Exports', sub: 'CSV · Excel · PDF', x: 400, y: 214, w: 140 },
    { id: 'events', label: 'Event budgets', sub: 'isolated ledger', x: 555, y: 214, w: 140 },
    { id: 'db', label: 'SQL Server', sub: 'finoma schema', x: 320, y: 304, w: 200, shape: 'store' },
  ],
  edges: [
    { from: 'browser', to: 'app' },
    { from: 'app', to: 'analyzer' },
    { from: 'app', to: 'statements' },
    { from: 'app', to: 'exports' },
    { from: 'app', to: 'events' },
    { from: 'analyzer', to: 'db' },
    { from: 'statements', to: 'db' },
    { from: 'exports', to: 'db' },
    { from: 'events', to: 'db' },
  ],
};

export const opbtArch: DiagramSpec = {
  width: 680,
  height: 330,
  minWidth: 560,
  title: 'OPBT architecture',
  description:
    'A React PWA and an Expo Android app call an ASP.NET Core API secured with JWT and rate limiting. The Application layer uses MediatR CQRS and calls a pure domain engine; data is stored in SQL Server.',
  nodes: [
    { id: 'pwa', label: 'React PWA', sub: 'offline · IndexedDB', x: 220, y: 36, w: 200 },
    { id: 'android', label: 'Expo Android', sub: 'biometric unlock', x: 460, y: 36, w: 200 },
    { id: 'api', label: 'ASP.NET Core API', sub: 'JWT · rate limiting', x: 340, y: 132, w: 240, tone: 'accent' },
    { id: 'app', label: 'Application', sub: 'MediatR · CQRS', x: 200, y: 232, w: 190 },
    { id: 'domain', label: 'Domain engine', sub: 'cited, deterministic rules', x: 480, y: 232, w: 220 },
    { id: 'db', label: 'SQL Server', x: 200, y: 304, w: 150, h: 36, shape: 'store' },
  ],
  edges: [
    { from: 'pwa', to: 'api' },
    { from: 'android', to: 'api' },
    { from: 'api', to: 'app' },
    { from: 'app', to: 'domain' },
    { from: 'app', to: 'db' },
  ],
};

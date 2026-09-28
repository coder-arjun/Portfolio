import type { CaseStudy } from '../types';
import {
  churchyetuArch,
  churchyetuThumb,
  cobankLayers,
  cobankTenancy,
  cobankThumb,
  edustacArch,
  edustacThumb,
  paystacArch,
  paystacThumb,
  voystacArch,
  voystacThumb,
} from './diagrams';

/*
 * Professional work at Tecnostac. Public-safe by design: my own contributions and general outcomes,
 * representative diagrams, no source, customer data, internal URLs, screenshots or vulnerability detail.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'cobankpluspro',
    name: 'CobankPlusPro',
    domain: 'Core banking SaaS',
    tags: ['Core banking', 'Multi-tenant SaaS', 'Legacy modernization'],
    summary:
      'Modernizing a legacy VB.NET banking platform into a multi-tenant .NET architecture with transaction booking, KYC, loan workflows and tenant provisioning.',
    stack: ['.NET 9', 'ASP.NET Core', 'SQL Server', 'REST', 'RDLC'],
    cardDiagram: cobankThumb,
    context:
      'A core banking platform for cooperative banks, being ported from a legacy VB.NET system to a multi-tenant SaaS product on .NET 9. A control database manages institutions and configuration; every institution gets its own database.',
    role:
      'I owned the Customer Master module across the web, API, business and data layers, designed the multi-product transaction booking engine, built the tenant-onboarding control plane and created a reusable loan workflow framework.',
    architecture: [cobankLayers, cobankTenancy],
    challenges: [
      'Porting legacy behaviour without losing it',
      'Isolating data between tenants',
      'Keeping financial postings balanced and complete',
      'Maker-checker controls on sensitive actions',
      'Provisioning new institutions reliably',
      'Changing configuration formats without breaking existing tenants',
    ],
    built: [
      {
        title: 'Customer Master',
        body: 'Ported a 19-section legacy customer data-entry screen and added KYC change history, an event-log audit trail, a five-factor credit-scoring engine, biometric fingerprint enrollment and compliance reporting.',
      },
      {
        title: 'Transaction booking',
        body: 'One booking posts share, deposit and loan lines together through GL-mapped double-entry daybook posting, with inter-branch contra entries, maker-checker approval, SMS receipts and slip printing.',
      },
      {
        title: 'Customer 360',
        body: 'A consolidated activity and liability view of each customer’s direct and guarantor exposure, adopted by the team as the standard approach to account consolidation.',
      },
      {
        title: 'Tenant control plane',
        body: 'Institution registry, branch and service configuration, hosted billing and database-pool placement — plus a move from encrypted fixed-position configuration to JSON behind a parser that reads both formats.',
      },
      {
        title: 'Loan workflow framework',
        body: 'A reusable, state-aware workflow toolbar and 16 loan lifecycle actions delivered in 10 working days, later adopted for other loan products and the Deposits module.',
      },
    ],
    technology: ['.NET 9', 'ASP.NET Core MVC', 'ASP.NET Core Web API', 'SQL Server', 'RDLC / SSRS', 'REST'],
    takeaway:
      'Modernizing a banking system is mostly about preserving behaviour while changing structure. Reading legacy configuration in both formats let the migration proceed without a forced cut-over, and building the loan toolbar as a state-aware framework rather than per-screen code is what let other product lines adopt it.',
    seoTitle: 'CobankPlusPro — Core Banking SaaS | Arjun P K',
    seoDescription:
      'Case study: modernizing a legacy VB.NET core banking platform into multi-tenant .NET 9 SaaS — customer master, transaction booking, tenant provisioning and loan workflows.',
  },
  {
    slug: 'edustac',
    name: 'Edustac',
    domain: 'Education SaaS',
    tags: ['Education SaaS', 'Rules engines', 'Examination infrastructure'],
    summary:
      'Building core modules of a multi-tenant education platform — examinations, academics, student promotion and timetabling — alongside a governed AI gateway.',
    stack: ['.NET 10', 'Blazor', 'EF Core', 'Azure', 'MediatR'],
    cardDiagram: edustacThumb,
    context:
      'A multi-tenant SaaS platform for schools and universities, launching across six countries. It runs on .NET 10 with Blazor, EF Core and MediatR, and keeps a separate database for every organization.',
    role:
      'I was the sole owner of the Examinations module, designed the Student Promotion engine, built the Academics module and its Continuous Assessment engine from scratch (including writing its PRD), and built the shared rule engine and the timetabling module.',
    architecture: [edustacArch],
    challenges: [
      'Rules that differ by country, school and year',
      'Integrity of marks and results',
      'Background runs that survive crashes and restarts',
      'Right-to-left languages and privacy regulations',
      'Using AI with governance and a way to switch it off',
      'Reuse across modules instead of duplicated policy',
    ],
    built: [
      {
        title: 'Examinations',
        body: 'Deterministic paper assembly, blind double-entry marking with statistical validation, signed transcripts that anyone can verify through a public QR code, and online exam delivery.',
      },
      {
        title: 'Student Promotion',
        body: 'A deterministic rule compiler that explains every decision in plain English, a visual rule builder and a fault-tolerant multi-instance run worker, with approvals, class allocation, rollback and a family portal.',
      },
      {
        title: 'Academics & Continuous Assessment',
        body: 'Five assessment archetypes, rubric scoring, quiz auto-grading and weighted aggregation with PDF and Excel reporting, localized for nine countries with right-to-left support and GDPR/DPDP pseudonymization.',
      },
      {
        title: 'Rule engine & timetabling',
        body: 'A tenant-configurable JSON rule engine reused by four other modules, powering timetabling with versioned approvals, clash detection, auto-generation, substitutions, iCal feeds and SMS/WhatsApp notifications.',
      },
      {
        title: 'Platform services',
        body: 'A transactional-outbox event backbone and a governed AI gateway with a kill switch, model registry and prompt provenance.',
      },
    ],
    technology: ['.NET 10', 'ASP.NET Core', 'Blazor', 'EF Core 10', 'SQL Server', 'MediatR', 'Azure', 'OpenTelemetry', 'Testcontainers', 'Azure Pipelines'],
    takeaway:
      'Education rules vary by country, school and year. Treating them as data — compiled deterministically and explained in plain English — let one engine serve many institutions, and let four other modules reuse it instead of re-implementing policy.',
    seoTitle: 'Edustac — Education SaaS | Arjun P K',
    seoDescription:
      'Case study: examinations, student promotion, continuous assessment and a reusable rule engine for a multi-tenant .NET 10 education platform.',
  },
  {
    slug: 'voystac',
    name: 'VoyStac',
    domain: 'Vacation-rental marketplace',
    tags: ['Marketplace', 'Payments', 'React', 'Bounded contexts'],
    summary:
      'Building settlement infrastructure, owner onboarding with KYC, commission accounting and the React storefront for a vacation-rental marketplace.',
    stack: ['.NET 10', 'React 19', 'TypeScript', 'SQL Server', 'Razorpay'],
    cardDiagram: voystacThumb,
    context:
      'A vacation-rental marketplace for India, built as a Clean Architecture modular monolith on .NET 10 — each bounded context owns its own database schema — with a React 19 storefront.',
    role:
      'I designed the settlement and commission engine, built the property and owner onboarding context end to end, delivered the Community context and owned the customer-facing storefront.',
    architecture: [voystacArch],
    challenges: [
      'Money that must never move twice',
      'Releasing payouts only when a stay is real',
      'Protecting owners’ personal data',
      'Governed pricing changes',
      'Keeping bounded contexts genuinely separate',
      'A storefront ready for search engines and every screen size',
    ],
    built: [
      {
        title: 'Settlement engine',
        body: 'A double-entry ledger with idempotent posting, a settlement state machine that releases owner payouts through Razorpay Route only after a verified check-in, reconciliation jobs and append-only commission accruals — shipped with paired rollback scripts.',
      },
      {
        title: 'Owner onboarding',
        body: 'Property approval workflow, owner KYC with encrypted personal data and blind indexes, OTP e-signed agreements, maker-checker pricing, cancellation and GST policies, and image watermarking.',
      },
      {
        title: 'Community',
        body: 'Q&A, field notes, curated collections, group trip circles and moderation, delivered in about a week as isolated projects with architecture tests enforcing schema separation, and a verified-stay trust model.',
      },
      {
        title: 'Storefront',
        body: 'Map-based search, stay details, the landing experience and a dark-mode design system, made production-ready with SEO prerendering, bundle budgets and accessibility testing. Live since September 2026.',
      },
    ],
    technology: ['.NET 10 Web API', 'EF Core', 'SQL Server', 'Clean Architecture', 'React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Razorpay Route', 'WhatsApp Business API', 'Playwright'],
    takeaway:
      'In a marketplace, money should only move when the event behind it is proven. Modelling settlement as an explicit state machine over an idempotent, append-only ledger makes every payout explainable and safe to retry.',
    seoTitle: 'VoyStac — Vacation-Rental Marketplace | Arjun P K',
    seoDescription:
      'Case study: settlement and commission engine, owner onboarding with KYC and a React 19 storefront for a .NET 10 vacation-rental marketplace.',
  },
  {
    slug: 'churchyetu',
    name: 'Churchyetu',
    domain: 'Church finance & mobile money',
    tags: ['Payments', 'Mobile money', 'Integration infrastructure'],
    summary:
      'Engineering payment integrations across M-Pesa, Airtel Money, KCB and Equity Bank with idempotent ledger posting and fault-tolerant notification processing.',
    stack: ['.NET 9', 'M-Pesa', 'APIs', 'Worker Service', 'SQL Server'],
    cardDiagram: churchyetuThumb,
    context:
      'A multi-tenant church and diocese finance platform for East Africa. Members contribute over the web, a mobile API, USSD and mobile money; every tenant has its own database.',
    role:
      'I designed and delivered the payment integration layer, writing three of its four provider integrations myself, built the notification worker service, owned the Member Contribution and Entity Finance modules, and hardened the shared platform.',
    architecture: [churchyetuArch],
    challenges: [
      'Four providers with four different protocols',
      'Callbacks that arrive late, twice or not at all',
      'Payments that don’t match a member',
      'High-volume notifications with priorities',
      'Configuration that differs per tenant',
      'French localization and regional phone formats',
    ],
    built: [
      {
        title: 'Payment integration layer',
        body: 'M-Pesa Daraja (C2B and STK Push), Airtel Money via IntaSend, KCB Buni and Equity Bank webhooks behind one layer, with token caching, RSA/HMAC signature verification and idempotent double-entry posting with a suspense-account fallback.',
      },
      {
        title: 'Notification worker',
        body: 'A fault-tolerant .NET Worker Service that sends prioritized SMS, push and email in parallel with per-channel retry and back-off and per-tenant SMS providers — later extended by the team with new workers.',
      },
      {
        title: 'Finance modules',
        body: 'Member Contribution and Entity Finance end to end, with shared posting logic that writes transaction, daybook and product-ledger entries for every cash, bank and mobile-money payment.',
      },
      {
        title: 'Platform hardening',
        body: 'Token refresh with retry, request filtering, encrypted query strings, an injection-safe query builder and upload validation — plus French localization through a database-driven label engine.',
      },
    ],
    technology: ['.NET 9', 'ASP.NET Core MVC', 'ASP.NET Core Web API', '.NET Worker Service', 'SQL Server', 'SSRS', 'M-Pesa Daraja', 'IntaSend', 'KCB Buni', 'Firebase Cloud Messaging', 'Serilog'],
    takeaway:
      'Payment callbacks arrive late, twice or not at all. Designing posting to be idempotent — with a suspense account for anything that can’t be matched — turns an unreliable edge into a ledger that always balances.',
    seoTitle: 'Churchyetu — Church Finance & Mobile Money | Arjun P K',
    seoDescription:
      'Case study: M-Pesa, Airtel Money, KCB and Equity Bank integrations with idempotent ledger posting and a fault-tolerant notification worker on .NET 9.',
  },
  {
    slug: 'paystacglobal',
    name: 'PayStacGlobal',
    domain: 'HR & payroll SaaS',
    tags: ['HR & payroll SaaS', 'Security', 'Localization'],
    summary:
      'Hardening and extending a multi-country HR and payroll platform — security, Kenya statutory payroll, a component-driven pay model and hierarchical leave approval.',
    stack: ['.NET 9', 'ASP.NET Core MVC', 'EF Core', 'MediatR', 'Hangfire', 'Redis'],
    cardDiagram: paystacThumb,
    context:
      'A multi-tenant, multi-country HR and payroll SaaS serving India and Kenya, built on .NET 9 with MediatR/CQRS, Hangfire and Redis.',
    role:
      'I led a phased security-hardening programme, localized the payroll engine for Kenya, re-architected the pay model and designed hierarchical leave approval.',
    architecture: [paystacArch],
    challenges: [
      'Protecting personal data at the database layer',
      'Statutory rules that differ by country',
      'Pay changes that take effect on specific dates',
      'Migrating without changing a single payslip',
      'Approvals that must not stall',
      'Rolling features out one tenant at a time',
    ],
    built: [
      {
        title: 'Security hardening',
        body: 'Field-level encryption of personal data through EF Core value converters, API multi-factor authentication, session revocation, rate limiting, security headers and tenant-scoped authorization — 74 roadmap items closed in eight days, with no regressions on re-audit.',
      },
      {
        title: 'Kenya payroll',
        body: 'A configuration-driven country-calculator strategy covering NSSF, SHIF, AHL, NITA and PAYE, with statutory returns and bank-file presets including ISO 20022 — shipped in the customer’s production go-live and reused for India.',
      },
      {
        title: 'Component-driven pay model',
        body: 'Rigid salary structures replaced by effective-dated, per-employee pay components resolved at run time, migrated with parity verification.',
      },
      {
        title: 'Hierarchical leave approval',
        body: 'Grade-based approval with SLA auto-escalation, delegation and maker-checker separation, run by an hourly Hangfire job and released behind per-tenant feature flags, built test-first.',
      },
    ],
    technology: ['.NET 9', 'ASP.NET Core MVC', 'EF Core 9', 'SQL Server', 'MediatR / CQRS', 'Hangfire', 'Redis'],
    takeaway:
      'Payroll changes are only safe if the results stay identical. A parity-verified migration and a country-calculator strategy let the pay model evolve and a new country ship without disturbing existing payslips.',
    seoTitle: 'PayStacGlobal — HR & Payroll SaaS | Arjun P K',
    seoDescription:
      'Case study: security hardening, Kenya statutory payroll, a component-driven pay model and hierarchical leave approval for a .NET 9 HR and payroll SaaS.',
  },
];

export const findCaseStudy = (slug: string | undefined) => caseStudies.find((c) => c.slug === slug);

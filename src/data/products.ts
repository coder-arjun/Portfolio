import type { Product } from '../types';
import { cinoraArch, daypilotArch, daypilotThumb, finomaArch, opbtArch, opbtThumb } from './diagrams';

/*
 * Independent products — my own code, public on GitHub, live in production.
 * Figures (test counts, render counts) were verified against the repositories in September 2026.
 */
export const products: Product[] = [
  {
    slug: 'finoma',
    name: 'Finoma',
    tagline: 'Personal finance ledger',
    summary:
      'A production-style personal finance ledger designed around real-world financial workflows: income, expenses, budgets, goals, recurring rules and reports in one place.',
    period: 'Mar – Sep 2026',
    live: 'https://finoma.runasp.net/',
    repo: 'https://github.com/coder-arjun/ExpenseTracker',
    cardVisual: 'screenshot',
    screenshot: { src: '/screens/finoma.jpg', alt: 'Finoma sign-in screen: a two-panel ledger card listing income, expense and budget tracking' },
    cardFeatures: ['Dashboard', 'Income', 'Expenses', 'Budgets', 'Analytics', 'Rules', 'Reports'],
    cardStack: ['ASP.NET Core 10', 'EF Core', 'SQL Server', 'QuestPDF', 'Chart.js'],
    modules: [
      { name: 'Dashboard', note: 'Monthly totals, charts and budget alerts' },
      { name: 'Income', note: 'Sources, categories and accounts' },
      { name: 'Expenses', note: 'Categories, receipts and bulk actions' },
      { name: 'Budgets', note: 'Per-category limits with alerts' },
      { name: 'Analytics', note: 'Anomalies, recurring charges, savings' },
      { name: 'Rules', note: 'Recurring income and expenses' },
      { name: 'Reports', note: 'Statements and CSV, Excel, PDF exports' },
    ],
    features: [
      'Dashboard and charts',
      'Income, expenses and savings',
      'Accounts and transfers',
      'Budgets with alerts',
      'Savings goals',
      'Recurring rules',
      'Debts',
      'Event budgets',
      'Monthly insights',
      'CSV, Excel and PDF exports',
      'Emailed monthly statements',
      'Off-server backups',
    ],
    architecture: finomaArch,
    highlights: [
      {
        title: 'Designed like a ledger',
        body: 'The interface borrows from double-entry bookkeeping: debits in red, credits in green, balances in ink, and totals closed with a double rule.',
      },
      {
        title: 'Insights without an LLM',
        body: 'A rules-based analyser flags spending that breaks from a three-month baseline, detects recurring charges and suggests savings — in plain C#, so no financial data leaves the server.',
      },
      {
        title: 'Event budgets, isolated by design',
        body: 'Weddings and house-warmings get their own allocated, committed and paid ledger. It has no foreign keys into monthly data, so event spending can never distort the dashboard or account balances.',
      },
      {
        title: 'Operations on a free host',
        body: 'Month-end PDF statements and gzipped JSON backups run through key-protected cron endpoints and are emailed off-server; data-protection keys live in the database so sign-ins survive redeploys.',
      },
      {
        title: 'A shared database, safely',
        body: 'Finoma runs in its own SQL Server schema, with its own migration history, so it shares a production database with another app without either touching the other’s tables.',
      },
      {
        title: 'Responsive, verified',
        body: 'A Playwright sweep renders every route at 11 widths from 320 to 1920 pixels and fails on any horizontal overflow — 671 renders, zero issues at the last run.',
      },
    ],
    stack: ['ASP.NET Core 10 MVC', 'ASP.NET Identity', 'EF Core', 'SQL Server', 'QuestPDF', 'ClosedXML', 'Markdig', 'MailKit', 'Chart.js', 'Bootstrap 5', 'PWA', 'Playwright'],
    seoTitle: 'Finoma — Personal Finance Ledger | Arjun P K',
    seoDescription:
      'Finoma: a production-style personal finance ledger on ASP.NET Core 10 — budgets, recurring rules, event budgets, rules-based insights, statements and exports.',
  },
  {
    slug: 'cinora',
    name: 'Cinora',
    tagline: 'Social movie & series platform',
    summary:
      'A home for film and series reviews: ratings out of ten, watchlists, friends, an activity feed, realtime group chat and AI recommendations.',
    period: 'Jul 2026',
    live: 'https://cinora.runasp.net/',
    repo: 'https://github.com/coder-arjun/Cinora',
    cardVisual: 'screenshot',
    screenshot: { src: '/screens/cinora.jpg', alt: 'Cinora landing page: “Discover your next obsession” above a row of film posters' },
    cardFeatures: ['Reviews', 'Watchlists', 'Activity feed', 'Friends', 'Group chat', 'AI recommendations'],
    cardStack: ['ASP.NET Core 10', 'SignalR', 'Ollama', 'TMDB', 'Clean Architecture'],
    features: [
      'Reviews and ratings out of ten',
      'Watchlists and custom lists',
      'Activity feed',
      'Friends and blocking',
      'Realtime group chat',
      'AI “For You” recommendations',
      'Web Push notifications',
      'Installable, offline-capable PWA',
    ],
    architecture: cinoraArch,
    highlights: [
      {
        title: 'Clean Architecture, enforced',
        body: 'Domain, Application, Infrastructure and Web projects with the dependency rule enforced by project references, a hand-rolled mediator with validation and logging behaviours, and 24 architecture decision records.',
      },
      {
        title: 'Resilient external data',
        body: 'Film and series data comes from TMDB through a typed HttpClient with retries, a circuit breaker and rate limiting, cached so the site degrades gracefully instead of failing.',
      },
      {
        title: 'AI behind a port',
        body: 'Personalised recommendations run on a local Ollama model behind a swappable recommendation-engine interface, so the provider can change without touching the application.',
      },
      {
        title: 'Realtime',
        body: 'Notifications and one-to-one or group chat over self-hosted SignalR, with typing indicators and read receipts, plus Web Push for alerts outside the app.',
      },
      {
        title: 'Secure by default',
        body: 'Fail-closed authorization, global anti-forgery protection, a strict Content Security Policy and rate-limited sign-in.',
      },
      {
        title: 'Tested',
        body: '562 xUnit tests across the domain, application, infrastructure and web-integration projects, plus a Playwright end-to-end suite.',
      },
    ],
    stack: ['ASP.NET Core 10', 'EF Core', 'SQL Server', 'SignalR', 'Hangfire', 'Microsoft.Extensions.AI', 'Ollama', 'TMDB API', 'Tailwind CSS v4', 'TypeScript', 'HTMX', 'Alpine.js', 'Serilog', 'xUnit', 'Playwright'],
    seoTitle: 'Cinora — Social Movie & Series Platform | Arjun P K',
    seoDescription:
      'Cinora: a social movie and series platform on ASP.NET Core 10 and Clean Architecture — reviews, watchlists, SignalR chat and local-LLM recommendations.',
  },
  {
    slug: 'daypilot',
    name: 'DayPilot',
    tagline: 'Productivity & habit companion',
    summary:
      'A daily planner that carries unfinished work forward, tracks habits and sleep, and reminds you on the web and on Android.',
    period: 'Jun – Aug 2026',
    live: 'https://dailypilot.runasp.net/',
    repo: 'https://github.com/coder-arjun/DailyPilot',
    cardVisual: 'diagram',
    cardDiagram: daypilotThumb,
    screenshot: { src: '/screens/daypilot.jpg', alt: 'DayPilot welcome page: “Plan. Complete. Move Forward.” with carry-forward, AI assistant and habits features' },
    cardFeatures: ['Tasks', 'Carry-forward', 'Habits', 'Workspaces', 'Sleep', 'Reminders'],
    cardStack: ['ASP.NET Core 10', 'React Native', 'Hangfire', 'Semantic Kernel', 'FCM'],
    features: [
      'Tasks with recurrence and checklists',
      'Automatic carry-forward',
      'Habits and streaks',
      'Shared workspaces',
      'Sleep tracker',
      'Route planner',
      'AI planning assistant',
      'Reminders on every channel',
    ],
    architecture: daypilotArch,
    highlights: [
      {
        title: 'One backend, two clients',
        body: 'The ASP.NET Core app serves the web UI and a JWT-secured REST API, with rotating, hashed refresh tokens, for the native Android app.',
      },
      {
        title: 'Background work',
        body: 'Six Hangfire recurring jobs: carry-forward after midnight, morning and evening reminders, per-minute reminder dispatch, a daily database backup and a weekly review.',
      },
      {
        title: 'Reminders that arrive',
        body: 'Browser, email, Web Push and Firebase Cloud Messaging, plus local alarms on Android so reminders still fire when the phone is offline.',
      },
      {
        title: 'Sleep insights',
        body: 'A sleep journal that computes efficiency, sleep debt and consistency — bed and wake times are averaged with circular statistics, so 23:30 and 00:30 are an hour apart, not 23.',
      },
      {
        title: 'AI with a fallback',
        body: 'A Semantic Kernel assistant for natural-language planning, which falls back to a deterministic heuristic engine when no model is configured.',
      },
      {
        title: 'Shipped continuously',
        body: 'GitHub Actions builds every pull request and deploys automatically; 131 xUnit tests cover the reminder planner, tokens, sleep metrics and more.',
      },
    ],
    stack: ['ASP.NET Core 10', 'EF Core', 'SQL Server', 'Hangfire', 'Semantic Kernel', 'JWT', 'Web Push', 'Firebase Cloud Messaging', 'MailKit', 'React Native', 'Expo', 'TypeScript', 'GitHub Actions', 'xUnit'],
    seoTitle: 'DayPilot — Productivity & Habit Companion | Arjun P K',
    seoDescription:
      'DayPilot: a productivity and habit companion with an ASP.NET Core 10 backend, a React Native Android app, Hangfire jobs and a Semantic Kernel assistant.',
  },
  {
    slug: 'opbt',
    name: 'OPBT',
    tagline: 'Health-focused planning & tracking platform',
    summary:
      'A privacy-first, offline-capable platform for tracking cycles, pregnancy and a baby’s early years, built on a deterministic domain engine whose rules cite their sources.',
    period: 'Jul – Aug 2026',
    live: 'https://opbt.runasp.net/',
    repo: 'https://github.com/coder-arjun/OPBT',
    cardVisual: 'diagram',
    cardDiagram: opbtThumb,
    screenshot: { src: '/screens/opbt.jpg', alt: 'OPBT sign-up screen: “Private tracking for the whole journey — cycle to pregnancy to baby”' },
    cardFeatures: ['Cycle tracking', 'Pregnancy tools', 'Baby logs', 'Partner sharing', 'Offline mode', 'Data export'],
    cardStack: ['ASP.NET Core 10', 'React 19', 'MediatR', 'JWT', 'Clean Architecture'],
    features: [
      'Cycle tracking with prediction ranges',
      'Pregnancy tools',
      'Baby logs and growth percentiles',
      'Vaccines and milestones',
      'Partner sharing via WhatsApp',
      'Data export and account erasure',
      'Offline mode',
      'PIN lock',
    ],
    architecture: opbtArch,
    highlights: [
      {
        title: 'Specification first',
        body: 'Seventeen documents — research, competitor analysis, PRD, TRD, an algorithm specification, design system, architecture, ERD, API and CI/CD — written and reviewed before any code.',
      },
      {
        title: 'A deterministic domain engine',
        body: 'Cycle prediction with confidence ranges, due-date calculation and WHO/CDC growth percentiles are pure, framework-free functions with every constant cited to its source, covered by 73 unit tests.',
      },
      {
        title: 'Clean Architecture with guardrails',
        body: 'Domain, Application, Infrastructure and API projects, MediatR CQRS with FluentValidation, and architecture tests that fail the build if a layer depends in the wrong direction.',
      },
      {
        title: 'Security and privacy',
        body: 'JWT with rotating refresh tokens and reuse detection, rate limiting, RFC 7807 error responses, GDPR data export and true account erasure.',
      },
      {
        title: 'Offline-first',
        body: 'The React PWA keeps its cache in IndexedDB, queues changes made offline and replays them on reconnect; an Expo Android app adds biometric unlock.',
      },
      {
        title: 'Automated checks',
        body: 'GitHub Actions pipelines build and test the backend and frontend on every change.',
      },
    ],
    stack: ['ASP.NET Core 10 Web API', 'EF Core', 'SQL Server', 'MediatR', 'FluentValidation', 'JWT', 'Swagger', 'Web Push', 'React 19', 'TypeScript', 'Vite', 'Workbox', 'TanStack Query', 'i18next', 'Expo', 'xUnit', 'GitHub Actions'],
    note:
      'OPBT provides general wellness information only. It is not a medical device, does not diagnose, and its calculations have not been clinically validated.',
    seoTitle: 'OPBT — Health-Focused Planning & Tracking | Arjun P K',
    seoDescription:
      'OPBT: a privacy-first, offline-capable tracking platform with an ASP.NET Core 10 Clean Architecture API, a React 19 PWA and a source-cited domain engine.',
  },
];

export const findProduct = (slug: string | undefined) => products.find((p) => p.slug === slug);

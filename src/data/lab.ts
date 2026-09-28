import type { Flow } from '../types';

/* Engineering Lab — simplified walk-throughs of patterns I have built. General patterns only; no
 * employer-specific business logic. `appliedIn` links to the case studies where each one appears. */
export const flows: Flow[] = [
  {
    id: 'transaction',
    title: 'Transaction processing',
    summary: 'What happens between a posting request and a receipt landing on someone’s phone.',
    stages: [
      {
        id: 'request',
        title: 'Request',
        body: 'A posting request arrives — from a teller screen, an API client or a payment callback — carrying an idempotency key that identifies this exact operation.',
        why: 'Everything downstream can use that key to recognise a retry.',
        appliedIn: ['voystac', 'churchyetu'],
      },
      {
        id: 'validation',
        title: 'Validation',
        body: 'Accounts, amounts and business rules are checked before anything is written. An invalid request is rejected with a specific reason.',
        why: 'Nothing half-valid ever reaches the ledger.',
        appliedIn: ['cobankpluspro', 'churchyetu'],
      },
      {
        id: 'idempotency',
        title: 'Idempotency check',
        body: 'The key is looked up against operations already processed. A duplicate gets the original result back instead of being posted a second time.',
        why: 'Networks retry, people double-click and providers resend callbacks. Money must move once.',
        appliedIn: ['voystac', 'churchyetu'],
      },
      {
        id: 'transaction',
        title: 'Transaction',
        body: 'Every write for the booking happens inside one database transaction: all of its lines post, or none do.',
        why: 'A booking with a missing leg is worse than no booking at all.',
        appliedIn: ['cobankpluspro'],
      },
      {
        id: 'double-entry',
        title: 'Double entry',
        body: 'Each movement is recorded as balanced debits and credits mapped to general-ledger accounts, with contra entries when branches differ.',
        why: 'If the books stop balancing, the system knows immediately.',
        appliedIn: ['cobankpluspro', 'voystac'],
      },
      {
        id: 'ledger',
        title: 'Ledger',
        body: 'Entries land in an append-only ledger, alongside daybook and product ledgers. Corrections are new entries, never edits.',
        why: 'An append-only history is an audit trail by construction.',
        appliedIn: ['cobankpluspro', 'voystac', 'churchyetu'],
      },
      {
        id: 'notification',
        title: 'Notification',
        body: 'Once the transaction commits, a receipt is queued and a background worker sends it by SMS, push or email, retrying with back-off.',
        why: 'A slow SMS gateway should never hold up a financial posting.',
        appliedIn: ['churchyetu'],
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payment integration',
    summary: 'Four mobile-money and bank providers, one path into the ledger.',
    stages: [
      {
        id: 'mpesa',
        kind: 'source',
        title: 'M-Pesa',
        body: 'The Daraja API: customer-initiated C2B payments and STK Push prompts sent to the payer’s phone, authorised with short-lived OAuth tokens.',
        why: 'Four providers means four protocols — none of which should leak into the ledger.',
        appliedIn: ['churchyetu'],
      },
      {
        id: 'airtel',
        kind: 'source',
        title: 'Airtel Money',
        body: 'Integrated through IntaSend, with its own request format and callback shape.',
        why: 'Four providers means four protocols — none of which should leak into the ledger.',
        appliedIn: ['churchyetu'],
      },
      {
        id: 'kcb',
        kind: 'source',
        title: 'KCB',
        body: 'KCB Buni: STK prompts to the payer’s phone and instant payment notifications back to the platform.',
        why: 'Four providers means four protocols — none of which should leak into the ledger.',
        appliedIn: ['churchyetu'],
      },
      {
        id: 'equity',
        kind: 'source',
        title: 'Equity Bank',
        body: 'Biller webhooks: the bank notifies the platform when someone pays against a bill reference.',
        why: 'Four providers means four protocols — none of which should leak into the ledger.',
        appliedIn: ['churchyetu'],
      },
      {
        id: 'integration',
        title: 'Integration layer',
        body: 'Each provider’s payload is normalised into one internal payment event. Access tokens are cached, payments to a shared paybill are routed to the right tenant, and a two-stage health probe checks every integration.',
        why: 'Adding a provider means adding an adapter, not changing the ledger.',
        appliedIn: ['churchyetu'],
      },
      {
        id: 'signature',
        title: 'Signature validation',
        body: 'A callback is trusted only after its RSA or HMAC signature is verified against the provider’s keys. Anything that fails is rejected and logged.',
        why: 'A payment notification is an instruction to credit money — it has to be authentic.',
        appliedIn: ['churchyetu'],
      },
      {
        id: 'idempotency',
        title: 'Idempotency',
        body: 'The provider’s transaction reference becomes the idempotency key, so a callback delivered twice is posted once.',
        why: 'Providers retry until they receive an acknowledgement.',
        appliedIn: ['churchyetu', 'voystac'],
      },
      {
        id: 'ledger',
        title: 'Ledger',
        body: 'Matched payments post double-entry to the member’s account. Payments that can’t be matched go to a suspense account for review instead of being lost.',
        why: 'Every payment is accounted for, even when the reference is wrong.',
        appliedIn: ['churchyetu'],
      },
    ],
  },
];

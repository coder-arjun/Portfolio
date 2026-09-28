/** "How I engineer" — a real sequence, each step backed by something I built. */
export const principles = [
  {
    title: 'Understand the domain',
    body: 'Cooperative banking, statutory payroll, examinations and mobile money each carry rules the code must respect. I learn the vocabulary before modelling anything.',
    evidence: 'Kenya payroll: NSSF, SHIF, AHL, NITA and PAYE',
  },
  {
    title: 'Model the architecture',
    body: 'Draw the boundaries first — layers, bounded contexts, tenants — then make those boundaries enforceable.',
    evidence: 'Schema per bounded context, guarded by architecture tests',
  },
  {
    title: 'Design for failure',
    body: 'Callbacks repeat, workers crash and networks drop. Systems should recover without anyone noticing.',
    evidence: 'Idempotent posting with a suspense fallback; crash-safe workers',
  },
  {
    title: 'Secure by default',
    body: 'Encrypt sensitive fields, verify every signature and fail closed when in doubt.',
    evidence: 'Field-level encryption with blind indexes; signed webhooks',
  },
  {
    title: 'Automate repetitive work',
    body: 'If a person does it every week, a job or a pipeline should do it instead.',
    evidence: 'Selenium and Jenkins reporting that saved 24+ hours a week',
  },
  {
    title: 'Test the critical paths',
    body: 'Money, results and permissions get tests first. Migrations get parity checks.',
    evidence: 'Test-first leave escalation; parity-verified pay migration',
  },
] as const;

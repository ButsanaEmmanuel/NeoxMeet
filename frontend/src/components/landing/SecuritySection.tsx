import { FeatureGrid } from './FeatureGrid';

const securityFeatures = [
  {
    title: 'Role-based controls',
    description: 'Granular host, moderator, and guest permissions. Configure retention per workspace.',
  },
  {
    title: 'Audit-ready logs',
    description: 'Immutable participant records, join methods, and transcript exports for every meeting.',
  },
  {
    title: 'Encryption options',
    description: 'Media encrypted in transit with enterprise key rotation and BYOK support.',
  },
  {
    title: 'Retention policies',
    description: 'Automate transcript and recording lifecycles with legal holds when needed.',
  },
  {
    title: 'IP + domain allowlists',
    description: 'Restrict join flows to trusted networks and partner domains.',
  },
  {
    title: 'SSO / SAML + SCIM',
    description: 'Provision users via SCIM and enforce SSO across regions.',
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-6 text-white">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Security &amp; compliance controls</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">No trade-offs between AI speed and governance.</h2>
          <p className="max-w-3xl text-lg text-white/70">
            Design meeting policies once. Enforce globally. Every AI feature respects retention, residency, and identity rules.
          </p>
        </div>
        <FeatureGrid features={securityFeatures} />
        <a
          className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
          href="/security"
        >
          View security overview →
        </a>
      </div>
    </section>
  );
}

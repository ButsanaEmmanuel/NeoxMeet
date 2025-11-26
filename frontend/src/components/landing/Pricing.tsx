import { PricingCard } from './PricingCard';

const tiers = [
  {
    title: 'Starter',
    price: '$29 / host / mo',
    description: 'Instant AI captions and recaps for small teams.',
    features: ['Unlimited meetings', 'Live transcription', 'Basic AI recap', 'Email support'],
    cta: 'Start free trial',
  },
  {
    title: 'Team',
    price: '$79 / host / mo',
    description: 'Multilingual AI, custom retention, and integrations.',
    features: ['Live translation', 'Workspace memory', 'Custom retention', 'Priority support'],
    cta: 'Talk to sales',
    highlight: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated regions, white-label, and compliance-ready controls.',
    features: ['Custom security & compliance controls', 'Dedicated regions', 'White-label UI + email', '24/7 support team'],
    cta: 'Book an architect',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-6 text-white">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Pricing</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Choose the runway you need.</h2>
          <p className="text-lg text-white/70">Transparent tiers with enterprise controls available from day one.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard key={tier.title} {...tier}>
              {tier.title === 'Enterprise' && (
                <p className="text-sm text-white/70">
                  Includes legal review, custom data residency, private networking, and solution architects.
                </p>
              )}
            </PricingCard>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { AccordionItem } from './Accordion';
import { Accordion } from './Accordion';

const items: AccordionItem[] = [
  {
    question: 'Does NeoxMeet work behind strict firewalls?',
    answer: 'Yes. Deploy edge relays within your region, enforce IP allowlists, and deliver traffic over TLS 1.3 with fallback media paths.',
  },
  {
    question: 'Can we control how AI summaries are shared?',
    answer:
      'Absolutely. Choose which workspaces receive recaps, redact sensitive terms automatically, and require approvals for external distribution.',
  },
  {
    question: 'How do you handle data residency?',
    answer:
      'Select dedicated regions per workspace. All transcripts, recordings, and AI artifacts remain in-region with configurable retention policies.',
  },
  {
    question: 'What integrations are available?',
    answer:
      'Connect to Slack, Teams, email, or custom webhooks. Sync summaries to CRM, ticketing, or knowledge bases via API in minutes.',
  },
];

export function FAQ() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl space-y-6 px-6 text-white">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Answers before procurement asks.</h2>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}

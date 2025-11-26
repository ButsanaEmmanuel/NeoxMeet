import { GlassCard } from './GlassCard';

const testimonials = [
  {
    name: 'Clara N.',
    role: 'CX Director · Pan-African Bank',
    quote: '“NeoxMeet lets our tri-lingual teams ship decisions faster without adding another vendor for transcripts.”',
  },
  {
    name: 'Daniel O.',
    role: 'Chief Information Security Officer',
    quote: '“The audit trails and retention policies finally match the promises vendors make. Our compliance team loves it.”',
  },
  {
    name: 'Fatima S.',
    role: 'Head of Operations · Global NGO',
    quote: '“One call, instant translation, action items in our workspace. Field teams stopped sending manual notes.”',
  },
];

export function Testimonials() {
  return (
    <section className="py-16" id="resources">
      <div className="mx-auto max-w-6xl space-y-8 px-6 text-white">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Testimonials</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Teams that can’t miss a detail choose NeoxMeet.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <GlassCard key={testimonial.name} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 opacity-80" />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-base text-white/80">{testimonial.quote}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

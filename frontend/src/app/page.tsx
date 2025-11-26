import { AILayer } from '../components/landing/AILayer';
import { FAQ } from '../components/landing/FAQ';
import { Footer } from '../components/landing/Footer';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Pricing } from '../components/landing/Pricing';
import { ReliabilitySection } from '../components/landing/ReliabilitySection';
import { SecuritySection } from '../components/landing/SecuritySection';
import { Testimonials } from '../components/landing/Testimonials';
import { TrustStrip } from '../components/landing/TrustStrip';
import { WhiteLabelSection } from '../components/landing/WhiteLabelSection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#05070f] to-[#0a0f1c] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(92,196,255,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(181,146,255,0.12),transparent_40%)] opacity-90" />
      <Header />
      <main className="space-y-20 pb-24 pt-4">
        <Hero />
        <TrustStrip />
        <AILayer />
        <SecuritySection />
        <WhiteLabelSection />
        <ReliabilitySection />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

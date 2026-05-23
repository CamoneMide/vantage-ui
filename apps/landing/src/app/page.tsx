import { FeaturesSection } from '@/components/features-section';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { Navbar } from '@/components/navbar';
import { PricingSection } from '@/components/pricing-section';
import { SocialProofSection } from '@/components/social-proof-section';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <SocialProofSection />
      </main>
      <Footer />
    </>
  );
}

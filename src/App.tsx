import { useState } from 'react';
import CapabilitiesSection from './components/CapabilitiesSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import FieldVerificationSection from './components/FieldVerificationSection.tsx';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';
import HeroSection from './components/HeroSection.tsx';
import PortfolioSection from './components/PortfolioSection.tsx';
import RegulatorySection from './components/RegulatorySection.tsx';

export default function App() {
  const [selectedInterest, setSelectedInterest] = useState<string>('');

  const scrollToContact = (interest?: string) => {
    if (interest) {
      setSelectedInterest(interest);
    }
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F6] text-[#132219]">
      <Header onSelectContact={() => scrollToContact()} />
      <main className="flex-1">
        <HeroSection />
        <CapabilitiesSection />
        <PortfolioSection onRequestTechSheet={(title) => scrollToContact(title)} />
        <RegulatorySection />
        <FieldVerificationSection />
        <ContactSection selectedInterest={selectedInterest} />
      </main>
      <Footer />
    </div>
  );
}

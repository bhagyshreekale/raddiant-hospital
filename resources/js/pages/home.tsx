import FloatingActions from '../components/design/FloatingActions'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import AboutPreview from '../components/sections/AboutPreview';
import CTABanner from '../components/sections/CTABanner';
import DoctorsSection from '../components/sections/DoctorsSection';
import EmergencyBanner from '../components/sections/EmergencyBanner';
import HeroSection from '../components/sections/HeroSection';
import MapSection from '../components/sections/MapSection';
import ServicesSection from '../components/sections/ServicesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
export default function Home() {
  return (
    <>
    <Navbar/>
      <HeroSection />
      <EmergencyBanner />
      <AboutPreview />
      <ServicesSection />
      <WhyChooseUs />
      <DoctorsSection />
      <TestimonialsSection />
      <CTABanner />
      <MapSection />
      <Footer/>
<FloatingActions/>
    </>
  );
}
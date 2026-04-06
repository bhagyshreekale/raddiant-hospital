import HeroSection from '../components/sections/HeroSection';
import EmergencyBanner from '../components/sections/EmergencyBanner';
import AboutPreview from '../components/sections/AboutPreview';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import DoctorsSection from '../components/sections/DoctorsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTABanner from '../components/sections/CTABanner';
import MapSection from '../components/sections/MapSection';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

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
    </>
  );
}
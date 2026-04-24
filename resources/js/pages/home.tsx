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

interface HomeProps {
  homeServices?: any[];
  homeDoctors?: any[];
  homeTestimonials?: any[];
}

export default function Home({ homeServices = [], homeDoctors = [], homeTestimonials = [] }: HomeProps) {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <EmergencyBanner />
      <AboutPreview />
      <ServicesSection services={homeServices} />
      <WhyChooseUs />
      <DoctorsSection doctors={homeDoctors} />
      <TestimonialsSection testimonials={homeTestimonials} />
      <CTABanner />
    {/* <MapSection contactData={contactData} /> */}
      <Footer/>
      <FloatingActions/>
    </>
  );
}
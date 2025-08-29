import Header from "@/components/header";
import Hero from "@/components/hero";
import SoftwareTools from "@/components/software-tools";
import CoreServicesSlider from "@/components/core-services-slider";
import ServiceCategories from "@/components/service-categories";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SoftwareTools />
      <CoreServicesSlider />
      <ServiceCategories />
      <BlogSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSlider } from "@/hooks/use-slider";
import { useState } from "react";

const services = [
  {
    title: "Command & Control Centre",
    description: "Centralized monitoring and management platform for government operations",
    icon: "https://img.icons8.com/ios-filled/40/ffffff/control-panel.png",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    title: "Remote Sensing & GIS",
    description: "Advanced geospatial analysis and mapping solutions for smart governance",
    icon: "https://img.icons8.com/ios-filled/40/ffffff/worldwide-location.png",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Sandes",
    description: "Secure messaging platform for government communication and collaboration",
    icon: "https://img.icons8.com/ios-filled/40/ffffff/chat-message.png",
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Knowledge Network",
    description: "Collaborative platform for sharing knowledge and best practices",
    icon: "https://img.icons8.com/ios-filled/40/ffffff/knowledge-sharing.png",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Digital India Portal",
    description: "Gateway to digital services and initiatives across India",
    icon: "https://img.icons8.com/ios-filled/40/ffffff/india.png",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "e-Governance Suite",
    description: "Comprehensive digital governance solutions for public administration",
    icon: "https://img.icons8.com/ios-filled/40/ffffff/government.png",
    gradient: "from-teal-500 to-cyan-500"
  },
];

export default function CoreServicesSlider() {
  const { currentSlide, nextSlide, prevSlide, goToSlide, pauseAutoPlay, resumeAutoPlay, handleTouchStart, handleTouchEnd } = 
    useSlider({ totalSlides: services.length });
  
  const [touchStartX, setTouchStartX] = useState(0);

  const onTouchStart = (e: React.TouchEvent) => {
    const startX = handleTouchStart(e);
    setTouchStartX(startX);
    pauseAutoPlay();
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    handleTouchEnd(touchStartX, e);
    resumeAutoPlay();
  };

  return (
    <section className="py-16 px-4" id="services">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Core Services</h3>
        
        <div 
          className="slider-container max-w-6xl mx-auto relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          data-testid="core-services-slider"
        >
          {/* Slider Navigation */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-primary hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg"
            onClick={prevSlide}
            data-testid="slider-prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-primary hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg"
            onClick={nextSlide}
            data-testid="slider-next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Track */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="slider-track"
              style={{ transform: `translateX(-${currentSlide * (100 / Math.min(3, services.length))}%)` }}
            >
              {services.map((service, index) => (
                <div key={service.title} className="slide min-w-full sm:min-w-1/2 lg:min-w-1/3 p-4">
                  <div className="gradient-border h-full">
                    <div className="p-6 h-full flex flex-col items-center text-center">
                      <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                        <img src={service.icon} alt={service.title} />
                      </div>
                      <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                      <p className="text-secondary-foreground text-sm">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-opacity ${
                  index === currentSlide ? 'bg-primary opacity-100' : 'bg-muted opacity-50'
                }`}
                onClick={() => goToSlide(index)}
                data-testid={`slider-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

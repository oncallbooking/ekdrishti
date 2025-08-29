import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-effect shadow-lg">
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <img src="https://img.icons8.com/color/24/domain.png" alt="Logo" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-primary">Ek-Drishti</h1>
              <p className="text-xs text-muted-foreground">Digital Hub</p>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('tools')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-tools"
            >
              Tools
            </button>
            <button 
              onClick={() => scrollToSection('blog')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-blog"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
            <button 
              className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              data-testid="button-login"
            >
              Login
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('tools')} 
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-tools"
              >
                Tools
              </button>
              <button 
                onClick={() => scrollToSection('blog')} 
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-blog"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-sm font-medium hover:text-primary transition-colors text-left"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
              <button 
                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors self-start"
                data-testid="mobile-button-login"
              >
                Login
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-2 overflow-hidden">
        <div className="news-ticker whitespace-nowrap text-sm font-medium">
          ⚡ Breaking News: Latest Government Updates • NIC Tools Available • Student Job Portals Live • Tech Forums Active ⚡
        </div>
      </div>
    </header>
  );
}

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const footerLinks = {
    quickLinks: [
      { name: "Services", action: () => scrollToSection('services') },
      { name: "Tools", action: () => scrollToSection('tools') },
      { name: "Blog", action: () => scrollToSection('blog') },
      { name: "Contact", action: () => scrollToSection('contact') },
    ],
    services: [
      { name: "eOffice", href: "#" },
      { name: "Student Portals", href: "#" },
      { name: "Job Portals", href: "#" },
      { name: "Digital Tools", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Email Support", href: "mailto:brainimmensity@gmail.com" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border mt-16" data-testid="footer">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <img src="https://img.icons8.com/color/20/domain.png" alt="Logo" />
              </div>
              <span className="font-bold text-primary">Ek-Drishti</span>
            </div>
            <p className="text-sm text-secondary-foreground">Your gateway to government tools and digital services</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={link.name}>
                  <button 
                    onClick={link.action}
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold mb-3">Services</h5>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              {footerLinks.services.map((service, index) => (
                <li key={service.name}>
                  <a 
                    href={service.href} 
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-service-${service.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-semibold mb-3">Support</h5>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              {footerLinks.support.map((item, index) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-support-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center">
          <p className="text-sm text-secondary-foreground">&copy; 2025 Ek-Drishti Digital Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

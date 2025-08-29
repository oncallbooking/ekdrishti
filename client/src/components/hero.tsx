export default function Hero() {
  const quickAccessButtons = [
    { 
      name: "eOffice", 
      icon: "https://img.icons8.com/ios-filled/32/ffffff/office.png",
      gradient: "from-blue-600 to-blue-700",
      hoverGradient: "hover:from-blue-500 hover:to-blue-600"
    },
    { 
      name: "Railways", 
      icon: "https://img.icons8.com/ios-filled/32/ffffff/train.png",
      gradient: "from-green-600 to-green-700",
      hoverGradient: "hover:from-green-500 hover:to-green-600"
    },
    { 
      name: "ICEGATE", 
      icon: "https://img.icons8.com/ios-filled/32/ffffff/container-truck.png",
      gradient: "from-red-600 to-red-700",
      hoverGradient: "hover:from-red-500 hover:to-red-600"
    },
    { 
      name: "Income Tax", 
      icon: "https://img.icons8.com/ios-filled/32/ffffff/tax.png",
      gradient: "from-purple-600 to-purple-700",
      hoverGradient: "hover:from-purple-500 hover:to-purple-600"
    },
    { 
      name: "Student Jobs", 
      icon: "https://img.icons8.com/ios-filled/32/ffffff/student-male.png",
      gradient: "from-amber-600 to-amber-700",
      hoverGradient: "hover:from-amber-500 hover:to-amber-600"
    },
    { 
      name: "Learning", 
      icon: "https://img.icons8.com/ios-filled/32/ffffff/book.png",
      gradient: "from-pink-600 to-pink-700",
      hoverGradient: "hover:from-pink-500 hover:to-pink-600"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-emerald-400 bg-clip-text text-transparent animate-slide-up">
          Government Tools & Services
        </h2>
        <p className="text-xl text-secondary-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
          Your centralized platform for accessing essential government services, student portals, and digital tools
        </p>
        
        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12" id="quick-access">
          {quickAccessButtons.map((button, index) => (
            <button 
              key={button.name}
              className={`group bg-gradient-to-r ${button.gradient} ${button.hoverGradient} text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center`}
              data-testid={`quick-access-${button.name.toLowerCase().replace(' ', '-')}`}
            >
              <img 
                src={button.icon} 
                className="mb-2 group-hover:scale-110 transition-transform" 
                alt={button.name} 
              />
              <span className="text-sm font-medium">{button.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

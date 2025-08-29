export default function SoftwareTools() {
  const tools = [
    { name: "DSC Signer 4.1.8", icon: "https://img.icons8.com/ios-filled/24/ffffff/pdf.png", gradient: "from-primary to-accent" },
    { name: "Java Runtime", icon: "https://img.icons8.com/ios-filled/24/ffffff/java-coffee-cup-logo.png", gradient: "from-green-500 to-emerald-500" },
    { name: "AnyDesk Remote", icon: "https://img.icons8.com/ios-filled/24/ffffff/remote-desktop.png", gradient: "from-red-500 to-pink-500" },
    { name: "Hindi Input", icon: "https://img.icons8.com/ios-filled/24/ffffff/language.png", gradient: "from-yellow-500 to-orange-500" },
    { name: "NIC DSC Utility", icon: "https://img.icons8.com/ios-filled/24/ffffff/security-checked.png", gradient: "from-indigo-500 to-purple-500" },
    { name: "Image Tools", icon: "https://img.icons8.com/ios-filled/24/ffffff/edit-image.png", gradient: "from-teal-500 to-cyan-500" },
  ];

  return (
    <section className="py-16 px-4 bg-secondary" id="tools">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Essential Software Tools</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {tools.map((tool, index) => (
            <div 
              key={tool.name}
              className="glass-effect p-4 rounded-xl hover:bg-card transition-colors cursor-pointer group"
              data-testid={`tool-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <img src={tool.icon} alt={tool.name} />
                </div>
                <p className="text-sm font-medium">{tool.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

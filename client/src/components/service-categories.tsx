export default function ServiceCategories() {
  const categories = [
    {
      title: "Student & Job Portals",
      icon: "https://img.icons8.com/ios-filled/24/ffffff/student-male.png",
      gradient: "from-blue-500 to-purple-500",
      dotColor: "bg-primary",
      items: [
        "SSC / UPSC Official",
        "NCS Govt Jobs",
        "Scholarship Portals",
        "Railway Recruitment"
      ]
    },
    {
      title: "Learning & Training",
      icon: "https://img.icons8.com/ios-filled/24/ffffff/book.png",
      gradient: "from-green-500 to-emerald-500",
      dotColor: "bg-green-500",
      items: [
        "SWAYAM Platform",
        "DIKSHA App", 
        "Coursera Govt Courses",
        "Skill India Portal"
      ]
    },
    {
      title: "Government Services",
      icon: "https://img.icons8.com/ios-filled/24/ffffff/government.png",
      gradient: "from-yellow-500 to-orange-500",
      dotColor: "bg-yellow-500",
      items: [
        "Aadhaar & PAN Services",
        "Passport Seva",
        "Voter ID Services",
        "RTI Filing Portal"
      ]
    },
    {
      title: "Tech & Digital Tools",
      icon: "https://img.icons8.com/ios-filled/24/ffffff/technology.png",
      gradient: "from-purple-500 to-pink-500",
      dotColor: "bg-purple-500",
      items: [
        "DigiLocker",
        "UMANG Portal",
        "BHIM UPI Services",
        "GeM Portal"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Service Categories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className="glass-effect p-6 rounded-xl hover:bg-card transition-colors group"
              data-testid={`service-category-${index}`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center mr-3`}>
                  <img src={category.icon} alt={category.title} />
                </div>
                <h4 className="text-lg font-semibold">{category.title}</h4>
              </div>
              <ul className="space-y-2 text-sm text-secondary-foreground">
                {category.items.map((item, itemIndex) => (
                  <li key={item} className="flex items-center">
                    <span className={`w-2 h-2 ${category.dotColor} rounded-full mr-2`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

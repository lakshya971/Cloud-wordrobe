const TechStack = () => {
  const technologies = [
    {
      category: "Frontend & Backend",
      color: "bg-blue-500",
      items: [
        { name: "Next.js", description: "Full-stack React framework", icon: "⚛️" },
        { name: "TailwindCSS", description: "Utility-first CSS framework", icon: "🎨" },
        { name: "TypeScript", description: "Type-safe JavaScript", icon: "📘" }
      ]
    },
    {
      category: "Database & Authentication",
      color: "bg-green-500",
      items: [
        { name: "MongoDB", description: "NoSQL database with Mongoose", icon: "🍃" },
        { name: "JWT", description: "JSON Web Tokens for auth", icon: "🔐" },
        { name: "RBAC", description: "Role-based access control", icon: "👥" }
      ]
    },
    {
      category: "Communication & Real-time",
      color: "bg-purple-500",
      items: [
        { name: "WebRTC", description: "Real-time video communication", icon: "📹" },
        { name: "Jitsi API", description: "Video conferencing integration", icon: "💬" },
        { name: "Socket.IO", description: "Real-time bidirectional communication", icon: "🔄" }
      ]
    },
    {
      category: "Email & Notifications",
      color: "bg-orange-500",
      items: [
        { name: "Nodemailer", description: "Email sending via SMTP", icon: "📧" },
        { name: "Gmail SMTP", description: "Gmail integration", icon: "📬" },
        { name: "WebSocket", description: "Real-time notifications", icon: "🔔" }
      ]
    }
  ]

  const architectureFeatures = [
    {
      title: "Scalable Architecture",
      description: "Built with microservices principles for horizontal scaling",
      icon: "🏗️"
    },
    {
      title: "Modern Development",
      description: "Latest React patterns with hooks and context API",
      icon: "⚡"
    },
    {
      title: "Security First",
      description: "JWT authentication with role-based permissions",
      icon: "🛡️"
    },
    {
      title: "Real-time Features",
      description: "Live updates and instant communication",
      icon: "🚀"
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Technology Stack
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Built with modern, industry-standard technologies to ensure performance, 
            scalability, and maintainability.
          </p>
        </div>

        {/* Technology Categories */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12 mb-20">
          {technologies.map((category, index) => (
            <div key={index} className="bg-gray-50 p-10 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-8">
                <div className={`w-4 h-4 ${category.color} rounded-full mr-4`}></div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {category.category}
                </h3>
              </div>
              <div className="space-y-6">
                {category.items.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-3xl mr-6">{tech.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">{tech.name}</h4>
                      <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Features */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-12 rounded-2xl">
          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Architecture Highlights
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {architectureFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Benefits */}
        <div className="mt-20 grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">High Performance</h4>
            <p className="text-gray-600 leading-relaxed">Optimized for speed with efficient data handling and caching strategies</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Scalable Database</h4>
            <p className="text-gray-600 leading-relaxed">MongoDB provides flexible schema and horizontal scaling capabilities</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Mobile Ready</h4>
            <p className="text-gray-600 leading-relaxed">Responsive design ensures perfect experience across all devices</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack

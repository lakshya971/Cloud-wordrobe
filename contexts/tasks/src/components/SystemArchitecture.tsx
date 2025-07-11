const SystemArchitecture = () => {
  const coreObjectives = [
    {
      title: "Role-Based User Creation",
      description: "Enable hierarchical user creation and task delegation across different organizational departments",
      icon: "👥"
    },
    {
      title: "Clear Visibility",
      description: "Provide transparent visibility into task progress and team performance metrics",
      icon: "👁️"
    },
    {
      title: "Secure Authentication",
      description: "Incorporate robust user authentication and comprehensive role-based access control",
      icon: "🔒"
    },
    {
      title: "Real-Time Collaboration",
      description: "Support seamless real-time collaboration through integrated video conferencing",
      icon: "🤝"
    },
    {
      title: "Reliable Communication",
      description: "Ensure timely and reliable communication via automated email notification systems",
      icon: "📨"
    }
  ]

  const systemFeatures = [
    {
      category: "User Management",
      features: [
        "Email-based user invitations with auto-generated credentials",
        "Employee directory with advanced filters and search",
        "User deactivation/reactivation capabilities",
        "Role reassignment and replacement support"
      ]
    },
    {
      category: "System Utilities",
      features: [
        "Multi-tenant support for multiple agencies/departments",
        "Fully responsive design with mobile compatibility",
        "Light and dark mode theme support",
        "Global search functionality for tasks, users, and files",
        "Activity feed showing recent system events"
      ]
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            System Architecture & Objectives
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Designed with scalability and performance in mind, our system architecture 
            supports complex organizational workflows while maintaining simplicity and efficiency.
          </p>
        </div>

        {/* Core Objectives */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Core Objectives
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreObjectives.map((objective, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{objective.icon}</span>
                  <h4 className="font-semibold text-gray-900">{objective.title}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            System Architecture Flow
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Frontend */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                <p className="text-sm text-gray-600 mb-4">Next.js + TailwindCSS</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Responsive UI</li>
                  <li>• Real-time updates</li>
                  <li>• Interactive dashboards</li>
                </ul>
              </div>

              {/* Backend */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Backend API</h4>
                <p className="text-sm text-gray-600 mb-4">Node.js + Express</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• RESTful APIs</li>
                  <li>• JWT Authentication</li>
                  <li>• Role-based middleware</li>
                </ul>
              </div>

              {/* Database */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Database</h4>
                <p className="text-sm text-gray-600 mb-4">MongoDB + Mongoose</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Flexible schema</li>
                  <li>• Scalable storage</li>
                  <li>• Efficient queries</li>
                </ul>
              </div>
            </div>

            {/* Connecting arrows */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                  </marker>
                </defs>
                <line x1="30" y1="50" x2="45" y2="50" stroke="#6B7280" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
                <line x1="55" y1="50" x2="70" y2="50" stroke="#6B7280" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Additional System Features */}
        <div className="grid md:grid-cols-2 gap-8">
          {systemFeatures.map((category, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">{category.category}</h4>
              <ul className="space-y-3">
                {category.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SystemArchitecture

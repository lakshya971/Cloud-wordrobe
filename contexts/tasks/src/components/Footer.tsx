const Footer = () => {
  const currentYear = new Date().getFullYear()

  const projectDetails = [
    { label: "Project Type", value: "REACT Internship Major Project" },
    { label: "Frontend", value: "Next.js + TailwindCSS" },
    { label: "Backend", value: "Node.js + Express" },
    { label: "Database", value: "MongoDB + Mongoose" },
    { label: "Authentication", value: "JWT + RBAC" },
    { label: "Real-time", value: "WebRTC + Socket.IO" }
  ]

  const keyFeatures = [
    "Multi-hierarchy Role Management",
    "Advanced Task Delegation",
    "Integrated Video Conferencing",
    "Real-time Notifications",
    "Performance Analytics",
    "Mobile-Responsive Design"
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Project Overview */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-8 text-blue-400">
              Work Management & Task Assignment System
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              A comprehensive web application designed for multi-hierarchy organizations 
              to streamline task management, enhance team collaboration, and improve 
              organizational productivity through modern technology solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-blue-600 rounded-full">React.js</span>
              <span className="px-4 py-2 bg-green-600 rounded-full">Node.js</span>
              <span className="px-4 py-2 bg-blue-600 rounded-full">MongoDB</span>
              <span className="px-4 py-2 bg-purple-600 rounded-full">TypeScript</span>
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h4 className="text-xl font-semibold mb-8">Technical Stack</h4>
            <ul className="space-y-4">
              {projectDetails.map((detail, index) => (
                <li key={index} className="text-sm">
                  <span className="text-gray-400">{detail.label}:</span>
                  <br />
                  <span className="text-gray-300">{detail.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Key Features</h4>
            <ul className="space-y-2">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <svg className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Statistics */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-gray-400 text-sm">User Roles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-gray-400 text-sm">Core Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-400 text-sm">Responsive</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-400 text-sm">Scalable</div>
            </div>
          </div>
        </div>

        {/* Architecture Highlights */}
        <div className="bg-gray-800 p-8 rounded-xl mb-12">
          <h4 className="text-xl font-semibold mb-6 text-center">System Architecture Highlights</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h5 className="font-medium mb-2">Microservices Ready</h5>
              <p className="text-gray-400 text-sm">Modular architecture supporting future scalability</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h5 className="font-medium mb-2">Enterprise Security</h5>
              <p className="text-gray-400 text-sm">JWT authentication with comprehensive RBAC</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h5 className="font-medium mb-2">High Performance</h5>
              <p className="text-gray-400 text-sm">Optimized for speed and real-time interactions</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Work Management System. Built as a comprehensive internship project.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-400 text-sm">Built with</span>
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">⚛️</span>
              <span className="text-green-400">💚</span>
              <span className="text-blue-400">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

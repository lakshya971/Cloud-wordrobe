const Features = () => {
  const features = [
    {
      category: "Authentication & Security",
      icon: "🔐",
      items: [
        "Secure login using JSON Web Tokens (JWT)",
        "Role-Based Access Control (RBAC)",
        "Audit logs tracking key activities",
        "Multi-tenant support for organizations"
      ]
    },
    {
      category: "Task Management",
      icon: "📋",
      items: [
        "Multi-level task delegation with deadlines",
        "Task status tracking (Not Started, In Progress, In Review, Completed)",
        "Kanban view for drag-and-drop management",
        "Task attachments and file uploads",
        "Commenting system with user mentions"
      ]
    },
    {
      category: "Video Conferencing",
      icon: "📹",
      items: [
        "Integrated video calling using WebRTC",
        "Meeting scheduler with calendar integration",
        "Invite selected participants within hierarchy",
        "Optional call recordings and meeting notes",
        "Access control to restrict participation"
      ]
    },
    {
      category: "Notifications & Email",
      icon: "📧",
      items: [
        "Real-time in-app and email notifications",
        "Automated email alerts for task assignments",
        "Deadline reminders and status changes",
        "Video call invitations",
        "SMTP setup with configurable templates"
      ]
    },
    {
      category: "Reporting & Analytics",
      icon: "📊",
      items: [
        "Role-based dashboards with summarized data",
        "Task performance analytics by team",
        "Exportable reports in PDF or Excel formats",
        "Weekly and monthly progress visualization",
        "Employee performance metrics"
      ]
    },
    {
      category: "System Features",
      icon: "⚙️",
      items: [
        "Fully responsive design with mobile compatibility",
        "Light and dark mode support",
        "Global search for tasks, users, and files",
        "Activity feed showing recent events",
        "Employee directory with filters"
      ]
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Key Features
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive functionality designed to streamline organizational workflows 
            and enhance team productivity across all levels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-10 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-8">
                <span className="text-4xl mr-6">{feature.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {feature.category}
                </h3>
              </div>
              <ul className="space-y-4">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 leading-relaxed text-lg">{item}</span>
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

export default Features

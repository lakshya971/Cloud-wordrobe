const UserRoles = () => {
  const roles = [
    {
      title: "Department Head",
      level: 1,
      color: "bg-red-500",
      privileges: [
        "Can create Managers",
        "Full system access",
        "Organization-wide reporting",
        "Policy and configuration management"
      ],
      description: "Highest level of authority with complete system control"
    },
    {
      title: "Manager",
      level: 2,
      color: "bg-orange-500",
      privileges: [
        "Can create Assistant Managers and Team Leads",
        "Department-level task management",
        "Team performance analytics",
        "Resource allocation and planning"
      ],
      description: "Manages multiple teams and oversees department operations"
    },
    {
      title: "Assistant Manager",
      level: 3,
      color: "bg-yellow-500",
      privileges: [
        "Support Manager functions",
        "Team coordination",
        "Task review and approval",
        "Progress monitoring"
      ],
      description: "Assists in management duties and team coordination"
    },
    {
      title: "Team Lead",
      level: 4,
      color: "bg-green-500",
      privileges: [
        "Can create Employees",
        "Direct team management",
        "Task assignment and tracking",
        "Team member performance review"
      ],
      description: "Leads a specific team and manages day-to-day operations"
    },
    {
      title: "Employee",
      level: 5,
      color: "bg-blue-500",
      privileges: [
        "Task execution and updates",
        "Time tracking and reporting",
        "Communication with team members",
        "Personal dashboard access"
      ],
      description: "Executes assigned tasks and reports progress"
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            User Roles & Hierarchy
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The system supports a structured hierarchy with defined roles and permissions. 
            Each role has specific privileges and can create or manage users at lower levels.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Hierarchy Visualization */}
          <div className="mb-16">
            <div className="flex flex-col space-y-6">
              {roles.map((role, index) => (
                <div key={index} className="relative">
                  <div className={`flex items-center p-8 bg-white rounded-2xl shadow-lg border-l-4 ${role.color.replace('bg-', 'border-')} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center text-white font-bold text-xl mr-8`}>
                      {role.level}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {role.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {role.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {role.privileges.map((privilege, privIndex) => (
                          <div key={privIndex} className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{privilege}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < roles.length - 1 && (
                    <div className="flex justify-center">
                      <div className="w-1 h-12 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Principles */}
          <div className="bg-white p-10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Key Hierarchy Principles
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Downward Creation Only</h4>
                  <p className="text-gray-600 text-sm">No role can create users above their level in the hierarchy</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Clear Authority Chain</h4>
                  <p className="text-gray-600 text-sm">Each level has defined responsibilities and reporting structure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserRoles

const Overview = () => {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Project Overview
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            The Work Management System is built using React.js (frontend), Node.js (backend), 
            and MongoDB (database). The system facilitates structured task delegation, 
            real-time collaboration, and performance tracking across various organizational levels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Role-Based Access Control
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Hierarchical user management with defined privileges for different organizational levels, 
              ensuring secure and structured access to system features.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Advanced Task Management
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Multi-level task delegation with deadlines, priorities, status tracking, 
              and Kanban view for efficient workflow management.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Real-Time Collaboration
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Integrated video conferencing, real-time notifications, and communication tools 
              to facilitate seamless team collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview

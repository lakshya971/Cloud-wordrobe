import Hero from './components/Hero'
import Overview from './components/Overview'
import Features from './components/Features'
import TechStack from './components/TechStack'
import UserRoles from './components/UserRoles'
import SystemArchitecture from './components/SystemArchitecture'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Overview />
      <Features />
      <UserRoles />
      <TechStack />
      <SystemArchitecture />
      <Footer />
    </div>
  )
}

export default App

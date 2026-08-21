import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import LiveDemo from '@/sections/LiveDemo'
import Features from '@/sections/Features'
import AiNative from '@/sections/AiNative'
import TechStack from '@/sections/TechStack'
import QuickStart from '@/sections/QuickStart'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <LiveDemo />
        <Features />
        <AiNative />
        <TechStack />
        <QuickStart />
      </main>
      <Footer />
    </div>
  )
}

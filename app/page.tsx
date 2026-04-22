import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import SocialProof from '@/components/landing/SocialProof'
import Features from '@/components/landing/Features'
import FlyerShowcase from '@/components/landing/FlyerShowcase'
import TemplateGallery from '@/components/landing/TemplateGallery'
import AnalyticsShowcase from '@/components/landing/AnalyticsShowcase'
import Security from '@/components/landing/Security'
import Pricing from '@/components/landing/Pricing'
import DownloadCTA from '@/components/landing/DownloadCTA'
import Footer from '@/components/landing/Footer'
import FloatingDownload from '@/components/landing/FloatingDownload'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <FlyerShowcase />
        <TemplateGallery />
        <AnalyticsShowcase />
        <Security />
        <Pricing />
        <DownloadCTA />
      </main>
      <Footer />
      <FloatingDownload />
    </>
  )
}

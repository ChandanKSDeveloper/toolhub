import React from 'react'
import HeroSection from '../components/HeroSection'
import TestimonialSection from '../components/TestimonialSection'
import ValueSection from '../components/ValueSection'
import FeaturesOverview from '../components/FeaturesOverview'
import FAQSection from '../components/FAQSection'

function Home() {
    return (
        <div className='bg-[#0d0d0d]'>
        <HeroSection />
        <ValueSection />
        <FeaturesOverview />
        <TestimonialSection />
        <FAQSection />
    </div>
  )
}

export default Home
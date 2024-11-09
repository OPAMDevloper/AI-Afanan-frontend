import Collections from '../../components/Collections/Collections'
import Footer from '../../components/Footer/Footer'
import Hero from '../../components/Hero/Hero'
import HeroTwo from '../../components/HeroTwo/HeroTwo'
import Intro from '../../components/Intro/Intro'
import ViewCanvas from '../../components/viewCanvas/viewCanvas.jsx'
import OurValues from '../../components/OurValue/OurValues'
import './Home.css'
import MultiCarousel from '../../components/ProductCarousel/MultiCarousel.jsx'



const Home = () => {
  return (

    <div className="Home">

      <Hero />
      <HeroTwo />
      <Intro />
      <OurValues />
      <MultiCarousel itemsPerSlide={3} />
      <Collections />
      <Footer />
      <ViewCanvas />
    </div>
  )
}

export default Home
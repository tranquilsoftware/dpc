import './App.css'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Header from './components/Header'
import SlideshowHero from './components/SlideshowHero'
import About from './components/About'
import Footer from './components/Footer'

import { ReserveCTA } from './components/BookFunction'
import SocialSection from './components/SocialSection'
// import FAQ from './components/FAQ'
import GoogleMapEmbed from './components/GoogleMapEmbed'

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
};

function App() {
  const location = useLocation();

  // Handle scroll to element when navigating with hash or state
  useLayoutEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Clear the state after scrolling to prevent re-triggering
        window.history.replaceState({}, document.title);
      }
    } else {
      // Scroll to top when navigating to a new page
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      <Header/>

      <SlideshowHero/>


      <div className="h-10"/>
      <About/>

      {/* <div className="h-20"/>
      <GalleryViewer/> */}

      <div className="h-20"/>
      <ReserveCTA/>
      {/* <BookFunction/> */}


      {/*  Doesnt want testimonials
      <div className="h-40"/>
      <Testimonials/> 
      */}

      {/* <div className="h-40"/>
      <Team/> */}

      {/* <div className="h-40"/> */}
      {/* <FAQ/> */}

      <div className="h-20"/>
      <SocialSection/>
      
      <GoogleMapEmbed 
        className="rounded-lg shadow-xl overflow-hidden"
        height="400px"
      />


      <Footer/>
    </motion.div>
  )
}

export default App
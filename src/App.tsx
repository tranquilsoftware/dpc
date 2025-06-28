import './App.css'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './components/Header'
import SlideshowHero from './components/SlideshowHero'
import About from './components/About'
import Footer from './components/Footer'

// import Team from './components/Team'
// import { GalleryViewer } from './components/GalleryViewer'
import BookFunction from './components/BookFunction'
import SocialSection from './components/SocialSection'
import FAQ from './components/FAQ'
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


      {/* <div className="h-20"/> */}
      <About/>

      {/* <div className="h-20"/>
      <GalleryViewer/> */}

      <div className="h-40"/>
      <BookFunction/>


      {/*  Doesnt want testimonials
      <div className="h-40"/>
      <Testimonials/> 
      */}

      {/* <div className="h-40"/>
      <Team/> */}

      <div className="h-40"/>
      <FAQ/>

      <GoogleMapEmbed 
        className="rounded-lg shadow-xl overflow-hidden"
        height="400px"
      />

      <div className="h-20"/>
      <SocialSection/>

      {/* <div className="h-80" /> */}
      <Footer/>
    </motion.div>
  )
}

// Function to check WebGL support
// function isWebGLSupported() {
//   try {
//     const canvas = document.createElement('canvas');
//     return !!(window.WebGLRenderingContext && (
//       canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
//     ));
//   } catch (e) {
//     return false;
//   }
// }

export default App

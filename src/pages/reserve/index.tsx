import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookFunction from '../../components/BookFunction';
// Update the image import path according to your project structure
import { BAR_3 } from '../../globals';

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

function Reserve() {
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

      {/* <div className="container mx-auto px-4 py-8"> */}
        {/* <div className="max-w-4xl mx-auto"> */}
          <img 
            src={BAR_3} 
            alt="Bar Area" 
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
            style={{ maxWidth: '100%', height: '400px' }}
          />
          <BookFunction/>
        {/* </div> */}
      {/* </div> */}
      
      <Footer/>
    </motion.div>
  )
}

export default Reserve

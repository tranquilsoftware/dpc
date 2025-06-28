import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BookFunction from '../../components/BookFunction'

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

      <div className="h-40"/>
      <BookFunction/>

      {/* <div className="h-80" /> */}
      <Footer/>
    </motion.div>
  )
}

export default Reserve

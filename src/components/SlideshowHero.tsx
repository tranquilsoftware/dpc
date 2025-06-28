import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BRAND_NAME, BRIEF_DESCRIPTION, TWO_DOTS } from '../globals' //, LOGO 

// Local images from public/assets/images/
const heroImages = [
  '/dpc/assets/images/0.jpg',
  '/dpc/assets/images/1.jpg',
  '/dpc/assets/images/2.jpg',
  '/dpc/assets/images/3.jpg',
  '/dpc/assets/images/4.jpg',
  '/dpc/assets/images/5.jpg',
  '/dpc/assets/images/7.jpg',
  '/dpc/assets/images/8.jpg'
  // '/assets/images/dave.jpg'
]

const variants = {
  enter: (/*direction: number*/) => ({
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: (/*direction: number*/) => ({
    zIndex: 0,
    opacity: 0,
  })
}

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = page % heroImages.length

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(([prevPage, prevDirection]) => [
        prevPage + 1,
        prevDirection >= 0 ? 1 : -1,
      ])
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow with Blur */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="absolute inset-0 w-full h-full"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 1 }
            }}
            style={{
              backgroundImage: `url(${heroImages[imageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content with higher z-index to stay on top */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-5 text-center">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* LOGO */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 w-32 h-32 md:w-40 md:h-40"
            >
              <img 
                src={TWO_DOTS} 
                alt={`${BRAND_NAME} Logo`}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.div 
              className="w-full overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h1 
                className="mb-4 text-6xl xs:text-7xl sm:text-8xl md:text-9xl text-white font-bold drop-shadow-lg whitespace-nowrap"
                style={{ 
                  fontFamily: 'Bellefair', 
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  width: 'fit-content',
                  margin: '0 auto'
                }}
              >
                {BRAND_NAME}
              </h1>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p 
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-4 backdrop-blur-sm bg-black/20 py-2 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              {BRIEF_DESCRIPTION}
            </motion.p>


          </motion.div>
        </div>
      </div>
    </section>
  )
}
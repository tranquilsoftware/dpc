import { useState, useEffect, useRef, TouchEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { ScrollAnimation } from './animations/ScrollAnimation'
import { BRAND_NAME, LOGO } from '../globals'

const images = [
  { src: LOGO, alt: `${BRAND_NAME} 1` },
  { src: LOGO, alt: `${BRAND_NAME} 2` },
  { src: LOGO, alt: `${BRAND_NAME} 3` }
]

export function GalleryViewer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVertical, setIsVertical] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Toggle fullscreen mode
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await galleryRef.current?.requestFullscreen?.()
        setIsFullscreen(true)
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        }
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err)
      setIsFullscreen(!isFullscreen)
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setIsVertical(img.naturalHeight > img.naturalWidth)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Touch handlers for mobile
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  return (
    <ScrollAnimation direction="up" distance={50}>
      <div 
        id="gallery" 
        className={`relative w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-black/90 p-4' : ''}`}
        ref={galleryRef}
      >
        {!isFullscreen && (
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold gradient-text text-center mb-12"
          >
            Gallery
            <span className="sr-only">
              - {BRAND_NAME} Gallery
            </span>
          </motion.h2>
        )}
<div 
  className={`relative w-full mx-auto touch-pan-y ${isFullscreen ? 'h-full w-full' : 'max-w-4xl'}`} 
  style={{ 
    height: isFullscreen 
      ? '100%'
      : isVertical 
        ? 'calc(100vh - 150px)' 
        : 'calc(100vh - 150px)', 
    minHeight: isFullscreen ? '100%' : '555px'
  }}
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd}
>
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className={`${isFullscreen ? 'max-h-full max-w-full' : 'w-full h-full'} object-contain ${isFullscreen ? 'rounded-none' : 'rounded-[2rem]'} select-none`}
        onLoad={handleImageLoad}
        draggable={false}
      />
    </motion.div>
  </AnimatePresence>
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className={`absolute z-30 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${
              isFullscreen ? 'top-6 right-6' : 'top-4 right-4'
            }`}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
          >
            {isFullscreen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Expand className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full 
                     bg-white/20 backdrop-blur-md hover:bg-white/30 
                     transition-all duration-300 hover:scale-110
                     focus:outline-none focus:ring-2 focus:ring-primary/60
                     active:scale-95 touch-manipulation"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full 
                     bg-white/20 backdrop-blur-md hover:bg-white/30 
                     transition-all duration-300 hover:scale-110
                     focus:outline-none focus:ring-2 focus:ring-primary/60
                     active:scale-95 touch-manipulation"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

           {/* Dots indicator - Adjusted to be closer to the image */}
  <div className={`absolute left-1/2 -translate-x-1/2 flex gap-3 p-2 ${
    isFullscreen 
      ? 'bottom-6 bg-black/30 rounded-full' 
      : 'bottom-[-60px]'  // Moved up to be closer to the image
  }`}>
    {images.map((_, index) => (
      <motion.button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`w-3 h-3 rounded-full transition-colors duration-300
                  ${index === currentIndex ? 'bg-primary/60' : 'bg-primary/20'}
                  focus:outline-none focus:ring-2 focus:ring-primary/60
                  touch-manipulation`}
        animate={{
          scale: index === currentIndex ? 1.2 : 1,
        }}
        aria-label={`Go to image ${index + 1}`}
      />
    ))}
  </div>
</div>
      </div>
    </ScrollAnimation>
  )
}
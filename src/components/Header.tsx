import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "./ui/Button"
import { useLocation, useNavigate } from 'react-router-dom'
import { HREF_HOME_LINK, BRAND_NAME, SMALL_LOGO } from '../globals'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [isIOS, setIsIOS] = useState(false)
  
  // Header dimensions and styles based on scroll direction
  const headerHeight = isScrollingUp ? 72 : 56; // Slightly larger initial height for better visibility
  const headerFontSize = isScrollingUp ? '1.5rem' : '1.25rem';
  const logoSize = isScrollingUp ? '2.5rem' : '2rem';
  const paddingY = isScrollingUp ? '1rem' : '0.75rem'; // Adjust padding for the height change

  const menuItems = [
    // { name: 'Gallery', href: '#gallery' }, 
    { name: 'Reserve', href: '/reserve' },
    { name: 'FAQ', href: '#faq' },

    // { name: 'About', href: '/about' },
    { name: 'Contact', href: '#/contact' },
  ]

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return location.hash === href
    }
    if (href.startsWith('/')) {
      return location.pathname === href
    }
    return false
  }

  const handleNavigation = (href: string) => {
    if (href.startsWith('http')) {
      // For external URLs, open in a new tab
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('#')) {
      // If we're not on the home page and trying to access an anchor
      if (location.pathname !== '/') {
        navigate('/' + href)
      } else {
        document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // For regular routes (like /team), navigate and scroll to top
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    // Detect if the device is iOS
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    setIsIOS(/(iPad|iPhone|iPod)/gi.test(userAgent));

    // Function to handle scroll events with throttling
    let lastScrollTop = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          
          // Detect scroll direction (with a small threshold to prevent jitter)
          if (Math.abs(currentScroll - lastScrollTop) > 5) {
            setIsScrollingUp(currentScroll < lastScrollTop);
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial scroll position
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-md ${isIOS ? 'ios-safe-area' : ''}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href={HREF_HOME_LINK} className="flex items-center">
            <img 
              src={SMALL_LOGO}
              alt={BRAND_NAME} 
              className="h-12 w-auto" />
            <span className="text-2xl font-bold text-content-primary ml-4" style={{ fontFamily: 'Bellefair' }}>
              {BRAND_NAME}
            </span>
          </a>
          
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`text-content-primary hover:text-content-secondary transition-colors relative py-2
                  ${isActive(item.href) ? 'text-content-secondary' : ''}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-full after:h-0.5 after:bg-gradient-to-r 
                  after:from-primary after:to-accent
                  after:scale-x-0 after:origin-left after:transition-transform
                  ${isActive(item.href) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-content-primary hover:text-content-secondary"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {isOpen && (
          <nav className="md:hidden py-4 space-y-4 mt-4 border-t border-content/10 pt-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.href)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-2 py-2 rounded-md transition-colors
                  ${isActive(item.href) 
                    ? 'bg-primary/10 text-content-secondary border-l-4 border-primary pl-4' 
                    : 'text-content-primary hover:bg-content/5'}
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

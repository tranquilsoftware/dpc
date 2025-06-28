import { ScrollAnimation } from './animations/ScrollAnimation'
import { AnimatedBulletPoints } from './animations/AnimatedBulletPoints'
import { BRAND_NAME, BRIEF_DESCRIPTION, BAR_1, BAR_2 } from '../globals'

const About = () => {
  const about = [
    "A vinyl soundscape",
    "Talk to your friends, with a touch of class",
    "Based in Tasmania"
  ]

  const moreAbout = [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet"
  ]

  return (
    
    <section id="about" className="relative bg-background py-10 overflow-visible">
        <div className="container mx-auto px-4">
          {/* First Row: Image Left, Text Right */}
          <ScrollAnimation delay={0.2} direction="right">
          <div className="flex flex-col md:flex-row items-center mb-20">
            
            {/* Image Section */}
            <div className="md:w-1/2 mb-8 md:mb-0 w-full h-full">
              <div className="relative group w-full h-full">

                {/* <div className="absolute -inset-1 -bottom-10 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-2xl group-hover:blur-[100px] transition-all duration-500 opacity-80 group-hover:opacity-100 z-0"></div>  */}
                  
                {/* <div className="relative overflow-hidden z-10 w-full h-full min-h-[400px] rounded-2xl"> ROUNDED BOX.*/}
                <div className="relative overflow-hidden z-10 w-full h-full min-h-[300px] rounded-full">

                  <img 
                    src={BAR_1}
                    alt={`${BRAND_NAME} ${BRIEF_DESCRIPTION}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            
            {/* Text Section */}
            <div className="md:pl-12 relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-content-primary">
                About {BRAND_NAME}
              </h2>
              <AnimatedBulletPoints 
                items={about}
                delay={0.3}
                direction="right"
                textClassName="text-content-primary text-lg"
              />
            </div>
          </div>
          </ScrollAnimation>

          {/* Second Row: Text Left, Image Right */}
          <ScrollAnimation delay={0.2} direction="left">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Section - Now on left for mobile, stays left on desktop */}
            <div className="md:w-1/2 md:pr-12 relative z-10 order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 text-content-primary">
                More About {BRAND_NAME}
              </h2>
              <AnimatedBulletPoints 
                items={moreAbout}
                delay={0.3}
                direction="left"
                textClassName="text-content-primary text-lg"
              />
            </div> 
            
            {/* Image Section - Now on right for mobile, stays right on desktop */}
            <div className="md:w-1/2 mb-8 md:mb-0 order-1 md:order-2 w-full h-full">
              <div className="relative group w-full h-full">
                {/* <div className="absolute -inset-1 -bottom-10 bg-gradient-to-l from-accent/30 via-primary/30 to-accent/30 rounded-full blur-2xl group-hover:blur-[100px] transition-all duration-500 opacity-80 group-hover:opacity-100 z-0"></div> */}
                <div className="relative overflow-hidden z-10 w-full h-full min-h-[300px] rounded-full">
                  <img 
                    src={BAR_2}
                    alt={`${BRAND_NAME} Quality`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          </ScrollAnimation>
        </div>
    </section>
  )
}

export default About

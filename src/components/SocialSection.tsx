import { Mail, Instagram, Facebook } from 'lucide-react';
import { CONTACT_QUOTE_EMAIL, INSTAGRAM_USERNAME, INSTAGRAM_LINK, FACEBOOK_USERNAME, FACEBOOK_LINK } from '../globals';

export const SocialSection = () => {
  return (
    <section className="relative py-16 overflow-visible">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Contact
          </h2>
          {/* <p className="text-content-white text-lg max-w-2xl mx-auto">
            Interested in placing a custom order or have a question? Reach out!
          </p> */}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-xl h-48 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl bg-background-dark border border-border hover:border-border/50">
              <a 
                href={`mailto:${CONTACT_QUOTE_EMAIL}`}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                <Mail className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                {/* <p className="text-content-secondary">
                  {CONTACT_QUOTE_EMAIL}
                </p> */}
              </a>
            </div>


            <div className="group relative overflow-hidden rounded-xl h-48 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl bg-background-dark border border-border hover:border-border-400/50">
              <a 
                href={INSTAGRAM_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                <Instagram className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Instagram</h3>
                {/* <p className="text-content-secondary">@{INSTAGRAM_USERNAME}</p> */}
              </a>
            </div>

            <div className="group relative overflow-hidden rounded-xl h-48 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl bg-background-dark border border-border hover:border-border-400/50">
              <a 
                href={FACEBOOK_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                <Facebook className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Facebook</h3>
                {/* <p className="text-content-secondary">@{FACEBOOK_USERNAME}</p> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
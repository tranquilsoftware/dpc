import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock as ClockIcon, Users, X, Mail, Utensils } from 'lucide-react';
import { CONTACT_QUOTE_EMAIL, BRAND_NAME, HREF_LINK_DPC_RESERVE } from '../globals'; // Removed unused LOGO import
import { ScrollAnimation } from './animations/ScrollAnimation';

interface ReservationDetails {
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  specialRequests: string;
}

const TableReservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ReservationDetails>({
    date: '',
    time: '',
    guests: 2,
    name: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate time slots
  const timeSlots: string[] = [];
  for (let hour = 11; hour <= 21; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 21) timeSlots.push(`${hour}:30`);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailBody = `
New Function Booking Request
------------------------------------------------------------

Reservation Details:
- Date: ${formData.date}
- Time: ${formData.time}
- Number of Guests: ${formData.guests}

Customer Information:
- Name: ${formData.name}
- Phone: ${formData.phone || 'Not provided'}

Special Requests:
${formData.specialRequests || 'None'}
    `;

    try {
      const mailtoLink = `mailto:${CONTACT_QUOTE_EMAIL}?subject=New Function Booking for ${formData.date} at ${formData.time}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setIsSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setFormData({
          date: '',
          time: '',
          guests: 2,
          name: '',
          phone: '',
          specialRequests: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting reservation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reserve" className="relative bg-background py-16 overflow-visible">
      <ScrollAnimation delay={0.2} direction="left">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-content-primary">
            Enquire about a function or table
          </h2>
          <p className="text-lg text-content-primary max-w-2xl mx-auto">
            Book your table at {BRAND_NAME} for an unforgettable soundscape experience
          </p>
        </div>

        <div className="flex flex-col items-center">
{/* 
          {/* Left Column - Image *-/}
          <div className="md:w-1/2 w-full relative group">
            <div className="absolute -inset-1 -bottom-10 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-2xl group-hover:blur-[100px] transition-all duration-500 opacity-80 group-hover:opacity-100 z-0"></div>
            {/* <div className="relative overflow-hidden z-10 w-full h-full min-h-[500px] rounded-2xl"> *-/}
            <div className="relative overflow-hidden z-10 w-full h-full min-h-[300px] rounded-full">

              <img 
                src={BAR_3}
                alt={`${BRAND_NAME} venue`}
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}

          {/* Right Column - Booking Card */}
            <div className="bg-background-dark rounded-2xl overflow-hidden border border-border shadow-lg p-8 w-full max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Reserve Your Function
                </h3>
                <p className="text-primary/80">
                  Join us for an exceptional soundscape experience. Book your table now.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Calendar className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h4 className="font-medium text-primary">Choose Date</h4>
                  <p className="text-sm text-primary/60">Select your preferred date</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <ClockIcon className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h4 className="font-medium text-primary">Select Time</h4>
                  <p className="text-sm text-primary/60">Pick a time that suits you</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h4 className="font-medium text-primary">Guests</h4>
                  <p className="text-sm text-primary/60">Number of people</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 px-6 bg-background hover:bg-primary/90 text-content-primary text-lg font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book a Function Now
              </button>
            </div>
          </div>

        {/* Reservation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Reserve a Function</h3>
                  <button 
                    onClick={() => !isSubmitting && setIsModalOpen(false)}
                    className="text-white hover:text-foreground disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Reservation Request Sent!</h4>
                    <p className="text-content-white/80">
                      We've received your request and will contact you shortly to confirm your reservation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-white mb-1">Date *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-primary/50" />
                          </div>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={handleInputChange}
                            className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg text-content-white placeholder:text-content-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-content-white mb-1">Time *</label>
                        <div className="relative">
                          <select
                            id="time"
                            name="time"
                            required
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md text-content-primary"
                          >
                            <option value="">Select time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                          <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-content-white/50 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-content-white mb-1">Number of Guests *</label>
                      <div className="relative">
                        <select
                          id="guests"
                          name="guests"
                          required
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-border rounded-md text-content-primary"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'person' : 'people'}
                            </option>
                          ))}
                          <option value="11">Larger party (11+)</option>
                        </select>
                        <Users className="absolute right-3 top-2.5 h-5 w-5 text-content-white/50 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-content-white mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md mb-4 text-content-primary"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-content-white mb-1">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-content-primary"
                        placeholder="Your phone number (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="specialRequests" className="block text-sm font-medium text-white mb-1">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={3}
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-content-primary"
                        placeholder="Allergies, special occasions, seating preferences, etc."
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-content-primary py-3 px-6 bg-primary hover:bg-primary/90 text-dark rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5" />
                            Request Reservation
                          </>
                        )}
                      </button>
                      <p className="text-xs text-content-white/50 mt-2 text-center">
                        We'll send you a confirmation once your reservation is confirmed.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </ScrollAnimation>
    </section>
  );
};

export const ReserveCTA = () => {
  const navigate = useNavigate();
  
  const handleReserveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(HREF_LINK_DPC_RESERVE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ScrollAnimation delay={0.2} direction="left">
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-background-dark rounded-2xl overflow-hidden border border-border shadow-lg p-8 w-full max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Utensils className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Enquire About a Function or Table
            </h2>
            <p className="text-primary/80 mb-8">
              Join us for an exceptional soundscape experience. Make an enquiry today.
            </p>
            <button
              onClick={handleReserveClick}
              className="w-full py-4 px-6 bg-background hover:bg-primary/90 text-content-primary text-lg font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book a Function Now
            </button>
          </div>
        </div>
      </div>
    </section>
    </ScrollAnimation>
  );
};
export default TableReservation;

import { useState } from 'react';
// import { ImageModal } from './ui/ImageModal';
interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 3-5 business days within Australia. International shipping times may vary."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. International shipping rates and delivery times vary by destination."
    }
    // {
    //     question: "What are the sizes like?",
    //     answer: (
    //       <div className="space-y-4">
    //         <p>You can see the sizes visually here:</p>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //           <ImageModal 
    //             src={TEE_SIZING_IMG} 
    //             alt="Tee Sizing Guide"
    //           >
    //             Tee Sizing Guide
    //           </ImageModal>
    //           <ImageModal 
    //             src={HOODIE_SIZING_IMG} 
    //             alt="Hoodie Sizing Guide"
    //           >
    //             Hoodie Sizing Guide
    //           </ImageModal>
    //         </div>
    //       </div>
    //     )
    //   },
  ];

  return (
    <section id="faq" className="relative bg-background-dark py-16 overflow-visible">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-content-white max-w-2xl mx-auto">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-7">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-2 text-left flex justify-between items-center bg-background hover:bg-background/80 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-medium text-content-primary">
                    {faq.question}
                  </h3>
                  <span className="text-content-primary text-2xl">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-6 pt-2 bg-background/50 text-content-primary">
                    {typeof faq.answer === 'string' ? (
                      <p>{faq.answer}</p>
                    ) : (
                      faq.answer
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
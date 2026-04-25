import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How can I book an appointment at Raddiant Plus Hospital?",
    answer: "You can book an appointment by calling our reception directly, using the 'Book Appointment' button on our website, or visiting our facility in Nashik. We offer both physical and tele-consultation services."
  },
  {
    question: "Do you offer specialized eye care services?",
    answer: "Yes, as a multispecialty and eye care hospital, we provide advanced treatments including Cataract surgery, Lasik, Glaucoma management, and comprehensive retinal exams using state-of-the-art technology."
  },
  {
    question: "What are the visiting hours for patient relatives?",
    answer: "To ensure patient recovery and safety, visiting hours are usually from 11:00 AM to 1:00 PM and 5:00 PM to 7:00 PM. However, these may vary by department, especially in the ICU."
  },
  {
    question: "Does the hospital accept health insurance and TPA?",
    answer: "Yes, Raddiant Plus Hospital is empanelled with most major health insurance providers and TPAs. Please contact our billing desk with your policy details for cashless hospitalization assistance."
  },
  {
    question: "Are emergency services available 24/7?",
    answer: "Absolutely. Our emergency and trauma care unit operates 24/7 with a dedicated team of doctors and advanced life-support ambulances available for the Nashik community."
  }
];

const Faqsection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <HelpCircle size={16} />
              <span>Common Queries</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-slate-400">
              Find quick answers to common questions about our multispecialty and eye care services in Nashik.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className={`group border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'bg-slate-900/50 border-blue-500/30' : 'bg-slate-900/20 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <span className={`font-semibold transition-colors ${openIndex === index ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`text-slate-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-400' : ''}`} 
                    size={20} 
                  />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqsection;
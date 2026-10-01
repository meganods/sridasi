import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import BRAND_INFO from '../data/brandInfo';
import SectionHeader from '../components/ui/SectionHeader';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

export function FAQSection({ onOpenConsultModal }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-20 bg-white border-b border-sridasi-neutral-200 relative overflow-hidden text-left">
      <Container size="lg">
        
        {/* Section Header */}
        <SectionHeader
          badge="Knowledge & Assistance Hub"
          title="Frequently Asked"
          highlightText="Questions"
          description="Everything you need to know about our residential training, 6 bio-formulations, and circular integrated model."
          align="center"
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {BRAND_INFO.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-sridasi-neutral-200/90 overflow-hidden transition-all duration-200 bg-sridasi-surface"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 font-heading font-bold text-sm sm:text-base text-sridasi-forest hover:text-sridasi-green transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-sridasi-primary-100 text-sridasi-forest text-xs font-bold flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 text-sridasi-neutral-500 ${isOpen ? 'rotate-180 text-sridasi-forest' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-sridasi-neutral-700 leading-relaxed border-t border-sridasi-neutral-200/60 animate-fade-in pl-14">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default FAQSection;

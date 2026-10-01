import React from 'react';
import { Star, CheckCircle2, Quote, MapPin, Fish, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Container from '../components/ui/Container';

export function Testimonials() {
  const reviews = [
    {
      name: 'Bhabani Sankar Patra',
      farm: 'Patra Commercial Aqua Hatchery',
      location: 'Balasore, Odisha',
      pondSize: '12 Acres (Pangasius & Carp)',
      rating: 5,
      comment: 'Last monsoon we had sudden bottom sludge fermentation and ammonia spikes. Running an instant AI diagnostic triage and applying Aquamazic Formula saved our whole harvest. 48 hours later, the ammonia dropped to zero!',
      highlight: 'Saved ₹8.5 Lakhs in fingerling stock'
    },
    {
      name: 'Harjinder Singh Sandhu',
      farm: 'Green Valley Integrated Dairy & Ponds',
      location: 'Ludhiana, Punjab',
      pondSize: '6 Acres + 45 Dairy Cows',
      rating: 5,
      comment: 'Using Tribiotic for both our fish ponds and dairy herd has transformed our feed efficiency. Fish mortality is under 2.5%, and our cattle milk fat index rose from 3.8 to 4.4 without synthetic additives.',
      highlight: '+22% Milk Yield & 1.15 Fish FCR'
    },
    {
      name: 'Ananya & Sourav Banerjee',
      farm: 'Sundarbans Organic Floriculture & Fishery',
      location: 'South 24 Parganas, West Bengal',
      pondSize: '4 Acres + Polyhouse Marigolds',
      rating: 5,
      comment: 'The closed-loop design created by the Sridasi founder is pure genius. The nutrient-dense drainage from our fish ponds feeds our export-grade flowers, while Tribiotic Agriculture doubled our bloom diameter.',
      highlight: 'Zero chemical fertilizers used in 2 years'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-sridasi-surface relative overflow-hidden text-left">
      <Container size="lg">
        
        {/* Section Header */}
        <SectionHeader
          badge="Verified Field Results"
          title="Trusted by Over"
          highlightText="4,850+ Farmers & Aqua Enterprises"
          description="Real voices from fish farmers, dairy operators, and floriculture growers experiencing multi-tier abundance."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-sridasi-neutral-200/90 shadow-soft hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Verified Farmer
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-sridasi-neutral-700 leading-relaxed italic">
                  "{r.comment}"
                </p>

                <div className="p-3 rounded-2xl bg-sridasi-leaf-50/70 border border-sridasi-leaf-200/50 text-xs font-bold text-sridasi-forest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sridasi-green" />
                  <span>{r.highlight}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-sridasi-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-sridasi-forest">{r.name}</h4>
                  <p className="text-[11px] text-sridasi-neutral-500">{r.farm}</p>
                </div>
                <div className="text-right text-[11px] text-sridasi-neutral-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sridasi-leaf-600" />
                  <span>{r.location.split(',')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

export default Testimonials;

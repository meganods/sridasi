import React, { useState } from 'react';
import { 
  Waves, 
  Fish, 
  Store, 
  Sprout, 
  CupSoda, 
  HeartPulse, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Info,
  Send
} from 'lucide-react';
import BRAND_INFO from '../data/brandInfo';
import SectionHeader from '../components/ui/SectionHeader';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

const ICON_MAP = {
  Waves,
  Fish,
  Store,
  Sprout,
  CupSoda,
  HeartPulse
};

export function ProductsShowcase({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All 6 Formulations' },
    { id: 'aqua', label: 'Aquaculture Solutions' },
    { id: 'animal', label: 'Livestock & Animals' },
    { id: 'agri', label: 'Agriculture & Floriculture' },
    { id: 'wellness', label: 'Preventive Wellness' },
  ];

  const filteredProducts = BRAND_INFO.products.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'aqua') return p.id.includes('aquamazic') || p.id.includes('market');
    if (activeCategory === 'animal') return p.id.includes('animal');
    if (activeCategory === 'agri') return p.id.includes('agriculture') || p.id.includes('market');
    if (activeCategory === 'wellness') return p.id.includes('curcumin') || p.id.includes('ent');
    return true;
  });

  return (
    <section id="products" className="py-20 bg-sridasi-surface relative overflow-hidden">
      {/* Bio-Glow background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sridasi-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sridasi-water/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Proprietary Bio-Actives & Digital Ecosystem"
          title="Engineered Formulations &"
          highlightText="Market Connect"
          description="From microbial pond oxygenation and multi-species probiotics to farm-to-cup curcumin wellness and market linkages."
          align="center"
        />

        {/* Filter Pills */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-sridasi-neutral-200/90 shadow-soft-sm overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-sridasi-forest text-white shadow-soft'
                    : 'text-sridasi-neutral-600 hover:text-sridasi-forest hover:bg-sridasi-surface'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const IconComponent = ICON_MAP[prod.icon] || Sprout;
            return (
              <div 
                key={prod.id}
                className="rounded-3xl bg-white border border-sridasi-neutral-200/90 hover:border-sridasi-forest/30 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between overflow-hidden group text-left"
              >
                {/* Product Header Bar */}
                <div className="p-6 pb-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-soft transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: prod.color }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="green" size="sm">
                      {prod.badge}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sridasi-leaf-600 block">
                      {prod.category}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-sridasi-forest mt-0.5 group-hover:text-sridasi-green transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs font-medium text-sridasi-neutral-500 italic mt-0.5">
                      "{prod.tagline}"
                    </p>
                  </div>

                  <p className="text-xs text-sridasi-neutral-600 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-2 pt-2 border-t border-sridasi-neutral-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sridasi-neutral-400">
                      Key Highlights & Efficacy
                    </span>
                    {prod.keyBenefits.slice(0, 3).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-sridasi-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-green shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="p-6 pt-3 bg-sridasi-surface/60 border-t border-sridasi-neutral-100 flex items-center justify-between">
                  <div className="text-[11px] text-sridasi-neutral-500">
                    <span className="font-semibold text-sridasi-forest">Ideal for:</span> {prod.audience.split('(')[0]}
                  </div>
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sridasi-forest hover:text-sridasi-green transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Bulk Inquiry & Custom Formulations */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-sridasi-primary-900 to-sridasi-forest text-white shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sridasi-yellow">
              <ShieldCheck className="w-4 h-4" />
              Verified Direct Supply & Quality Guarantee
            </div>
            <h4 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Need Commercial Bulk Supply or Customized Bio-Dosing?
            </h4>
            <p className="text-xs sm:text-sm text-sridasi-primary-200">
              We provide tailored Aquamazic and Tribiotic consignments for commercial aquaculture federations, state hatcheries, and dairy cooperatives.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="gold"
              size="lg"
              onClick={() => onSelectProduct(BRAND_INFO.products[0])}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Request Bulk Quote
            </Button>
          </div>
        </div>

      </Container>
    </section>
  );
}

export default ProductsShowcase;

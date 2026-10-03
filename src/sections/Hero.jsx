import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  Fish, 
  Droplets, 
  CheckCircle2, 
  TrendingUp, 
  ExternalLink,
  RotateCw,
  Sun,
  Layers,
  Award,
  Heart,
  FileText
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Container from '../components/ui/Container';

export function Hero() {
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);

  const farmCycles = [
    {
      title: 'Aquaculture & Pure Water',
      desc: 'Oxygenated ponds with zero-chemical microbial health & nutrient-rich water recycling.',
      tag: 'Water & Aqua Tier',
      icon: Fish,
      color: '#3FA9D8',
      bgClass: 'from-sky-500/20 to-emerald-500/10'
    },
    {
      title: 'Multi-Tier Crops & Orchards',
      desc: 'High-value floriculture, organic turmeric, fruits & soil-enriching cover crops.',
      tag: 'Crops & Floriculture',
      icon: Sprout,
      color: '#4F9D39',
      bgClass: 'from-emerald-500/20 to-lime-500/10'
    },
    {
      title: 'Ethical Livestock & Dairy',
      desc: 'Indigenous cattle, free-range poultry & goats creating rich bio-inputs & daily milk.',
      tag: 'Livestock Synergy',
      icon: Sun,
      color: '#F4C63D',
      bgClass: 'from-amber-500/20 to-yellow-500/10'
    },
    {
      title: 'Tri-Biotic™ Bio-Culture',
      desc: 'Prebiotic + Probiotic + Postbiotic microbial biodiversity converting farm residues into gold.',
      tag: 'Circular Bio-Economy',
      icon: Layers,
      color: '#126B4F',
      bgClass: 'from-teal-500/20 to-emerald-500/10'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCycleIndex((prev) => (prev + 1) % farmCycles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [farmCycles.length]);

  const stats = [
    { label: 'Integrated Ecosystems', value: '100x', highlight: 'Multi-Tier Abundance' },
    { label: 'Farm Survival Rate', value: '98.4%', highlight: '+24% vs Conventional' },
    { label: 'Proprietary Formulations', value: '6', highlight: 'Bio-Organic & Wellness' },
    { label: 'Circular Waste Offset', value: '100%', highlight: 'Zero Chemical Footprint' },
  ];

  const currentCycle = farmCycles[activeCycleIndex];
  const CycleIcon = currentCycle.icon;

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-sridasi-primary-50/60 via-sridasi-surface to-sridasi-surface">
      {/* Background Decorative Bio-Light Flares */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sridasi-water/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-sridasi-green/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 left-1/3 w-[500px] h-[300px] bg-sridasi-gold/10 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Subtle Grid Watermark Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-0" 
        style={{ backgroundImage: 'radial-gradient(#0B5D45 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <Container size="lg" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sridasi-primary-200/80 shadow-soft-sm backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sridasi-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sridasi-green"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-sridasi-forest">
              Integrated Natural Farming • One Farm • One Ecosystem
            </span>
          </div>

          {/* Main Headline */}
          <div className="py-1">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] text-sridasi-forest leading-[1.15] tracking-tight">
              Elevating Natural Farming with <br className="hidden sm:block" />
              <span className="relative inline-block pb-1 text-transparent bg-clip-text bg-gradient-to-r from-sridasi-forest via-sridasi-leaf-600 to-sridasi-water">
                Integrated Bio-Synergy
              </span>{' '}
              & Living Culture.
            </h1>
          </div>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg lg:text-xl text-sridasi-neutral-700 max-w-3xl leading-relaxed">
            <strong className="font-semibold text-sridasi-forest">Sridasi Farms & Organics</strong> unites 
            sustainable aquaculture, livestock harmony, organic floriculture, and proprietary bio-formulations like <em>Aquamazic</em> & <em>Tribiotic</em> for continuous year-round abundance.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="/training-registration"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-sridasi-forest hover:bg-sridasi-dark text-white font-heading font-extrabold text-sm shadow-soft-md shadow-sridasi-forest/20 transition-all flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#training-program"
              className="px-6 py-4 rounded-2xl bg-sridasi-leaf-100 hover:bg-sridasi-leaf-200 text-sridasi-forest font-heading font-bold text-sm border border-sridasi-leaf-300 transition-all flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-sridasi-green" />
              <span>3-Day Training Programme</span>
            </a>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              leftIcon={<Sparkles className="w-4 h-4 text-sridasi-gold-600" />}
            >
              Explore 6 Products
            </Button>
          </div>

          {/* Quick Trust Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-sm text-sridasi-neutral-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sridasi-green" />
              <span>Multiple Income Streams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sridasi-green" />
              <span>Zero Chemical Waste</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sridasi-green" />
              <span>Traditional Living Heritage</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner of Key Numbers */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white/90 border border-sridasi-neutral-200/80 shadow-soft-sm hover:shadow-soft transition-all duration-300 text-left"
            >
              <div className="text-xs font-medium text-sridasi-neutral-600 mb-1">{item.label}</div>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-sridasi-forest tracking-tight">
                {item.value}
              </div>
              <div className="text-[11px] font-semibold text-sridasi-leaf-600 mt-1">
                {item.highlight}
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

export default Hero;

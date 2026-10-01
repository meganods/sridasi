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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-sridasi-primary-50/60 via-sridasi-surface to-sridasi-surface">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
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

            {/* Main Headline (with ample line-height and bottom padding so letters like 'g' & 'y' are NEVER cut off) */}
            <div className="py-1">
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-sridasi-forest leading-[1.24] tracking-tight">
                Elevating Natural Farming with{' '}
                <span className="relative inline-block pb-1 text-transparent bg-clip-text bg-gradient-to-r from-sridasi-forest via-sridasi-leaf-600 to-sridasi-water">
                  Integrated Bio-Synergy
                </span>{' '}
                & Living Culture.
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-sridasi-neutral-700 max-w-2xl leading-relaxed">
              <strong className="font-semibold text-sridasi-forest">Sridasi Farms & Organics</strong> unites 
              sustainable aquaculture, livestock harmony, organic floriculture, and proprietary bio-formulations like <em>Aquamazic</em> & <em>Tribiotic</em> for continuous year-round abundance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="/training-registration"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-sridasi-forest hover:bg-sridasi-dark text-white font-heading font-extrabold text-sm shadow-soft-md shadow-sridasi-forest/20 transition-all flex items-center gap-2 group"
              >
                <span>Get Started</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#training-program"
                className="px-5 py-3.5 rounded-2xl bg-sridasi-leaf-100 hover:bg-sridasi-leaf-200 text-sridasi-forest font-heading font-bold text-sm border border-sridasi-leaf-300 transition-all flex items-center gap-2"
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
            <div className="pt-4 border-t border-sridasi-neutral-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-sridasi-neutral-600 font-medium">
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

          {/* Right Column: Animated Integrated Farming & Culture Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Soft Organic Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sridasi-green/25 via-sridasi-gold/20 to-sridasi-water/25 rounded-4xl blur-xl opacity-80 animate-pulse-subtle" />

            {/* Main Interactive Farm & Culture Showcase Card */}
            <div className="relative rounded-4xl bg-white/95 border border-sridasi-neutral-200/90 shadow-soft-lg p-6 sm:p-7 backdrop-blur-xl overflow-hidden text-left space-y-5">
              
              {/* Top Banner */}
              <div className="flex items-center justify-between pb-4 border-b border-sridasi-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sridasi-primary-100 text-sridasi-forest flex items-center justify-center font-bold shadow-soft-sm">
                    <Sprout className="w-6 h-6 text-sridasi-green" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-sridasi-forest">The Living Farm Matrix</h4>
                    <p className="text-[11px] text-sridasi-leaf-700 font-medium">One Connected Living Bio-Ecosystem</p>
                  </div>
                </div>

                <Badge variant="green" size="sm">
                  ● Circular Loop Active
                </Badge>
              </div>

              {/* Animated Central Bio-Cycle Stage */}
              <div className={`p-5 rounded-3xl bg-gradient-to-br ${currentCycle.bgClass} border border-sridasi-neutral-200 transition-all duration-500 relative overflow-hidden`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/90 text-sridasi-forest shadow-soft-sm">
                    {currentCycle.tag}
                  </span>
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-soft"
                    style={{ backgroundColor: currentCycle.color }}
                  >
                    <CycleIcon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-sridasi-forest mb-1">
                  {currentCycle.title}
                </h3>
                <p className="text-xs text-sridasi-neutral-700 leading-relaxed font-medium">
                  {currentCycle.desc}
                </p>

                {/* Micro indicators */}
                <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-sridasi-neutral-200/60">
                  {farmCycles.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCycleIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeCycleIndex === i ? 'w-6 bg-sridasi-forest' : 'w-2 bg-sridasi-neutral-300 hover:bg-sridasi-neutral-400'
                      }`}
                      aria-label={`Cycle ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Cultural Pillars Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/90 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-sridasi-forest text-[11px]">100% Chemical Free</span>
                </div>
                <div className="p-3 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/90 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-sridasi-forest text-[11px]">Zero Farm Waste</span>
                </div>
                <div className="p-3 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/90 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="font-semibold text-sridasi-forest text-[11px]">Water Recirculation</span>
                </div>
                <div className="p-3 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/90 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="font-semibold text-sridasi-forest text-[11px]">Multiple Revenue Streams</span>
                </div>
              </div>

              {/* Training Course Quick Prompt */}
              <div className="p-3.5 rounded-2xl bg-sridasi-forest text-white flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-bold text-sridasi-yellow">3-Day Residential Course</div>
                  <div className="text-[11px] text-sridasi-leaf-200">Live farm visit & hands-on practice</div>
                </div>
                <a
                  href="/training-registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-sridasi-yellow text-sridasi-forest font-heading font-bold text-xs hover:bg-yellow-300 transition-colors shrink-0"
                >
                  Register
                </a>
              </div>

            </div>

            {/* Floating Cultural Motto Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 rounded-2xl p-3 shadow-soft-lg border border-sridasi-neutral-200/90 items-center gap-2.5 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-sridasi-yellow text-sridasi-forest flex items-center justify-center font-bold">
                <Heart className="w-4 h-4 fill-sridasi-forest" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-sridasi-forest">Healthy Food • Healthy People</div>
                <div className="text-[10px] text-sridasi-leaf-700">A Greener Tomorrow</div>
              </div>
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

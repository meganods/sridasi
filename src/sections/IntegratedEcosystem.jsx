import React, { useState } from 'react';
import { 
  Waves, 
  Droplets, 
  Sprout, 
  Leaf, 
  Sparkles, 
  RotateCw, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sun,
  Activity
} from 'lucide-react';
import BRAND_INFO from '../data/brandInfo';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Container from '../components/ui/Container';

const TIER_ICONS = {
  Waves,
  Droplets,
  Sprout,
  Leaf
};

export function IntegratedEcosystem() {
  const [activeTier, setActiveTier] = useState(0);

  const tiers = BRAND_INFO.ecosystemTiers;
  const current = tiers[activeTier];
  const IconComponent = TIER_ICONS[current.icon] || Waves;

  return (
    <section id="ecosystem" className="py-20 bg-white border-b border-sridasi-neutral-200 relative overflow-hidden">
      {/* Background Circular Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-sridasi-green/10 rounded-full pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-sridasi-water/15 rounded-full pointer-events-none -z-0" />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Architectural Bio-Synergy"
          title="The Integrated"
          highlightText="Circular Farm Blueprint"
          description="A regenerative multi-tier model where fish farming, poultry, livestock, and floriculture connect in a zero-waste loop."
          align="center"
        />

        {/* Circular Loop Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {tiers.map((t, idx) => {
            const TierIcon = TIER_ICONS[t.icon] || Waves;
            const isActive = activeTier === idx;
            return (
              <button
                key={t.step}
                onClick={() => setActiveTier(idx)}
                className={`p-4 rounded-3xl border text-left transition-all duration-300 flex items-start gap-3 ${
                  isActive
                    ? 'border-sridasi-forest bg-sridasi-primary-50 ring-2 ring-sridasi-forest/20 shadow-soft'
                    : 'border-sridasi-neutral-200 bg-sridasi-surface hover:bg-white'
                }`}
              >
                <div 
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isActive ? 'bg-sridasi-forest text-white' : 'bg-white text-sridasi-forest border border-sridasi-neutral-200'
                  }`}
                >
                  {t.step}
                </div>
                <div className="truncate">
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-sridasi-forest truncate">{t.title}</h4>
                  <span className="text-[11px] text-sridasi-neutral-500 block truncate">{t.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of the Active Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-4xl bg-gradient-to-br from-sridasi-surface to-white border border-sridasi-neutral-200 shadow-soft-lg text-left">
          
          {/* Left: Info Card */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sridasi-primary-100 text-sridasi-forest">
                TIER {current.step} OF 04
              </span>
              <Badge variant="green" size="sm">
                Zero-Waste Node
              </Badge>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-sridasi-forest leading-tight">
              {current.title}: <span className="text-sridasi-green">{current.subtitle}</span>
            </h3>

            <p className="text-sm sm:text-base text-sridasi-neutral-700 leading-relaxed">
              {current.description}
            </p>

            {/* Circular Conversion Factoids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-sridasi-neutral-200">
                <div className="flex items-center gap-2 text-xs font-bold text-sridasi-forest mb-1">
                  <RotateCw className="w-4 h-4 text-sridasi-green" />
                  <span>Input Synergy</span>
                </div>
                <p className="text-xs text-sridasi-neutral-600">
                  {idxToInput(activeTier)}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-sridasi-neutral-200">
                <div className="flex items-center gap-2 text-xs font-bold text-sridasi-forest mb-1">
                  <Sun className="w-4 h-4 text-sridasi-yellow" />
                  <span>Output Value</span>
                </div>
                <p className="text-xs text-sridasi-neutral-600">
                  {idxToOutput(activeTier)}
                </p>
              </div>
            </div>

            {/* Next Step Nav */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setActiveTier((activeTier + 1) % tiers.length)}
                className="inline-flex items-center gap-2 text-xs font-bold text-sridasi-forest hover:text-sridasi-green transition-colors"
              >
                <span>Explore Next Synergy Tier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Graphic Card Diagram */}
          <div className="lg:col-span-5 relative">
            <div className="p-8 rounded-3xl bg-sridasi-forest text-white shadow-soft-lg space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sridasi-green/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-sridasi-yellow flex items-center justify-center backdrop-blur-md">
                <IconComponent className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-sridasi-leaf-300">
                  Circular Efficiency Ratio
                </span>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {activeTier === 0 ? '98.4% Fish Survival' : activeTier === 1 ? '100% Water Recycled' : activeTier === 2 ? '0% Chemical Fertilizers' : '100% Organic Manure'}
                </div>
                <p className="text-xs text-sridasi-primary-100">
                  Every gram of biological output from Tier {current.step} directly enriches the next operational cycle.
                </p>
              </div>

              <div className="pt-4 border-t border-sridasi-primary-700 space-y-2 text-xs">
                <div className="flex items-center justify-between text-sridasi-leaf-200">
                  <span>Carbon Offset Index</span>
                  <span className="font-bold text-white">Negative Footprint</span>
                </div>
                <div className="flex items-center justify-between text-sridasi-leaf-200">
                  <span>Big Data Analytics</span>
                  <span className="font-bold text-white">Continuous AI Telemetry</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}

function idxToInput(idx) {
  switch (idx) {
    case 0: return 'Microbial probiotics & natural farm-grown feeds with Aquamazic aeration.';
    case 1: return 'Gravity-fed pond bio-drainage containing dissolved organic nitrates.';
    case 2: return 'Nitrate-rich bio-effluent combined with Tribiotic Agriculture bio-stimulants.';
    case 3: return 'Vegetable greens, crop foliage & farm grains consumed by livestock.';
    default: return 'Natural bio-inputs.';
  }
}

function idxToOutput(idx) {
  switch (idx) {
    case 0: return 'Export-grade healthy fish & nutrient-dense bio-water for irrigation.';
    case 1: return 'Clean filtered ground recharge and optimal soil enrichment.';
    case 2: return 'Export-quality floriculture, high-curcumin turmeric & organic fruits.';
    case 3: return 'Nutrient-packed eggs, goat meat, pure dairy, and nitrogenous bio-manure.';
    default: return 'Sustainable organic harvest.';
  }
}

export default IntegratedEcosystem;

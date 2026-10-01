import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Fish, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

export function AquaCalculator({ onOpenConsultModal }) {
  const [pondAcres, setPondAcres] = useState(2.0);
  const [species, setSpecies] = useState('rohu_catla'); // 'rohu_catla' | 'pangasius' | 'tilapia'
  const [currentMortality, setCurrentMortality] = useState(18); // percentage

  // Calculation parameters
  const stockingPerAcre = species === 'pangasius' ? 25000 : species === 'tilapia' ? 20000 : 10000;
  const avgMarketPricePerKg = species === 'pangasius' ? 120 : species === 'tilapia' ? 140 : 180;
  const targetHarvestWeightKg = species === 'pangasius' ? 1.2 : species === 'tilapia' ? 0.6 : 1.0;

  const totalStock = Math.round(pondAcres * stockingPerAcre);
  
  // With standard mortality
  const standardHarvestFish = Math.round(totalStock * (1 - currentMortality / 100));
  const standardYieldKg = Math.round(standardHarvestFish * targetHarvestWeightKg);
  const standardRevenue = standardYieldKg * avgMarketPricePerKg;

  // With Sridasi Tribiotic + Aquamazic (mortality drops to < 3%)
  const sridasiMortality = 3;
  const sridasiHarvestFish = Math.round(totalStock * (1 - sridasiMortality / 100));
  const sridasiYieldKg = Math.round(sridasiHarvestFish * targetHarvestWeightKg);
  const sridasiRevenue = sridasiYieldKg * avgMarketPricePerKg;

  const extraBiomassKg = sridasiYieldKg - standardYieldKg;
  const additionalProfit = sridasiRevenue - standardRevenue;

  return (
    <section id="calculator" className="py-20 bg-white border-b border-sridasi-neutral-200 relative overflow-hidden text-left">
      <Container size="lg">
        
        {/* Section Header */}
        <SectionHeader
          badge="Interactive ROI & Biomass Estimator"
          title="Calculate Your"
          highlightText="Pond Survival & Profit Boost"
          description="See the projected increase in harvest yield and revenue when implementing Sridasi Aquamazic & Tribiotic biological protocols."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Input Sliders */}
          <div className="lg:col-span-6 p-8 rounded-4xl bg-sridasi-surface border border-sridasi-neutral-200 shadow-soft space-y-6">
            
            <div className="flex items-center gap-3 pb-3 border-b border-sridasi-neutral-200">
              <div className="w-10 h-10 rounded-2xl bg-sridasi-primary-100 text-sridasi-forest flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5 text-sridasi-forest" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-sridasi-forest">Pond Parameters Simulator</h4>
                <p className="text-xs text-sridasi-neutral-500">Adjust sliders to mirror your current aquaculture setup</p>
              </div>
            </div>

            {/* Slider 1: Pond Area */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-sridasi-forest">
                <span>Total Pond Water Area (Acres)</span>
                <span className="text-sridasi-green text-sm">{pondAcres} Acres</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={pondAcres}
                onChange={(e) => setPondAcres(parseFloat(e.target.value))}
                className="w-full h-2 bg-sridasi-neutral-200 rounded-lg appearance-none cursor-pointer accent-sridasi-forest"
              />
              <div className="flex justify-between text-[10px] text-sridasi-neutral-400">
                <span>0.5 Acre</span>
                <span>5 Acres</span>
                <span>10 Acres</span>
              </div>
            </div>

            {/* Select 2: Fish Species */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-sridasi-forest">Primary Culture Species</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSpecies('rohu_catla')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    species === 'rohu_catla' ? 'bg-sridasi-forest text-white shadow-soft-sm' : 'bg-white text-sridasi-neutral-700 border border-sridasi-neutral-200'
                  }`}
                >
                  Rohu & Catla (IMC)
                </button>
                <button
                  onClick={() => setSpecies('pangasius')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    species === 'pangasius' ? 'bg-sridasi-forest text-white shadow-soft-sm' : 'bg-white text-sridasi-neutral-700 border border-sridasi-neutral-200'
                  }`}
                >
                  Pangasius (Basa)
                </button>
                <button
                  onClick={() => setSpecies('tilapia')}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                    species === 'tilapia' ? 'bg-sridasi-forest text-white shadow-soft-sm' : 'bg-white text-sridasi-neutral-700 border border-sridasi-neutral-200'
                  }`}
                >
                  Nile Tilapia
                </button>
              </div>
            </div>

            {/* Slider 3: Current Mortality Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-sridasi-forest">
                <span>Current Estimated Mortality Rate</span>
                <span className="text-red-600 text-sm font-bold">{currentMortality}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={currentMortality}
                onChange={(e) => setCurrentMortality(parseInt(e.target.value))}
                className="w-full h-2 bg-sridasi-neutral-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-sridasi-neutral-400">
                <span>5% (Low)</span>
                <span>18% (Avg Farm)</span>
                <span>35% (Severe Outbreak)</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-sridasi-neutral-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sridasi-green" />
              <span>Calculations based on verified field trials across 4,800+ partner ponds.</span>
            </div>

          </div>

          {/* Right: Real-time ROI Output Card */}
          <div className="lg:col-span-6 p-8 rounded-4xl bg-gradient-to-br from-sridasi-forest via-sridasi-dark to-sridasi-primary-950 text-white shadow-soft-lg space-y-6 relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-sridasi-primary-700">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sridasi-leaf-300">
                  Projected Gain Per Harvest Cycle
                </span>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Sridasi Bio-Efficiency Advantage
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sridasi-yellow text-sridasi-forest">
                +{(currentMortality - sridasiMortality)}% Survival Gain
              </span>
            </div>

            {/* Big Numbers Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-[11px] text-sridasi-primary-200 font-semibold block mb-1">
                  Extra Biomass Produced
                </span>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  +{extraBiomassKg.toLocaleString()} <span className="text-sm font-normal text-sridasi-leaf-300">Kg</span>
                </div>
                <span className="text-[10px] text-sridasi-leaf-200">from prevented mortality</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <span className="text-[11px] text-sridasi-primary-200 font-semibold block mb-1">
                  Net Additional Revenue
                </span>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-sridasi-yellow">
                  +₹{additionalProfit.toLocaleString()}
                </div>
                <span className="text-[10px] text-sridasi-leaf-200">per cultivation season</span>
              </div>
            </div>

            {/* Protocol breakdown */}
            <div className="space-y-2 text-xs text-sridasi-primary-100">
              <div className="flex justify-between pb-1 border-b border-sridasi-primary-800">
                <span>Total Fingerlings Stocked:</span>
                <span className="font-bold text-white">{totalStock.toLocaleString()} fish</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-sridasi-primary-800">
                <span>Estimated Feed Conversion (FCR) Improvement:</span>
                <span className="font-bold text-sridasi-leaf-300">1.45 → 1.18 (-18% Feed Cost)</span>
              </div>
              <div className="flex justify-between">
                <span>Recommended Bio-Pack:</span>
                <span className="font-bold text-sridasi-yellow">Aquamazic (2L) + Tribiotic Aqua (5Kg)</span>
              </div>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default AquaCalculator;

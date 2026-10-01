import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  Layers, 
  RotateCw, 
  Compass, 
  Users, 
  Target, 
  TrendingUp,
  Award,
  BookOpen,
  MapPin,
  HelpCircle,
  Fish,
  Egg,
  Milk,
  Droplets,
  Package,
  Sprout
} from 'lucide-react';
import BRAND_INFO from '../data/brandInfo';
import SectionHeader from '../components/ui/SectionHeader';
import Container from '../components/ui/Container';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export function TrainingProgramSection() {
  const [activeDay, setActiveDay] = useState(0); // 0: Day 1, 1: Day 2, 2: Day 3
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' | 'valuechain' | 'ecosystem' | 'audience'

  const prog = BRAND_INFO.trainingProgramme;
  const currentDayData = prog.schedule[activeDay];

  return (
    <section id="training-program" className="py-20 bg-gradient-to-b from-white via-sridasi-surface to-white border-b border-sridasi-neutral-200 relative overflow-hidden text-left">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-sridasi-leaf-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-sridasi-gold-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="lg" className="relative z-10">
        
        {/* Organization Subhead Badge */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sridasi-primary-50 border border-sridasi-primary-200 text-xs font-bold text-sridasi-forest">
            <Sparkles className="w-3.5 h-3.5 text-sridasi-yellow" />
            <span>{BRAND_INFO.orgFullName}</span>
          </div>
        </div>

        {/* Section Header */}
        <SectionHeader
          badge="3-Day Residential Training Course"
          title="100 Times More Profitable"
          highlightText="Integrated Natural Farming™ Method"
          description="Theory • Practical • Self-Practice • Live Farm Visit • Farm Business Planning. Don't just learn farming — experience it."
          align="center"
        />

        {/* Massive Highlight CTA Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sridasi-forest via-sridasi-dark to-sridasi-primary-950 text-white shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sridasi-yellow text-sridasi-forest">
                Next Residential Batch Enrolling
              </span>
              <span className="text-xs text-sridasi-leaf-200 font-semibold">
                ● Limited to 25 Participants
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              One Farm • One Ecosystem • Multiple Income Streams
            </h3>
            <p className="text-xs sm:text-sm text-sridasi-primary-100 leading-relaxed">
              Fill out the <strong>Farmer Registration & Project Assessment Form</strong> to secure your seat and receive your custom land & water feasibility assessment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
            <a
              href="/training-registration"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-sridasi-yellow text-sridasi-forest font-heading font-extrabold text-sm hover:bg-yellow-300 transition-all shadow-soft flex items-center justify-center gap-2 group"
            >
              <span>Open Registration Form</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Concept Introduction & Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left: "Imagine a Different Kind of Farm" Card */}
          <div className="lg:col-span-6 p-8 rounded-4xl bg-white border border-sridasi-neutral-200 shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sridasi-leaf-600">
                <Compass className="w-4 h-4" />
                The Core Vision
              </div>

              <h3 className="font-heading font-bold text-2xl text-sridasi-forest leading-snug">
                Imagine a Different Kind of Farm.
              </h3>

              <p className="text-sm text-sridasi-neutral-700 leading-relaxed">
                "{prog.visionQuote}"
              </p>

              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 text-xs text-sridasi-forest space-y-2">
                <div className="font-bold text-sridasi-green">
                  Why "100 Times More Profitable"?
                </div>
                <p className="text-sridasi-neutral-600 text-[11px] leading-relaxed">
                  "100 TIMES MORE PROFITABLE™ IS A VISION — NOT A GUARANTEE." The concept focuses on unlocking multi-stream farm economics rather than gambling on a single crop or pond.
                </p>
              </div>
            </div>

            {/* Bullets */}
            <div className="grid grid-cols-2 gap-2 text-xs text-sridasi-neutral-700">
              {prog.why100Times.slice(0, 6).map((pt, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-green shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Traditional vs Integrated Natural Farming Contrast */}
          <div className="lg:col-span-6 p-8 rounded-4xl bg-gradient-to-br from-sridasi-primary-900 to-sridasi-forest text-white shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sridasi-yellow">
                A New Way to Look at Farming
              </span>
              <h3 className="font-heading font-bold text-2xl text-white">
                Don't Just Farm — Build a Farm Business.
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-300">
                    Traditional Farming
                  </div>
                  <p className="text-xs text-sridasi-primary-100 leading-relaxed">
                    Often looks at each farming activity separately. High input costs, vulnerable to single-market price crashes, and high waste.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Integrated Natural Farming
                  </div>
                  <p className="text-xs text-sridasi-primary-100 leading-relaxed">
                    Looks at the whole farm as one connected system, where different activities actively support and nourish one another.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-sridasi-primary-100 flex items-center justify-between">
              <span>Start Small. Think Big. Build Step by Step.</span>
              <span className="text-sridasi-yellow font-bold">Learn → Build → Measure → Improve → Grow</span>
            </div>
          </div>

        </div>

        {/* Sub-Tab Navigation (Detailed Schedule vs Value Chain vs 10 Ecosystem Nodes) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/90 shadow-soft-sm overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all ${
                activeTab === 'schedule' ? 'bg-sridasi-forest text-white shadow-soft' : 'text-sridasi-neutral-600 hover:text-sridasi-forest hover:bg-white'
              }`}
            >
              📅 3-Day Hourly Agenda
            </button>
            <button
              onClick={() => setActiveTab('ecosystem')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all ${
                activeTab === 'ecosystem' ? 'bg-sridasi-forest text-white shadow-soft' : 'text-sridasi-neutral-600 hover:text-sridasi-forest hover:bg-white'
              }`}
            >
              🔄 10 Integrated Farm Nodes
            </button>
            <button
              onClick={() => setActiveTab('valuechain')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all ${
                activeTab === 'valuechain' ? 'bg-sridasi-forest text-white shadow-soft' : 'text-sridasi-neutral-600 hover:text-sridasi-forest hover:bg-white'
              }`}
            >
              📊 Integrated Farm Value Chain
            </button>
            <button
              onClick={() => setActiveTab('audience')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all ${
                activeTab === 'audience' ? 'bg-sridasi-forest text-white shadow-soft' : 'text-sridasi-neutral-600 hover:text-sridasi-forest hover:bg-white'
              }`}
            >
              👥 Who Should Join?
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUBTAB 1: DETAILED 3-DAY SCHEDULE                                          */}
        {/* ========================================================================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fade-in">
            {/* Day Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {prog.schedule.map((s, idx) => (
                <button
                  key={s.day}
                  onClick={() => setActiveDay(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    activeDay === idx
                      ? 'border-sridasi-forest bg-sridasi-primary-50 ring-2 ring-sridasi-forest/20 shadow-soft'
                      : 'border-sridasi-neutral-200 bg-white hover:bg-sridasi-surface'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sridasi-leaf-600 block">
                    {s.day}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-sridasi-forest">{s.title}</h4>
                  <p className="text-[11px] text-sridasi-neutral-500 mt-0.5">{s.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Schedule Timetable Box */}
            <div className="rounded-3xl bg-white border border-sridasi-neutral-200 shadow-soft overflow-hidden">
              <div className="p-5 bg-sridasi-forest text-white flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sridasi-yellow">
                    {currentDayData.day} • {currentDayData.title}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-white mt-0.5">
                    {currentDayData.subtitle}
                  </h4>
                </div>
                <Badge variant="gold" size="sm">
                  {currentDayData.sessions.length} Interactive Modules
                </Badge>
              </div>

              <div className="divide-y divide-sridasi-neutral-100">
                {currentDayData.sessions.map((sess, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-sridasi-surface/60 transition-colors">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="shrink-0 whitespace-nowrap font-mono font-bold text-xs text-sridasi-forest bg-sridasi-primary-50 px-3 py-1.5 rounded-xl border border-sridasi-primary-100 text-center">
                        {sess.time}
                      </div>
                      <div>
                        <h5 className="font-heading font-bold text-sm text-sridasi-forest">{sess.title}</h5>
                        <p className="text-xs text-sridasi-neutral-600 mt-0.5">{sess.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 2: 10 INTEGRATED ECOSYSTEM NODES                                    */}
        {/* ========================================================================= */}
        {activeTab === 'ecosystem' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
            {prog.ecosystemComponents.map((comp) => (
              <div 
                key={comp.id}
                className="p-5 rounded-3xl bg-white border border-sridasi-neutral-200 hover:border-sridasi-forest/30 shadow-soft-sm hover:shadow-soft transition-all duration-300 text-left space-y-3"
              >
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-soft"
                  style={{ backgroundColor: comp.color }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-sridasi-forest">{comp.name}</h4>
                  <p className="text-xs text-sridasi-neutral-600 mt-1 leading-snug">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 3: VALUE CHAIN                                                     */}
        {/* ========================================================================= */}
        {activeTab === 'valuechain' && (
          <div className="p-8 rounded-4xl bg-white border border-sridasi-neutral-200 shadow-soft space-y-6 animate-fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sridasi-leaf-600">
                From Farm Resources → To Farm Value
              </span>
              <h4 className="font-heading font-bold text-xl text-sridasi-forest">
                The 9-Stage Integrated Farm Value Chain
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
              {prog.valueChainSteps.map((step) => (
                <div key={step.num} className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-sridasi-forest text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-sridasi-forest">{step.name}</h5>
                    <p className="text-[11px] text-sridasi-neutral-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 4: WHO SHOULD JOIN                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'audience' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            {prog.whoShouldJoin.map((w, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border border-sridasi-neutral-200 shadow-soft-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-sridasi-primary-100 text-sridasi-forest flex items-center justify-center font-bold shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-sm text-sridasi-forest">{w.role}</h5>
                  <p className="text-xs text-sridasi-neutral-600 mt-0.5">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA to open Registration Form in New Tab */}
        <div className="mt-12 text-center">
          <a
            href="/training-registration"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-sridasi-forest text-white font-heading font-bold text-base hover:bg-sridasi-dark shadow-soft-lg hover:shadow-soft-md transition-all group"
          >
            <span>Complete Farmer Registration & Assessment Form</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>
          <p className="text-xs text-sridasi-neutral-500 mt-2">
            3-Day Residential Programme • Theory, Live Water Testing, Farm Visit & Business Plan Included
          </p>
        </div>

      </Container>
    </section>
  );
}

export default TrainingProgramSection;

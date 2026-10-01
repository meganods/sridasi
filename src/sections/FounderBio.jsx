import React from 'react';
import { 
  Compass, 
  HeartHandshake, 
  Sprout, 
  Lightbulb, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import BRAND_INFO from '../data/brandInfo';
import SectionHeader from '../components/ui/SectionHeader';
import Container from '../components/ui/Container';
import Badge from '../components/ui/Badge';

export function FounderBio({ onOpenConsultModal }) {
  const founder = BRAND_INFO.founder;

  return (
    <section id="about" className="py-20 bg-sridasi-surface relative overflow-hidden text-left">
      {/* Background Subtle Gradient Flares */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-sridasi-primary-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sridasi-gold/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Vision & Leadership"
          title="The Architect Behind the"
          highlightText="Blue Revolution & Circular Farm"
          description="Bridging architectural precision, preventive wellness, and ecological data to create practical grassroots abundance."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Founder Graphic Card & Philosophy Blueprint */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-4xl bg-gradient-to-br from-sridasi-forest via-sridasi-dark to-sridasi-primary-950 text-white p-8 shadow-soft-lg relative overflow-hidden">
              
              {/* Architecture grid overlay */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '16px 16px' }}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-sridasi-yellow text-sridasi-forest flex items-center justify-center font-bold shadow-soft">
                    <Compass className="w-7 h-7" />
                  </div>
                  <Badge variant="gold" size="sm">
                    Architect & Innovator
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-sridasi-leaf-300 font-bold">
                    FOUNDER PROFILE
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    {founder.title}
                  </h3>
                  <p className="text-xs text-sridasi-primary-200">
                    {founder.role}
                  </p>
                </div>

                <blockquote className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-sridasi-primary-100 italic leading-relaxed">
                  "Rather than limiting oneself to conventional professional boundaries, true sustainable innovation happens when spatial design, microbiology, and big data intersect at the soil and pond."
                </blockquote>

                {/* Multidisciplinary Pillars */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sridasi-primary-700 text-xs">
                  <div className="flex items-center gap-1.5 text-sridasi-leaf-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-yellow shrink-0" />
                    <span>Spatial Blueprinting</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sridasi-leaf-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-yellow shrink-0" />
                    <span>Holistic Wellness</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sridasi-leaf-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-yellow shrink-0" />
                    <span>Aquaculture Tech</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sridasi-leaf-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-yellow shrink-0" />
                    <span>Livestock Synergy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story & Vision */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sridasi-leaf-600">
                A Journey Driven by Purpose & Holistic Health
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-sridasi-forest leading-snug">
                From Designing Structures to Architecting Living Biological Ecosystems
              </h3>
            </div>

            <div className="space-y-4 text-sm text-sridasi-neutral-700 leading-relaxed">
              <p>
                {founder.bio}
              </p>
              <p>
                {founder.integratedModel}
              </p>
              <p>
                {founder.ecosystemHighlight}
              </p>
              <div className="p-4 rounded-2xl bg-white border border-sridasi-neutral-200/90 shadow-soft-sm text-xs text-sridasi-forest font-medium">
                <strong className="block font-bold text-sridasi-green mb-1">What Sets Sridasi Apart:</strong>
                {founder.keyDistinction}
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BRAND_INFO.values.map((v, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-sridasi-neutral-200 shadow-soft-sm">
                  <div className="font-heading font-bold text-xs text-sridasi-forest mb-1">
                    {v.title}
                  </div>
                  <p className="text-[11px] text-sridasi-neutral-600 leading-normal">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default FounderBio;

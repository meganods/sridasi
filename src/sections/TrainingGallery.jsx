import React from 'react';
import { Users, Utensils, BookOpen, Sparkles, CheckCircle2, ArrowRight, ExternalLink, Camera } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Container from '../components/ui/Container';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

// Real trainee photos
import traineesSessionImg from '../assets/gallery/trainees_session.jpg';
import traineesLunchImg from '../assets/gallery/trainees_lunch.jpg';

export function TrainingGallery() {
  const galleryItems = [
    {
      image: traineesSessionImg,
      badge: 'Day 1 & Day 2 • Live Classroom & Strategy',
      icon: BookOpen,
      iconColor: 'bg-emerald-600',
      title: 'Interactive Farm Planning & Ecosystem Theory',
      description: 'Progressive farmers and entrepreneurs attending the "100 Times More Profitable Integrated Natural Farming™" orientation. Hands-on strategy covering water management, livestock integration, and farm-made feeds.',
      highlights: [
        'Live spatial blueprinting & plot zoning',
        'Bio-chemistry & Tri-Biotic™ dosing protocols',
        'Direct mentorship with our founder & agronomists'
      ]
    },
    {
      image: traineesLunchImg,
      badge: 'Residential Experience • Farm-To-Table Lunch',
      icon: Utensils,
      iconColor: 'bg-amber-600',
      title: 'Nutritious Organic Meals & Peer Networking',
      description: 'Participants enjoying wholesome, estate-grown organic meals and Curcumin tea breaks while exchanging field insights, regional challenges, and multi-stream business ideas across different states.',
      highlights: [
        '100% natural farm-fresh cuisine included',
        'Cross-state networking with fellow progressive farmers',
        'Informal peer discussions & evening brainstorming'
      ]
    }
  ];

  return (
    <section id="training-glimpses" className="py-20 bg-sridasi-surface border-b border-sridasi-neutral-200 relative overflow-hidden text-left">
      {/* Background Ambience */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-sridasi-primary-100/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-sridasi-gold/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Live Training Glimpses & On-Site Experience"
          title="Real Moments from Our"
          highlightText="Residential Training Batches"
          description="From in-depth classroom blueprints and bio-formulation workshops to organic farm dining and peer networking — see how trainees experience our 3-Day Residential Course."
          align="center"
        />

        {/* 2-Column Photo Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {galleryItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="group rounded-4xl bg-white border border-sridasi-neutral-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Photo Container with zoom effect */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-sridasi-neutral-100">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-soft">
                      <Camera className="w-3.5 h-3.5 text-sridasi-yellow" />
                      <span>{item.badge}</span>
                    </span>
                  </div>

                  {/* Corner Icon */}
                  <div className="absolute bottom-4 right-4">
                    <div className={`w-11 h-11 rounded-2xl ${item.iconColor} text-white flex items-center justify-center shadow-soft backdrop-blur-md`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-xl text-sridasi-forest group-hover:text-sridasi-green transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sridasi-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlight Bullets */}
                  <div className="pt-3 border-t border-sridasi-neutral-100 space-y-2">
                    {item.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-sridasi-neutral-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sridasi-green shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sridasi-forest via-sridasi-dark to-sridasi-primary-950 text-white shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase tracking-wider text-sridasi-yellow font-bold">
                Upcoming Residential Batch Open
              </span>
            </div>
            <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Ready to Experience the Farm First-Hand?
            </h4>
            <p className="text-xs text-sridasi-leaf-200 max-w-xl">
              Seats are strictly limited to 25 participants per batch to ensure personalized guidance, farm visits, and hands-on bio-dosing practice.
            </p>
          </div>

          <a
            href="/training-registration"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-sridasi-yellow text-sridasi-forest font-heading font-extrabold text-sm hover:bg-yellow-300 transition-all shadow-soft flex items-center gap-2 group"
          >
            <span>Fill Registration Form</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </Container>
    </section>
  );
}

export default TrainingGallery;

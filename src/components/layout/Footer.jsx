import React from 'react';
import { Sprout, Mail, Phone, MapPin, ShieldCheck, HeartHandshake, Leaf, ArrowRight, Waves, Fish, Sparkles } from 'lucide-react';
import Container from '../ui/Container';

export function Footer({ onOpenConsultModal, onOpenPortalModal }) {
  return (
    <footer className="bg-sridasi-forest text-white border-t border-sridasi-primary-700 relative overflow-hidden text-left">
      {/* Background Subtle Organic Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sridasi-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sridasi-water/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="lg" className="relative z-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sridasi-primary-700/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sridasi-green to-sridasi-forest flex items-center justify-center text-white shadow-soft">
                <Sprout className="w-5 h-5 text-sridasi-yellow" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white leading-none">
                  SRIDASI
                </span>
                <span className="text-[10px] tracking-widest font-bold uppercase text-sridasi-leaf-300 mt-1">
                  Farms & Organics
                </span>
              </div>
            </div>
            
            <p className="text-sridasi-primary-100 text-xs sm:text-sm leading-relaxed max-w-sm">
              Leading the Blue Revolution through big data, digital tele-consultations, and advanced bio-formulations like Aquamazic & Tribiotic. Architecting sustainable multi-tier farm ecosystems for rural prosperity.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-sridasi-leaf-300 bg-sridasi-primary-800/80 px-3 py-1 rounded-full border border-sridasi-primary-600">
                <ShieldCheck className="w-3.5 h-3.5 text-sridasi-yellow" />
                100% Bio-Organic
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-sridasi-leaf-300 bg-sridasi-primary-800/80 px-3 py-1 rounded-full border border-sridasi-primary-600">
                <Fish className="w-3.5 h-3.5 text-sridasi-water" />
                Zero Chemical Mortality Control
              </span>
            </div>
          </div>

          {/* Column 1: 6 Core Products */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 tracking-wide uppercase">
              Our 6 Products
            </h4>
            <ul className="space-y-2 text-xs text-sridasi-primary-200">
              <li><a href="#products" className="hover:text-white transition-colors">1. Aquamazic Formula</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">2. Tribiotic for Animals</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">3. Market Connect</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">4. Tribiotic for Agriculture</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">5. Curcumin Tea</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">6. Natural ENT Drop</a></li>
            </ul>
          </div>

          {/* Column 2: Digital Platform (V1) */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 tracking-wide uppercase">
              Farmer Platform & Tools
            </h4>
            <ul className="space-y-2 text-xs text-sridasi-primary-200">
              <li><a href="#platform-demo" className="hover:text-white transition-colors">Pond Profile Setup</a></li>
              <li><a href="#platform-demo" className="hover:text-white transition-colors">Ask Question & Upload Media</a></li>
              <li><a href="#platform-demo" className="hover:text-white transition-colors">Automated Symptom Diagnostics</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Aqua ROI & Yield Calculator</a></li>
              <li><a href="/training-registration" target="_blank" rel="noopener noreferrer" className="text-sridasi-yellow hover:underline">Farmer Registration Form ↗</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Emergency */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4 tracking-wide uppercase">
              Support & Helpdesk
            </h4>
            <ul className="space-y-3 text-xs text-sridasi-primary-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sridasi-leaf-400 shrink-0 mt-0.5" />
                <span>Sridasi Sustainable Bio-Tech Research Hub</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sridasi-leaf-400 shrink-0" />
                <span>support@sridasifarms.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sridasi-leaf-400 shrink-0" />
                <span>+91 (Farmer Helpdesk)</span>
              </li>
              <li className="pt-2 flex flex-col gap-2">
                <a
                  href="/training-registration"
                  className="block w-full py-2 px-3 rounded-xl bg-sridasi-yellow text-sridasi-forest font-bold text-xs hover:bg-yellow-300 transition-colors text-center shadow-soft"
                >
                  Register (Farmer / Buyer)
                </a>
                <a
                  href="/admin"
                  className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-sridasi-primary-800/90 text-sridasi-leaf-200 hover:text-white hover:bg-sridasi-primary-700 font-semibold text-xs border border-sridasi-primary-600/80 transition-all text-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sridasi-yellow" />
                  Admin Dashboard Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sridasi-primary-300">
          <p>© {new Date().getFullYear()} SRIDASI Farms & Organics. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#about" className="hover:text-white transition-colors">Founder Blueprint</a>
            <a href="#calculator" className="hover:text-white transition-colors">Aqua ROI Calculator</a>
            <a href="#faq" className="hover:text-white transition-colors">Knowledge Base</a>

          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

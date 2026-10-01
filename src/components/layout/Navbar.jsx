import React, { useState, useEffect } from 'react';
import { Menu, X, Sprout, ArrowRight, Shield, User, Sparkles, GraduationCap, ExternalLink, FileText } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../ui/Container';

export function Navbar({ onOpenPortalModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3-Day Training', href: '#training-program' },
    { label: 'Farmer Platform', href: '#platform-demo' },
    { label: '6 Bio-Products', href: '#products' },
    { label: 'Integrated Farm', href: '#ecosystem' },
    { label: 'Founder Story', href: '#about' },
    { label: 'ROI Calculator', href: '#calculator' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Announcement & Emergency Aqua Bar */}
      <div className="bg-gradient-to-r from-sridasi-forest via-sridasi-primary-800 to-sridasi-dark text-white text-[11px] py-1.5 px-4 font-medium border-b border-sridasi-primary-700/60 relative z-50">
        <Container size="lg" className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-sridasi-yellow">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Residential Training:
            </span>
            <span className="hidden sm:inline text-sridasi-primary-100">3-Day Integrated Natural Farming™ Course enrolling now</span>
            <a 
              href="/training-registration" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sridasi-yellow hover:underline font-bold inline-flex items-center gap-0.5 ml-1"
            >
              Fill Assessment Form <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPortalModal('admin')}
              className="hover:text-sridasi-yellow transition-colors flex items-center gap-1 font-semibold"
            >
              <Shield className="w-3 h-3 text-sridasi-yellow" />
              <span>Admin Hub</span>
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => onOpenPortalModal('farmer')}
              className="hover:text-sridasi-yellow transition-colors flex items-center gap-1 font-semibold"
            >
              <User className="w-3 h-3" />
              <span>Farmer Sign-In</span>
            </button>
          </div>
        </Container>
      </div>

      {/* Main Sticky Header */}
      <div className="fixed top-[29px] left-0 right-0 z-40 pt-4 pointer-events-none flex justify-center w-full">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header
            className={`relative w-full transition-all duration-300 pointer-events-auto rounded-full border backdrop-blur-md shadow-soft-lg ${
              isScrolled
                ? 'py-2.5 px-5 md:px-8 bg-white/60 border-white/50 shadow-lg'
                : 'py-3.5 px-5 md:px-8 bg-white/30 border-white/40'
            }`}
          >
            <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sridasi-forest to-sridasi-green flex items-center justify-center text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
                <Sprout className="w-5 h-5 text-sridasi-yellow" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-extrabold text-xl tracking-tight text-sridasi-forest leading-none">
                  SRIDASI
                </span>
                <span className="text-[10px] tracking-widest font-bold uppercase text-sridasi-leaf-600 mt-1">
                  Farms & Organics
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 px-3 py-1 rounded-full bg-white/40 border border-white/50 shadow-soft-sm backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-semibold text-sridasi-forest hover:bg-white/60 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA & Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <a
                href="/training-registration"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sridasi-forest hover:bg-sridasi-dark shadow-soft-sm transition-all flex items-center gap-2 group"
              >
                <FileText className="w-4 h-4 text-sridasi-yellow" />
                <span>Registration Form</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-sridasi-forest hover:bg-white/50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="xl:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-white/80 backdrop-blur-xl shadow-soft-lg border border-white/50 animate-slide-up text-left">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2 text-xs font-bold text-sridasi-forest hover:bg-white/60 rounded-xl transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                
                <div className="pt-3 border-t border-white/40 flex flex-col gap-2">
                  <a
                    href="/training-registration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-sridasi-forest text-white font-heading font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-soft"
                  >
                    <FileText className="w-4 h-4 text-sridasi-yellow" />
                    <span>Registration Form</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </header>
        </div>
      </div>
    </>
  );
}

export default Navbar;

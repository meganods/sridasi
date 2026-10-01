import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  Hero, 
  TrainingProgramSection,
  TrainingGallery,
  FarmerAppStudio, 
  ProductsShowcase, 
  IntegratedEcosystem, 
  FounderBio, 
  AquaCalculator, 
  Testimonials, 
  FAQSection 
} from '../sections';
import ProductDetailModal from '../components/modals/ProductDetailModal';
import PortalModal from '../components/modals/PortalModal';

export function Home() {
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [portalRole, setPortalRole] = useState('farmer');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const handleOpenPortal = (role = 'farmer') => {
    setPortalRole(role);
    setPortalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-sridasi-surface text-sridasi-dark font-sans flex flex-col selection:bg-sridasi-forest selection:text-white">
      {/* Header & Navbar */}
      <Navbar 
        onOpenPortalModal={handleOpenPortal} 
      />

      {/* Main Homepage Sections Assembly */}
      <main className="flex-1">
        {/* 1. Hero Section with Animated Living Farm Matrix & Get Started Action */}
        <Hero />

        {/* 2. 100 Times More Profitable Integrated Natural Farming™ & 3-Day Residential Training */}
        <TrainingProgramSection />

        {/* 2b. Live Residential Training Glimpses & Real Trainee Photos */}
        <TrainingGallery />

        {/* 3. Interactive Farmer App & Admin Control Hub (Version 1 Workflow) */}
        <FarmerAppStudio />

        {/* 4. All 6 Flagship Formulations & Digital Market Linkage */}
        <ProductsShowcase 
          onSelectProduct={(prod) => setSelectedProduct(prod)} 
        />

        {/* 5. Integrated Multi-Tier Circular Bio-Economy Model */}
        <IntegratedEcosystem />

        {/* 6. Founder & Architect Story */}
        <FounderBio />

        {/* 7. Interactive ROI & Pond Survival Biomass Calculator */}
        <AquaCalculator />

        {/* 8. Verified Farmer & Enterprise Testimonials */}
        <Testimonials />

        {/* 9. Frequently Asked Questions Hub */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenPortalModal={handleOpenPortal}
      />

      {/* Interactive Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <PortalModal
        isOpen={portalModalOpen}
        initialRole={portalRole}
        onClose={() => setPortalModalOpen(false)}
      />
    </div>
  );
}

export default Home;

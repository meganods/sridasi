import React, { useState } from 'react';
import { 
  Fish, 
  HelpCircle, 
  UploadCloud, 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  ChevronRight, 
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import BRAND_INFO from '../data/brandInfo';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

export function FarmerAppStudio() {
  const [activeTab, setActiveTab] = useState('pond'); // 'pond' | 'diagnostic' | 'admin'
  
  // Tab 2: Diagnostic & Question State
  const [selectedProblem, setSelectedProblem] = useState('mortality');
  const [uploadedFile, setUploadedFile] = useState(null); // Default blank
  const [customQuestion, setCustomQuestion] = useState('Fish coming to the surface in early morning gasping for air, 12 mortalities recorded today.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2), // in MB
        type: file.type.startsWith('video') ? 'video' : 'image',
        rawFile: file
      });
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  // Tab 3: Admin State
  const [adminSection, setAdminSection] = useState('farmers'); // 'farmers' | 'diagnostics' | 'orders' | 'analytics'

  // Diagnostic submission handler
  const handleRunDiagnostic = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        urgency: 'HIGH PRIORITY',
        detectedCondition: 'Early Morning Dissolved Oxygen Depletion with Ammonia Spike',
        recommendation: 'Immediate aeration + 1 Liter Aquamazic Formula per acre. Withhold feeding for 12 hours.',
        bioProduct: 'Aquamazic Formula (Probiotic & Water Balancer)',
        dosage: '1000 ml per acre dissolved in pond water',
        recoveryTime: '2 - 4 hours post application'
      });
    }, 1200);
  };

  return (
    <section id="platform-demo" className="py-20 bg-white border-y border-sridasi-neutral-200 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sridasi-primary-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sridasi-aqua-50/50 rounded-full blur-3xl pointer-events-none" />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Live Interactive Platform Experience"
          title="Digital Aqua-Platform &"
          highlightText="Farmer Diagnostic Hub"
          description="Experience the real-time workflow: from pond vital tracking and automated symptom diagnostics to bio-remedy protocols and central Admin control."
          align="center"
        />

        {/* Tab Navigation Pill Bar (3 Clean Tabs: Pond Profile, Problem & Diagnostic, Admin Center) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/90 shadow-soft-sm overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('pond')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'pond'
                  ? 'bg-sridasi-forest text-white shadow-soft'
                  : 'text-sridasi-neutral-600 hover:text-sridasi-forest hover:bg-white'
              }`}
            >
              <Fish className="w-4 h-4" />
              <span>1. Pond Profile Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'diagnostic'
                  ? 'bg-sridasi-forest text-white shadow-soft'
                  : 'text-sridasi-neutral-600 hover:text-sridasi-forest hover:bg-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>2. Problem & Diagnostic</span>
            </button>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: POND PROFILE HUB (Only Monitored Ponds 1 & 2)                       */}
        {/* ========================================================================= */}
        {activeTab === 'pond' && (
          <div className="space-y-6 animate-fade-in text-left">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-sridasi-neutral-200">
              <div>
                <h3 className="font-heading font-bold text-xl text-sridasi-forest">Your Monitored Pond Profiles</h3>
                <p className="text-xs text-sridasi-neutral-600">Real-time parameters, species composition, biomass & bio-feed metrics</p>
              </div>
              <Badge variant="green" size="sm">
                2 Monitored Ponds Active
              </Badge>
            </div>

            {/* 2-Column Grid for Pond 1 and Pond 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {BRAND_INFO.samplePonds.map((p, idx) => (
                <div 
                  key={p.id || idx}
                  className="p-6 rounded-3xl bg-white border border-sridasi-neutral-200 hover:border-sridasi-forest/30 transition-all duration-300 shadow-soft flex flex-col justify-between space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-sridasi-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-sridasi-primary-100 text-sridasi-forest flex items-center justify-center font-heading font-extrabold text-sm shadow-soft-sm">
                        P{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-sridasi-forest">{p.name}</h4>
                        <span className="text-[11px] text-sridasi-neutral-500">{p.location}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ● {p.status}
                    </span>
                  </div>

                  {/* Water Vitals Strip */}
                  <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200/80 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-sridasi-neutral-500 uppercase font-bold block">pH</span>
                      <strong className="text-sridasi-forest font-heading font-bold text-sm">{p.waterParameters.ph}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-sridasi-neutral-500 uppercase font-bold block">DO</span>
                      <strong className="text-sridasi-forest font-heading font-bold text-sm">{p.waterParameters.do}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-sridasi-neutral-500 uppercase font-bold block">Ammonia</span>
                      <strong className="text-sridasi-forest font-heading font-bold text-sm">{p.waterParameters.ammonia}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-sridasi-neutral-500 uppercase font-bold block">Temp</span>
                      <strong className="text-sridasi-forest font-heading font-bold text-sm">{p.waterParameters.temp}</strong>
                    </div>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-sridasi-surface/60 border border-sridasi-neutral-100">
                      <span className="text-sridasi-neutral-500 block text-[10px] uppercase font-bold">Pond Size</span>
                      <strong className="text-sridasi-forest">{p.size}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-sridasi-surface/60 border border-sridasi-neutral-100">
                      <span className="text-sridasi-neutral-500 block text-[10px] uppercase font-bold">Fish Species</span>
                      <strong className="text-sridasi-forest">{p.species}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-sridasi-surface/60 border border-sridasi-neutral-100">
                      <span className="text-sridasi-neutral-500 block text-[10px] uppercase font-bold">Stocking Quantity</span>
                      <strong className="text-sridasi-forest">{p.stockingQuantity}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-sridasi-surface/60 border border-sridasi-neutral-100">
                      <span className="text-sridasi-neutral-500 block text-[10px] uppercase font-bold">Fish Age • Avg Weight</span>
                      <strong className="text-sridasi-forest">{p.fishAge} • {p.avgWeight}</strong>
                    </div>
                  </div>

                  {/* Feed Info */}
                  <div className="p-3 rounded-2xl bg-sridasi-leaf-50/70 border border-sridasi-leaf-200/60 text-xs text-sridasi-neutral-700">
                    <span className="font-bold text-sridasi-forest block mb-0.5">Feed & Bio-Dosing Regime:</span>
                    <span className="text-[11px] leading-relaxed">{p.feedUsed}</span>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-sridasi-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] text-sridasi-neutral-500">
                      Telemetry: <strong className="text-emerald-700">Synchronized</strong>
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveTab('diagnostic')}
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                    >
                      Ask Question / Run Diagnostics
                    </Button>
                  </div>
                </div>
              ))}
            </div>


          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ASK A QUESTION & AI DIAGNOSTIC SUBMISSION                           */}
        {/* ========================================================================= */}
        {activeTab === 'diagnostic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-left">
            
            {/* Left: Problem Selection & Upload Form */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h3 className="font-heading font-bold text-lg text-sridasi-forest">Select Your Problem Category</h3>
                <p className="text-xs text-sridasi-neutral-600">Choose the primary symptom affecting your pond or livestock</p>
              </div>

              {/* Problem Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BRAND_INFO.problemCategories.map((cat) => {
                  const isSelected = selectedProblem === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedProblem(cat.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected 
                          ? 'border-sridasi-forest bg-sridasi-primary-50 ring-2 ring-sridasi-forest/20 shadow-soft-sm'
                          : 'border-sridasi-neutral-200 bg-white hover:bg-sridasi-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading font-bold text-xs text-sridasi-forest">{cat.label}</span>
                        {cat.urgency === 'High' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">Urgent</span>
                        )}
                      </div>
                      <p className="text-[11px] text-sridasi-neutral-600 line-clamp-2">{cat.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Upload Photo / Video Card (Interactive Real File Upload) */}
              <div className="p-5 rounded-3xl bg-sridasi-surface border-2 border-dashed border-sridasi-primary-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-sridasi-forest" />
                    <h4 className="font-heading font-bold text-sm text-sridasi-forest">Attach Pond Water / Fish Photo or Video</h4>
                  </div>
                  <Badge variant="water" size="sm">HD Video & Photo AI Ready</Badge>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="pond-media-file-input"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {uploadedFile ? (
                  /* Active Uploaded File Preview */
                  <div className="p-4 rounded-2xl bg-white border border-sridasi-primary-200 flex items-center justify-between shadow-soft-sm animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-sridasi-aqua-100 text-sridasi-water flex items-center justify-center shrink-0">
                        <Camera className="w-5 h-5 text-sridasi-forest" />
                      </div>
                      <div className="truncate max-w-xs sm:max-w-sm">
                        <div className="text-xs font-bold text-sridasi-forest truncate">{uploadedFile.name}</div>
                        <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{uploadedFile.size} MB • Attached for AI Pathology Analysis</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label 
                        htmlFor="pond-media-file-input"
                        className="text-xs font-bold text-sridasi-forest hover:text-sridasi-green cursor-pointer underline px-2 py-1"
                      >
                        Change
                      </label>
                      <button 
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Default Blank Interactive Dropzone */
                  <label
                    htmlFor="pond-media-file-input"
                    className="p-6 rounded-2xl bg-white border border-sridasi-neutral-200 hover:border-sridasi-forest/40 hover:bg-sridasi-leaf-50/30 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sridasi-primary-50 text-sridasi-forest flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6 text-sridasi-forest" />
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs sm:text-sm text-sridasi-forest group-hover:text-sridasi-green transition-colors block">
                        Click to browse or upload pond sample photo / video
                      </span>
                      <span className="text-[11px] text-sridasi-neutral-500 mt-0.5 block">
                        Supported: MP4, MOV, JPG, PNG, WEBP (Fish gill view, water turbidity or swimming pattern)
                      </span>
                    </div>
                  </label>
                )}
              </div>

              {/* Farmer Notes Textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-sridasi-forest">Describe Specific Observation / Symptoms</label>
                <textarea
                  rows={3}
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white border border-sridasi-neutral-200 text-xs text-sridasi-neutral-800 focus:outline-none focus:border-sridasi-forest"
                  placeholder="Provide symptoms, feeding behavior, water color changes..."
                />
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-soft"
                onClick={handleRunDiagnostic}
                isLoading={isAnalyzing}
                leftIcon={<Sparkles className="w-4 h-4 text-sridasi-yellow" />}
              >
                {isAnalyzing ? 'Running AI Bio-Diagnostic...' : 'Submit Case & Run Instant Diagnostic'}
              </Button>

            </div>

            {/* Right: Live AI Diagnostic Assessment & Remedy Protocol */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-sridasi-surface border border-sridasi-neutral-200 shadow-soft-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-sridasi-neutral-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sridasi-green" />
                    <h3 className="font-heading font-bold text-base text-sridasi-forest">Automated Case Triaging</h3>
                  </div>
                  <Badge variant="green" size="sm">Active Triaging</Badge>
                </div>

                {analysisResult ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-800 mb-1">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        Status: {analysisResult.urgency}
                      </div>
                      <p className="text-xs text-red-900 font-semibold">{analysisResult.detectedCondition}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sridasi-neutral-200 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sridasi-leaf-600">
                        Immediate Action Protocol
                      </span>
                      <p className="text-xs text-sridasi-neutral-800 leading-relaxed">
                        {analysisResult.recommendation}
                      </p>
                    </div>

                    {/* Bio-Remedy Prescription Card */}
                    <div className="p-4 rounded-2xl bg-sridasi-forest text-white space-y-3 shadow-soft">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sridasi-yellow">
                          Prescribed Bio-Remedy
                        </span>
                        <Badge variant="gold" size="sm">100% Organic</Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                          <Zap className="w-4 h-4 text-sridasi-yellow shrink-0" />
                          {analysisResult.bioProduct}
                        </h5>
                        <p className="text-[11px] text-sridasi-leaf-200">
                          Recommended Dosage: <strong className="text-white">{analysisResult.dosage}</strong>
                        </p>
                        <p className="text-[11px] text-sridasi-leaf-200">
                          Expected Response: <strong className="text-white">{analysisResult.recoveryTime}</strong>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-sridasi-primary-700/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Logged in Farm Record
                        </span>
                        <a 
                          href="#products" 
                          className="font-bold text-sridasi-yellow hover:underline flex items-center gap-1"
                        >
                          View Bio-Product Details →
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-sridasi-primary-50 text-sridasi-forest flex items-center justify-center mx-auto">
                      <HelpCircle className="w-6 h-6 text-sridasi-forest" />
                    </div>
                    <p className="text-xs text-sridasi-neutral-600 max-w-xs mx-auto">
                      Select a problem category and click <strong>"Submit Case & Run Instant Diagnostic"</strong> to generate your emergency protocol and organic bio-dosing recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}


      </Container>
    </section>
  );
}

export default FarmerAppStudio;

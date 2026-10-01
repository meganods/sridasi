import React, { useState } from 'react';
import { 
  Sprout, 
  CheckCircle2, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Send, 
  Users,
  AlertCircle
} from 'lucide-react';
import BRAND_INFO from '../data/brandInfo';
import Button from '../components/ui/Button';

export function TrainingRegistrationForm() {
  const [formData, setFormData] = useState({
    // 1. Personal Information
    fullName: '',
    qualification: '',
    preferredLanguage: 'Hindi',
    mobileNumber: '',
    emailId: '',
    completeAddress: '',

    // 2. Present Situation
    currentOccupation: '',
    challenges: {
      land: false,
      water: false,
      electricity: false,
      labour: false,
      finance: false,
      marketing: false,
      technicalKnowledge: false,
      other: ''
    },
    interestReason: '',

    // 3. Land & Water
    totalLand: '',
    landUnit: 'Acres',
    landUsedForFarming: '',
    landType: 'Agricultural',
    waterSources: {
      borewell: false,
      pond: false,
      canal: false,
      river: false,
      rainwater: false,
      other: ''
    },
    borewellElectricity: 'Yes',
    borewellSize: '6"',
    electricityHours: '12',

    // 4. Farm Location & Security
    villageTown: '',
    district: '',
    state: '',
    distanceMainRoad: '',
    distanceMarket: '',
    predatorsWildAnimals: 'No',
    predatorsSpecify: '',
    theftTrespassing: 'No',
    theftExplain: '',
    farmProtection: 'Yes',

    // 5. Basic Farm Infrastructure
    infraStore: 'Available', // 'Available' | 'Can Be Created' | 'Not Available'
    infraSupplies: 'Can Be Created',
    infraOffice: 'Available',
    otherExistingInfra: '',

    // 6. Transport & Connectivity
    transport: {
      tractor: false,
      miniTruck: false,
      jeep: false,
      goodRoad: false,
      electricity: true,
      internet: true,
      other: ''
    },
    distanceAllWeatherRoad: '',
    distanceNearestMarket: '',

    // 7. Financial Capacity
    approxAnnualIncome: '',
    farmingAnnualIncome: '',
    approxInvestmentAvailable: '',
    readyToInvest: 'Depending on Project Assessment',

    // 8. Your Farming Interest
    activitiesInterest: {
      fishery: false,
      dairy: false,
      livestock: false,
      duckery: false,
      poultry: false,
      naturalFarming: true,
      horticulture: false,
      fruitVeg: false,
      integratedFarming: true,
      other: ''
    },
    activityToDevelopFirst: 'Integrated Aquaculture & Natural Crops',
    hasPriorExperience: 'Yes',
    priorExperienceDesc: '',

    // 9. Time & Labour
    dailyTimeHours: '6',
    staffAvailability: 'Moderate',
    hasFarmManager: 'Yes'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNestedCheck = (parent, key) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: !prev[parent][key]
      }
    }));
  };

  const validateForm = () => {
    const errs = {};

    // 1. Personal Information
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    } else if (/^\d+$/.test(formData.fullName.trim())) {
      errs.fullName = 'Name cannot contain only numbers';
    }

    if (!formData.qualification.trim()) {
      errs.qualification = 'Educational qualification is required';
    }

    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      errs.mobileNumber = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.emailId.trim()) {
      errs.emailId = 'Email ID is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId.trim())) {
      errs.emailId = 'Enter a valid email address';
    }

    if (!formData.completeAddress.trim()) {
      errs.completeAddress = 'Complete address is required';
    }

    // 2. Present Situation
    if (!formData.currentOccupation.trim()) {
      errs.currentOccupation = 'Current occupation is required';
    }
    if (!formData.interestReason.trim()) {
      errs.interestReason = 'Please provide your reason for interest in farming';
    }

    // 3. Land & Water
    if (!formData.totalLand.toString().trim()) {
      errs.totalLand = 'Total land is required';
    }
    if (!formData.landUsedForFarming.toString().trim()) {
      errs.landUsedForFarming = 'Land used for farming is required';
    }

    // 4. Farm Location & Security
    if (!formData.villageTown.trim()) {
      errs.villageTown = 'Village / Town is required';
    }
    if (!formData.district.trim()) {
      errs.district = 'District is required';
    }
    if (!formData.state.trim()) {
      errs.state = 'State is required';
    }
    if (!formData.distanceMainRoad.toString().trim()) {
      errs.distanceMainRoad = 'Distance from main road is required';
    }
    if (!formData.distanceMarket.toString().trim()) {
      errs.distanceMarket = 'Distance to nearest market is required';
    }

    // 6. Transport & Connectivity
    if (!formData.distanceAllWeatherRoad.toString().trim()) {
      errs.distanceAllWeatherRoad = 'Distance to all-weather road is required';
    }
    if (!formData.distanceNearestMarket.toString().trim()) {
      errs.distanceNearestMarket = 'Distance to market is required';
    }

    // 7. Financial Capacity
    if (!formData.approxAnnualIncome.toString().trim()) {
      errs.approxAnnualIncome = 'Approx. annual income is required';
    }
    if (!formData.approxInvestmentAvailable.toString().trim()) {
      errs.approxInvestmentAvailable = 'Investment capacity is required';
    }

    // 8. Farming Interest
    if (!formData.activityToDevelopFirst.trim()) {
      errs.activityToDevelopFirst = 'Primary activity to develop is required';
    }

    // 9. Time & Labour
    if (!formData.dailyTimeHours.toString().trim()) {
      errs.dailyTimeHours = 'Daily time allocation is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const id = `SRI-ASSESS-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionId(id);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to the first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-sridasi-surface text-sridasi-dark py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sridasi-forest selection:text-white print:bg-white print:py-0 print:px-0">
      
      {/* Inline Print Styles for perfect PDF output */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm 8mm 10mm;
          }
          body {
            background: white !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-hidden, .print\\:hidden {
            display: none !important;
          }
          .print-card {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .print-section {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin-bottom: 12px !important;
            border: 1px solid #e2e8f0 !important;
            padding: 10px !important;
          }
          input, select, textarea {
            border: 1px solid #cbd5e1 !important;
            background-color: #f8fafc !important;
            font-size: 10px !important;
            padding: 4px 6px !important;
          }
          .print-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>

      {/* Top Navigation Bar (Hidden during Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-sridasi-forest hover:text-sridasi-green transition-colors bg-white px-3.5 py-2 rounded-xl border border-sridasi-neutral-200 shadow-soft-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sridasi Homepage</span>
        </a>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-soft-lg border-2 border-sridasi-forest/20 p-6 sm:p-10 relative overflow-hidden print-card">
        
        {/* ========================================================================= */}
        {/* DOCUMENT HEADER                                                           */}
        {/* ========================================================================= */}
        <div className="border-b-2 border-sridasi-forest pb-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sridasi-forest to-sridasi-green flex items-center justify-center text-white shadow-soft">
                <Sprout className="w-8 h-8 text-sridasi-yellow" />
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-sridasi-forest tracking-tight leading-none">
                  INTEGRATED NATURAL FARMING™
                </h1>
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-sridasi-leaf-600 block mt-1">
                  TRAINING PROGRAMME
                </span>
              </div>
            </div>

            <div className="text-right sm:text-right flex flex-col items-center sm:items-end">
              <span className="text-[10px] text-sridasi-neutral-500 uppercase font-semibold">
                {BRAND_INFO.orgFullName}
              </span>
            </div>
          </div>

          {/* Form Title Banner */}
          <div className="mt-4 p-2.5 rounded-xl bg-sridasi-forest text-white text-center font-heading font-bold text-sm sm:text-base tracking-wide uppercase shadow-soft-sm">
            FARMER REGISTRATION & PROJECT ASSESSMENT FORM
          </div>

          {/* Slogan Banner */}
          <div className="mt-2 text-center text-xs font-extrabold tracking-wider text-sridasi-leaf-700 uppercase">
            ONE FARM • ONE ECOSYSTEM • MULTIPLE INCOME STREAMS
          </div>
          <div className="text-center text-[11px] font-bold text-sridasi-neutral-600 uppercase">
            3-DAY RESIDENTIAL TRAINING PROGRAMME • THEORY • PRACTICAL • FARM VISIT • SELF-PRACTICE
          </div>
        </div>

        {/* HELP US KNOW YOU GREEN NOTICE BOX */}
        <div className="p-4 rounded-2xl bg-sridasi-leaf-50 border border-sridasi-leaf-200 text-sridasi-forest text-xs flex items-start gap-3 mb-6 print:mb-4">
          <div className="w-8 h-8 rounded-full bg-sridasi-green text-white flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <strong className="block font-bold text-xs uppercase tracking-wider text-sridasi-forest mb-0.5">
              HELP US KNOW YOU
            </strong>
            <p className="text-sridasi-neutral-700 leading-relaxed text-[11px] sm:text-xs">
              This form helps us understand your land, water, infrastructure, farming interests, resources and project requirements so that your participation can be properly planned. Please provide accurate information wherever possible.
            </p>
          </div>
        </div>

        {/* GLOBAL VALIDATION ERROR BANNER */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2 animate-fade-in print:hidden">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Please complete all highlighted mandatory fields before submitting.</span>
          </div>
        )}

        {/* SUBMISSION SUCCESS ALERT */}
        {isSubmitted ? (
          <div className="py-12 text-center space-y-4 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-sridasi-forest">
              Registration & Assessment Successfully Received!
            </h2>
            <p className="text-xs sm:text-sm text-sridasi-neutral-700 max-w-lg mx-auto">
              Your registration reference is <span className="font-mono font-bold text-sridasi-forest bg-sridasi-primary-100 px-2 py-0.5 rounded">{submissionId}</span>. 
              Our Training Director will review your land & water profile and send your 3-Day Residential Joining Kit & pre-training instructions to <strong>{formData.mobileNumber || 'your registered number'}</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="font-bold text-sridasi-forest border-b border-sridasi-neutral-200 pb-1">
                Your Assessment Snapshot:
              </div>
              <div className="flex justify-between">
                <span className="text-sridasi-neutral-600">Farmer Name:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-sridasi-neutral-600">Total Land:</span>
                <strong>{formData.totalLand} {formData.landUnit}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-sridasi-neutral-600">Primary Interest:</span>
                <strong>{formData.activityToDevelopFirst}</strong>
              </div>
            </div>
            <div className="pt-4 flex justify-center gap-3 print:hidden">
              <Button variant="primary" size="md" onClick={() => window.location.href = '/'}>
                Return to Homepage
              </Button>
              <Button variant="outline" size="md" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
                Print Receipt
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6 text-xs text-left">
            
            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
              
              {/* ========================================================================= */}
              {/* COLUMN 1: SECTIONS 1, 2, 3, 4                                             */}
              {/* ========================================================================= */}
              <div className="space-y-6">
                
                {/* 1. PERSONAL INFORMATION */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    1. PERSONAL INFORMATION
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        1. Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="e.g. Anand Kumar Verma"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.fullName && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        2. Educational Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.qualification}
                        onChange={(e) => handleChange('qualification', e.target.value)}
                        placeholder="e.g. Graduate / B.Sc / Diploma / High School"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.qualification ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.qualification && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.qualification}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">3. Preferred Language:</label>
                        <select
                          value={formData.preferredLanguage}
                          onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                          className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                        >
                          <option>Hindi</option>
                          <option>English</option>
                          <option>Bengali</option>
                          <option>Odia</option>
                          <option>Punjabi</option>
                          <option>Marathi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                          4. Mobile / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.mobileNumber}
                          onChange={(e) => handleChange('mobileNumber', e.target.value)}
                          placeholder="+91 98765 43210"
                          className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                            errors.mobileNumber ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                          }`}
                        />
                        {errors.mobileNumber && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.mobileNumber}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        5. Email ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.emailId}
                        onChange={(e) => handleChange('emailId', e.target.value)}
                        placeholder="farmer@example.com"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.emailId ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.emailId && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.emailId}</p>}
                    </div>

                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        6. Complete Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={formData.completeAddress}
                        onChange={(e) => handleChange('completeAddress', e.target.value)}
                        placeholder="House No, Village/Ward, Post, District, State, Pin Code"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.completeAddress ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.completeAddress && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.completeAddress}</p>}
                    </div>
                  </div>
                </div>

                {/* 2. YOUR PRESENT SITUATION */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    2. YOUR PRESENT SITUATION
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                      7. Current Occupation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.currentOccupation}
                      onChange={(e) => handleChange('currentOccupation', e.target.value)}
                      placeholder="e.g. Full-time Farmer / Business / Service"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                        errors.currentOccupation ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                      }`}
                    />
                    {errors.currentOccupation && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.currentOccupation}</p>}
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">8. What are your main challenges or constraints?</label>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {['land', 'water', 'electricity', 'labour', 'finance', 'marketing', 'technicalKnowledge'].map((ch) => (
                        <label key={ch} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.challenges[ch]}
                            onChange={() => handleNestedCheck('challenges', ch)}
                            className="rounded border-sridasi-neutral-300 text-sridasi-forest focus:ring-sridasi-forest"
                          />
                          <span className="capitalize">{ch.replace(/([A-Z])/g, ' $1')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                      9. Why are you interested in farming? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.interestReason}
                      onChange={(e) => handleChange('interestReason', e.target.value)}
                      placeholder="e.g. Desiring a sustainable multi-income farm business..."
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                        errors.interestReason ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                      }`}
                    />
                    {errors.interestReason && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.interestReason}</p>}
                  </div>
                </div>

                {/* 3. YOUR LAND & WATER */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    3. YOUR LAND & WATER
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        10. Total Land Available <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={formData.totalLand}
                          onChange={(e) => handleChange('totalLand', e.target.value)}
                          placeholder="e.g. 3.5"
                          className={`w-2/3 p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                            errors.totalLand ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                          }`}
                        />
                        <select
                          value={formData.landUnit}
                          onChange={(e) => handleChange('landUnit', e.target.value)}
                          className="w-1/3 p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                        >
                          <option>Acres</option>
                          <option>Bigha</option>
                          <option>Hectares</option>
                          <option>Sq. Ft.</option>
                        </select>
                      </div>
                      {errors.totalLand && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.totalLand}</p>}
                    </div>

                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        11. Land for Farming <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.landUsedForFarming}
                        onChange={(e) => handleChange('landUsedForFarming', e.target.value)}
                        placeholder="e.g. 2.0 Acres"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.landUsedForFarming ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.landUsedForFarming && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.landUsedForFarming}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">12. Land Type:</label>
                    <div className="flex flex-wrap gap-3 text-[11px]">
                      {['Agricultural', 'Commercial', 'Residential', 'Barren'].map((t) => (
                        <label key={t} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="landType"
                            checked={formData.landType === t}
                            onChange={() => handleChange('landType', t)}
                            className="text-sridasi-forest"
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">13. Water Source Available:</label>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      {['borewell', 'pond', 'canal', 'river', 'rainwater'].map((w) => (
                        <label key={w} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.waterSources[w]}
                            onChange={() => handleNestedCheck('waterSources', w)}
                            className="rounded border-sridasi-neutral-300 text-sridasi-forest focus:ring-sridasi-forest"
                          />
                          <span className="capitalize">{w}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">14. Borewell Elec.:</label>
                      <select
                        value={formData.borewellElectricity}
                        onChange={(e) => handleChange('borewellElectricity', e.target.value)}
                        className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest"
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">15. Pipe Size:</label>
                      <input
                        type="text"
                        value={formData.borewellSize}
                        onChange={(e) => handleChange('borewellSize', e.target.value)}
                        placeholder='e.g. 4" / 6"'
                        className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">16. Elec. Hrs/Day:</label>
                      <input
                        type="text"
                        value={formData.electricityHours}
                        onChange={(e) => handleChange('electricityHours', e.target.value)}
                        placeholder="e.g. 10 hrs"
                        className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. FARM LOCATION & SECURITY */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    4. FARM LOCATION & SECURITY
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        17. Village <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.villageTown}
                        onChange={(e) => handleChange('villageTown', e.target.value)}
                        placeholder="Village"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.villageTown ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.villageTown && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.villageTown}</p>}
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        18. District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => handleChange('district', e.target.value)}
                        placeholder="District"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.district ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.district && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.district}</p>}
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        19. State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        placeholder="State"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.state ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.state && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        20. Dist. from Main Road <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.distanceMainRoad}
                        onChange={(e) => handleChange('distanceMainRoad', e.target.value)}
                        placeholder="e.g. 500 meters"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.distanceMainRoad ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.distanceMainRoad && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceMainRoad}</p>}
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        21. Dist. to Market <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.distanceMarket}
                        onChange={(e) => handleChange('distanceMarket', e.target.value)}
                        placeholder="e.g. 8 km"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.distanceMarket ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.distanceMarket && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceMarket}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">22. Wild Animal Threat:</label>
                      <select
                        value={formData.predatorsWildAnimals}
                        onChange={(e) => handleChange('predatorsWildAnimals', e.target.value)}
                        className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest"
                      >
                        <option>No</option>
                        <option>Yes (Wild Boar / Stray Cattle)</option>
                        <option>Yes (Birds / Fish Predators)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">22b. Boundary Fencing:</label>
                      <select
                        value={formData.farmProtection}
                        onChange={(e) => handleChange('farmProtection', e.target.value)}
                        className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest"
                      >
                        <option>Yes (Complete Wire Mesh / Wall)</option>
                        <option>Partial Fencing</option>
                        <option>No Fencing</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* ========================================================================= */}
              {/* COLUMN 2: SECTIONS 5, 6, 7, 8, 9                                          */}
              {/* ========================================================================= */}
              <div className="space-y-6">
                
                {/* 5. BASIC FARM INFRASTRUCTURE */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    5. BASIC FARM INFRASTRUCTURE
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between pb-1 border-b border-sridasi-neutral-200">
                      <span className="font-semibold text-sridasi-neutral-700">Facility</span>
                      <div className="flex gap-4 text-sridasi-neutral-600 font-bold">
                        <span>Available</span>
                        <span>Can Be Created</span>
                        <span>Not Available</span>
                      </div>
                    </div>

                    {[
                      { key: 'infraStore', label: 'Store / Storage Area' },
                      { key: 'infraSupplies', label: 'Farm Supplies Area' },
                      { key: 'infraOffice', label: 'Office / Farm Management' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-1">
                        <span className="text-sridasi-neutral-800">{item.label}</span>
                        <div className="flex gap-8 pr-2">
                          <input
                            type="radio"
                            name={item.key}
                            checked={formData[item.key] === 'Available'}
                            onChange={() => handleChange(item.key, 'Available')}
                            className="text-sridasi-forest"
                          />
                          <input
                            type="radio"
                            name={item.key}
                            checked={formData[item.key] === 'Can Be Created'}
                            onChange={() => handleChange(item.key, 'Can Be Created')}
                            className="text-sridasi-forest"
                          />
                          <input
                            type="radio"
                            name={item.key}
                            checked={formData[item.key] === 'Not Available'}
                            onChange={() => handleChange(item.key, 'Not Available')}
                            className="text-sridasi-forest"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">23. Other Existing Infrastructure:</label>
                    <input
                      type="text"
                      value={formData.otherExistingInfra}
                      onChange={(e) => handleChange('otherExistingInfra', e.target.value)}
                      placeholder="e.g. Shed, Nursery Net, Feed Store..."
                      className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                    />
                  </div>
                </div>

                {/* 6. TRANSPORT & CONNECTIVITY */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    6. TRANSPORT & CONNECTIVITY
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">24. What facilities are available?</label>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      {[
                        { key: 'tractor', label: 'Tractor' },
                        { key: 'miniTruck', label: 'Mini-Truck' },
                        { key: 'jeep', label: 'Jeep / 4W' },
                        { key: 'goodRoad', label: 'Good Road' },
                        { key: 'electricity', label: '3-Phase Elec.' },
                        { key: 'internet', label: '4G Internet' }
                      ].map((t) => (
                        <label key={t.key} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.transport[t.key]}
                            onChange={() => handleNestedCheck('transport', t.key)}
                            className="rounded border-sridasi-neutral-300 text-sridasi-forest"
                          />
                          <span>{t.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        25. Dist. All-Weather Road <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.distanceAllWeatherRoad}
                        onChange={(e) => handleChange('distanceAllWeatherRoad', e.target.value)}
                        placeholder="e.g. 200 meters"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.distanceAllWeatherRoad ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.distanceAllWeatherRoad && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceAllWeatherRoad}</p>}
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        26. Dist. Nearest Market <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.distanceNearestMarket}
                        onChange={(e) => handleChange('distanceNearestMarket', e.target.value)}
                        placeholder="e.g. 5 km"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.distanceNearestMarket ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.distanceNearestMarket && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceNearestMarket}</p>}
                    </div>
                  </div>
                </div>

                {/* 7. FINANCIAL CAPACITY */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    7. FINANCIAL CAPACITY
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                        27. Annual Family Income <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.approxAnnualIncome}
                        onChange={(e) => handleChange('approxAnnualIncome', e.target.value)}
                        placeholder="e.g. ₹6 Lakhs"
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                          errors.approxAnnualIncome ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                        }`}
                      />
                      {errors.approxAnnualIncome && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.approxAnnualIncome}</p>}
                    </div>
                    <div>
                      <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">28. Farming Income:</label>
                      <input
                        type="text"
                        value={formData.farmingAnnualIncome}
                        onChange={(e) => handleChange('farmingAnnualIncome', e.target.value)}
                        placeholder="e.g. ₹2.5 Lakhs"
                        className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                      29. Investment Capital Available for Project <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.approxInvestmentAvailable}
                      onChange={(e) => handleChange('approxInvestmentAvailable', e.target.value)}
                      placeholder="e.g. ₹2 Lakhs to ₹5 Lakhs"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                        errors.approxInvestmentAvailable ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                      }`}
                    />
                    {errors.approxInvestmentAvailable && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.approxInvestmentAvailable}</p>}
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">30. Prepared to invest in required infrastructure?</label>
                    <div className="flex flex-wrap gap-3 text-[11px]">
                      {['Yes', 'No', 'Depending on Project Assessment'].map((opt) => (
                        <label key={opt} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="readyToInvest"
                            checked={formData.readyToInvest === opt}
                            onChange={() => handleChange('readyToInvest', opt)}
                            className="text-sridasi-forest"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 8. YOUR FARMING INTEREST */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    8. YOUR FARMING INTEREST
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">31. Which activities interest you?</label>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {[
                        { key: 'fishery', label: 'Fishery / Aquaculture' },
                        { key: 'dairy', label: 'Dairy' },
                        { key: 'livestock', label: 'Livestock' },
                        { key: 'duckery', label: 'Duckery' },
                        { key: 'poultry', label: 'Poultry' },
                        { key: 'naturalFarming', label: 'Natural Farming' },
                        { key: 'horticulture', label: 'Horticulture' },
                        { key: 'fruitVeg', label: 'Fruit / Veg Production' },
                        { key: 'integratedFarming', label: 'Integrated Farming' }
                      ].map((item) => (
                        <label key={item.key} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.activitiesInterest[item.key]}
                            onChange={() => handleNestedCheck('activitiesInterest', item.key)}
                            className="rounded border-sridasi-neutral-300 text-sridasi-forest"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                      32. Which activity would you like to develop first? <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.activityToDevelopFirst}
                      onChange={(e) => handleChange('activityToDevelopFirst', e.target.value)}
                      placeholder="e.g. Fishery + Poultry + Organic Vegetables"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                        errors.activityToDevelopFirst ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                      }`}
                    />
                    {errors.activityToDevelopFirst && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.activityToDevelopFirst}</p>}
                  </div>
                </div>

                {/* 9. TIME & LABOUR */}
                <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                  <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                    9. TIME & LABOUR
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-0.5">
                      34. How much time can you give each day? <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.dailyTimeHours}
                      onChange={(e) => handleChange('dailyTimeHours', e.target.value)}
                      placeholder="e.g. 6 to 8 hours/day"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${
                        errors.dailyTimeHours ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                      }`}
                    />
                    {errors.dailyTimeHours && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.dailyTimeHours}</p>}
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">35. Availability of reliable farm staff in your area?</label>
                    <div className="flex flex-wrap gap-3 text-[11px]">
                      {['Easy', 'Moderate', 'Difficult', 'Very Difficult'].map((st) => (
                        <label key={st} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="staffAvailability"
                            checked={formData.staffAvailability === st}
                            onChange={() => handleChange('staffAvailability', st)}
                            className="text-sridasi-forest"
                          />
                          <span>{st}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sridasi-neutral-700 font-semibold mb-1">36. Do you have a farm manager when away?</label>
                    <div className="flex gap-4 text-[11px]">
                      {['Yes', 'No', 'Need to arrange'].map((m) => (
                        <label key={m} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="hasFarmManager"
                            checked={formData.hasFarmManager === m}
                            onChange={() => handleChange('hasFarmManager', m)}
                            className="text-sridasi-forest"
                          />
                          <span>{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Submission Bar (Hidden during Print) */}
            <div className="pt-6 border-t-2 border-sridasi-forest flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div className="text-xs text-sridasi-neutral-600">
                <span className="font-bold text-sridasi-forest">Declaration:</span> All information provided is accurate for 3-Day Residential Training planning.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="gold"
                  size="lg"
                  type="submit"
                  className="w-full sm:w-auto justify-center shadow-soft"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Submit Registration & Assessment
                </Button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default TrainingRegistrationForm;

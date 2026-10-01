import React, { useState, useRef, useEffect } from 'react';
import {
  Sprout,
  CheckCircle2,
  Printer,
  ArrowLeft,
  ShieldCheck,
  Send,
  Users,
  AlertCircle,
  Loader2,
  ShoppingBag,
  Building2,
  Package,
  TrendingUp,
  MapPin,
  FileCheck
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import BRAND_INFO from '../data/brandInfo';
import Button from '../components/ui/Button';
import { countries } from '../data/countries';

export function TrainingRegistrationForm() {
  const [formData, setFormData] = useState({
    // Entity Role: 'farmer' or 'buyer'
    role: 'farmer',

    // 1. Personal & Contact Information (Shared)
    fullName: '',
    qualification: '',
    preferredLanguage: '',
    countryCode: '+91',
    mobileNumber: '',
    emailId: '',
    completeAddress: '',
    villageTown: '',
    district: '',
    state: '',

    // Buyer Specific Commercial Fields
    companyName: '',
    businessType: '',
    commoditiesRequired: '',
    monthlyVolume: '',
    paymentTerms: '',
    targetPriceRange: '',
    gstNumber: '',
    procurementLocation: '',
    buyerNotes: '',

    // Farmer Specific: 2. Present Situation
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

    // Farmer Specific: 3. Land & Water
    totalLand: '',
    landUnit: '',
    landUsedForFarming: '',
    landType: '',
    waterSources: {
      borewell: false,
      pond: false,
      canal: false,
      river: false,
      rainwater: false,
      other: ''
    },
    borewellElectricity: '',
    borewellSize: '',
    electricityHours: '',

    // Farmer Specific: 4. Farm Location & Security
    distanceMainRoad: '',
    distanceMarket: '',
    predatorsWildAnimals: '',
    predatorsSpecify: '',
    theftTrespassing: '',
    theftExplain: '',
    farmProtection: '',

    // Farmer Specific: 5. Basic Farm Infrastructure
    infraStore: '',
    infraSupplies: '',
    infraOffice: '',
    otherExistingInfra: '',

    // Farmer Specific: 6. Transport & Connectivity
    transport: {
      tractor: false,
      miniTruck: false,
      jeep: false,
      goodRoad: false,
      electricity: false,
      internet: false,
      other: ''
    },
    distanceAllWeatherRoad: '',
    distanceNearestMarket: '',

    // Farmer Specific: 7. Financial Capacity
    approxAnnualIncome: '',
    farmingAnnualIncome: '',
    approxInvestmentAvailable: '',
    readyToInvest: '',

    // Farmer Specific: 8. Your Farming Interest
    activitiesInterest: {
      fishery: false,
      dairy: false,
      livestock: false,
      duckery: false,
      poultry: false,
      naturalFarming: false,
      horticulture: false,
      fruitVeg: false,
      integratedFarming: false,
      other: ''
    },
    activityToDevelopFirst: '',
    hasPriorExperience: '',
    priorExperienceDesc: '',

    // Farmer Specific: 9. Time & Labour
    dailyTimeHours: '',
    staffAvailability: '',
    hasFarmManager: '',

    // Farmer Specific: 10. Farm At A Glance
    farmAtAGlance: {
      land: '',
      water: '',
      electricity: '',
      road: '',
      marketDistance: '',
      security: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCountries = countries.filter(c =>
    c.label.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    c.code.includes(countrySearchQuery)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // 1. Personal & Contact Information (Mandatory for both)
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    } else if (/^\d+$/.test(formData.fullName.trim())) {
      errs.fullName = 'Name cannot contain only numbers';
    }

    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (formData.countryCode === '+91' && cleanPhone.length !== 10) {
      errs.mobileNumber = 'Enter a valid 10-digit mobile number';
    } else if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      errs.mobileNumber = 'Enter a valid mobile number';
    }

    // Buyer Specific Validation
    if (formData.role === 'buyer') {
      if (!formData.companyName.trim()) {
        errs.companyName = 'Company / Business name is required';
      }
      if (!formData.businessType) {
        errs.businessType = 'Please select your business type';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const prefix = formData.role === 'buyer' ? 'SRI-BUY' : 'SRI-FARM';
        const id = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const submittedAtStr = `${formattedDate} ${formattedTime}`;

        const payload = {
          ...formData,
          id: id,
          submissionId: id,
          status: formData.role === 'buyer' ? 'New Lead' : 'New',
          submittedAtStr: submittedAtStr,
          timestamp: now.toISOString(),
          submittedAt: serverTimestamp()
        };

        // Try Firestore
        try {
          await addDoc(collection(db, "registrations"), payload);
        } catch (fbErr) {
          console.warn("Firestore write skipped/failed, using local storage fallback:", fbErr);
        }

        // Also save to localStorage for instantaneous & offline Admin Dashboard reflection
        try {
          const localExisting = JSON.parse(localStorage.getItem('sridasi_registrations') || '[]');
          localStorage.setItem('sridasi_registrations', JSON.stringify([payload, ...localExisting]));
        } catch (lsErr) {
          console.warn("LocalStorage save error:", lsErr);
        }

        setSubmissionId(id);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Error saving form:", error);
        alert("There was an error saving your form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
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
            margin: 5mm;
          }
          body {
            background: white !important;
            color: #000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 9px !important;
            line-height: 1.2 !important;
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
          .print-columns {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            columns: auto !important;
            align-items: start !important;
          }
          .print-section {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin-bottom: 0 !important;
            border: 1px solid #cbd5e1 !important;
            padding: 6px 8px !important;
            border-radius: 4px !important;
          }
          input, select, textarea {
            border: 1px solid #cbd5e1 !important;
            background-color: transparent !important;
            font-size: 9px !important;
            padding: 2px 4px !important;
            height: auto !important;
            min-height: 0 !important;
          }
          .gap-6 { gap: 8px !important; }
          .gap-4 { gap: 6px !important; }
          .gap-2 { gap: 4px !important; }
          .mb-6 { margin-bottom: 8px !important; }
          .mb-4 { margin-bottom: 6px !important; }
          .mb-2 { margin-bottom: 4px !important; }
          .p-6, .p-4, .p-3 { padding: 6px !important; }
          h3, .font-heading { font-size: 10px !important; margin-bottom: 4px !important; }
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
            FARMER & BUYER REGISTRATION & PROJECT ASSESSMENT FORM
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
              Our team will review your registration as a <strong className="uppercase">{formData.role}</strong> and send your joining kit & instructions to <strong>{formData.countryCode} {formData.mobileNumber}</strong>.
            </p>
            <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="font-bold text-sridasi-forest border-b border-sridasi-neutral-200 pb-1 flex justify-between">
                <span>Registration Snapshot:</span>
                <span className="uppercase text-[10px] bg-sridasi-forest text-sridasi-yellow px-2 py-0.5 rounded font-bold">
                  {formData.role === 'buyer' ? '🛒 Buyer' : '🌾 Farmer'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sridasi-neutral-600">Name:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-sridasi-neutral-600">Mobile:</span>
                <strong>{formData.countryCode} {formData.mobileNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-sridasi-neutral-600">Total Land:</span>
                <strong>{formData.totalLand || '0'} {formData.landUnit || 'Acres'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-sridasi-neutral-600">Primary Focus:</span>
                <strong>{formData.activityToDevelopFirst || 'Integrated Natural Farming'}</strong>
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
            <div className="columns-1 md:columns-2 gap-6 print-columns w-full">

              {/* 1. PERSONAL INFORMATION */}
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                  1. PERSONAL INFORMATION
                </div>

                <div className="space-y-2">
                  {/* Entity Role Radio Selector */}
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      Registering As <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${formData.role === 'farmer' ? 'border-sridasi-forest bg-sridasi-leaf-100/80 font-bold text-sridasi-forest shadow-soft-sm' : 'border-sridasi-neutral-200 bg-white text-sridasi-neutral-700'}`}>
                        <input
                          type="radio"
                          name="role"
                          value="farmer"
                          checked={formData.role === 'farmer'}
                          onChange={() => handleChange('role', 'farmer')}
                          className="text-sridasi-forest"
                        />
                        <span className="text-[11px]">🌾 Farmer / Producer</span>
                      </label>
                      <label className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${formData.role === 'buyer' ? 'border-sridasi-forest bg-sridasi-leaf-100/80 font-bold text-sridasi-forest shadow-soft-sm' : 'border-sridasi-neutral-200 bg-white text-sridasi-neutral-700'}`}>
                        <input
                          type="radio"
                          name="role"
                          value="buyer"
                          checked={formData.role === 'buyer'}
                          onChange={() => handleChange('role', 'buyer')}
                          className="text-sridasi-forest"
                        />
                        <span className="text-[11px]">🛒 Buyer / Trader</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      1. Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="e.g. Anand Kumar Verma"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.fullName && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.fullName}</p>}
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      2. Educational Qualification
                    </label>
                    <input
                      type="text"
                      value={formData.qualification}
                      onChange={(e) => handleChange('qualification', e.target.value)}
                      placeholder="e.g. Graduate / B.Sc / Diploma / High School"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.qualification ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.qualification && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.qualification}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col w-full gap-1">
                      <label className="text-sridasi-neutral-700 font-semibold">3. Preferred Language:</label>
                      <select
                        value={formData.preferredLanguage}
                        onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                        className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                      >
                        <option value="" disabled>Select language...</option>
                        <option>Hindi</option>
                        <option>English</option>
                        <option>Bengali</option>
                        <option>Odia</option>
                        <option>Punjabi</option>
                        <option>Marathi</option>
                      </select>
                    </div>

                    <div className="flex flex-col w-full gap-1">
                      <label className="text-sridasi-neutral-700 font-semibold">
                        4. Mobile / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className={`relative flex rounded-xl bg-white border focus-within:border-sridasi-forest focus-within:ring-1 focus-within:ring-sridasi-forest/30 transition-all ${errors.mobileNumber ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200'
                        }`} ref={countryDropdownRef}>

                        <div
                          className="flex items-center gap-1.5 bg-transparent border-r border-sridasi-neutral-200 text-sridasi-forest rounded-l-xl px-3 py-2 cursor-pointer font-medium select-none hover:bg-sridasi-neutral-50 shrink-0 min-w-max"
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        >
                          <span className="whitespace-nowrap">{countries.find(c => c.code === formData.countryCode)?.label.split(' ')[0]} {formData.countryCode}</span>
                          <span className="text-[10px] ml-0.5">▼</span>
                        </div>

                        {isCountryDropdownOpen && (
                          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-sridasi-neutral-200 rounded-xl shadow-lg z-50 flex flex-col max-h-64 overflow-hidden">
                            <div className="p-2 border-b border-sridasi-neutral-100">
                              <input
                                type="text"
                                placeholder="Search country..."
                                value={countrySearchQuery}
                                onChange={(e) => setCountrySearchQuery(e.target.value)}
                                className="w-full p-1.5 text-sm rounded bg-sridasi-neutral-50 border border-sridasi-neutral-200 focus:outline-none focus:border-sridasi-forest"
                                autoFocus
                              />
                            </div>
                            <div className="overflow-y-auto flex-1">
                              {filteredCountries.map((c, i) => (
                                <div
                                  key={i}
                                  className="px-3 py-2 text-sm hover:bg-sridasi-forest/5 cursor-pointer flex items-center gap-2 text-sridasi-neutral-700"
                                  onClick={() => {
                                    handleChange('countryCode', c.code);
                                    setIsCountryDropdownOpen(false);
                                    setCountrySearchQuery('');
                                  }}
                                >
                                  <span>{c.label}</span>
                                  <span className="text-sridasi-neutral-400 text-xs ml-auto">{c.code}</span>
                                </div>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="px-3 py-2 text-sm text-sridasi-neutral-400 text-center">No countries found</div>
                              )}
                            </div>
                          </div>
                        )}

                        <input
                          type="tel"
                          value={formData.mobileNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const maxLength = formData.countryCode === '+91' ? 10 : 15;
                            handleChange('mobileNumber', val.slice(0, maxLength));
                          }}
                          placeholder="98765 43210"
                          className="w-full p-2 bg-transparent text-sridasi-forest focus:outline-none rounded-r-xl"
                        />
                      </div>
                      {errors.mobileNumber && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.mobileNumber}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      5. Email ID
                    </label>
                    <input
                      type="email"
                      value={formData.emailId}
                      onChange={(e) => handleChange('emailId', e.target.value)}
                      placeholder="farmer@example.com"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.emailId ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.emailId && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.emailId}</p>}
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      6. Complete Address
                    </label>
                    <textarea
                      rows={2}
                      value={formData.completeAddress}
                      onChange={(e) => handleChange('completeAddress', e.target.value)}
                      placeholder="House No, Village/Ward, Post, District, State, Pin Code"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.completeAddress ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.completeAddress && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.completeAddress}</p>}
                  </div>
                </div>
              </div>

              {/* 2. YOUR PRESENT SITUATION */}
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                  2. YOUR PRESENT SITUATION
                </div>

                <div className="flex flex-col w-full gap-1">
                  <label className="text-sridasi-neutral-700 font-semibold">
                    7. Current Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.currentOccupation}
                    onChange={(e) => handleChange('currentOccupation', e.target.value)}
                    placeholder="e.g. Full-time Farmer / Business / Service"
                    className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.currentOccupation ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                  />
                  {errors.currentOccupation && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.currentOccupation}</p>}
                </div>

                <div>
                  <label className="block text-sridasi-neutral-700 font-semibold mb-1">8. What are your main challenges or constraints?</label>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 text-[11px]">
                    {['land', 'water', 'electricity', 'labour', 'finance', 'marketing', 'technicalKnowledge'].map((ch) => (
                      <label key={ch} className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                        <input
                          type="checkbox"
                          checked={formData.challenges[ch]}
                          onChange={() => handleNestedCheck('challenges', ch)}
                          className="rounded border-sridasi-neutral-300 text-sridasi-forest focus:ring-sridasi-forest w-3.5 h-3.5"
                        />
                        <span className="capitalize font-medium">{ch.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                    ))}
                    <div className="col-span-2 flex items-center gap-2 mt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest shrink-0">
                        <input
                          type="checkbox"
                          checked={!!formData.challenges.other}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              setFormData(prev => ({ ...prev, challenges: { ...prev.challenges, other: '' } }));
                            } else if (!formData.challenges.other) {
                              setFormData(prev => ({ ...prev, challenges: { ...prev.challenges, other: ' ' } }));
                            }
                          }}
                          className="rounded border-sridasi-neutral-300 text-sridasi-forest focus:ring-sridasi-forest w-3.5 h-3.5"
                        />
                        <span className="font-medium">Other:</span>
                      </label>
                      <input
                        type="text"
                        value={formData.challenges.other.trim()}
                        onChange={(e) => setFormData(prev => ({ ...prev, challenges: { ...prev.challenges, other: e.target.value } }))}
                        className="flex-1 min-w-0 border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 text-sridasi-forest"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <label className="text-sridasi-neutral-700 font-semibold">
                    9. Why are you interested in farming?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.interestReason}
                    onChange={(e) => handleChange('interestReason', e.target.value)}
                    placeholder="e.g. Desiring a sustainable multi-income farm business..."
                    className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.interestReason ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                  />
                  {errors.interestReason && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.interestReason}</p>}
                </div>
              </div>

              {/* 3. YOUR LAND & WATER */}
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                  3. YOUR LAND & WATER
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      10. Total Land Available
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={formData.totalLand}
                        onChange={(e) => handleChange('totalLand', e.target.value)}
                        placeholder="e.g. 3.5"
                        className={`flex-1 min-w-0 p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.totalLand ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'
                          }`}
                      />
                      <select
                        value={formData.landUnit}
                        onChange={(e) => handleChange('landUnit', e.target.value)}
                        className="w-24 shrink-0 p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                      >
                        <option value="" disabled>Unit</option>
                        <option>Acres</option>
                        <option>Bigha</option>
                        <option>Hectares</option>
                        <option>Sq. Ft.</option>
                      </select>
                    </div>
                    {errors.totalLand && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.totalLand}</p>}
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      11. Land for Farming
                    </label>
                    <input
                      type="text"
                      value={formData.landUsedForFarming}
                      onChange={(e) => handleChange('landUsedForFarming', e.target.value)}
                      placeholder="e.g. 2.0 Acres"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.landUsedForFarming ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
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
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">14. Borewell Elec.:</label>
                    <select
                      value={formData.borewellElectricity}
                      onChange={(e) => handleChange('borewellElectricity', e.target.value)}
                      className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                    >
                      <option value="" disabled>Select...</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">Pipe Size:</label>
                    <input
                      type="text"
                      value={formData.borewellSize}
                      onChange={(e) => handleChange('borewellSize', e.target.value)}
                      placeholder='e.g. 4" / 6"'
                      className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">15. Elec. Hrs/Day:</label>
                    <input
                      type="text"
                      value={formData.electricityHours}
                      onChange={(e) => handleChange('electricityHours', e.target.value)}
                      placeholder="e.g. 10 hrs"
                      className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                    />
                  </div>
                </div>
              </div>

              {/* 4. FARM LOCATION & SECURITY */}
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-4 print-section">
                <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                  4. FARM LOCATION & SECURITY
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      16. Village / Town
                    </label>
                    <input
                      type="text"
                      value={formData.villageTown}
                      onChange={(e) => handleChange('villageTown', e.target.value)}
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.villageTown ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.villageTown && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.villageTown}</p>}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      District
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.district ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.district && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.district}</p>}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.state ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.state && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.state}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      17. Distance from Main Road
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.distanceMainRoad}
                        onChange={(e) => handleChange('distanceMainRoad', e.target.value)}
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none pr-8 ${errors.distanceMainRoad ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sridasi-neutral-500 font-medium">km</span>
                    </div>
                    {errors.distanceMainRoad && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceMainRoad}</p>}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      18. Distance from Nearest Market
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.distanceMarket}
                        onChange={(e) => handleChange('distanceMarket', e.target.value)}
                        className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none pr-8 ${errors.distanceMarket ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sridasi-neutral-500 font-medium">km</span>
                    </div>
                    {errors.distanceMarket && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceMarket}</p>}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-sridasi-neutral-200">
                      <label className="text-sridasi-neutral-700 font-semibold">19. Predators / Wild Animals Around the Farm?</label>
                      <div className="flex items-center gap-4 shrink-0 pl-4">
                        <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                          <input type="radio" name="predators" value="Yes" checked={formData.predatorsWildAnimals === 'Yes'} onChange={(e) => handleChange('predatorsWildAnimals', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                          <span className="font-medium">Yes</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                          <input type="radio" name="predators" value="No" checked={formData.predatorsWildAnimals === 'No'} onChange={(e) => handleChange('predatorsWildAnimals', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                          <span className="font-medium">No</span>
                        </label>
                      </div>
                    </div>
                    {formData.predatorsWildAnimals === 'Yes' && (
                      <div className="flex items-center gap-3 pl-2">
                        <span className="text-sridasi-neutral-500 shrink-0 font-medium">If yes, specify:</span>
                        <input type="text" value={formData.predatorsSpecify} onChange={(e) => handleChange('predatorsSpecify', e.target.value)} className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest shadow-sm" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-sridasi-neutral-200">
                      <label className="text-sridasi-neutral-700 font-semibold">20. Theft / Trespassing / Security Concerns?</label>
                      <div className="flex items-center gap-4 shrink-0 pl-4">
                        <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                          <input type="radio" name="theft" value="Yes" checked={formData.theftTrespassing === 'Yes'} onChange={(e) => handleChange('theftTrespassing', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                          <span className="font-medium">Yes</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                          <input type="radio" name="theft" value="No" checked={formData.theftTrespassing === 'No'} onChange={(e) => handleChange('theftTrespassing', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                          <span className="font-medium">No</span>
                        </label>
                      </div>
                    </div>
                    {formData.theftTrespassing === 'Yes' && (
                      <div className="flex items-center gap-3 pl-2">
                        <span className="text-sridasi-neutral-500 shrink-0 font-medium">If yes, explain:</span>
                        <input type="text" value={formData.theftExplain} onChange={(e) => handleChange('theftExplain', e.target.value)} className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest shadow-sm" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-sridasi-neutral-200">
                    <label className="text-sridasi-neutral-700 font-semibold">21. Farm Protection: Are you prepared to provide fencing / boundary protection?</label>
                    <div className="flex items-center gap-6 mt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                        <input type="radio" name="farmProtection" value="Yes" checked={formData.farmProtection === 'Yes'} onChange={(e) => handleChange('farmProtection', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                        <span className="font-medium">Yes</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                        <input type="radio" name="farmProtection" value="No" checked={formData.farmProtection === 'No'} onChange={(e) => handleChange('farmProtection', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                        <span className="font-medium">No</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer hover:text-sridasi-forest">
                        <input type="radio" name="farmProtection" value="Need Guidance" checked={formData.farmProtection === 'Need Guidance'} onChange={(e) => handleChange('farmProtection', e.target.value)} className="w-3.5 h-3.5 accent-sridasi-forest" />
                        <span className="font-medium">Need Guidance</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. BASIC FARM INFRASTRUCTURE */}
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                  5. BASIC FARM INFRASTRUCTURE
                </div>

                <div className="text-sridasi-neutral-700 font-semibold mb-1">
                  22. Can the following facilities be provided?
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr] pb-1 border-b border-sridasi-neutral-200 text-center">
                    <div className="font-semibold text-sridasi-neutral-700 text-left">Facility</div>
                    <div className="font-bold text-sridasi-neutral-600">Available</div>
                    <div className="font-bold text-sridasi-neutral-600">Can Be Created</div>
                    <div className="font-bold text-sridasi-neutral-600">Not Available</div>
                  </div>

                  {[
                    { key: 'infraStore', label: 'Store / Storage Area' },
                    { key: 'infraSupplies', label: 'Farm Supplies Area' },
                    { key: 'infraOffice', label: 'Office / Farm Management' }
                  ].map((item) => (
                    <div key={item.key} className="grid grid-cols-[2fr_1fr_1fr_1fr] py-1 items-center">
                      <div className="text-sridasi-neutral-800 text-left">{item.label}</div>
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          name={item.key}
                          checked={formData[item.key] === 'Available'}
                          onChange={() => handleChange(item.key, 'Available')}
                          className="text-sridasi-forest focus:ring-sridasi-forest"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          name={item.key}
                          checked={formData[item.key] === 'Can Be Created'}
                          onChange={() => handleChange(item.key, 'Can Be Created')}
                          className="text-sridasi-forest focus:ring-sridasi-forest"
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          name={item.key}
                          checked={formData[item.key] === 'Not Available'}
                          onChange={() => handleChange(item.key, 'Not Available')}
                          className="text-sridasi-forest focus:ring-sridasi-forest"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col w-full gap-1">
                  <label className="text-sridasi-neutral-700 font-semibold">23. Other Existing Infrastructure:</label>
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
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
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
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      25. Dist. All-Weather Road
                    </label>
                    <input
                      type="text"
                      value={formData.distanceAllWeatherRoad}
                      onChange={(e) => handleChange('distanceAllWeatherRoad', e.target.value)}
                      placeholder="e.g. 200 meters"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.distanceAllWeatherRoad ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.distanceAllWeatherRoad && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceAllWeatherRoad}</p>}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      26. Dist. Nearest Market
                    </label>
                    <input
                      type="text"
                      value={formData.distanceNearestMarket}
                      onChange={(e) => handleChange('distanceNearestMarket', e.target.value)}
                      placeholder="e.g. 5 km"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.distanceNearestMarket ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.distanceNearestMarket && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.distanceNearestMarket}</p>}
                  </div>
                </div>
              </div>

              {/* 7. FINANCIAL CAPACITY */}
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                  7. FINANCIAL CAPACITY
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">
                      27. Annual Family Income
                    </label>
                    <input
                      type="text"
                      value={formData.approxAnnualIncome}
                      onChange={(e) => handleChange('approxAnnualIncome', e.target.value)}
                      placeholder="e.g. ₹6 Lakhs"
                      className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.approxAnnualIncome ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                    />
                    {errors.approxAnnualIncome && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.approxAnnualIncome}</p>}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label className="text-sridasi-neutral-700 font-semibold">28. Farming Income:</label>
                    <input
                      type="text"
                      value={formData.farmingAnnualIncome}
                      onChange={(e) => handleChange('farmingAnnualIncome', e.target.value)}
                      placeholder="e.g. ₹2.5 Lakhs"
                      className="w-full p-2 rounded-xl bg-white border border-sridasi-neutral-200 text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <label className="text-sridasi-neutral-700 font-semibold">
                    29. Investment Capital Available for Project
                  </label>
                  <input
                    type="text"
                    value={formData.approxInvestmentAvailable}
                    onChange={(e) => handleChange('approxInvestmentAvailable', e.target.value)}
                    placeholder="e.g. ₹2 Lakhs to ₹5 Lakhs"
                    className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.approxInvestmentAvailable ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
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
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
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

                <div className="flex flex-col w-full gap-1">
                  <label className="text-sridasi-neutral-700 font-semibold">
                    32. Which activity would you like to develop first?
                  </label>
                  <input
                    type="text"
                    value={formData.activityToDevelopFirst}
                    onChange={(e) => handleChange('activityToDevelopFirst', e.target.value)}
                    placeholder="e.g. Fishery + Poultry + Organic Vegetables"
                    className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.activityToDevelopFirst ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
                  />
                  {errors.activityToDevelopFirst && <p className="text-[10px] text-red-600 mt-0.5 font-medium">{errors.activityToDevelopFirst}</p>}
                </div>
              </div>

              {/* 9. TIME & LABOUR */}
              <div className="break-inside-avoid mb-6 p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-section">
                <div className="font-heading font-bold text-sm text-sridasi-forest bg-sridasi-leaf-100/80 px-3 py-1 rounded-lg border border-sridasi-leaf-200">
                  9. TIME & LABOUR
                </div>

                <div className="flex flex-col w-full gap-1">
                  <label className="text-sridasi-neutral-700 font-semibold">
                    34. How much time can you give each day?
                  </label>
                  <input
                    type="text"
                    value={formData.dailyTimeHours}
                    onChange={(e) => handleChange('dailyTimeHours', e.target.value)}
                    placeholder="e.g. 6 to 8 hours/day"
                    className={`w-full p-2 rounded-xl bg-white border text-sridasi-forest focus:outline-none ${errors.dailyTimeHours ? 'border-red-500 bg-red-50/20' : 'border-sridasi-neutral-200 focus:border-sridasi-forest'}`}
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

              {/* 10. YOUR FARM AT A GLANCE */}
              <div className="break-inside-avoid mb-6 p-6 rounded-3xl bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] border border-sridasi-forest/20 shadow-soft-sm print-section relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -ml-10 -mt-10 pointer-events-none"></div>

                <div className="z-10 relative">
                  <h3 className="font-heading font-extrabold text-lg text-sridasi-forest uppercase tracking-tight mb-4">
                    10. YOUR FARM AT A GLANCE
                  </h3>

                  <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-3 gap-y-4 text-xs font-semibold text-sridasi-neutral-800 items-end">
                    <span className="shrink-0 pb-1">Land:</span>
                    <input
                      type="text"
                      value={formData.farmAtAGlance.land}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, land: e.target.value } }))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0"
                    />

                    <span className="shrink-0 pb-1 pl-2">Water:</span>
                    <input
                      type="text"
                      value={formData.farmAtAGlance.water}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, water: e.target.value } }))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0"
                    />

                    <span className="shrink-0 pb-1">Electricity:</span>
                    <input
                      type="text"
                      value={formData.farmAtAGlance.electricity}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, electricity: e.target.value } }))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0"
                    />

                    <span className="shrink-0 pb-1 pl-2">Road:</span>
                    <input
                      type="text"
                      value={formData.farmAtAGlance.road}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, road: e.target.value } }))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0"
                    />

                    <span className="shrink-0 pb-1">Market Distance:</span>
                    <input
                      type="text"
                      value={formData.farmAtAGlance.marketDistance}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, marketDistance: e.target.value } }))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0"
                    />

                    <span className="shrink-0 pb-1 pl-2">Security:</span>
                    <input
                      type="text"
                      value={formData.farmAtAGlance.security}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmAtAGlance: { ...prev.farmAtAGlance, security: e.target.value } }))}
                      className="border-b-2 border-sridasi-forest/40 bg-transparent focus:outline-none focus:border-sridasi-forest px-1 py-0.5 w-full min-w-0"
                    /></div>
                </div>
              </div>
            </div>

            {/* Submission Bar (Hidden during Print) */}
            <div className="pt-6 border-t-2 border-sridasi-forest flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div className="text-xs text-sridasi-neutral-600">
                <span className="font-bold text-sridasi-forest">Declaration:</span> {formData.role === 'buyer' ? 'All commercial information provided is accurate for contract sourcing & procurement.' : 'All information provided is accurate for 3-Day Residential Training planning.'}
              </div>

              <div className="flex items-center justify-end w-full sm:w-auto">
                <Button
                  variant="gold"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-auto shadow-soft hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold px-8 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</span>
                  ) : (
                    formData.role === 'buyer' ? "Submit" : "Submit"
                  )}
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

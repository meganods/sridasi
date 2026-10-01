import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Sprout, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Search, 
  Download, 
  Calendar, 
  Printer, 
  ArrowLeft, 
  RefreshCw, 
  Eye, 
  X, 
  Lock, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Home,
  Briefcase,
  Droplets,
  Zap,
  Truck,
  DollarSign,
  Compass,
  Layers,
  CheckSquare,
  Trash2
} from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import BRAND_INFO from '../data/brandInfo';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Sample fallback seed records with full 10-section assessment schema
const SEED_USERS = [
  {
    id: 'SRI-FARM-101',
    role: 'farmer',
    fullName: 'Ramesh Kumar Jena',
    qualification: 'Graduate in Agriculture (B.Sc)',
    preferredLanguage: 'Odia / Hindi',
    countryCode: '+91',
    mobileNumber: '9845012345',
    emailId: 'ramesh.jena@agroodisha.com',
    completeAddress: 'Plot 42, Sector 3, Balasore Rural, Odisha - 756001',
    currentOccupation: 'Full-time Farmer & Aqua Producer',
    challenges: {
      land: false,
      water: true,
      electricity: true,
      labour: true,
      finance: false,
      marketing: true,
      technicalKnowledge: false,
      other: 'Cold chain transit to state capital'
    },
    interestReason: 'Desire to build a zero-chemical integrated polyculture farm with stable cashflow.',
    totalLand: '4.5',
    landUnit: 'Acres',
    landUsedForFarming: '3.0 Acres',
    landType: 'Agricultural',
    waterSources: {
      borewell: true,
      pond: true,
      canal: false,
      river: false,
      rainwater: true,
      other: ''
    },
    borewellElectricity: 'Yes',
    borewellSize: '4 Inch',
    electricityHours: '10 Hours',
    villageTown: 'Balasore Rural',
    district: 'Balasore',
    state: 'Odisha',
    distanceMainRoad: '1.2 km',
    distanceMarket: '6.0 km',
    predatorsWildAnimals: 'No',
    predatorsSpecify: '',
    theftTrespassing: 'No',
    theftExplain: '',
    farmProtection: 'Yes',
    infraStore: 'Available',
    infraSupplies: 'Can Be Created',
    infraOffice: 'Available',
    otherExistingInfra: 'Tubewell shed & feed packaging store',
    transport: {
      tractor: true,
      miniTruck: false,
      jeep: true,
      goodRoad: true,
      electricity: true,
      internet: true,
      other: ''
    },
    distanceAllWeatherRoad: '0.5 km',
    distanceNearestMarket: '6.0 km',
    approxAnnualIncome: '₹4.8 Lakhs',
    farmingAnnualIncome: '₹3.2 Lakhs',
    approxInvestmentAvailable: '₹2.5 Lakhs',
    readyToInvest: 'Yes',
    activitiesInterest: {
      fishery: true,
      dairy: true,
      livestock: false,
      duckery: false,
      poultry: true,
      naturalFarming: true,
      horticulture: true,
      fruitVeg: true,
      integratedFarming: true,
      other: ''
    },
    activityToDevelopFirst: 'Polyculture Fishery & Dairy Fodder',
    hasPriorExperience: 'Yes',
    priorExperienceDesc: '4 years experience in freshwater IMC carp aquaculture and vermicomposting.',
    dailyTimeHours: '8 hours/day',
    staffAvailability: 'Moderate',
    hasFarmManager: 'Yes',
    farmAtAGlance: {
      land: '4.5 Acres fertile alluvial',
      water: '2 Perennial Ponds + 1 Borewell',
      electricity: '3-Phase Agricultural Grid',
      road: 'Pucca All-Weather Connected',
      marketDistance: '6 km from Balasore Mandi',
      security: 'Barbed Wire & Boundary Live Fence'
    },
    submittedAtStr: '01 Oct 2026 10:30 AM',
    timestamp: new Date('2026-10-01T10:30:00')
  },
  {
    id: 'SRI-FARM-102',
    role: 'farmer',
    fullName: 'Harjinder Singh Sandhu',
    qualification: 'Higher Secondary',
    preferredLanguage: 'Punjabi / Hindi',
    countryCode: '+91',
    mobileNumber: '9876588990',
    emailId: 'harjinder.sandhu@punjabfarms.in',
    completeAddress: 'Village Sahnewal, District Ludhiana, Punjab - 141120',
    currentOccupation: 'Progressive Dairy Farmer',
    challenges: {
      land: false,
      water: false,
      electricity: false,
      labour: true,
      finance: false,
      marketing: false,
      technicalKnowledge: true,
      other: 'Bio-security and disease prevention protocols'
    },
    interestReason: 'Upgrading family farm into an automated dairy & aquaculture ecosystem.',
    totalLand: '6.0',
    landUnit: 'Acres',
    landUsedForFarming: '5.5 Acres',
    landType: 'Agricultural',
    waterSources: {
      borewell: true,
      pond: false,
      canal: true,
      river: false,
      rainwater: false,
      other: ''
    },
    borewellElectricity: 'Yes',
    borewellSize: '6 Inch',
    electricityHours: '12 Hours',
    villageTown: 'Sahnewal',
    district: 'Ludhiana',
    state: 'Punjab',
    distanceMainRoad: '0.8 km',
    distanceMarket: '4.5 km',
    predatorsWildAnimals: 'No',
    predatorsSpecify: '',
    theftTrespassing: 'No',
    theftExplain: '',
    farmProtection: 'Yes',
    infraStore: 'Available',
    infraSupplies: 'Available',
    infraOffice: 'Can Be Created',
    otherExistingInfra: 'Silage pits & 30-cow shed',
    transport: {
      tractor: true,
      miniTruck: true,
      jeep: false,
      goodRoad: true,
      electricity: true,
      internet: true,
      other: ''
    },
    distanceAllWeatherRoad: '0.2 km',
    distanceNearestMarket: '4.5 km',
    approxAnnualIncome: '₹9.2 Lakhs',
    farmingAnnualIncome: '₹8.0 Lakhs',
    approxInvestmentAvailable: '₹5.0 Lakhs',
    readyToInvest: 'Yes',
    activitiesInterest: {
      fishery: true,
      dairy: true,
      livestock: true,
      duckery: false,
      poultry: true,
      naturalFarming: true,
      horticulture: false,
      fruitVeg: false,
      integratedFarming: true,
      other: ''
    },
    activityToDevelopFirst: 'Integrated Dairy, Poultry & Aqua Tank',
    hasPriorExperience: 'Yes',
    priorExperienceDesc: '10+ years dairy herd management with milk chilling unit.',
    dailyTimeHours: '10 hours/day',
    staffAvailability: 'Easy',
    hasFarmManager: 'Yes',
    farmAtAGlance: {
      land: '6 Acres flat fertile loam',
      water: 'Canal Lift & 6" Submersible Tube',
      electricity: 'Dedicated Agricultural Feeder',
      road: 'Direct GT Road link',
      marketDistance: '4.5 km to Sahnewal',
      security: 'Brick Wall Boundary'
    },
    submittedAtStr: '30 Sep 2026 04:15 PM',
    timestamp: new Date('2026-09-30T16:15:00')
  },
  {
    id: 'SRI-BUY-201',
    role: 'buyer',
    fullName: 'Amitabh Sen',
    qualification: 'Post Graduate (MBA)',
    preferredLanguage: 'Bengali / English',
    countryCode: '+91',
    mobileNumber: '9830055441',
    emailId: 'amitabh.sen@bengaltrade.com',
    completeAddress: 'Park Street Commercial Hub, Kolkata, WB - 700016',
    currentOccupation: 'Agro Commodity Trader / Aggregator',
    challenges: {
      land: false,
      water: false,
      electricity: false,
      labour: false,
      finance: false,
      marketing: false,
      technicalKnowledge: false,
      other: 'Consistent certified bio-organic supply'
    },
    interestReason: 'Contract procurement of high-grade aquaculture harvest and curcumin tea.',
    totalLand: '2.0',
    landUnit: 'Acres',
    landUsedForFarming: 'Commercial Sourcing Depot',
    landType: 'Commercial',
    waterSources: {
      borewell: true,
      pond: false,
      canal: false,
      river: false,
      rainwater: false,
      other: ''
    },
    borewellElectricity: 'Yes',
    borewellSize: '4 Inch',
    electricityHours: '24 Hours',
    villageTown: 'Kolkata Central',
    district: 'Kolkata',
    state: 'West Bengal',
    distanceMainRoad: '0.1 km',
    distanceMarket: '1.0 km',
    predatorsWildAnimals: 'No',
    predatorsSpecify: '',
    theftTrespassing: 'No',
    theftExplain: '',
    farmProtection: 'Yes',
    infraStore: 'Available',
    infraSupplies: 'Available',
    infraOffice: 'Available',
    otherExistingInfra: 'Cold storage warehouse facility',
    transport: {
      tractor: false,
      miniTruck: true,
      jeep: true,
      goodRoad: true,
      electricity: true,
      internet: true,
      other: ''
    },
    distanceAllWeatherRoad: '0.0 km',
    distanceNearestMarket: '1.0 km',
    approxAnnualIncome: '₹18.5 Lakhs',
    farmingAnnualIncome: '₹0.0 Lakhs',
    approxInvestmentAvailable: '₹10.0 Lakhs',
    readyToInvest: 'Yes',
    activitiesInterest: {
      fishery: true,
      dairy: false,
      livestock: false,
      duckery: false,
      poultry: false,
      naturalFarming: true,
      horticulture: true,
      fruitVeg: true,
      integratedFarming: true,
      other: ''
    },
    activityToDevelopFirst: 'Fishery & Organic Vegetable Procurement',
    hasPriorExperience: 'Yes',
    priorExperienceDesc: '8 years experience sourcing fish & produce for regional wholesalers.',
    dailyTimeHours: '6 hours/day',
    staffAvailability: 'Easy',
    hasFarmManager: 'Yes',
    farmAtAGlance: {
      land: '2 Acres Warehouse Complex',
      water: 'Municipal + Deep Borewell',
      electricity: 'Commercial 3-Phase Grid',
      road: 'Highway Frontage',
      marketDistance: 'In Metropolitan Hub',
      security: 'CCTV & Guarded Gate'
    },
    submittedAtStr: '01 Oct 2026 02:45 PM',
    timestamp: new Date('2026-10-01T14:45:00')
  },
  {
    id: 'SRI-BUY-202',
    role: 'buyer',
    fullName: 'Vikramaditya Mehta',
    qualification: 'B.Com / Retail Management',
    preferredLanguage: 'Hindi / English',
    countryCode: '+91',
    mobileNumber: '9920144332',
    emailId: 'v.mehta@organicretail.in',
    completeAddress: 'Andheri East Commercial Hub, Mumbai, MH - 400069',
    currentOccupation: 'Organic Food Retailer & Supermarket Supplier',
    challenges: {
      land: false,
      water: false,
      electricity: false,
      labour: false,
      finance: false,
      marketing: false,
      technicalKnowledge: false,
      other: 'Traceability and direct farm origin assurance'
    },
    interestReason: 'Building exclusive sourcing partnerships for herbal extracts and organic teas.',
    totalLand: '1.5',
    landUnit: 'Acres',
    landUsedForFarming: 'Wholesale Packing & Dispatch Yard',
    landType: 'Commercial',
    waterSources: {
      borewell: true,
      pond: false,
      canal: false,
      river: false,
      rainwater: false,
      other: ''
    },
    borewellElectricity: 'Yes',
    borewellSize: '3 Inch',
    electricityHours: '24 Hours',
    villageTown: 'Andheri East',
    district: 'Mumbai',
    state: 'Maharashtra',
    distanceMainRoad: '0.0 km',
    distanceMarket: '2.0 km',
    predatorsWildAnimals: 'No',
    predatorsSpecify: '',
    theftTrespassing: 'No',
    theftExplain: '',
    farmProtection: 'Yes',
    infraStore: 'Available',
    infraSupplies: 'Available',
    infraOffice: 'Available',
    otherExistingInfra: 'FSSAI certified food packaging center',
    transport: {
      tractor: false,
      miniTruck: true,
      jeep: false,
      goodRoad: true,
      electricity: true,
      internet: true,
      other: ''
    },
    distanceAllWeatherRoad: '0.0 km',
    distanceNearestMarket: '2.0 km',
    approxAnnualIncome: '₹24.0 Lakhs',
    farmingAnnualIncome: '₹0.0 Lakhs',
    approxInvestmentAvailable: '₹12.0 Lakhs',
    readyToInvest: 'Yes',
    activitiesInterest: {
      fishery: false,
      dairy: false,
      livestock: false,
      duckery: false,
      poultry: false,
      naturalFarming: true,
      horticulture: true,
      fruitVeg: true,
      integratedFarming: true,
      other: ''
    },
    activityToDevelopFirst: 'Organic Millets, Curcumin Tea & Value Added Products',
    hasPriorExperience: 'Yes',
    priorExperienceDesc: '12 years in organic FMCG brand distribution and retail supply.',
    dailyTimeHours: '8 hours/day',
    staffAvailability: 'Easy',
    hasFarmManager: 'Yes',
    farmAtAGlance: {
      land: '1.5 Acres Logistics Facility',
      water: 'Industrial Water Connection',
      electricity: 'Continuous 24x7 Power',
      road: 'Main Expressway Link',
      marketDistance: '2 km to APMC Hub',
      security: 'Full Enclosed Compound'
    },
    submittedAtStr: '29 Sep 2026 11:20 AM',
    timestamp: new Date('2026-09-29T11:20:00')
  }
];

export function AdminDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sridasi_admin_auth') === 'true';
  });
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  const [activeTab, setActiveTab] = useState('farmers'); // 'farmers' | 'buyers'
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userToDeleteModal, setUserToDeleteModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Handle Login Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmittingAuth(true);

    setTimeout(() => {
      const validIds = ['admin', 'sridasi', 'admin@sridasifarms.com'];
      const validPass = ['admin', 'admin123', 'sridasi@2026', '123456'];

      const trimmedId = adminId.trim().toLowerCase();
      const trimmedPass = password.trim();

      if (validIds.includes(trimmedId) && validPass.includes(trimmedPass)) {
        setIsAuthenticated(true);
        sessionStorage.setItem('sridasi_admin_auth', 'true');
        setAuthError('');
      } else {
        setAuthError('Invalid Admin ID or Password. Please verify your credentials.');
      }
      setIsSubmittingAuth(false);
    }, 300);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sridasi_admin_auth');
    setAdminId('');
    setPassword('');
  };

  // Update real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Candidate Firestore collections to auto-detect all users
  const FIREBASE_COLLECTIONS = ['registrations', 'training_registrations', 'farmers', 'buyers', 'users', 'farmer_registrations', 'buyer_registrations'];

  // Helper to map and normalize raw registration records from any Firestore collection
  const mapRecord = (d, docId, colName = 'registrations') => {
    const dateObj = d.submittedAt?.toDate 
      ? d.submittedAt.toDate() 
      : (d.timestamp ? new Date(d.timestamp) : (d.createdAt?.toDate ? d.createdAt.toDate() : new Date()));

    // Auto-detect role
    let detectedRole = 'farmer';
    if (colName === 'buyers' || colName === 'buyer_registrations') {
      detectedRole = 'buyer';
    } else if (d.role) {
      detectedRole = d.role.toLowerCase().includes('buy') ? 'buyer' : 'farmer';
    } else if (d.businessType || d.companyName || d.targetCommodity) {
      detectedRole = 'buyer';
    }

    return {
      id: d.submissionId || d.id || docId,
      docId: docId || d.docId,
      collection: colName,
      role: detectedRole,
      fullName: d.fullName || d.name || d.farmerName || d.buyerName || '',
      qualification: d.qualification || '',
      preferredLanguage: d.preferredLanguage || '',
      countryCode: d.countryCode || '+91',
      mobileNumber: d.mobileNumber || d.phone || d.mobile || '',
      emailId: d.emailId || d.email || '',
      completeAddress: d.completeAddress || d.address || '',
      currentOccupation: d.currentOccupation || d.occupation || '',
      challenges: d.challenges || {},
      interestReason: d.interestReason || d.reason || '',
      totalLand: d.totalLand || d.land || '',
      landUnit: d.landUnit || 'Acres',
      landUsedForFarming: d.landUsedForFarming || d.farmingLand || '',
      landType: d.landType || '',
      waterSources: d.waterSources || {},
      borewellElectricity: d.borewellElectricity || '',
      borewellSize: d.borewellSize || '',
      electricityHours: d.electricityHours || '',
      villageTown: d.villageTown || d.village || d.city || '',
      district: d.district || '',
      state: d.state || '',
      distanceMainRoad: d.distanceMainRoad || '',
      distanceMarket: d.distanceMarket || '',
      predatorsWildAnimals: d.predatorsWildAnimals || '',
      predatorsSpecify: d.predatorsSpecify || '',
      theftTrespassing: d.theftTrespassing || '',
      theftExplain: d.theftExplain || '',
      farmProtection: d.farmProtection || '',
      infraStore: d.infraStore || '',
      infraSupplies: d.infraSupplies || '',
      infraOffice: d.infraOffice || '',
      otherExistingInfra: d.otherExistingInfra || '',
      transport: d.transport || {},
      distanceAllWeatherRoad: d.distanceAllWeatherRoad || '',
      distanceNearestMarket: d.distanceNearestMarket || '',
      approxAnnualIncome: d.approxAnnualIncome || d.annualIncome || '',
      farmingAnnualIncome: d.farmingAnnualIncome || '',
      approxInvestmentAvailable: d.approxInvestmentAvailable || d.investmentBudget || '',
      readyToInvest: d.readyToInvest || '',
      activitiesInterest: d.activitiesInterest || {},
      activityToDevelopFirst: d.activityToDevelopFirst || d.primaryInterest || '',
      hasPriorExperience: d.hasPriorExperience || '',
      priorExperienceDesc: d.priorExperienceDesc || d.experience || '',
      dailyTimeHours: d.dailyTimeHours || '',
      staffAvailability: d.staffAvailability || '',
      hasFarmManager: d.hasFarmManager || '',
      farmAtAGlance: d.farmAtAGlance || {},
      submittedAtStr: d.submittedAtStr || (dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
      timestamp: dateObj,
      rawFormData: d
    };
  };

  // Merge and deduplicate datasets
  const combineDatasets = (firestoreList = []) => {
    const rawDeleted = JSON.parse(localStorage.getItem('sridasi_deleted_ids') || '[]');
    const deletedIds = Array.isArray(rawDeleted) ? rawDeleted.filter(id => Boolean(id) && typeof id === 'string') : [];

    const isDeleted = (item) => {
      if (item.id && deletedIds.includes(item.id)) return true;
      if (item.docId && deletedIds.includes(item.docId)) return true;
      return false;
    };

    const localStr = localStorage.getItem('sridasi_registrations');
    let localData = [];
    if (localStr) {
      try {
        const raw = JSON.parse(localStr);
        localData = (Array.isArray(raw) ? raw : []).map(item => mapRecord(item, item.docId, 'local'));
      } catch (e) {
        console.error(e);
      }
    }

    const combined = [...firestoreList, ...localData, ...SEED_USERS];
    const unique = Array.from(new Map(combined.map(item => [item.id || item.mobileNumber, item])).values())
      .filter(item => !isDeleted(item));

    setUsers(unique);
    setLoading(false);
  };

  // Real-time Database Subscription across all collections
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const firestoreCollectionsCache = {};

    const updateAll = () => {
      const allFirestore = Object.values(firestoreCollectionsCache).flat();
      combineDatasets(allFirestore);
    };

    // Listen to all candidate collections in real-time
    const unsubs = FIREBASE_COLLECTIONS.map(colName => {
      try {
        const colRef = collection(db, colName);
        return onSnapshot(colRef, (snapshot) => {
          firestoreCollectionsCache[colName] = snapshot.docs.map(doc => mapRecord(doc.data(), doc.id, colName));
          updateAll();
        }, (err) => {
          // If collection doesn't exist yet, silently ignore
          firestoreCollectionsCache[colName] = [];
          updateAll();
        });
      } catch (e) {
        return () => {};
      }
    });

    // Real-time cross-tab Storage listener (for same browser / tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'sridasi_registrations' || e.key === 'sridasi_deleted_ids') {
        updateAll();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubs.forEach(unsub => typeof unsub === 'function' && unsub());
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated]);

  // Manual Refresh Handler across all collections
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled(
        FIREBASE_COLLECTIONS.map(async (colName) => {
          const snapshot = await getDocs(collection(db, colName));
          return snapshot.docs.map(doc => mapRecord(doc.data(), doc.id, colName));
        })
      );

      const allFirestore = results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value);

      combineDatasets(allFirestore);
    } catch (err) {
      console.warn("Using offline & local registration data:", err);
      combineDatasets([]);
    }
  };

  // Trigger Professional Deletion Confirmation Modal
  const handleRequestDelete = (user, e) => {
    if (e) e.stopPropagation();
    setUserToDeleteModal(user);
  };

  // Permanently delete ONLY the confirmed registration (Optimistic & Responsive)
  const executeDeleteUser = async () => {
    if (!userToDeleteModal) return;
    const targetUser = userToDeleteModal;
    setIsDeleting(true);

    // 1. Immediately update UI state (instant response)
    setUsers(prev => prev.filter(u => {
      if (targetUser.id && u.id === targetUser.id) return false;
      if (targetUser.docId && u.docId && u.docId === targetUser.docId) return false;
      return true;
    }));

    // 2. Persist in deletedIds array
    try {
      const rawDeleted = JSON.parse(localStorage.getItem('sridasi_deleted_ids') || '[]');
      const deletedIds = Array.isArray(rawDeleted) ? rawDeleted.filter(id => Boolean(id) && typeof id === 'string') : [];
      if (targetUser.id && typeof targetUser.id === 'string' && !deletedIds.includes(targetUser.id)) {
        deletedIds.push(targetUser.id);
      }
      if (targetUser.docId && typeof targetUser.docId === 'string' && !deletedIds.includes(targetUser.docId)) {
        deletedIds.push(targetUser.docId);
      }
      localStorage.setItem('sridasi_deleted_ids', JSON.stringify(deletedIds));
    } catch (e) {}

    // 3. Remove from LocalStorage 'sridasi_registrations'
    try {
      const localStr = localStorage.getItem('sridasi_registrations');
      if (localStr) {
        const list = JSON.parse(localStr);
        const updated = list.filter(item => {
          const itemId = item.submissionId || item.id;
          if (targetUser.id && itemId === targetUser.id) return false;
          if (targetUser.docId && item.docId && item.docId === targetUser.docId) return false;
          return true;
        });
        localStorage.setItem('sridasi_registrations', JSON.stringify(updated));
      }
    } catch (e) {}

    // 4. Close modal and drawer immediately
    if (selectedUser && (selectedUser.id === targetUser.id || (selectedUser.docId && selectedUser.docId === targetUser.docId))) {
      setIsDrawerOpen(false);
      setSelectedUser(null);
    }

    setUserToDeleteModal(null);
    setIsDeleting(false);

    // 5. Cloud Firestore background delete (non-blocking)
    if (targetUser.docId) {
      try {
        const colName = targetUser.collection || 'registrations';
        deleteDoc(doc(db, colName, targetUser.docId)).catch(err => {
          console.warn('Firestore cloud delete sync note:', err);
        });
      } catch (err) {
        console.warn('Firestore cloud delete trigger note:', err);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sridasi-forest via-sridasi-primary-900 to-sridasi-forest flex items-center justify-center p-4 sm:p-6 text-white font-sans selection:bg-sridasi-green selection:text-white relative overflow-hidden text-left">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sridasi-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sridasi-yellow/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 animate-fade-in">
          
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sridasi-green to-sridasi-forest mx-auto flex items-center justify-center text-sridasi-yellow shadow-soft mb-4 border border-sridasi-yellow/30">
              <Sprout className="w-9 h-9 text-sridasi-yellow" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl tracking-tight text-white">
              SRIDASI ADMIN PORTAL
            </h1>
            <p className="text-xs text-sridasi-leaf-200 mt-1">
              Central Operations Hub • Farmer & Buyer Management
            </p>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Error Alert */}
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Admin ID Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-sridasi-leaf-200">
                Admin ID / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Enter Admin ID"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-sridasi-yellow focus:ring-1 focus:ring-sridasi-yellow text-sm transition-all"
                />
                <ShieldCheck className="w-4 h-4 text-sridasi-yellow absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-sridasi-leaf-200">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-sridasi-yellow focus:ring-1 focus:ring-sridasi-yellow text-sm transition-all"
                />
                <Lock className="w-4 h-4 text-sridasi-yellow absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-white/60 hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              variant="gold"
              size="lg"
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full mt-2 font-bold shadow-soft hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              {isSubmittingAuth ? 'Verifying...' : 'Sign In to Admin Dashboard'}
            </Button>
          </form>

          {/* Return link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-sridasi-leaf-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sridasi Homepage</span>
            </a>
          </div>

        </div>
      </div>
    );
  }

  // Stats Counters
  const totalFarmers = users.filter(u => u.role === 'farmer');
  const totalBuyers = users.filter(u => u.role === 'buyer');
  const totalCount = users.length;
  
  // Unique regions count
  const allStates = new Set(users.map(u => u.state).filter(Boolean));

  // Filtered lists (by search query)
  const farmersList = totalFarmers.filter(u => {
    return (
      (u.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.mobileNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.state || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.currentOccupation || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.activityToDevelopFirst || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.id || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const buyersList = totalBuyers.filter(u => {
    return (
      (u.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.mobileNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.state || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.currentOccupation || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.activityToDevelopFirst || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.id || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Export to CSV
  const handleExportCSV = (role = 'farmer') => {
    const exportData = role === 'farmer' ? totalFarmers : totalBuyers;
    let csvContent = "data:text/csv;charset=utf-8,";
    
    csvContent += "ID,Role,Full Name,Qualification,Language,Mobile,Email,Address,Occupation,Total Land,Land Unit,Active Farm Land,Land Type,Water Sources,Borewell Size,Electricity Hours,Village,District,State,Distance Main Road,Distance Market,Predators,Theft Concerns,Fencing,Store Infra,Supplies Infra,Office Infra,Other Infra,Tractor,Mini Truck,Jeep,Good Road,Elec Connection,Internet,Road Distance,Market Distance,Annual Income,Farm Income,Investment Capital,Ready To Invest,Primary Interest,Prior Experience,Daily Time Hours,Staff Availability,Farm Manager,Submitted At\n";

    exportData.forEach(u => {
      const waterList = Object.entries(u.waterSources || {}).filter(([k, v]) => v === true).map(([k]) => k).join('; ');
      const transportList = Object.entries(u.transport || {}).filter(([k, v]) => v === true).map(([k]) => k).join('; ');
      
      csvContent += `"${u.id}","${u.role}","${u.fullName}","${u.qualification || ''}","${u.preferredLanguage || ''}","${u.countryCode} ${u.mobileNumber}","${u.emailId || ''}","${(u.completeAddress || '').replace(/"/g, '""')}","${u.currentOccupation || ''}","${u.totalLand || ''}","${u.landUnit || 'Acres'}","${u.landUsedForFarming || ''}","${u.landType || ''}","${waterList}","${u.borewellSize || ''}","${u.electricityHours || ''}","${u.villageTown || ''}","${u.district || ''}","${u.state || ''}","${u.distanceMainRoad || ''}","${u.distanceMarket || ''}","${u.predatorsWildAnimals || ''}","${u.theftTrespassing || ''}","${u.farmProtection || ''}","${u.infraStore || ''}","${u.infraSupplies || ''}","${u.infraOffice || ''}","${u.otherExistingInfra || ''}","${u.transport?.tractor ? 'Yes' : 'No'}","${u.transport?.miniTruck ? 'Yes' : 'No'}","${u.transport?.jeep ? 'Yes' : 'No'}","${u.transport?.goodRoad ? 'Yes' : 'No'}","${u.transport?.electricity ? 'Yes' : 'No'}","${u.transport?.internet ? 'Yes' : 'No'}","${u.distanceAllWeatherRoad || ''}","${u.distanceNearestMarket || ''}","${u.approxAnnualIncome || ''}","${u.farmingAnnualIncome || ''}","${u.approxInvestmentAvailable || ''}","${u.readyToInvest || ''}","${u.activityToDevelopFirst || ''}","${u.hasPriorExperience || ''}","${u.dailyTimeHours || ''}","${u.staffAvailability || ''}","${u.hasFarmManager || ''}","${u.submittedAtStr}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sridasi_${role}_directory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to render a label-value row (blank if empty)
  const renderField = (label, value) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold text-sridasi-neutral-500">{label}</span>
      <span className="text-xs font-bold text-sridasi-forest">
        {value && value.toString().trim() !== '' ? value : '—'}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-sridasi-dark font-sans flex flex-col selection:bg-sridasi-forest selection:text-white text-left">
      
      {/* ========================================================================= */}
      {/* 1. TOP ADMIN BAR                                                          */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-sridasi-forest text-white shadow-soft border-b border-sridasi-primary-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sridasi-yellow text-sridasi-forest flex items-center justify-center font-bold shadow-soft">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg text-white tracking-tight leading-none">
                  SRIDASI
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sridasi-yellow text-sridasi-forest text-[10px] font-extrabold uppercase tracking-wider">
                  Admin Hub
                </span>
              </div>
              <span className="text-[10px] text-sridasi-leaf-200 font-medium">
                Central Farmer & Buyer Operations Control
              </span>
            </div>
          </div>

          {/* Right Actions, Clock & Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-sridasi-leaf-200 bg-sridasi-primary-900/60 px-3 py-1.5 rounded-xl border border-sridasi-primary-700/60">
              <Clock className="w-3.5 h-3.5 text-sridasi-yellow" />
              <span>{currentTime}</span>
            </div>

            <button
              onClick={fetchRegistrations}
              className="p-2 rounded-xl bg-sridasi-primary-800 hover:bg-sridasi-primary-700 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <a
              href="/"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Site</span>
            </a>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-soft cursor-pointer"
              title="Sign Out of Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. STATS OVERVIEW CARDS                                                   */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Users */}
          <div className="p-5 rounded-3xl bg-white border border-sridasi-neutral-200/90 shadow-soft flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-sridasi-neutral-500 uppercase tracking-wider block">
                Total Registrations
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-sridasi-forest">
                {totalCount}
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Database Sync
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sridasi-primary-50 text-sridasi-forest flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Farmers Entity */}
          <div 
            onClick={() => setActiveTab('farmers')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-soft flex items-center justify-between ${
              activeTab === 'farmers' 
                ? 'bg-sridasi-leaf-50/70 border-sridasi-green ring-2 ring-sridasi-green/20' 
                : 'bg-white border-sridasi-neutral-200/90 hover:border-sridasi-green/40'
            }`}
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-sridasi-green uppercase tracking-wider block">
                🌾 Registered Farmers
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-sridasi-forest">
                {totalFarmers.length}
              </div>
              <span className="text-[11px] text-sridasi-neutral-600 font-medium">
                Land & Farm Assessments
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Buyers Entity */}
          <div 
            onClick={() => setActiveTab('buyers')}
            className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-soft flex items-center justify-between ${
              activeTab === 'buyers' 
                ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20' 
                : 'bg-white border-sridasi-neutral-200/90 hover:border-amber-400'
            }`}
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                🛒 Registered Buyers
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-sridasi-forest">
                {totalBuyers.length}
              </div>
              <span className="text-[11px] text-sridasi-neutral-600 font-medium">
                Commercial Offtakers & Traders
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Geographic Coverage */}
          <div className="p-5 rounded-3xl bg-white border border-sridasi-neutral-200/90 shadow-soft flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-sridasi-neutral-500 uppercase tracking-wider block">
                States Represented
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-sridasi-forest">
                {allStates.size} <span className="text-xs text-sridasi-neutral-400 font-normal">States</span>
              </div>
              <span className="text-[11px] text-sridasi-leaf-600 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Pan-India Reach
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sridasi-primary-50 text-sridasi-forest flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ENTITY NAVIGATION & SEARCH BAR                                         */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full flex-1 space-y-6 print:hidden">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-sridasi-neutral-200 shadow-soft-sm">
          
          {/* Entity Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200">
            <button
              onClick={() => setActiveTab('farmers')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'farmers'
                  ? 'bg-sridasi-forest text-white shadow-soft'
                  : 'text-sridasi-neutral-600 hover:text-sridasi-forest'
              }`}
            >
              <Sprout className="w-4 h-4 text-sridasi-yellow" />
              <span>Farmers Directory ({totalFarmers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('buyers')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'buyers'
                  ? 'bg-sridasi-forest text-white shadow-soft'
                  : 'text-sridasi-neutral-600 hover:text-sridasi-forest'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-sridasi-yellow" />
              <span>Buyers Directory ({totalBuyers.length})</span>
            </button>
          </div>

          {/* Search Box & Export Action */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-sridasi-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab} by name, phone, district...`}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-sridasi-surface border border-sridasi-neutral-200 text-xs text-sridasi-forest focus:outline-none focus:border-sridasi-forest"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExportCSV(activeTab === 'farmers' ? 'farmer' : 'buyer')}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export CSV
            </Button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. FARMERS DIRECTORY TABLE                                                */}
        {/* ========================================================================= */}
        {activeTab === 'farmers' && (
          <div className="rounded-3xl bg-white border border-sridasi-neutral-200 overflow-hidden shadow-soft animate-fade-in">
            <div className="p-4 sm:p-5 border-b border-sridasi-neutral-200 flex items-center justify-between bg-sridasi-surface">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  🌾
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-sridasi-forest">
                    Farmer Registrations
                  </h3>
                  <p className="text-xs text-sridasi-neutral-500">
                    Showing {farmersList.length} verified farmer profiles • Click 'View Dossier' for all 36 assessment parameters
                  </p>
                </div>
              </div>
              <Badge variant="green" size="sm">{farmersList.length} Farmers</Badge>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full text-xs text-left table-auto">
                <thead className="bg-sridasi-surface/90 text-sridasi-neutral-700 border-b border-sridasi-neutral-200 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 w-[14%]">ID & Date</th>
                    <th className="py-3.5 px-4 w-[22%]">Farmer Name & Role</th>
                    <th className="py-3.5 px-4 w-[20%]">Contact Details</th>
                    <th className="py-3.5 px-4 w-[16%]">Location</th>
                    <th className="py-3.5 px-4 w-[18%]">Land & Primary Focus</th>
                    <th className="py-3.5 px-4 text-right w-[10%]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sridasi-neutral-100">
                  {farmersList.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-sridasi-neutral-500">
                        No farmer records matching your search query.
                      </td>
                    </tr>
                  ) : (
                    farmersList.map((farmer) => (
                      <tr key={farmer.id} className="hover:bg-sridasi-surface/60 transition-colors">
                        {/* ID & Date */}
                        <td className="py-4 px-4 align-top">
                          <span className="font-mono font-bold text-sridasi-forest block text-xs">
                            {farmer.id}
                          </span>
                          <div className="text-[11px] text-sridasi-neutral-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3 text-sridasi-forest shrink-0" />
                            <span className="whitespace-normal leading-tight">{farmer.submittedAtStr}</span>
                          </div>
                        </td>

                        {/* Name & Occupation */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-heading font-bold text-sm text-sridasi-forest whitespace-normal break-words">
                            {farmer.fullName || '—'}
                          </div>
                          <div className="text-[11px] text-sridasi-neutral-600 whitespace-normal break-words mt-0.5 leading-snug">
                            {farmer.currentOccupation || 'Farmer'}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-sridasi-neutral-800 flex items-center gap-1.5 whitespace-normal">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{farmer.countryCode || '+91'} {farmer.mobileNumber || '—'}</span>
                          </div>
                          {farmer.emailId && (
                            <div className="text-[11px] text-sridasi-neutral-500 whitespace-normal break-all mt-1 leading-tight">
                              {farmer.emailId}
                            </div>
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-sridasi-neutral-800 whitespace-normal break-words">
                            {farmer.district || farmer.villageTown || '—'}
                          </div>
                          <div className="text-[11px] text-sridasi-neutral-500 whitespace-normal break-words mt-0.5">
                            {farmer.state || '—'}
                          </div>
                        </td>

                        {/* Land & Primary Interest */}
                        <td className="py-4 px-4 align-top">
                          {farmer.totalLand && (
                            <span className="inline-block font-bold text-sridasi-forest bg-sridasi-primary-50 px-2 py-0.5 rounded-md border border-sridasi-primary-100 text-[11px] mb-1">
                              {farmer.totalLand} {farmer.landUnit || 'Acres'}
                            </span>
                          )}
                          <div className="text-[11px] text-sridasi-neutral-700 font-medium whitespace-normal break-words leading-snug">
                            {farmer.activityToDevelopFirst || '—'}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-right align-middle">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedUser(farmer);
                                setIsDrawerOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-sridasi-forest hover:bg-sridasi-dark text-white font-bold text-xs shadow-soft-sm transition-all inline-flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                              title="View full assessment dossier"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="whitespace-nowrap">View Dossier</span>
                            </button>
                            <button
                              onClick={(e) => handleRequestDelete(farmer, e)}
                              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                              title={`Delete registration ${farmer.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. BUYERS DIRECTORY TABLE                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'buyers' && (
          <div className="rounded-3xl bg-white border border-sridasi-neutral-200 overflow-hidden shadow-soft animate-fade-in">
            <div className="p-4 sm:p-5 border-b border-sridasi-neutral-200 flex items-center justify-between bg-sridasi-surface">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  🛒
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-sridasi-forest">
                    Buyers & Aggregators Directory
                  </h3>
                  <p className="text-xs text-sridasi-neutral-500">
                    Showing {buyersList.length} registered buyers • Click 'View Dossier' for all 36 assessment parameters
                  </p>
                </div>
              </div>
              <Badge variant="gold" size="sm">{buyersList.length} Buyers</Badge>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full text-xs text-left table-auto">
                <thead className="bg-sridasi-surface/90 text-sridasi-neutral-700 border-b border-sridasi-neutral-200 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 w-[14%]">ID & Date</th>
                    <th className="py-3.5 px-4 w-[22%]">Buyer Name & Role</th>
                    <th className="py-3.5 px-4 w-[20%]">Contact Details</th>
                    <th className="py-3.5 px-4 w-[16%]">Location</th>
                    <th className="py-3.5 px-4 w-[18%]">Focus / Sourcing Need</th>
                    <th className="py-3.5 px-4 text-right w-[10%]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sridasi-neutral-100">
                  {buyersList.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-sridasi-neutral-500">
                        No buyer records matching your search query.
                      </td>
                    </tr>
                  ) : (
                    buyersList.map((buyer) => (
                      <tr key={buyer.id} className="hover:bg-sridasi-surface/60 transition-colors">
                        {/* ID & Date */}
                        <td className="py-4 px-4 align-top">
                          <span className="font-mono font-bold text-amber-700 block text-xs">
                            {buyer.id}
                          </span>
                          <div className="text-[11px] text-sridasi-neutral-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3 text-sridasi-forest shrink-0" />
                            <span className="whitespace-normal leading-tight">{buyer.submittedAtStr}</span>
                          </div>
                        </td>

                        {/* Name & Occupation */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-heading font-bold text-sm text-sridasi-forest whitespace-normal break-words">
                            {buyer.fullName || '—'}
                          </div>
                          <div className="text-[11px] text-sridasi-neutral-600 whitespace-normal break-words mt-0.5 leading-snug">
                            {buyer.currentOccupation || 'Buyer / Trader'}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-sridasi-neutral-800 flex items-center gap-1.5 whitespace-normal">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{buyer.countryCode || '+91'} {buyer.mobileNumber || '—'}</span>
                          </div>
                          {buyer.emailId && (
                            <div className="text-[11px] text-sridasi-neutral-500 whitespace-normal break-all mt-1 leading-tight">
                              {buyer.emailId}
                            </div>
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-semibold text-sridasi-neutral-800 whitespace-normal break-words">
                            {buyer.district || buyer.villageTown || '—'}
                          </div>
                          <div className="text-[11px] text-sridasi-neutral-500 whitespace-normal break-words mt-0.5">
                            {buyer.state || '—'}
                          </div>
                        </td>

                        {/* Focus / Sourcing */}
                        <td className="py-4 px-4 align-top">
                          {buyer.approxInvestmentAvailable && (
                            <span className="inline-block font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[11px] mb-1">
                              Cap: {buyer.approxInvestmentAvailable}
                            </span>
                          )}
                          <div className="text-[11px] text-sridasi-neutral-700 font-medium whitespace-normal break-words leading-snug">
                            {buyer.activityToDevelopFirst || '—'}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-right align-middle">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedUser(buyer);
                                setIsDrawerOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-sridasi-forest hover:bg-sridasi-dark text-white font-bold text-xs shadow-soft-sm transition-all inline-flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                              title="View full registration dossier"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="whitespace-nowrap">View Dossier</span>
                            </button>
                            <button
                              onClick={(e) => handleRequestDelete(buyer, e)}
                              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                              title={`Delete registration ${buyer.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 6. SLIDE-OVER COMPLETE DOSSIER DRAWER & PRINT TEMPLATE                     */}
      {/* ========================================================================= */}
      {isDrawerOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          
          {/* Print Stylesheet for High Quality Multi-Page A4 PDF Export */}
          <style>{`
            @media print {
              html, body, #root {
                height: auto !important;
                min-height: 0 !important;
                overflow: visible !important;
                background: #ffffff !important;
                color: #000000 !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              /* Hide all background admin dashboard chrome */
              header, main, nav, footer, .no-print {
                display: none !important;
              }

              /* Remove fixed overlay restrictions */
              .fixed, .fixed.inset-0 {
                position: static !important;
                display: block !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                overflow: visible !important;
                background: transparent !important;
                padding: 0 !important;
                margin: 0 !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                animation: none !important;
              }

              /* Flatten printable container so it flows freely across all pages */
              #printable-dossier {
                position: static !important;
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                overflow: visible !important;
                box-shadow: none !important;
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
                animation: none !important;
              }

              /* Section cards in print */
              .print-break-inside-avoid {
                break-inside: avoid !important;
                page-break-inside: avoid !important;
                margin-bottom: 12px !important;
                border: 1px solid #d1d5db !important;
                background: #ffffff !important;
              }

              @page {
                size: A4 portrait;
                margin: 12mm 10mm;
              }
            }
          `}</style>

          <div 
            id="printable-dossier"
            className="w-full max-w-3xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between animate-slide-left"
          >
            
            {/* Drawer Header (Interactive UI) */}
            <div className="p-6 bg-sridasi-forest text-white flex items-center justify-between shrink-0 no-print">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sridasi-yellow text-sridasi-forest flex items-center justify-center font-bold text-2xl shadow-soft">
                  {selectedUser.role === 'buyer' ? '🛒' : '🌾'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sridasi-yellow">
                      {selectedUser.role === 'buyer' ? 'Buyer Registration Record' : 'Farmer Assessment Record'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase text-white">
                      {selectedUser.role}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    {selectedUser.fullName || 'Unnamed Participant'}
                  </h3>
                  <span className="text-xs text-sridasi-leaf-200 font-mono">
                    Reference ID: {selectedUser.id} • Registered: {selectedUser.submittedAtStr}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Print Official Header Banner (Clean Header visible only during Print) */}
            <div className="hidden print:block border-b-2 border-sridasi-forest pb-4 mb-4 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-heading font-extrabold text-xl text-sridasi-forest tracking-tight uppercase">
                    SRIDASI FARMS & ORGANICS
                  </h1>
                  <p className="text-xs font-semibold text-sridasi-neutral-700">
                    Integrated Sustainable Agriculture Assessment Dossier
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-sridasi-forest text-white font-mono font-bold text-xs">
                    {selectedUser.id}
                  </span>
                  <p className="text-[10px] text-sridasi-neutral-500 mt-0.5">
                    Category: <strong className="uppercase">{selectedUser.role}</strong>
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-sridasi-neutral-200 grid grid-cols-2 text-xs">
                <div>
                  <span className="text-sridasi-neutral-500">Participant Name:</span>{' '}
                  <strong className="text-sridasi-forest text-sm">{selectedUser.fullName || '—'}</strong>
                </div>
                <div className="text-right">
                  <span className="text-sridasi-neutral-500">Submitted On:</span>{' '}
                  <strong className="text-sridasi-neutral-800">{selectedUser.submittedAtStr}</strong>
                </div>
              </div>
            </div>

            {/* Drawer Body - Complete 10 Section View */}
            <div className="p-6 space-y-5 flex-1 text-xs text-sridasi-dark">
              
              {/* SECTION 1: PERSONAL INFORMATION */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-sridasi-forest" />
                  <span>1. PERSONAL INFORMATION</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {renderField('1. Full Name', selectedUser.fullName)}
                  {renderField('2. Educational Qualification', selectedUser.qualification)}
                  {renderField('3. Preferred Language', selectedUser.preferredLanguage)}
                  {renderField('4. Mobile / WhatsApp', `${selectedUser.countryCode || '+91'} ${selectedUser.mobileNumber || ''}`)}
                  {renderField('5. Email ID', selectedUser.emailId)}
                  <div className="col-span-2 sm:col-span-3">
                    {renderField('6. Complete Address', selectedUser.completeAddress)}
                  </div>
                </div>
              </div>

              {/* SECTION 2: PRESENT SITUATION & CHALLENGES */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sridasi-forest" />
                  <span>2. PRESENT SITUATION & CHALLENGES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {renderField('7. Current Occupation', selectedUser.currentOccupation)}
                  <div>
                    <span className="text-[11px] font-semibold text-sridasi-neutral-500 block mb-1">
                      8. Challenges / Constraints Identified
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(selectedUser.challenges || {})
                        .filter(([k, v]) => v === true && k !== 'other')
                        .map(([k]) => (
                          <span key={k} className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold capitalize">
                            {k.replace(/([A-Z])/g, ' $1')}
                          </span>
                        ))}
                      {selectedUser.challenges?.other && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Other: {selectedUser.challenges.other}
                        </span>
                      )}
                      {!Object.values(selectedUser.challenges || {}).some(Boolean) && (
                        <span className="text-sridasi-neutral-400">—</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    {renderField('9. Why interested in farming?', selectedUser.interestReason)}
                  </div>
                </div>
              </div>

              {/* SECTION 3: LAND & WATER */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-sridasi-forest" />
                  <span>3. LAND & WATER ASSETS</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {renderField('10. Total Land Available', selectedUser.totalLand ? `${selectedUser.totalLand} ${selectedUser.landUnit || 'Acres'}` : '')}
                  {renderField('11. Land Used for Farming', selectedUser.landUsedForFarming)}
                  {renderField('12. Land Classification', selectedUser.landType)}
                  
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-[11px] font-semibold text-sridasi-neutral-500 block mb-1">
                      13. Water Sources Available
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(selectedUser.waterSources || {})
                        .filter(([k, v]) => v === true && k !== 'other')
                        .map(([k]) => (
                          <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold capitalize">
                            {k}
                          </span>
                        ))}
                      {selectedUser.waterSources?.other && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Other: {selectedUser.waterSources.other}
                        </span>
                      )}
                      {!Object.values(selectedUser.waterSources || {}).some(Boolean) && (
                        <span className="text-sridasi-neutral-400">—</span>
                      )}
                    </div>
                  </div>

                  {renderField('14. Borewell Electricity', selectedUser.borewellElectricity)}
                  {renderField('Borewell Pipe Size', selectedUser.borewellSize)}
                  {renderField('15. Electricity Hours / Day', selectedUser.electricityHours)}
                </div>
              </div>

              {/* SECTION 4: FARM LOCATION & SECURITY */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sridasi-forest" />
                  <span>4. FARM LOCATION & SECURITY</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {renderField('16. Village / Town', selectedUser.villageTown)}
                  {renderField('District', selectedUser.district)}
                  {renderField('State', selectedUser.state)}
                  {renderField('17. Distance from Main Road', selectedUser.distanceMainRoad)}
                  {renderField('18. Distance from Nearest Market', selectedUser.distanceMarket)}
                  {renderField('19. Predators / Wild Animals', selectedUser.predatorsWildAnimals ? `${selectedUser.predatorsWildAnimals} ${selectedUser.predatorsSpecify ? `(${selectedUser.predatorsSpecify})` : ''}` : '')}
                  {renderField('20. Theft / Security Concerns', selectedUser.theftTrespassing ? `${selectedUser.theftTrespassing} ${selectedUser.theftExplain ? `(${selectedUser.theftExplain})` : ''}` : '')}
                  {renderField('21. Farm Boundary Protection', selectedUser.farmProtection)}
                </div>
              </div>

              {/* SECTION 5: BASIC FARM INFRASTRUCTURE */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Home className="w-4 h-4 text-sridasi-forest" />
                  <span>5. BASIC FARM INFRASTRUCTURE</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {renderField('22a. Storage Area', selectedUser.infraStore)}
                  {renderField('22b. Farm Supplies Area', selectedUser.infraSupplies)}
                  {renderField('22c. Office / Management', selectedUser.infraOffice)}
                  <div className="col-span-2 sm:col-span-3">
                    {renderField('23. Other Existing Infrastructure', selectedUser.otherExistingInfra)}
                  </div>
                </div>
              </div>

              {/* SECTION 6: TRANSPORT & CONNECTIVITY */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sridasi-forest" />
                  <span>6. TRANSPORT & CONNECTIVITY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-sridasi-neutral-500 block mb-1">
                      24. Transport Assets & Road Connection
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(selectedUser.transport || {})
                        .filter(([k, v]) => v === true && k !== 'other')
                        .map(([k]) => (
                          <span key={k} className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold capitalize">
                            {k.replace(/([A-Z])/g, ' $1')}
                          </span>
                        ))}
                      {selectedUser.transport?.other && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Other: {selectedUser.transport.other}
                        </span>
                      )}
                      {!Object.values(selectedUser.transport || {}).some(Boolean) && (
                        <span className="text-sridasi-neutral-400">—</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {renderField('Distance All-Weather Road', selectedUser.distanceAllWeatherRoad)}
                    {renderField('Distance Nearest Market', selectedUser.distanceNearestMarket)}
                  </div>
                </div>
              </div>

              {/* SECTION 7: FINANCIAL CAPACITY */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sridasi-forest" />
                  <span>7. FINANCIAL CAPACITY</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {renderField('25. Approx Annual Income', selectedUser.approxAnnualIncome)}
                  {renderField('26. Farming Annual Income', selectedUser.farmingAnnualIncome)}
                  {renderField('27. Available Capital', selectedUser.approxInvestmentAvailable)}
                  {renderField('28. Ready to Invest Status', selectedUser.readyToInvest)}
                </div>
              </div>

              {/* SECTION 8: FARMING INTEREST & PRIOR EXPERIENCE */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sridasi-forest" />
                  <span>8. FARMING INTEREST & EXPERIENCE</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-sridasi-neutral-500 block mb-1">
                      29. Enterprises of Interest
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(selectedUser.activitiesInterest || {})
                        .filter(([k, v]) => v === true && k !== 'other')
                        .map(([k]) => (
                          <span key={k} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold capitalize">
                            {k.replace(/([A-Z])/g, ' $1')}
                          </span>
                        ))}
                      {selectedUser.activitiesInterest?.other && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Other: {selectedUser.activitiesInterest.other}
                        </span>
                      )}
                      {!Object.values(selectedUser.activitiesInterest || {}).some(Boolean) && (
                        <span className="text-sridasi-neutral-400">—</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {renderField('30. First Enterprise to Develop', selectedUser.activityToDevelopFirst)}
                    {renderField('31. Prior Experience', selectedUser.hasPriorExperience)}
                    <div className="col-span-1 sm:col-span-2">
                      {renderField('32/33. Prior Experience Details', selectedUser.priorExperienceDesc)}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 9: TIME & LABOUR */}
              <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-sridasi-neutral-200 pb-1.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sridasi-forest" />
                  <span>9. TIME & LABOUR AVAILABILITY</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {renderField('34. Daily Time Commitment', selectedUser.dailyTimeHours)}
                  {renderField('35. Staff Availability in Area', selectedUser.staffAvailability)}
                  {renderField('36. Dedicated Farm Manager', selectedUser.hasFarmManager)}
                </div>
              </div>

              {/* SECTION 10: FARM AT A GLANCE */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3 print-break-inside-avoid">
                <div className="font-heading font-bold text-sm text-sridasi-forest border-b border-emerald-200 pb-1.5 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-sridasi-forest" />
                  <span>10. FARM AT A GLANCE (EXECUTIVE SUMMARY)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {renderField('Land', selectedUser.farmAtAGlance?.land)}
                  {renderField('Water', selectedUser.farmAtAGlance?.water)}
                  {renderField('Electricity', selectedUser.farmAtAGlance?.electricity)}
                  {renderField('Road', selectedUser.farmAtAGlance?.road)}
                  {renderField('Market Distance', selectedUser.farmAtAGlance?.marketDistance)}
                  {renderField('Security', selectedUser.farmAtAGlance?.security)}
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-sridasi-neutral-200 bg-sridasi-surface flex items-center justify-between no-print gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Close Dossier
                </Button>
                <button
                  onClick={(e) => handleRequestDelete(selectedUser, e)}
                  className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all flex flex-row flex-nowrap items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                  title="Delete this registration record permanently"
                >
                  <Trash2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Delete Record</span>
                </button>
              </div>
              
              <Button
                variant="gold"
                size="sm"
                onClick={() => window.print()}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Save PDF
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. PROFESSIONAL IN-APP DELETION CONFIRMATION MODAL                        */}
      {/* ========================================================================= */}
      {userToDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in no-print">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-sridasi-neutral-200 animate-scale-up text-left space-y-5">
            
            {/* Header / Icon */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-soft-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-sridasi-forest tracking-tight">
                  Confirm Record Deletion
                </h3>
                <p className="text-xs text-sridasi-neutral-500 mt-0.5">
                  Are you sure you want to permanently delete this registration?
                </p>
              </div>
            </div>

            {/* Target Information Card */}
            <div className="p-4 rounded-2xl bg-sridasi-surface border border-sridasi-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-sridasi-neutral-200/80">
                <span className="text-sridasi-neutral-500 font-semibold">Registrant Name:</span>
                <span className="font-heading font-bold text-sridasi-forest text-sm">
                  {userToDeleteModal.fullName || 'Unnamed Participant'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sridasi-neutral-500 font-semibold">Reference ID:</span>
                <span className="font-mono font-bold text-sridasi-dark">{userToDeleteModal.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sridasi-neutral-500 font-semibold">Category:</span>
                <span className="capitalize font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  {userToDeleteModal.role === 'buyer' ? '🛒 Commercial Buyer' : '🌾 Registered Farmer'}
                </span>
              </div>
            </div>

            {/* Professional Warning Box */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
              ⚠️ This operation will permanently remove this dossier from the live directory and delete its record from the database. This action cannot be undone.
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <Button
                variant="outline"
                size="sm"
                disabled={isDeleting}
                onClick={() => setUserToDeleteModal(null)}
                className="font-semibold"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={isDeleting}
                onClick={executeDeleteUser}
                className="bg-red-600 hover:bg-red-700 text-white font-bold border-red-600 shadow-soft hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                leftIcon={<Trash2 className="w-4 h-4 shrink-0" />}
              >
                {isDeleting ? 'Deleting...' : 'Permanently Delete'}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;

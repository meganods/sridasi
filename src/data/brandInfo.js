/**
 * SRIDASI Farms & Organics - Comprehensive Brand, Platform, Training & Product Data
 * Exact content and terminology matching client reference sheets and vision.
 */

export const BRAND_INFO = {
  name: 'SRIDASI',
  orgFullName: 'Society for Revival of Intellectual Dynamism Among Senior Individuals',
  tagline: 'Farms & Organics',
  trainingTitle: 'Integrated Natural Farming™ Training Programme',
  methodName: '100 Times More Profitable Integrated Natural Farming™ Method',
  slogan: 'One Farm • One Ecosystem • Multiple Income Streams',
  coreMotto: 'Healthy Farms • Healthy Food • Healthy People • A Greener Tomorrow',
  description: 'Cutting-edge digital solutions, 3-day residential training programmes, and advanced bio-formulations for aquaculture, livestock, agriculture, and holistic wellness.',
  
  contactEmail: 'support@sridasi.in',
  
  vision: 'Our aspiration is to lead the aquaculture & natural farming industry in the blue revolution by harnessing the power of big data, biological science, and integrated circular bio-economies.',
  
  values: [
    { 
      title: 'Culture of Constant Learning', 
      desc: 'Embracing evolving market trends, continuous experimentation, and evidence-based innovations.',
      icon: 'GraduationCap'
    },
    { 
      title: 'Collaborative Dynamic', 
      desc: 'Fostering an ecosystem where every farmer, consultant, and scientist idea is valued and nurtured.',
      icon: 'Users'
    },
    { 
      title: 'Uncompromising Integrity', 
      desc: 'Ensuring all digital advice, bio-inputs, and market linkages strictly align with sustainability and transparency.',
      icon: 'ShieldCheck'
    },
    { 
      title: 'Architected Bio-Synergy', 
      desc: 'Converting scientific concepts into practical, zero-waste integrated farm models on the ground.',
      icon: 'Workflow'
    }
  ],

  founder: {
    title: 'Architect & Wellness Innovator',
    role: 'Founder & Visionary, Sridasi Farms & Organics',
    bio: 'A dynamic and multidisciplinary professional who began his career as an Architect and later transitioned into the wellness and healthcare field driven by a strong interest in holistic health, preventive wellness, and sustainable living.',
    integratedModel: 'With a passion for continuous learning and experimentation, he combined his deep knowledge of architecture, wellness, agriculture, aquaculture, and livestock management to develop and implement an innovative integrated farming model.',
    ecosystemHighlight: 'His integrated farm brings together fish farming, poultry, goat and sheep rearing, and other allied activities, designed to create a sustainable and interconnected ecosystem where different components complement each other and optimize the use of available resources.',
    keyDistinction: 'What distinguishes him is his curiosity, research enthusiasm, and rare ability to convert complex cross-disciplinary ideas into practical, high-yielding grassroots models that empower rural farmers.'
  },

  // The 6 Client Mandated Products (Covering Aqua, Livestock, Agriculture, Commerce, Wellness & Healthcare)
  products: [
    {
      id: 'aquamazic-formula',
      name: 'Aquamazic Formula',
      category: 'Aquaculture Bio-Tech',
      audience: 'Fish Farmers & Provider Hatcheries',
      tagline: 'Farmer & Provider Biological Water Conditioner',
      description: 'Proprietary biological microbial consortium designed to optimize dissolved oxygen, eliminate toxic ammonia & hydrogen sulfide, and stabilize pond pH for maximum fish vigor and high survival rates.',
      keyBenefits: [
        'Rapid Ammonia & Nitrite breakdown within 48-72 hours',
        'Stabilizes beneficial phytoplankton blooms and water turbidity',
        'Reduces biological oxygen demand (BOD) and chemical oxygen demand (COD)',
        'Enhances feed conversion ratio (FCR) by up to 24%'
      ],
      suitableFor: ['Freshwater Fish Ponds', 'Biofloc Systems', 'Commercial Hatcheries', 'RAS Setups'],
      badge: 'Bestseller Bio-Tech',
      color: '#3FA9D8',
      icon: 'Waves'
    },
    {
      id: 'tribiotic-animal',
      name: 'Tribiotic for Animal',
      category: 'Livestock & Aqua Nutrition',
      audience: 'Aquaculture + Livestocks & Dairy',
      tagline: 'Multi-Species Prebiotic + Probiotic + Postbiotic Vigor Multiplier',
      description: 'Synergistic tri-action pre, pro, and post-biotic formulation tailored for fish, poultry chicks, broiler/layers, goats, sheep, and dairy cattle to stimulate natural gut immunity and milk/weight gain.',
      keyBenefits: [
        'Boosts gut mucosal immunity and nutrient assimilation across species',
        'Drastically reduces mortality in fish fingerlings and poultry chicks',
        'Increases milk fat index and daily milk yield in dairy cattle',
        'Accelerates daily weight gain in goats and sheep without synthetic antibiotics'
      ],
      suitableFor: ['Aquaculture (Fish & Shrimp)', 'Poultry (Broiler, Layer & Duck)', 'Dairy Cattle & Buffaloes', 'Goats & Sheep'],
      badge: 'Veterinary Grade',
      color: '#4F9D39',
      icon: 'Fish'
    },
    {
      id: 'market-connect',
      name: 'Market Connect',
      category: 'Digital Agri-Commerce',
      audience: 'Direct Farmer to Buyer / Institutional Networks',
      tagline: 'Guaranteed Fair Price Discovery & Fast Harvest Liquidation',
      description: 'Intelligent digital marketplace linking verified aquaculture, dairy, poultry, and organic crop harvests directly with institutional aggregators, cold-chains, and premium retail markets.',
      keyBenefits: [
        'Eliminates middleman cuts with transparent digital price discovery',
        'Scheduled harvest pickup with integrated cold-chain logistics',
        'Escrow-secured 24-hour payout settlement for farmers',
        'Real-time market price index and demand forecasting'
      ],
      suitableFor: ['Aquaculture Farmers', 'Livestock & Dairy Producers', 'Floriculture & Fruit Growers', 'Institutional Bulk Buyers'],
      badge: 'Zero Middlemen',
      color: '#F4C63D',
      icon: 'Store'
    },
    {
      id: 'tribiotic-agriculture',
      name: 'Tribiotic for Agriculture',
      category: 'Soil & Plant Nutrition',
      audience: 'Floriculture & Horticulture Growers',
      tagline: 'Bio-Active Microbial Soil Regenerator & Bloom Enhancer',
      description: 'Engineered bio-stimulant and microbial inoculant designed for high-value floriculture (marigold, rose, orchid), greenhouse horticulture, organic vegetables, and orchards.',
      keyBenefits: [
        'Enhances root rhizosphere development and nutrient uptake by 35%',
        'Increases flowering density, flower diameter, and post-harvest shelf life',
        'Restores exhausted soil microbial biodiversity and humus quality',
        'Boosts natural resistance against soil-borne fungal pathogens'
      ],
      suitableFor: ['Floriculture (Roses, Marigold, Gerbera)', 'Horticulture & Orchards', 'Polyhouse Vegetables', 'Organic Cash Crops'],
      badge: 'Eco-Certified',
      color: '#126B4F',
      icon: 'Sprout'
    },
    {
      id: 'curcumin-tea',
      name: 'Curcumin Tea',
      category: 'Preventive Wellness',
      audience: 'Health-Conscious Individuals & Wellness Centers',
      tagline: 'High-Bioavailability Organic Turmeric Herbal Infusion',
      description: 'Crafted from organically grown estate turmeric rhizomes with natural piperine synergy for superior human vitality, cellular anti-inflammatory protection, and daily immunity.',
      keyBenefits: [
        'Standardized 95% bioactive curcuminoids with black pepper piperine synergy',
        'Potent natural anti-inflammatory and cellular antioxidant action',
        'Soothes digestive tract and supports liver vitality',
        '100% chemical-free, farm-to-cup estate processing'
      ],
      suitableFor: ['Daily Wellness Routine', 'Post-Workout Recovery', 'Joint & Cellular Health', 'Holistic Preventive Living'],
      badge: 'Farm-to-Cup Wellness',
      color: '#D4A01D',
      icon: 'CupSoda'
    },
    {
      id: 'ent-drop',
      name: 'Natural ENT Drop',
      category: 'Holistic Healthcare',
      audience: 'Holistic Healthcare & Family Preventive Care',
      tagline: 'Therapeutic Botanical Extracts for Ear, Nose & Throat Relief',
      description: 'Gentle, 100% natural herbal bio-extract formulation designed to soothe mucosal irritation, nasal congestion, seasonal allergies, and ear discomfort without harsh alcohol bases.',
      keyBenefits: [
        'Soothes mucosal irritation and seasonal upper respiratory allergies',
        'Natural antimicrobial botanical extracts without harsh alcohol chemicals',
        'Gentle daily hygiene formulation for ear canals and nasal passages',
        'Created through strict pharmaceutical-grade organic extraction'
      ],
      suitableFor: ['Sinus & Nasal Congestion', 'Ear Canal Comfort', 'Seasonal Allergies', 'Holistic Preventive Care'],
      badge: 'Pure Botanicals',
      color: '#084836',
      icon: 'HeartPulse'
    }
  ],

  // 3-Day Residential Training Course Details (Exact match with Client sheets)
  trainingProgramme: {
    title: '3-Day Residential Training Programme',
    tagline: "Don't Just Learn Farming — Experience It.",
    format: 'Theory • Practical • Farm Visit • Self-Practice • Farm Business Planning',
    location: 'Sridasi Integrated Demonstration Farm & Research Campus',
    
    visionQuote: 'Imagine a farm where fish, chicken, duck, cattle, goat, crops, fodder, feed, water and natural resources are not treated as separate businesses — but are planned and managed as parts of one connected farm ecosystem.',
    
    why100Times: [
      'More Production across interlocking biological tiers',
      'Better Resource Utilisation (zero wasted effluent or bio-mass)',
      'Lower Avoidable Costs with farm-made feeds & bio-inputs',
      'Multiple Farm Enterprises balancing income through the year',
      'Multiple Products (Fish, Eggs, Meat, Milk, Fruits, Flowers, Organics)',
      'Multiple Income Streams mitigating market risks',
      'Less Waste with closed-loop recycling',
      'More Value from Existing Farm Resources'
    ],

    valueChainSteps: [
      { num: '01', name: 'Crops', desc: 'Vegetables, grains, orchards & greens' },
      { num: '02', name: 'Fodder & Farm Ingredients', desc: 'High-protein grass, azolla & residues' },
      { num: '03', name: 'Farm-Made Feed', desc: 'Low-cost, high-nutrition formulated feed' },
      { num: '04', name: 'Animals & Fish', desc: 'Fish, poultry, ducks, dairy cows & goats' },
      { num: '05', name: 'Useful Farm Resources', desc: 'Effluent water, droppings, compost' },
      { num: '06', name: 'Safe Processing & Reuse', desc: 'Microbial bio-digestion & Tri-Biotic™' },
      { num: '07', name: 'Production', desc: 'Consistent daily & seasonal yield' },
      { num: '08', name: 'Value-Added Products', desc: 'Packaging, curing & ready-to-sell batches' },
      { num: '09', name: 'Sales & Income', desc: 'Multiple continuous revenue streams' }
    ],

    ecosystemComponents: [
      { id: 'fish', name: 'Fish', icon: 'Fish', color: '#3FA9D8', desc: 'Oxygenated polyculture ponds with zero-chemical health' },
      { id: 'chicken', name: 'Chicken', icon: 'Egg', color: '#E65100', desc: 'Free-range poultry producing protein and rich droppings' },
      { id: 'duck', name: 'Duck', icon: 'Bird', color: '#00838F', desc: 'Pond aeration synergy and egg production' },
      { id: 'cattle', name: 'Cattle', icon: 'Milk', color: '#6D4C41', desc: 'Dairy yield, bio-gas, and nitrogenous bio-slurry' },
      { id: 'goat', name: 'Goat', icon: 'Sparkles', color: '#827717', desc: 'High-value meat enterprise consuming fodder shrubs' },
      { id: 'crops', name: 'Crops & Fodder', icon: 'Sprout', color: '#2E7D32', desc: 'Multi-tier vegetables, floriculture and azolla' },
      { id: 'feed', name: 'Farm-Made Feed', icon: 'Package', color: '#C2185B', desc: 'Formula feeds crafted from on-farm ingredients' },
      { id: 'water', name: 'Water Management', icon: 'Droplets', color: '#0277BD', desc: 'Circular rainwater harvesting and biological filtration' },
      { id: 'tribiotic', name: 'Tri-Biotic™', icon: 'Layers', color: '#00695C', desc: 'Prebiotic + Probiotic + Postbiotic bio-enhancers' },
      { id: 'recycling', name: 'Resource Recycling', icon: 'RotateCw', color: '#558B2F', desc: 'Safe processing converting waste to wealth' }
    ],

    schedule: [
      {
        day: 'DAY 1',
        title: 'BUILD THE FARM FOUNDATION',
        subtitle: 'Understanding the Complete Farm Ecosystem',
        theme: 'From Farm Design to Ecosystem Synergy',
        sessions: [
          { time: '9:30 - 10:00', title: 'Registration & Introduction', detail: 'Farm Profile • Current Activities • Costs • Production • Problems • Goals' },
          { time: '10:00 - 11:30', title: 'The 100 Times More Profitable Farming Vision', detail: 'De-risking agriculture and building multiple income systems' },
          { time: '11:45 - 1:00', title: 'Integrated Natural Farm Ecosystem', detail: 'Interconnection of Fish • Chicken • Duck • Cattle • Goat • Crops' },
          { time: '1:00 - 1:30', title: 'Organic Farm Lunch', detail: 'Farm-fresh meal prepared with natural estate harvest' },
          { time: '1:30 - 2:30', title: 'Tri-Biotic™ Farming Concept', detail: 'Prebiotic • Probiotic • Postbiotic • Botanical Biodiversity' },
          { time: '2:30 - 3:30', title: 'Water Management & Chemistry', detail: 'pH • DO • Ammonia • Nitrite • Temperature • Turbidity • Aeration' },
          { time: '3:30 - 3:45', title: 'Tea Break', detail: 'Curcumin Tea & herbal refreshments' },
          { time: '3:45 - 4:30', title: 'Farm-Made Feed Formulation', detail: 'Local Ingredients • Nutrition • Processing • FCR • Cost Calculation' },
          { time: '4:30 - 5:00', title: 'Integrated Farm Design Workshop', detail: 'Individual spatial zoning and plot mapping' },
          { time: '5:00 - 6:00', title: 'Review & Farm Planning', detail: 'Q&A, diagnostic review, and day-end recap' }
        ]
      },
      {
        day: 'DAY 2',
        title: 'BUILD THE PRODUCTION SYSTEM',
        subtitle: 'From Farm Design → To Farm Production',
        theme: 'Live Field Practice, Livestock & Water Operations',
        sessions: [
          { time: '10:00 - 11:00', title: 'Morning Review & Field Briefing', detail: 'Recap of foundational principles and day plan' },
          { time: '11:00 - 12:00', title: 'Fish Farming Mastery', detail: 'Seed Selection • Stocking • Biomass • Feeding • Oxygen • Harvest' },
          { time: '12:00 - 1:00', title: 'Chicken & Duck Farming', detail: 'Breed Selection • Housing • Feed • Mortality Control • Records' },
          { time: '1:00 - 1:30', title: 'Lunch Break', detail: 'Nutritious farm-to-table lunch' },
          { time: '1:30 - 2:30', title: 'Cattle Farming & Dairy', detail: 'Fodder Matrix • Nutrition • Milk Quality • Manure Bio-Slurry' },
          { time: '2:30 - 3:30', title: 'Goat Farming Production', detail: 'Breed • Housing • Nutrition • Health Records • Market Timing' },
          { time: '3:30 - 3:45', title: 'Tea Break', detail: 'Herbal tea and networking' },
          { time: '3:45 - 4:45', title: 'Resource Recycling & Conversion', detail: 'Crops → Feed • Farm Resources → High Value Organic Inputs' },
          { time: '4:45 - 5:15', title: 'Production Planning Workshop', detail: 'Drafting livestock and crop calendars' },
          { time: '5:15 - 6:30', title: 'Tri-Biotic™ & Water Field Demo', detail: 'Practical Application • Dosing • Pond Treatment • Record Keeping' }
        ]
      },
      {
        day: 'DAY 3',
        title: 'BUILD THE FARM INCOME SYSTEM',
        subtitle: 'From Production → To Farm Business',
        theme: 'Economics, Profitability, 100-Day Challenge & Certification',
        sessions: [
          { time: '9:30 - 10:00', title: 'Morning Review', detail: 'Clarifications and business mindset orientation' },
          { time: '10:00 - 11:00', title: 'Zero-Waste & Resource-Efficient Farm Thinking', detail: 'Eliminating commercial leaks and maximizing margin' },
          { time: '11:00 - 12:00', title: 'Farm-Made Feed Economics', detail: 'Cost per kg analysis • Monthly Cost • 40%+ Cost Savings' },
          { time: '12:00 - 1:00', title: 'Multiple Income Streams Integration', detail: 'Fish • Chicken • Duck • Milk • Goat • Crops • Value Addition' },
          { time: '1:00 - 1:30', title: 'Lunch Break', detail: 'Farm lunch' },
          { time: '1:30 - 2:30', title: 'Farm Profit Calculation Matrix', detail: 'Total Cost → Production → Market Sales → Net Cashflow' },
          { time: '2:30 - 3:30', title: '100-Day Farm Challenge', detail: 'Plan • Produce • Record • Improve • Sell Action Blueprint' },
          { time: '3:30 - 3:45', title: 'Tea Break', detail: 'Refreshment break' },
          { time: '3:45 - 4:30', title: 'Farmer Scorecard Execution', detail: 'Production • Growth • Feed Cost • Mortality • Sales • Waste Metric' },
          { time: '4:30 - 5:30', title: 'Individual Farm Business Plan', detail: 'Finalizing custom farm plan for each participant' },
          { time: '5:30 - 6:30', title: 'Practical Tri-Biotic™ Self-Practice', detail: 'Hands-on preparation of bio-stimulants' },
          { time: '6:30 - 7:00', title: 'Closing Ceremony & Certificate Award', detail: 'Graduation, community induction, and lifelong support setup' }
        ]
      }
    ],

    whoShouldJoin: [
      { role: 'Farmers', desc: 'Seeking to de-risk single crop or pond models' },
      { role: 'New Farmers', desc: 'Starting with a scientific, structured blueprint' },
      { role: 'Young Entrepreneurs', desc: 'Building high-margin agri-business ventures' },
      { role: 'Rural Youth', desc: 'Creating sustainable local livelihoods' },
      { role: 'Farm Families', desc: 'Strengthening multi-generational farm income' },
      { role: 'Agri-Entrepreneurs', desc: 'Scaling commercial organic & aqua enterprises' },
      { role: 'Agriculture Students', desc: 'Gaining real-world practical field mastery' },
      { role: 'Investors & Landowners', desc: 'Making land productive and profitable' },
      { role: 'New Business Seekers', desc: 'Entering the green bio-economy' }
    ]
  },

  problemCategories: [
    { id: 'mortality', label: 'Fish Mortality', desc: 'Sudden or progressive fish deaths in pond', icon: 'AlertTriangle', urgency: 'High' },
    { id: 'growth', label: 'Slow Growth', desc: 'Underweight fish or uneven size variation', icon: 'TrendingDown', urgency: 'Medium' },
    { id: 'water', label: 'Water Quality Problem', desc: 'Algal bloom, foul odor, low oxygen, high turbidity', icon: 'Droplets', urgency: 'High' },
    { id: 'feed', label: 'Feed & FCR Problem', desc: 'Poor feed response, uneaten pellets, high feed cost', icon: 'PieChart', urgency: 'Medium' },
    { id: 'disease', label: 'Disease Symptoms', desc: 'Fin rot, red spots, body ulcers, gill damage', icon: 'Activity', urgency: 'High' },
    { id: 'stocking', label: 'Stocking Advice', desc: 'Fingerling density, polyculture ratios & timing', icon: 'Fish', urgency: 'Low' },
    { id: 'harvest', label: 'Harvest Planning', desc: 'Biomass estimation, market timing & liquidation', icon: 'Calendar', urgency: 'Low' }
  ],

  fishSpeciesList: [
    'Rohu (Labeo rohita)',
    'Catla (Gibelion catla)',
    'Mrigal (Cirrhinus mrigala)',
    'Pangasius / Basa (Pangasianodon hypophthalmus)',
    'Nile Tilapia (Oreochromis niloticus)',
    'Clarias / Magur (Clarias batrachus)',
    'Singhi (Heteropneustes fossilis)',
    'Freshwater Prawn (Macrobrachium rosenbergii)'
  ],

  specialists: [
    {
      id: 'doc-1',
      name: 'Dr. Anand Singh',
      role: 'Chief Aquaculture Pathologist & Pond Specialist',
      experience: '16+ Years Experience',
      education: 'Ph.D. Central Institute of Fisheries Education (CIFE)',
      rating: 4.9,
      reviewsCount: 342,
      languages: 'English, Hindi, Bengali',
      specialty: 'Water Chemistry & Infectious Fish Pathologies',
      availableStatus: 'Online Now',
      avatarColor: 'bg-emerald-600',
      initials: 'AS'
    },
    {
      id: 'doc-2',
      name: 'Dr. Deepika Sharma',
      role: 'Fish Nutrition & FCR Optimization Expert',
      experience: '12+ Years Experience',
      education: 'M.F.Sc. Fisheries Biology & Biofloc Management',
      rating: 4.95,
      reviewsCount: 289,
      languages: 'English, Hindi, Punjabi',
      specialty: 'Tribiotic Nutrition & Biofloc Engineering',
      availableStatus: 'Next Slot in 15 mins',
      avatarColor: 'bg-teal-600',
      initials: 'DS'
    },
    {
      id: 'doc-3',
      name: 'Dr. Prashant Tyagi',
      role: 'Integrated Farming & Livestock Health Scientist',
      experience: '14+ Years Experience',
      education: 'B.V.Sc & A.H, M.Sc Sustainable Agri-Systems',
      rating: 4.88,
      reviewsCount: 215,
      languages: 'English, Hindi, Marathi',
      specialty: 'Dairy, Poultry & Closed-Loop Aquaculture Synergy',
      availableStatus: 'Online Now',
      avatarColor: 'bg-sky-600',
      initials: 'PT'
    }
  ],

  samplePonds: [
    {
      id: 'pond-alpha',
      name: 'Pond 1 - North Sector Alpha',
      location: 'Sundarbans Eco Belt, Sector 4',
      size: '2.5 Acres (Water Depth: 1.8m)',
      species: 'Rohu, Catla & Pangasius (Polyculture)',
      stockingQuantity: '28,000 Fingerlings',
      fishAge: '95 Days',
      avgWeight: '420 grams',
      feedUsed: 'Commercial Floating Pellet 32% Protein + Tribiotic',
      waterParameters: { ph: '7.8', do: '6.2 ppm', ammonia: '0.02 ppm', temp: '28.5°C' },
      status: 'Healthy'
    },
    {
      id: 'pond-beta',
      name: 'Pond 2 - Nursery Bio-Tank 3',
      location: 'Coastal Hatchery Facility',
      size: '0.8 Acres (Depth: 1.5m)',
      species: 'Nile Tilapia (Mono-sex)',
      stockingQuantity: '45,000 Juveniles',
      fishAge: '42 Days',
      avgWeight: '85 grams',
      feedUsed: 'Micro-starter Crumbs + Aquamazic Conditioner',
      waterParameters: { ph: '7.4', do: '5.8 ppm', ammonia: '0.04 ppm', temp: '29.1°C' },
      status: 'Optimal'
    }
  ],

  ecosystemTiers: [
    {
      step: '01',
      title: 'Aquaculture Ponds & Hatcheries',
      subtitle: 'Precision Water & Fish Cultivation',
      description: 'High-density, oxygenated freshwater fish farming utilizing Aquamazic biological conditioners and Tribiotic feed supplements for zero-chemical fish health.',
      icon: 'Waves',
      color: '#3FA9D8'
    },
    {
      step: '02',
      title: 'Nutrient-Rich Hydro-Drainage',
      subtitle: 'Biological Water Recycling',
      description: 'Fish pond effluent, rich in organic nitrogen and phosphorus, is circulated directly into irrigation matrices without synthetic fertilizers.',
      icon: 'Droplets',
      color: '#126B4F'
    },
    {
      step: '03',
      title: 'Floriculture, Orchards & Vegetables',
      subtitle: 'Multi-Tier Crop Matrix',
      description: 'High-value marigolds, greenhouse produce, and seasonal horticulture thrive on bio-water and Tribiotic Agriculture biological soil inoculants.',
      icon: 'Sprout',
      color: '#4F9D39'
    },
    {
      step: '04',
      title: 'Ethical Poultry, Goats & Dairy',
      subtitle: 'Livestock Synergy',
      description: 'Free-range birds and indigenous livestock consume farm crop residues, producing rich manure that is microbiologically composted into bio-energy and fish feed.',
      icon: 'Leaf',
      color: '#F4C63D'
    }
  ],

  faqs: [
    {
      q: 'How does the 3-day residential training programme work?',
      a: 'The 3-day residential course at Sridasi Demonstration Farm immerses you in hands-on theory, live pond water testing, livestock handling, farm-made feed formulation, Tri-Biotic™ dosing, and drafting your personal 100-Day Farm Business Plan.'
    },
    {
      q: 'How does the digital diagnosis and farm assistance process work?',
      a: 'Farmers can register their pond profile in under 2 minutes, choose their exact symptom category (e.g., fish mortality, water turbidity, feed issues), upload photos or videos of water/fish, and receive instant AI triage diagnostics and organic bio-dosing action plans.'
    },
    {
      q: 'What makes Aquamazic Formula different from standard pond chemicals?',
      a: 'Unlike harsh chemical oxidizers or copper sulfate that destroy pond ecology, Aquamazic is a 100% organic microbial consortium. It biologically digests toxic bottom sludge, locks away ammonia and nitrite, and boosts natural dissolved oxygen without shocking the fish.'
    },
    {
      q: 'Can Tribiotic for Animal be used for both fish and dairy cattle?',
      a: 'Yes! Tribiotic is formulated with specialized broad-spectrum gut microorganisms and prebiotic substrates. In aquaculture, it improves gut villi for higher feed conversion, while in dairy and livestock, it balances the rumen microflora, elevating milk yield and immunity.'
    },
    {
      q: 'How does Market Connect ensure fair pricing for harvest liquidation?',
      a: 'Market Connect cuts out exploitative middlemen by pre-matching harvest-ready farmers with institutional bulk buyers, hotels, and retail exporters. Prices are locked based on transparent live market indices, and farmer payments are secured in escrow.'
    },
    {
      q: 'What is the "100 Times More Profitable" philosophy?',
      a: '"100 Times More Profitable" is a strategic vision focused on converting single-enterprise farms into interlocking, multi-stream businesses where waste from one activity (e.g. fish pond effluent or cattle manure) becomes free, high-value nutrition for another.'
    }
  ]
};

export default BRAND_INFO;

/**
 * ============================================================================
 * NomaAI Landing Page Story Sections Data
 * ============================================================================
 * 
 * 👉 Each item pairs one of the uploaded pictures with editable text area divs.
 * You can modify the text, titles, highlights, and call-to-actions directly below.
 * ============================================================================
 */

export interface StorySectionData {
  id: string;
  imageSrc: string;
  imageAlt: string;
  badge: string;
  title: string;
  subtitle: string;
  // 👉 Custom text area divs content:
  narrativeDiv1: string;
  narrativeDiv2: string;
  bulletPoints: string[];
  statBox?: {
    value: string;
    label: string;
  };
  ctaLabel: string;
  ctaLink: string;
  reverseLayout?: boolean;
}

export const landingStories: StorySectionData[] = [
  {
    id: 'harvest-joy',
    imageSrc: '/images/landing/farmer-harvest-smile.jpg',
    imageAlt: 'Smiling Nigerian woman farmer harvesting golden rice in the field',
    badge: '🌾 Bountiful Harvests & Food Security',
    title: 'From Healthy Shoots to Joyful Harvests',
    subtitle: 'Protecting the hard work of Nigerian smallholders from seed to market.',
    narrativeDiv1:
      'Every grain matters. Across Kano, Kebbi, Benue, and Niger states, millions of hardworking farmers pour their sweat into feeding our nation. Yet untimely fungal infections, stem borers, and sudden droughts often slash yields by up to 40% before harvest day.',
    narrativeDiv2:
      'NomaAI acts as your vigilant field companion. By scanning foliage early and offering scientifically validated agronomic timing, we ensure your crops reach their full potential — turning months of dedication into smiles, financial resilience, and abundant grain bins.',
    bulletPoints: [
      'Documented 25% to 40% reduction in pre-harvest crop loss',
      'Timely harvesting windows based on hyper-local satellite weather',
      'Direct linkage to verified agro-offtakers and premium market hubs'
    ],
    statBox: {
      value: '+38%',
      label: 'Average yield increase across monitored maize & rice farms'
    },
    ctaLabel: 'Start Protecting Your Crops →',
    ctaLink: '/diagnose',
    reverseLayout: false
  },
  {
    id: 'early-detection',
    imageSrc: '/images/landing/farmer-inspecting-crops.jpg',
    imageAlt: 'Farmer intently inspecting legume foliage in a lush green Nigerian field',
    badge: '🔬 Early Pathology & Leaf Diagnostics',
    title: 'Catching Blight & Pests Before They Spread',
    subtitle: 'Instant leaf scanning calibrated for 24+ Nigerian crop diseases.',
    narrativeDiv1:
      'Crop diseases do not wait. When Northern Leaf Blight, Fall Armyworm, or Cassava Brown Streak strike, every hour counts. Relying on guesswork or outdated chemicals often leads to wasted money and ruined harvests.',
    narrativeDiv2:
      'With NomaAI, simply snap a photo of any suspicious leaf, stem, or root lesion. Our on-device computer vision identifies the exact pathogen in under 3 seconds, estimating severity and prescribing dual remedy paths: affordable organic solutions and safe, regulated chemical treatments.',
    bulletPoints: [
      'Identifies Northern Leaf Blight, Cassava Mosaic, Cercospora & more',
      'Instant toxicity safety warnings & personal protective gear rules',
      'Works seamlessly even in remote farmland with low 2G connectivity'
    ],
    statBox: {
      value: '< 3s',
      label: 'Instant diagnostic speed directly in your field'
    },
    ctaLabel: 'Test The Crop Scanner →',
    ctaLink: '/diagnose',
    reverseLayout: true
  },
  {
    id: 'family-community',
    imageSrc: '/images/landing/farming-family-community.jpg',
    imageAlt: 'African mother with baby on back cultivating fertile soil with community farmers',
    badge: '🤝 Generational Agriculture & Inclusion',
    title: 'Built for Every Farmer in the Community',
    subtitle: 'Empowering women-led cooperatives, youth farmers, and family livelihoods.',
    narrativeDiv1:
      'Farming in Nigeria is a community heartbeat passed down through generations. From mothers carrying babies on their backs to seasoned elders, farming success sustains entire villages and educates the next generation.',
    narrativeDiv2:
      'NomaAI is built for all literacy levels. Our breakthrough voice interface allows farmers to speak naturally and listen to clear agronomic advice in Hausa, Yoruba, Igbo, and Nigerian Pidgin. No complex jargon — just pure, actionable wisdom in the language of your home.',
    bulletPoints: [
      'Spoken audio guidance in Hausa, Yoruba, Igbo, and Nigerian Pidgin',
      'Simple large-touch interface designed for field conditions',
      'Zero literacy barrier — speak your question, hear the solution'
    ],
    statBox: {
      value: '4 Languages',
      label: 'Native audio advice in English, Hausa, Yoruba, Igbo & Pidgin'
    },
    ctaLabel: 'Ask Malam Noma Audio Assistant →',
    ctaLink: '/advisory',
    reverseLayout: false
  },
  {
    id: 'mobile-advisor',
    imageSrc: '/images/landing/farmer-smartphone-advisory.jpg',
    imageAlt: 'Veteran farmer sitting in a maize field using a smartphone advisory app',
    badge: '📱 Digital Extension in the Palm of Your Hand',
    title: 'Agronomic Expertise Right in Your Rows',
    subtitle: 'Local weather intelligence and direct certified agronomist access.',
    narrativeDiv1:
      'Gone are the days when farmers had to travel miles to town just to find an agricultural extension officer or verify if a bag of fertilizer was genuine. The power of an entire agricultural institute now sits in your pocket.',
    narrativeDiv2:
      'Receive daily rainfall alerts, humidity advisories, and optimal chemical spraying windows for your exact LGA. Need a second opinion? Connect directly via WhatsApp or phone call to certified Nigerian agro-dealers and ADP consultants.',
    bulletPoints: [
      'Micro-climate farming forecast for all 36 Nigerian states + FCT',
      'Verified agro-dealer registry to avoid counterfeit seeds and fertilizers',
      'Offline logbook keeps all your previous diagnostic records safe'
    ],
    statBox: {
      value: '36 States',
      label: 'Localized agro-ecological advisory coverage across Nigeria'
    },
    ctaLabel: 'Explore Farm Weather & Directory →',
    ctaLink: '/weather',
    reverseLayout: true
  }
];

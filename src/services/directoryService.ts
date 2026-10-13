import type { Consultant, AgroDealer } from '../types';

export const MOCK_CONSULTANTS: Consultant[] = [
  {
    id: 'c-1',
    name: 'Dr. Ibrahim Aliyu Bello',
    role: 'Principal Extension Agronomist',
    organization: 'KNARDA / NAERLS Extension Partner (Kano)',
    state: 'Kano',
    cityOrLga: 'Dawanau / Danbatta LGA',
    zone: 'North West',
    specializations: ['Cereals (Maize & Sorghum)', 'Irrigated Vegetables', 'Pest Outbreak Response'],
    rating: 4.9,
    reviewsCount: 142,
    languages: ['Hausa', 'English', 'Fulfulde'],
    phone: '+2348031234567',
    whatsapp: '2348031234567',
    isVerified: true,
    yearsExperience: 16,
    availability: 'Available Today',
    consultationFee: 'Free (ADP Subsidized) / ₦3,000 Field Visit',
    badge: 'FMARD & KNARDA Certified'
  },
  {
    id: 'c-2',
    name: 'Mrs. Folashade Adebayo, M.Sc.',
    role: 'Crop Protection & Plant Pathology Specialist',
    organization: 'OYSADEP (Oyo State Agricultural Development Programme)',
    state: 'Oyo',
    cityOrLga: 'Ibadan / Moor Plantation',
    zone: 'South West',
    specializations: ['Cassava Mosaic & Root Rot', 'Cocoa Black Pod', 'Organic Pesticides'],
    rating: 4.8,
    reviewsCount: 98,
    languages: ['Yoruba', 'English', 'Pidgin'],
    phone: '+2348029876543',
    whatsapp: '2348029876543',
    isVerified: true,
    yearsExperience: 12,
    availability: 'Available Today',
    consultationFee: '₦2,500 Tele-advisory / Free for Smallholders',
    badge: 'OYSADEP Extension Lead'
  },
  {
    id: 'c-3',
    name: 'Engr. Terver Michael Agbo',
    role: 'Tuber Crops Agronomist & Post-Harvest Specialist',
    organization: 'BNARDA (Benue Agricultural and Rural Development Authority)',
    state: 'Benue',
    cityOrLga: 'Makurdi / Gboko LGA',
    zone: 'North Central',
    specializations: ['Yam Mounding & Storage', 'Soybean Cultivation', 'Soil Acidity Treatment'],
    rating: 4.9,
    reviewsCount: 115,
    languages: ['Tiv', 'English', 'Hausa', 'Pidgin'],
    phone: '+2348065551234',
    whatsapp: '2348065551234',
    isVerified: true,
    yearsExperience: 14,
    availability: 'By Appointment',
    consultationFee: 'Free ADP Smallholder Support',
    badge: 'Food Basket Agri-Fellow'
  },
  {
    id: 'c-4',
    name: 'Dr. Chukwudi Okonkwo',
    role: 'Soil Nutritionist & Horticulture Expert',
    organization: 'NRCRI Umudike / ENADEP Partner',
    state: 'Enugu',
    cityOrLga: 'Nsukka / Enugu Urban',
    zone: 'South East',
    specializations: ['Soil Acidity & NPK Balancing', 'Plantain & Banana Tissue Culture', 'Greenhouse Tomato'],
    rating: 4.7,
    reviewsCount: 76,
    languages: ['Igbo', 'English', 'Pidgin'],
    phone: '+2348054321098',
    whatsapp: '2348054321098',
    isVerified: true,
    yearsExperience: 11,
    availability: 'Available Today',
    consultationFee: '₦3,500 Consultation',
    badge: 'NRCRI Certified Advisor'
  },
  {
    id: 'c-5',
    name: 'Hajiya Amina Yakubu Zaria',
    role: 'Senior Grain Extension Officer',
    organization: 'Kaduna State Agricultural Development Project (KADP)',
    state: 'Kaduna',
    cityOrLga: 'Zaria / Sabon Gari LGA',
    zone: 'North West',
    specializations: ['Fall Armyworm Eradication', 'Hybrid Maize Seed Selection', 'Women in Agriculture (WIA)'],
    rating: 5.0,
    reviewsCount: 184,
    languages: ['Hausa', 'English'],
    phone: '+2348071112233',
    whatsapp: '2348071112233',
    isVerified: true,
    yearsExperience: 18,
    availability: 'Available Today',
    consultationFee: 'Free Public Service / Voluntary',
    badge: 'KADP Outstanding Officer'
  },
  {
    id: 'c-6',
    name: 'Pam Dung Gyang',
    role: 'Highland Vegetable Agronomist',
    organization: 'Plateau ADP / National Root Crops Jos Station',
    state: 'Plateau',
    cityOrLga: 'Jos South / Bokkos',
    zone: 'North Central',
    specializations: ['Irish Potato Blight Control', 'Exotic Vegetables (Carrot, Cabbage)', 'Drip Irrigation Systems'],
    rating: 4.8,
    reviewsCount: 63,
    languages: ['Berom', 'Hausa', 'English'],
    phone: '+2348033334455',
    whatsapp: '2348033334455',
    isVerified: true,
    yearsExperience: 9,
    availability: 'In Field',
    consultationFee: '₦2,000 Community Rate',
    badge: 'Plateau Highland Specialist'
  }
];

export const MOCK_AGRO_DEALERS: AgroDealer[] = [
  {
    id: 'd-1',
    businessName: 'Arewa Premier Seeds & Agro-Allied Ltd',
    ownerName: 'Alhaji Gambo Danbatta',
    category: 'Seeds & Seedlings',
    state: 'Kano',
    marketLocation: 'Dawanau International Grains Market, Gate 3',
    fullAddress: 'Plot 14, Grain Commodity Section, Dawanau, Kano State',
    phone: '+2348032221111',
    whatsapp: '2348032221111',
    verifiedDealer: true,
    topStock: [
      'Certified Hybrid Maize (DK 920, SC 719, SAMMAZ 15)',
      'Certified FARO 44 & 52 Rice Seed',
      'SAMPEA 20-T Pod Borer Resistant Cowpea',
      'Knapsack Sprayers (Jacto & Solo)'
    ],
    acceptsBankTransfer: true,
    openingHours: 'Mon - Sat: 7:30 AM - 6:00 PM'
  },
  {
    id: 'd-2',
    businessName: 'Bodija Heritage Agro-Chemicals & Tools',
    ownerName: 'Chief Samuel Olawale',
    category: 'Crop Protection Chemicals',
    state: 'Oyo',
    marketLocation: 'Bodija Central Market, Agro-Line',
    fullAddress: 'Shop 42B, Agricultural Chemicals Row, Bodija Market, Ibadan',
    phone: '+2348023334444',
    whatsapp: '2348023334444',
    verifiedDealer: true,
    topStock: [
      'Ridomil Gold MZ 68 WG (Late Blight Fungicide)',
      'Emamectin Benzoate 5% SG (Armyworm Control)',
      'Paraquat-free selective herbicides',
      'Heavy-duty safety goggles & respirators'
    ],
    acceptsBankTransfer: true,
    openingHours: 'Mon - Sat: 8:00 AM - 6:30 PM'
  },
  {
    id: 'd-3',
    businessName: 'Benue Golden Harvest Agro-Enterprises',
    ownerName: 'Barnabas Iorwuese',
    category: 'Fertilizer & Lime',
    state: 'Benue',
    marketLocation: 'Wurukum Market, Makurdi',
    fullAddress: '18 Old Otukpo Road, near Wurukum Roundabout, Makurdi',
    phone: '+2348067778899',
    whatsapp: '2348067778899',
    verifiedDealer: true,
    topStock: [
      'Federal Subsidized NPK 15-15-15 (50kg bags)',
      'Granular Urea 46% (Indorama & Dangote)',
      'Agricultural Dolomite Lime (for acid soils)',
      'Single Superphosphate (SSP)'
    ],
    acceptsBankTransfer: true,
    openingHours: 'Mon - Sat: 8:00 AM - 5:30 PM'
  },
  {
    id: 'd-4',
    businessName: 'Jos Plateau Highland Farm Inputs Ltd',
    ownerName: 'Gyang Moses Davou',
    category: 'Tools & Drip Irrigation',
    state: 'Plateau',
    marketLocation: 'Terminus Market / Building Materials Market',
    fullAddress: 'Shop 9, Agric Machinery Wing, Terminus, Jos',
    phone: '+2348039990011',
    whatsapp: '2348039990011',
    verifiedDealer: true,
    topStock: [
      'Gravity-fed Drip Irrigation Kits (Quarter & Half Acre)',
      'Solar Surface Water Pumps (DC Powered)',
      'Certified Seed Potatoes (Nicola & Marabel)',
      'Foliar Calcium Boron booster sprays'
    ],
    acceptsBankTransfer: true,
    openingHours: 'Mon - Fri: 8:30 AM - 5:00 PM, Sat: 9:00 AM - 4:00 PM'
  },
  {
    id: 'd-5',
    businessName: 'Ogbete Agro-Hub & Seed Depot',
    ownerName: 'Mazi Emeka Nnamani',
    category: 'Full Agro Supermarket',
    state: 'Enugu',
    marketLocation: 'Ogbete Main Market, Enugu',
    fullAddress: 'Line 7, Agro-Allied Section, Ogbete Main Market, Enugu',
    phone: '+2348058887766',
    whatsapp: '2348058887766',
    verifiedDealer: true,
    topStock: [
      'Yellow Cassava TME 419 Vitamin A Stems',
      'IITA Hybrid Yam Minisetts',
      'Oil Palm Seedlings (Tenera DxD)',
      'Broad spectrum systemic fungicides'
    ],
    acceptsBankTransfer: true,
    openingHours: 'Mon - Sat: 8:00 AM - 6:00 PM'
  },
  {
    id: 'd-6',
    businessName: 'Zaria Farmers Choice Inputs Co.',
    ownerName: 'Malam Sanusi Mohammed',
    category: 'Fertilizer & Lime',
    state: 'Kaduna',
    marketLocation: 'Sabon Gari Market, Zaria',
    fullAddress: 'Plot 5A, Railway bypass, Sabon Gari, Zaria',
    phone: '+2348074445566',
    whatsapp: '2348074445566',
    verifiedDealer: true,
    topStock: [
      'Bio-Organic Poultry Pelleted Compost (25kg)',
      'Zinc-fortified NPK 20-10-10',
      'Neem-based botanical pest repellent oils',
      'Motorized mist-blower sprayers'
    ],
    acceptsBankTransfer: true,
    openingHours: 'Mon - Sat: 7:00 AM - 6:00 PM'
  }
];

export async function fetchDirectoryConsultants(
  stateFilter = '',
  specialtyFilter = ''
): Promise<Consultant[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_CONSULTANTS.filter((c) => {
    const matchState = !stateFilter || c.state.toLowerCase() === stateFilter.toLowerCase();
    const matchSpecialty = !specialtyFilter || c.specializations.some((s) => s.toLowerCase().includes(specialtyFilter.toLowerCase()));
    return matchState && matchSpecialty;
  });
}

export async function fetchDirectoryDealers(
  stateFilter = '',
  categoryFilter = ''
): Promise<AgroDealer[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_AGRO_DEALERS.filter((d) => {
    const matchState = !stateFilter || d.state.toLowerCase() === stateFilter.toLowerCase();
    const matchCategory = !categoryFilter || d.category === categoryFilter;
    return matchState && matchCategory;
  });
}

export function generateWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

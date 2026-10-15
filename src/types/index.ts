export type SupportedLanguage = 'en' | 'ha' | 'yo' | 'ig' | 'pcm';

export interface CropInfo {
  id: string;
  name: string;
  localNames: {
    ha: string;
    yo: string;
    ig: string;
    pcm: string;
  };
  category: 'cereal' | 'tuber' | 'vegetable' | 'legume' | 'cash_crop';
  icon: string;
  commonDiseases: string[];
}

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DiagnosisTreatment {
  title: string;
  steps: string[];
  approxCostNgn?: string;
  urgency: 'immediate' | 'within_3_days' | 'preventive';
}

export interface DiagnosisResult {
  id: string;
  date: string;
  cropId: string;
  cropName: string;
  cropIcon: string;
  diseaseName: string;
  localDiseaseName: {
    ha?: string;
    yo?: string;
    ig?: string;
    pcm?: string;
  };
  scientificName: string;
  confidence: number;
  severity: SeverityLevel;
  imageUrl: string;
  thumbnailUrl?: string;
  imageStats?: {
    originalSizeBytes: number;
    compressedSizeBytes: number;
    compressionRatio: number;
    timeMs: number;
  };
  symptomsObserved: string[];
  summary: string;
  immediateAction: string;
  organicRemedies: string[];
  chemicalRemedies: string[];
  chemicalPrecautions: string;
  preventionTips: string[];
  farmerAudioScript: string;
  status: 'active' | 'resolved' | 'monitoring';
  locationState: string;
}

export interface AdvisoryMessage {
  id: string;
  sender: 'farmer' | 'assistant';
  text: string;
  audioScript?: string;
  timestamp: string;
  topic?: 'crops' | 'weather' | 'pricing' | 'pesticides' | 'fertilizer' | 'livestock';
  quickReplies?: string[];
  disclaimer?: string;
}

export type GeopoliticalZone = 
  | 'North Central'
  | 'North East'
  | 'North West'
  | 'South East'
  | 'South South'
  | 'South West';

export interface WeatherAdvisoryData {
  state: string;
  town: string;
  zone: GeopoliticalZone;
  tempC: number;
  feelsLikeC: number;
  condition: 'Sunny' | 'Cloudy' | 'Partly Cloudy' | 'Heavy Rain' | 'Scattered Showers' | 'Harmattan Haze' | 'Thunderstorm';
  humidityPercent: number;
  rainChancePercent: number;
  windSpeedKmh: number;
  soilMoistureStatus: 'Low (Dry)' | 'Optimal' | 'High (Waterlogged)';
  farmingSuitability: {
    spraying: { suitable: boolean; note: string };
    planting: { suitable: boolean; note: string };
    harvestAndDrying: { suitable: boolean; note: string };
    fertilizerApplication: { suitable: boolean; note: string };
  };
  weeklyForecast: Array<{
    day: string;
    tempC: number;
    condition: string;
    rainChancePercent: number;
    advice: string;
  }>;
  seasonalCalendarNote: string;
}

export interface Consultant {
  id: string;
  name: string;
  role: string;
  organization: string;
  state: string;
  cityOrLga: string;
  zone: GeopoliticalZone;
  specializations: string[];
  rating: number;
  reviewsCount: number;
  languages: string[];
  phone: string;
  whatsapp: string;
  isVerified: boolean;
  yearsExperience: number;
  availability: 'Available Today' | 'By Appointment' | 'In Field';
  consultationFee: string;
  badge: string;
}

export interface AgroDealer {
  id: string;
  businessName: string;
  ownerName: string;
  category: 'Seeds & Seedlings' | 'Fertilizer & Lime' | 'Crop Protection Chemicals' | 'Tools & Drip Irrigation' | 'Full Agro Supermarket';
  state: string;
  marketLocation: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  verifiedDealer: boolean;
  topStock: string[];
  acceptsBankTransfer: boolean;
  openingHours: string;
}

export interface MockSystemStatus {
  isMockActive: boolean;
  simulatedDelayMs: number;
  source: string;
  version: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  farmState: string;
  farmLga?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
}


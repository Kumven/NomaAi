import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DiagnosisResult } from '../types';

interface HistoryState {
  diagnoses: DiagnosisResult[];
  addDiagnosis: (diagnosis: DiagnosisResult) => void;
  updateStatus: (id: string, status: DiagnosisResult['status']) => void;
  deleteDiagnosis: (id: string) => void;
  clearAll: () => void;
}

const INITIAL_SEEDED_HISTORY: DiagnosisResult[] = [
  {
    id: 'seed-diag-1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    cropId: 'cassava',
    cropName: 'Cassava',
    cropIcon: '🥔',
    diseaseName: 'Cassava Mosaic Disease (CMD)',
    localDiseaseName: {
      ha: 'Cutar Mosaic ta Rogo',
      yo: 'Àrùn Ewe Kíkí ti Gbaguda',
      ig: 'Ọrịa Mosaic Akpu',
      pcm: 'Cassava Mosaic Leaf Fold'
    },
    scientificName: 'Begomovirus / Cassava mosaic geminivirus',
    confidence: 96,
    severity: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    imageStats: {
      originalSizeBytes: 2450000,
      compressedSizeBytes: 184000,
      compressionRatio: 92,
      timeMs: 145
    },
    symptomsObserved: ['Curled distorted leaves', 'Yellow and pale green mosaic pattern', 'Short internodes'],
    summary: 'Viral mosaic transmitted by whitefly vectors or infected stem cuttings. Reduced photosynthesis.',
    immediateAction: 'Uprooted 12 infected stands along border ridge; burned plants away from prevailing wind.',
    organicRemedies: [
      'Intercrop with cowpea to disrupt whitefly vectors.',
      'Spray neem leaf extract twice weekly in early morning.',
      'Dust with fresh wood ash.'
    ],
    chemicalRemedies: [
      'Acetamiprid 20% SP at 200g/ha for whitefly suppression.'
    ],
    chemicalPrecautions: 'Wear gloves. 21-day harvest interval.',
    preventionTips: [
      'Plant certified TME 419 or TMS 30572 stem cuttings from IITA next season.',
      'Inspect stem cuttings before planting.'
    ],
    farmerAudioScript: 'Cassava Mosaic disease confirmed. Rogue out affected stands immediately to save adjacent crops.',
    status: 'monitoring',
    locationState: 'Oyo'
  },
  {
    id: 'seed-diag-2',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    cropId: 'maize',
    cropName: 'Maize / Corn',
    cropIcon: '🌽',
    diseaseName: 'Fall Armyworm (Spodoptera frugiperda)',
    localDiseaseName: {
      ha: 'Kwarin Masara (Tsutsa mai lalata Masara)',
      yo: 'Kokoro Koko ti Agbado (Saw-saw)',
      ig: 'Nnukwu Ebe Na-eri Ọka',
      pcm: 'Fall Armyworm Caterpillar'
    },
    scientificName: 'Spodoptera frugiperda',
    confidence: 95,
    severity: 'critical',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    imageStats: {
      originalSizeBytes: 3100000,
      compressedSizeBytes: 220000,
      compressionRatio: 93,
      timeMs: 180
    },
    symptomsObserved: ['Ragged holes in whorl', 'Moist sawdust-like frass droppings', 'Window-paned young leaves'],
    summary: 'Larval feeding inside funnel whorls. Rapid damage during vegetative growth phase.',
    immediateAction: 'Hand-picked caterpillars; applied wood ash and fine sand mixture directly inside central funnel whorls.',
    organicRemedies: [
      'Apply fine sand + dry wood ash pinch directly into central whorls.',
      'Spray Bacillus thuringiensis biopesticide at dawn.'
    ],
    chemicalRemedies: [
      'Emamectin Benzoate 5% SG at 12g per 15L knapsack sprayer.'
    ],
    chemicalPrecautions: 'Spray directed inside whorl, avoid spraying in midday sun.',
    preventionTips: [
      'Early synchronous planting with surrounding farms.',
      'Scout fields twice weekly from seedling stage.'
    ],
    farmerAudioScript: 'Fall Armyworm larvae identified in whorls. Wood ash and sand treatment applied successfully.',
    status: 'resolved',
    locationState: 'Kaduna'
  }
];

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      diagnoses: INITIAL_SEEDED_HISTORY,
      addDiagnosis: (diagnosis) =>
        set((state) => ({
          diagnoses: [diagnosis, ...state.diagnoses]
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          diagnoses: state.diagnoses.map((d) => (d.id === id ? { ...d, status } : d))
        })),
      deleteDiagnosis: (id) =>
        set((state) => ({
          diagnoses: state.diagnoses.filter((d) => d.id !== id)
        })),
      clearAll: () => set({ diagnoses: [] })
    }),
    {
      name: 'nomaai_farm_history'
    }
  )
);

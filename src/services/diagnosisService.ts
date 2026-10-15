import type { CropInfo, DiagnosisResult, SeverityLevel } from '../types';

export const NIGERIAN_CROPS: CropInfo[] = [
  {
    id: 'cassava',
    name: 'Cassava',
    localNames: { ha: 'Rogo', yo: 'Gbaguda / Ege', ig: 'Akpu / Ji Abana', pcm: 'Cassava' },
    category: 'tuber',
    icon: '🥔',
    commonDiseases: ['Cassava Mosaic Disease (CMD)', 'Cassava Brown Streak', 'Cassava Bacterial Blight', 'Green Mite Infestation']
  },
  {
    id: 'maize',
    name: 'Maize / Corn',
    localNames: { ha: 'Masara', yo: 'Agbado', ig: 'Ọka', pcm: 'Corn' },
    category: 'cereal',
    icon: '🌽',
    commonDiseases: ['Fall Armyworm (FAW)', 'Maize Streak Virus', 'Stem Borer', 'Northern Corn Leaf Blight']
  },
  {
    id: 'yam',
    name: 'Yam',
    localNames: { ha: 'Doya', yo: 'Isu', ig: 'Ji', pcm: 'Yam' },
    category: 'tuber',
    icon: '🍠',
    commonDiseases: ['Yam Anthracnose (Die-back)', 'Yam Mosaic Virus', 'Tuber Soft Rot', 'Nematode Galling']
  },
  {
    id: 'tomato',
    name: 'Tomato',
    localNames: { ha: 'Tumatir', yo: 'Tọmato', ig: 'Tomato', pcm: 'Tomato' },
    category: 'vegetable',
    icon: '🍅',
    commonDiseases: ['Tomato Late Blight', 'Bacterial Wilt', 'Tuta Absoluta (Leaf Miner)', 'Tomato Yellow Leaf Curl']
  },
  {
    id: 'rice',
    name: 'Rice',
    localNames: { ha: 'Shinkafa', yo: 'Resi', ig: 'Osikapa', pcm: 'Rice' },
    category: 'cereal',
    icon: '🌾',
    commonDiseases: ['Rice Blast (Pyricularia)', 'Bacterial Leaf Blight', 'Brown Spot Disease', 'African Rice Gall Midge']
  },
  {
    id: 'pepper',
    name: 'Pepper (Habanero / Tatashe)',
    localNames: { ha: 'Barkono / Tattasai', yo: 'Ata Rodo / Sombo', ig: 'Ose', pcm: 'Pepper' },
    category: 'vegetable',
    icon: '🌶️',
    commonDiseases: ['Pepper Leaf Curl Virus', 'Anthracnose Fruit Rot', 'Bacterial Spot', 'Aphid Infestation']
  },
  {
    id: 'cowpea',
    name: 'Cowpea / Beans',
    localNames: { ha: 'Wake', yo: 'Ẹwa', ig: 'Agwa', pcm: 'Beans' },
    category: 'legume',
    icon: '🫘',
    commonDiseases: ['Maruca Pod Borer', 'Cowpea Aphid Mosaic Virus', 'Anthracnose', 'Cercospora Leaf Spot']
  },
  {
    id: 'cocoa',
    name: 'Cocoa',
    localNames: { ha: 'Koko', yo: 'Koko', ig: 'Koko', pcm: 'Cocoa' },
    category: 'cash_crop',
    icon: '🍫',
    commonDiseases: ['Black Pod Disease (Phytophthora)', 'Cocoa Swollen Shoot Virus', 'Mirid / Capsid Bug Damage']
  }
];

export interface SampleCase {
  id: string;
  cropId: string;
  title: string;
  diseaseName: string;
  imageUrl: string;
  thumbnailDesc: string;
  symptoms: string[];
}

export const SAMPLE_CROP_CASES: SampleCase[] = [
  {
    id: 'sample-cassava-cmd',
    cropId: 'cassava',
    title: 'Cassava Leaves with Yellow Distortions',
    diseaseName: 'Cassava Mosaic Disease (CMD)',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    thumbnailDesc: 'Yellow mosaic patterns & distorted leaf blades',
    symptoms: ['Curled leaves', 'Yellow and pale patches', 'Stunted stem nodes']
  },
  {
    id: 'sample-maize-faw',
    cropId: 'maize',
    title: 'Maize Whorl with Ragged Holes & Sawdust',
    diseaseName: 'Fall Armyworm (Spodoptera frugiperda)',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    thumbnailDesc: 'Ragged holes in leaf whorl with frass granules',
    symptoms: ['Holes in leaves', 'Caterpillar droppings in central whorl', 'Chewed tassels']
  },
  {
    id: 'sample-tomato-blight',
    cropId: 'tomato',
    title: 'Tomato Foliage with Dark Water-Soaked Blights',
    diseaseName: 'Tomato Late Blight (Phytophthora infestans)',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=800&q=80',
    thumbnailDesc: 'Dark irregular water-soaked spots with pale margins',
    symptoms: ['Dark brown spots on leaves', 'Dying foliage', 'Fruit rot']
  },
  {
    id: 'sample-yam-anthracnose',
    cropId: 'yam',
    title: 'Yam Foliage with Scorched Black Spots',
    diseaseName: 'Yam Anthracnose / Die-back (Colletotrichum gloeosporioides)',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    thumbnailDesc: 'Pinpoint black spots coalescing into scorch appearance',
    symptoms: ['Black leaf spots', 'Vines drying out', 'Premature leaf drop']
  }
];

export const MOCK_DIAGNOSES_KNOWLEDGE: Record<string, Partial<DiagnosisResult>> = {
  cassava: {
    diseaseName: 'Cassava Mosaic Disease (CMD)',
    scientificName: 'Begomovirus / Cassava mosaic geminivirus',
    localDiseaseName: {
      ha: 'Cutar Mosaic ta Rogo (Ganyen Rogo na Lanqwasa)',
      yo: 'Àrùn Ewe Kíkí ti Gbaguda',
      ig: 'Ọrịa Mosaic na-agbagọ Akwụkwọ Akpu',
      pcm: 'Cassava Mosaic Sickness (Leaf wey fold with yellow pattern)'
    },
    confidence: 96,
    severity: 'high',
    summary: 'Viral infection transmitted by whiteflies (Bemisia tabaci) or through infected stem cuttings. It significantly reduces tuber enlargement by up to 70% if unmanaged.',
    immediateAction: 'Uproot and burn heavily infected stunted plants immediately to prevent whiteflies from transferring the virus to nearby healthy cassava stands.',
    organicRemedies: [
      'Intercrop cassava with maize or cowpea to disrupt whitefly flight vectors.',
      'Spray neem leaf water extract (50g crushed neem leaves per liter of water) twice weekly to repel whitefly populations.',
      'Dust with fresh wood ash around early shoot borders in the morning dew.'
    ],
    chemicalRemedies: [
      'Apply systemic insecticide targeting whitefly vectors: Acetamiprid 20% SP at 200g/ha or Imidacloprid 200 SL.',
      'Ensure early-stage spray before whitefly nymph colonization becomes dense.'
    ],
    chemicalPrecautions: 'Wear protective rubber boots and face covering. Do not harvest cassava leaves for soup within 21 days of applying systemic insecticides.',
    preventionTips: [
      'Source certified disease-resistant varieties developed by IITA / NRCRI such as TME 419, TMS 30572, or Game-Changer.',
      'Inspect stem cuttings carefully before planting; never take cuttings from fields displaying yellow mosaic foliage.',
      'Sanitize harvesting machetes with diluted bleach (1 part bleach to 9 parts water).'
    ],
    farmerAudioScript: 'Sannu manomi. AI ya gano cewa wannan cutar Cassava Mosaic ce. Fararen kwari ne ke yada ta. Ka cire shukar da ta lalace ka kona ta, sannan ka fesa maganin kashe kwari ko man neem don kare sauran rogonka.'
  },
  maize: {
    diseaseName: 'Fall Armyworm (FAW) Infestation',
    scientificName: 'Spodoptera frugiperda',
    localDiseaseName: {
      ha: 'Kwarin Masara (Tsutsa mai lalata Masara)',
      yo: 'Kokoro Koko ti Agbado (Saw-saw)',
      ig: 'Nnukwu Ebe Na-eri Ọka',
      pcm: 'Fall Armyworm Caterpillar (Worm wey dey chop corn leaf)'
    },
    confidence: 94,
    severity: 'critical',
    summary: 'Destructive caterpillar pest that bores deep into maize funnel whorls, feeding on young emerging leaf tissue and reproductive tassels.',
    immediateAction: 'Check maize whorls between 6:00 AM and 8:00 AM or late dusk when larvae are feeding near the surface; place hand-crushed dry sand/wood ash or targeted biopesticide directly inside the funnel whorl.',
    organicRemedies: [
      'Apply a pinch of dry fine sand mixed with wood ash (1:1 ratio) directly into the funnel whorl of each infested maize stand. This desiccates young larvae.',
      'Spray Bacillus thuringiensis (Bt) biopesticide at early instars.',
      'Plant Desmodium or Molasses grass around borders to push away FAW moths (Push-Pull technology).'
    ],
    chemicalRemedies: [
      'Spray Emamectin Benzoate 5% SG (at 10-15g per 15L knapsack sprayer) directed into the central leaf whorl.',
      'Alternative approved rotation: Chlorantraniliprole 18.5% SC or Spinetoram.'
    ],
    chemicalPrecautions: 'Rotate chemical classes to prevent pesticide resistance. Never spray in midday heat when maize leaves are folded. Keep 14 days pre-harvest safety interval.',
    preventionTips: [
      'Plant maize synchronously with neighboring farms early in the season to avoid late-season pest buildup.',
      'Regularly scout field twice weekly from seedling emergence until tasseling.',
      'Preserve natural predators such as predatory earwigs, assassin bugs, and ladybird beetles.'
    ],
    farmerAudioScript: 'Your maize plant has Fall Armyworm. Look inside the central funnel whorl. Mix wood ash with dry fine sand and put a small pinch inside the funnel today, or spray Emamectin Benzoate directly inside the whorl early morning.'
  },
  yam: {
    diseaseName: 'Yam Anthracnose / Foliar Scorch',
    scientificName: 'Colletotrichum gloeosporioides',
    localDiseaseName: {
      ha: 'Cutar Kunar Ganyen Doya (Anthracnose)',
      yo: 'Àrùn Jíjó Ewe Isu',
      ig: 'Ọrịa Ọkụ Na-ere Akwụkwọ Ji',
      pcm: 'Yam Leaf Burn / Anthracnose (Black spot wey burn yam leave)'
    },
    confidence: 92,
    severity: 'high',
    summary: 'Fungal foliar disease causing dark brown to black lesions surrounded by chlorotic halos, progressing to complete vine scorching and premature defoliation.',
    immediateAction: 'Prune severely blackened vines and ensure good vine staking to lift foliage off damp soil surfaces.',
    organicRemedies: [
      'Stake yam vines taller (at least 2.5 meters) with sturdy bamboo or tree poles to improve air movement and reduce leaf dampness.',
      'Apply copper hydroxide or Bordeaux mixture organically approved copper spray.',
      'Mulch ridges with dry guinea grass to prevent rain splashes carrying fungal spores from soil onto lower leaves.'
    ],
    chemicalRemedies: [
      'Foliar spray with Mancozeb 80% WP (50g per 15L sprayer) as a protectant fungicide.',
      'For active infections, combine or alternate with systemic fungicide like Azoxystrobin or Difenoconazole.'
    ],
    chemicalPrecautions: 'Do not spray when rainfall is imminent within 2 hours. Use appropriate rubber gloves and rinse sprayer thoroughly after use away from drinking wells.',
    preventionTips: [
      'Dip yam seed setts into a fungicide/wood ash slurry before planting.',
      'Rotate yam plots with cereals or legumes every two cropping cycles.',
      'Destroy old yam vine residues after harvest instead of leaving them on the mounds.'
    ],
    farmerAudioScript: 'The black burned spots on your yam leaves are Anthracnose fungus. Stake the vines up higher to keep them dry, and spray Mancozeb fungicide or copper wash to protect the remaining leaves.'
  },
  tomato: {
    diseaseName: 'Tomato Late Blight',
    scientificName: 'Phytophthora infestans',
    localDiseaseName: {
      ha: 'Cutar Danshi da Lalacewar Tumatir',
      yo: 'Àrùn Ijẹrẹ Ewe ati Eso Tọmato',
      ig: 'Ọrịa Na-emebi Akwụkwọ na Mkpụrụ Tomato',
      pcm: 'Tomato Blight (Water soak spot wey dey make tomato rot)'
    },
    confidence: 97,
    severity: 'critical',
    summary: 'Devastating oomycete pathogen thriving under cool, humid, wet weather conditions. Causes greasy dark spots, rapid leaf collapse, and firm brown rot on fruit.',
    immediateAction: 'Cease overhead sprinkler watering immediately; switch to furrow or drip irrigation to keep tomato foliage dry. Remove and bury blackened plants.',
    organicRemedies: [
      'Spray dilute baking soda and vegetable oil solution (5g baking soda + 5ml oil in 1L warm water) as preventative antifungal.',
      'Ensure wide plant spacing (at least 60cm by 50cm) to facilitate rapid canopy drying.',
      'Remove lowest leaves touching the moist soil bed.'
    ],
    chemicalRemedies: [
      'Spray Metalaxyl-M + Mancozeb (e.g. Ridomil Gold 68 WG) at 50g per 15L sprayer for active curative control.',
      'Rotate with Chlorothalonil 720 SC.'
    ],
    chemicalPrecautions: 'Apply strictly in early morning before high wind. Observe minimum 7-day pre-harvest interval before picking ripe tomatoes for market.',
    preventionTips: [
      'Plant blight-tolerant hybrid tomato varieties suited to Plateau State rainy-season conditions (e.g. Platinum F1, Cobra F1).',
      'Avoid planting tomatoes right next to Irish potato beds.',
      'Stake tomato plants off the ground with bamboo stakes and raffia twine.'
    ],
    farmerAudioScript: 'Your tomato has Late Blight fungus caused by moisture. Stop spraying water on the leaves from above. Spray Metalaxyl-Mancozeb immediately and prune off the blackened lower branches.'
  },
  rice: {
    diseaseName: 'Rice Blast Disease',
    scientificName: 'Pyricularia oryzae (Magnaporthe oryzae)',
    localDiseaseName: {
      ha: 'Cutar Kunar Ganyen Shinkafa',
      yo: 'Àrùn Ewe Resi ti o n jo',
      ig: 'Ọrịa Na-agba Akwụkwọ Osikapa Ọkụ',
      pcm: 'Rice Blast (Spindle shape spots wey dry rice leaf)'
    },
    confidence: 93,
    severity: 'high',
    summary: 'Spindle-shaped elliptical lesions with gray centers and brown borders that attack leaves, nodes, and panicles, causing significant yield collapse in lowland and upland rice.',
    immediateAction: 'Drain stagnant water temporarily if field is overly submerged, and avoid applying excessive top-dress urea fertilizer which softens plant tissue and worsens blast.',
    organicRemedies: [
      'Apply silicon fertilizer or burnt rice husk ash to soil to harden cell walls against fungal penetration.',
      'Ensure balanced soil nutrition with potassium.',
      'Practice crop rotation with soybean or cowpea.'
    ],
    chemicalRemedies: [
      'Foliar spray of Tricyclazole 75% WP (at 1g per liter of water) or Isoprothiolane 40% EC.',
      'Spray at late tillering and early booting stage.'
    ],
    chemicalPrecautions: 'Do not allow spray drift into freshwater fish ponds or livestock grazing streams.',
    preventionTips: [
      'Use certified blast-resistant seed varieties such as FARO 44 (SiPi 692033) or FARO 52.',
      'Treat rice paddy seeds with recommended fungicide dressing before nursing or broadcast sowing.'
    ],
    farmerAudioScript: 'Rice blast spotted. Hold back heavy urea fertilizer for now because too much nitrogen makes rice leaves weak against the blast. Apply Tricyclazole fungicide.'
  },
  pepper: {
    diseaseName: 'Pepper Leaf Curl Virus (PepLCV)',
    scientificName: 'Begomovirus / Pepper leaf curl virus',
    localDiseaseName: {
      ha: 'Lalacewar Ganyen Barkono',
      yo: 'Àrùn Kíkí Ewe Ata Rodo',
      ig: 'Ọrịa Na-apịaji Akwụkwọ Ose',
      pcm: 'Pepper Leaf Curl (Pepper leaf wey pack like boat)'
    },
    confidence: 91,
    severity: 'medium',
    summary: 'Causes upward curling and crinkling of leaves, reduced leaf size, shortened internodes, and poor fruit set. Spread by whitefly vectors.',
    immediateAction: 'Uproot severely stunted seedlings showing dense puckering; spray remaining field to control whitefly populations.',
    organicRemedies: [
      'Spray garlic-chili-soap natural repellant spray on leaf undersides.',
      'Install yellow sticky traps (painted yellow cardboard smeared with used engine oil or grease) at canopy level to trap whiteflies.'
    ],
    chemicalRemedies: [
      'Spray Thiamethoxam 25% WG or Imidacloprid to keep vector population below threshold.'
    ],
    chemicalPrecautions: 'Do not spray when bees and pollinators are active on pepper blossoms.',
    preventionTips: [
      'Use nursery insect netting to raise healthy pepper seedlings before transplanting.',
      'Maintain weed-free borders around pepper plots.'
    ],
    farmerAudioScript: 'Your pepper leaves are curling due to a viral infection carried by tiny whiteflies. Place yellow sticky traps and spray garlic-chili or mild insecticide under the leaves to kill the whiteflies.'
  },
  cowpea: {
    diseaseName: 'Maruca Pod Borer Damage',
    scientificName: 'Maruca vitrata',
    localDiseaseName: {
      ha: 'Kwarin Wake mai cin Kwanso',
      yo: 'Kokoro ti n Je Ewa',
      ig: 'Ahụhụ Na-ata Mkpụrụ Agwa',
      pcm: 'Beans Pod Borer (Worm wey dey enter beans pod)'
    },
    confidence: 95,
    severity: 'high',
    summary: 'Caterpillar web spinner that attacks floral buds, flowers, and green pods, webbed with frass. Causes heavy premature flower drop and bored pod seeds.',
    immediateAction: 'Scout flowers at dawn; prune webbed blossom clusters.',
    organicRemedies: [
      'Neem seed kernel extract (NSKE 5%) sprayed at flower bud initiation.',
      'Intercrop with sorghum or pearl millet.'
    ],
    chemicalRemedies: [
      'Spray Cypermethrin + Dimethoate (e.g. Uppercott or Best Action) at flower initiation and pod formation.'
    ],
    chemicalPrecautions: 'Always wear protective gear and avoid spraying during peak honeybee foraging hours.',
    preventionTips: [
      'Plant SAMPEA 20-T (PBR Cowpea, Pod Borer Resistant variety licensed in Nigeria).',
      'Timely early planting at the onset of rain.'
    ],
    farmerAudioScript: 'Maruca caterpillar is feeding on your beans flowers. Spray Neem extract or approved insecticide early morning when buds open to protect the bean pods.'
  },
  cocoa: {
    diseaseName: 'Cocoa Black Pod Disease',
    scientificName: 'Phytophthora megakarya',
    localDiseaseName: {
      ha: 'Cutar Bakin Koko',
      yo: 'Àrùn Koko Dúdú (Black Pod)',
      ig: 'Ọrịa Na-eme Koko Oji',
      pcm: 'Cocoa Black Pod Rot'
    },
    confidence: 98,
    severity: 'critical',
    summary: 'Aggressive fungal pod rot that spreads during rainy, humid conditions in cocoa groves. Remove infected pods promptly to limit crop loss.',
    immediateAction: 'Harvest and bury or burn all blackened and mummified pods from tree trunks and branches immediately.',
    organicRemedies: [
      'Prune excess shade tree branches and chupons to allow sunlight onto cocoa tree trunks.',
      'Improve grove drainage to reduce dampness.'
    ],
    chemicalRemedies: [
      'Foliar spray with Copper oxide (Nordox 75 WG) or Metalaxyl + Copper hydroxide every 21 days during the heavy rain season.'
    ],
    chemicalPrecautions: 'Ensure full coverage of pods and lower trunk bark; do not contaminate streams.',
    preventionTips: [
      'Frequent sanitary harvesting every 7 to 10 days.',
      'Plant disease-resistant CRIN (Cocoa Research Institute of Nigeria) hybrid varieties.'
    ],
    farmerAudioScript: 'Black pod disease has hit your cocoa. Remove all black pods from the trees today and prune thick branches to let sunlight shine through the trees.'
  }
};

export async function simulateDiagnosisAnalysis(
  cropId: string,
  imagePreviewUrl: string,
  symptoms: string[] = [],
  imageStats?: DiagnosisResult['imageStats'],
  locationState = 'Plateau'
): Promise<DiagnosisResult> {
  // Realistic simulation latency (1000-1400ms) to allow realistic UX feedback
  await new Promise((resolve) => setTimeout(resolve, 1100));

  const crop = NIGERIAN_CROPS.find((c) => c.id === cropId) || NIGERIAN_CROPS[0];
  const knowledge = MOCK_DIAGNOSES_KNOWLEDGE[cropId] || MOCK_DIAGNOSES_KNOWLEDGE.cassava;

  const result: DiagnosisResult = {
    id: `diag-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString(),
    cropId: crop.id,
    cropName: crop.name,
    cropIcon: crop.icon,
    diseaseName: knowledge.diseaseName || 'General Foliar Blight',
    localDiseaseName: knowledge.localDiseaseName || {},
    scientificName: knowledge.scientificName || 'Pathogen sp.',
    confidence: knowledge.confidence || 93,
    severity: (knowledge.severity as SeverityLevel) || 'medium',
    imageUrl: imagePreviewUrl,
    imageStats,
    symptomsObserved: symptoms.length > 0 ? symptoms : ['Leaf discoloration', 'Irregular spotting', 'Growth stunting'],
    summary: knowledge.summary || 'Crop stress patterns observed on foliage.',
    immediateAction: knowledge.immediateAction || 'Isolate affected plants and monitor moisture levels.',
    organicRemedies: knowledge.organicRemedies || ['Apply wood ash and improve air circulation.'],
    chemicalRemedies: knowledge.chemicalRemedies || ['Consult local ADP extension agent for registered pesticides.'],
    chemicalPrecautions: knowledge.chemicalPrecautions || 'Wear safety gear when spraying chemicals.',
    preventionTips: knowledge.preventionTips || ['Rotate crops next planting cycle and use certified disease-free seeds.'],
    farmerAudioScript: knowledge.farmerAudioScript || 'Your crop shows signs of leaf stress. Please follow the recommended field actions.',
    status: 'active',
    locationState
  };

  return result;
}

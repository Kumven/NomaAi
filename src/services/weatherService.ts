import type { WeatherAdvisoryData } from '../types';

export const NIGERIAN_AGRO_WEATHER: Record<string, WeatherAdvisoryData> = {
  Kano: {
    state: 'Kano',
    town: 'Kano Urban / Dawanau Hub',
    zone: 'North West',
    tempC: 34,
    feelsLikeC: 35,
    condition: 'Sunny',
    humidityPercent: 32,
    rainChancePercent: 10,
    windSpeedKmh: 14,
    soilMoistureStatus: 'Low (Dry)',
    farmingSuitability: {
      spraying: { suitable: true, note: 'Ideal calm conditions in morning (6:30 - 9:00 AM). Minimal wind drift.' },
      planting: { suitable: false, note: 'Dry season / Fadama irrigation cycle. Only plant if drip or furrow irrigation is operational.' },
      harvestAndDrying: { suitable: true, note: 'Excellent solar radiation for sun-drying grains, groundnuts, and pepper.' },
      fertilizerApplication: { suitable: true, note: 'Suitable for irrigated beds. No danger of surface rain runoff.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 34, condition: 'Sunny', rainChancePercent: 5, advice: 'High evaporation rate; irrigate vegetable beds before 9:00 AM.' },
      { day: 'Tue', tempC: 35, condition: 'Sunny', rainChancePercent: 5, advice: 'Good for sun-drying harvested cereals and legumes on raised mats.' },
      { day: 'Wed', tempC: 33, condition: 'Partly Cloudy', rainChancePercent: 15, advice: 'Moderate wind; morning pesticide spraying is favorable.' },
      { day: 'Thu', tempC: 32, condition: 'Sunny', rainChancePercent: 10, advice: 'Inspect tomato and pepper crops for red spider mite stress.' },
      { day: 'Fri', tempC: 34, condition: 'Sunny', rainChancePercent: 5, advice: 'Maintain soil mulching to conserve moisture in irrigation channels.' },
      { day: 'Sat', tempC: 35, condition: 'Clear', rainChancePercent: 5, advice: 'Clear day; transport produce to Dawanau grain market.' },
      { day: 'Sun', tempC: 36, condition: 'Sunny', rainChancePercent: 10, advice: 'Deep watering needed for orchard saplings.' }
    ],
    seasonalCalendarNote: 'Sudan Savanna Dry Season / Fadama Irrigation Cycle. Focus on onions, tomatoes, and wheat.'
  },
  Kaduna: {
    state: 'Kaduna',
    town: 'Zaria / Kaduna Central',
    zone: 'North West',
    tempC: 30,
    feelsLikeC: 31,
    condition: 'Cloudy',
    humidityPercent: 58,
    rainChancePercent: 40,
    windSpeedKmh: 11,
    soilMoistureStatus: 'Optimal',
    farmingSuitability: {
      spraying: { suitable: true, note: 'Safe until 11:00 AM. Check afternoon cloud buildup before foliar sprays.' },
      planting: { suitable: true, note: 'Soil temperature and moisture balance are favorable for early germinating seeds.' },
      harvestAndDrying: { suitable: false, note: 'Intermittent cloud cover slows outdoor drying; cover grain tarpaulins if showers appear.' },
      fertilizerApplication: { suitable: true, note: 'Light moisture facilitates fast root uptake of NPK 15-15-15.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 30, condition: 'Scattered Showers', rainChancePercent: 45, advice: 'Hold off afternoon herbicide spray due to potential rain.' },
      { day: 'Tue', tempC: 29, condition: 'Cloudy', rainChancePercent: 35, advice: 'Optimal day for land preparation and harrowing.' },
      { day: 'Wed', tempC: 31, condition: 'Partly Cloudy', rainChancePercent: 25, advice: 'Scout maize whorls for Fall Armyworm larvae in morning.' },
      { day: 'Thu', tempC: 32, condition: 'Sunny', rainChancePercent: 15, advice: 'Safe window for systemic insecticide and foliar fertilizer.' },
      { day: 'Fri', tempC: 30, condition: 'Cloudy', rainChancePercent: 30, advice: 'Check drainage channels to prevent water stagnation.' },
      { day: 'Sat', tempC: 28, condition: 'Rainy', rainChancePercent: 65, advice: 'Heavy shower predicted; stay indoors and avoid tractor wheel rutting.' },
      { day: 'Sun', tempC: 29, condition: 'Partly Cloudy', rainChancePercent: 20, advice: 'Moisture rich soil; ideal for transplanting seedlings.' }
    ],
    seasonalCalendarNote: 'Northern Guinea Savanna Transition Window. Prime time for ginger and maize scouting.'
  },
  Benue: {
    state: 'Benue',
    town: 'Makurdi / Gboko (Food Basket)',
    zone: 'North Central',
    tempC: 31,
    feelsLikeC: 33,
    condition: 'Partly Cloudy',
    humidityPercent: 68,
    rainChancePercent: 30,
    windSpeedKmh: 9,
    soilMoistureStatus: 'Optimal',
    farmingSuitability: {
      spraying: { suitable: true, note: 'Low wind velocity makes morning foliar spraying efficient with minimal drift.' },
      planting: { suitable: true, note: 'Excellent soil tilth and moisture for yam mound capping and sweet potato vines.' },
      harvestAndDrying: { suitable: true, note: 'Good sunny intervals for outdoor drying of cassava chips.' },
      fertilizerApplication: { suitable: true, note: 'Side-dress urea or organic manure around yam mounds now.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 31, condition: 'Partly Cloudy', rainChancePercent: 30, advice: 'Favorable day for staking yam vines to bamboo poles.' },
      { day: 'Tue', tempC: 32, condition: 'Sunny', rainChancePercent: 20, advice: 'Sun-dry fermented cassava roots and split cowpea pods.' },
      { day: 'Wed', tempC: 30, condition: 'Cloudy', rainChancePercent: 40, advice: 'Inspect soyabean plots for leaf spot and caterpillar activity.' },
      { day: 'Thu', tempC: 29, condition: 'Scattered Showers', rainChancePercent: 55, advice: 'Moderate rain expected; delay foliar fungicide till dry leaves.' },
      { day: 'Fri', tempC: 31, condition: 'Sunny', rainChancePercent: 20, advice: 'Inspect citrus orchards for scale insects and fruit flies.' },
      { day: 'Sat', tempC: 33, condition: 'Clear', rainChancePercent: 10, advice: 'Great conditions for tractor tilling and ridge formation.' },
      { day: 'Sun', tempC: 32, condition: 'Partly Cloudy', rainChancePercent: 25, advice: 'Harvest green vegetables for early Monday morning market.' }
    ],
    seasonalCalendarNote: 'Middle Belt Food Basket Cycle. Optimal phase for yam mound cultivation and soybean vegetative growth.'
  },
  Oyo: {
    state: 'Oyo',
    town: 'Ibadan / Ogbomoso / Oyo',
    zone: 'South West',
    tempC: 29,
    feelsLikeC: 32,
    condition: 'Cloudy',
    humidityPercent: 78,
    rainChancePercent: 45,
    windSpeedKmh: 10,
    soilMoistureStatus: 'Optimal',
    farmingSuitability: {
      spraying: { suitable: false, note: 'High humidity and scattered precipitation risk washing off surface sprays.' },
      planting: { suitable: true, note: 'Moist loamy soil promotes rapid seedling rooting.' },
      harvestAndDrying: { suitable: false, note: 'Damp air. Avoid spreading cocoa beans or maize on bare ground.' },
      fertilizerApplication: { suitable: true, note: 'Apply slow-release fertilizer or ring-apply NPK under tree canopy.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 29, condition: 'Cloudy', rainChancePercent: 45, advice: 'Prune excess cassava leaves if foliage is overgrown.' },
      { day: 'Tue', tempC: 28, condition: 'Scattered Showers', rainChancePercent: 60, advice: 'Do not spray chemicals; rain will wash active ingredients.' },
      { day: 'Wed', tempC: 30, condition: 'Partly Cloudy', rainChancePercent: 35, advice: 'Window of opportunity for mechanical weeding and mowing.' },
      { day: 'Thu', tempC: 31, condition: 'Sunny', rainChancePercent: 20, advice: 'Favorable day for spraying insecticide on cashew and citrus.' },
      { day: 'Fri', tempC: 29, condition: 'Cloudy', rainChancePercent: 50, advice: 'Check cocoa trees for early signs of black pod infection.' },
      { day: 'Sat', tempC: 30, condition: 'Partly Cloudy', rainChancePercent: 30, advice: 'Package harvested plantains for Bodija wholesale market.' },
      { day: 'Sun', tempC: 29, condition: 'Scattered Showers', rainChancePercent: 45, advice: 'Ensure drainage furrows around vegetable nursery are cleared.' }
    ],
    seasonalCalendarNote: 'Southwest Agro-Ecological Zone. High humidity favors fungal diseases; increase plant spacing.'
  },
  Plateau: {
    state: 'Plateau',
    town: 'Jos / Bokkos Highland',
    zone: 'North Central',
    tempC: 24,
    feelsLikeC: 24,
    condition: 'Partly Cloudy',
    humidityPercent: 60,
    rainChancePercent: 25,
    windSpeedKmh: 18,
    soilMoistureStatus: 'Optimal',
    farmingSuitability: {
      spraying: { suitable: false, note: 'High winds (18 km/h) on Jos highland cause excessive spray drift.' },
      planting: { suitable: true, note: 'Cool highland temperatures are ideal for Irish potato and cabbage seedlings.' },
      harvestAndDrying: { suitable: true, note: 'Moderate breeze helps dry surface moisture quickly.' },
      fertilizerApplication: { suitable: true, note: 'Incorporate potassium and calcium for sturdy potato tuber development.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 24, condition: 'Breezy', rainChancePercent: 20, advice: 'Stake tall tomato cultivars to withstand highland breezes.' },
      { day: 'Tue', tempC: 23, condition: 'Partly Cloudy', rainChancePercent: 30, advice: 'Inspect Irish potato plots for early blight spots.' },
      { day: 'Wed', tempC: 25, condition: 'Sunny', rainChancePercent: 15, advice: 'Great day for harvesting cabbage and bell peppers.' },
      { day: 'Thu', tempC: 24, condition: 'Cloudy', rainChancePercent: 25, advice: 'Ridge earthing-up around potato mounds to protect tubers from greening.' },
      { day: 'Fri', tempC: 22, condition: 'Scattered Showers', rainChancePercent: 40, advice: 'Cool drizzle expected; protect strawberry nursery beds.' },
      { day: 'Sat', tempC: 23, condition: 'Partly Cloudy', rainChancePercent: 20, advice: 'Load fresh temperate vegetables for transport to Abuja.' },
      { day: 'Sun', tempC: 25, condition: 'Sunny', rainChancePercent: 10, advice: 'Clear day; verify borehole and drip irrigation lines.' }
    ],
    seasonalCalendarNote: 'Jos Plateau Temperate Agro-Belt. Specialized for Irish potatoes, exotic vegetables, and apples.'
  },
  Niger: {
    state: 'Niger',
    town: 'Minna / Bida / Mokwa',
    zone: 'North Central',
    tempC: 33,
    feelsLikeC: 35,
    condition: 'Sunny',
    humidityPercent: 45,
    rainChancePercent: 15,
    windSpeedKmh: 12,
    soilMoistureStatus: 'Optimal',
    farmingSuitability: {
      spraying: { suitable: true, note: 'Calm morning conditions. Spray before 9:30 AM before heat rises.' },
      planting: { suitable: true, note: 'Excellent soil conditions in Bida rice basin.' },
      harvestAndDrying: { suitable: true, note: 'Hot sun is perfect for parboiled paddy rice drying.' },
      fertilizerApplication: { suitable: true, note: 'Incorporate urea at 5-7 cm depth in paddy mud.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 33, condition: 'Sunny', rainChancePercent: 10, advice: 'Solar drying of paddy rice on clean mats.' },
      { day: 'Tue', tempC: 34, condition: 'Sunny', rainChancePercent: 10, advice: 'Early weeding of rice paddies.' },
      { day: 'Wed', tempC: 32, condition: 'Partly Cloudy', rainChancePercent: 20, advice: 'Inspect sorghum plants for head smut.' },
      { day: 'Thu', tempC: 33, condition: 'Sunny', rainChancePercent: 15, advice: 'Apply pre-emergence herbicide on prepared ridges.' },
      { day: 'Fri', tempC: 31, condition: 'Cloudy', rainChancePercent: 30, advice: 'Check bunds and water retaining dikes in rice paddies.' },
      { day: 'Sat', tempC: 32, condition: 'Sunny', rainChancePercent: 15, advice: 'Transport rice sacks to Mokwa agro-hub.' },
      { day: 'Sun', tempC: 34, condition: 'Sunny', rainChancePercent: 10, advice: 'Maintenance on diesel water pumps.' }
    ],
    seasonalCalendarNote: 'Middle Belt Cereal & Grain Corridor. Bida Rice & Sorghum cultivation peak.'
  },
  Enugu: {
    state: 'Enugu',
    town: 'Nsukka / Enugu Central',
    zone: 'South East',
    tempC: 28,
    feelsLikeC: 31,
    condition: 'Scattered Showers',
    humidityPercent: 82,
    rainChancePercent: 65,
    windSpeedKmh: 8,
    soilMoistureStatus: 'High (Waterlogged)',
    farmingSuitability: {
      spraying: { suitable: false, note: 'Rainfall expected; spraying pesticides will result in runoff into water bodies.' },
      planting: { suitable: false, note: 'Excess waterlogged topsoil can cause rotting of fresh tuber setts.' },
      harvestAndDrying: { suitable: false, note: 'Excess ambient humidity prevents proper sun drying.' },
      fertilizerApplication: { suitable: false, note: 'Heavy runoff will wash chemical fertilizers into stream catchment.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 28, condition: 'Rainy', rainChancePercent: 70, advice: 'Construct drainage furrows to divert excess water away from cassava beds.' },
      { day: 'Tue', tempC: 27, condition: 'Heavy Rain', rainChancePercent: 80, advice: 'Stay off soggy fields to prevent soil compaction.' },
      { day: 'Wed', tempC: 29, condition: 'Cloudy', rainChancePercent: 50, advice: 'Inspect oil palm seedlings in nursery polybags.' },
      { day: 'Thu', tempC: 30, condition: 'Partly Cloudy', rainChancePercent: 35, advice: 'Brief dry spell; check for yellowing caused by root waterlogging.' },
      { day: 'Fri', tempC: 28, condition: 'Scattered Showers', rainChancePercent: 60, advice: 'Harvest cocoyam and mature cassava roots.' },
      { day: 'Sat', tempC: 29, condition: 'Cloudy', rainChancePercent: 40, advice: 'Deliver yellow garri batches to Ogbete main market.' },
      { day: 'Sun', tempC: 30, condition: 'Partly Cloudy', rainChancePercent: 30, advice: 'Inspect cashew plantations for branch borers.' }
    ],
    seasonalCalendarNote: 'Rainforest Derived Savanna Belt. High moisture; vigilance required against root fungal pathogens.'
  },
  Ondo: {
    state: 'Ondo',
    town: 'Akure / Ondo / Owo',
    zone: 'South West',
    tempC: 28,
    feelsLikeC: 31,
    condition: 'Cloudy',
    humidityPercent: 85,
    rainChancePercent: 55,
    windSpeedKmh: 7,
    soilMoistureStatus: 'High (Waterlogged)',
    farmingSuitability: {
      spraying: { suitable: false, note: 'High relative humidity (85%) promotes fungal germination; spray only with sticker/adjuvant.' },
      planting: { suitable: true, note: 'Great for tree crop saplings (cocoa, oil palm, plantain suckers).' },
      harvestAndDrying: { suitable: false, note: 'Use raised wooden drying platforms covered with transparent plastic sheets.' },
      fertilizerApplication: { suitable: true, note: 'Ring-apply organic compost around base of cocoa trees.' }
    },
    weeklyForecast: [
      { day: 'Mon', tempC: 28, condition: 'Cloudy', rainChancePercent: 55, advice: 'Prune dead cocoa twigs to reduce Phytophthora fungus spores.' },
      { day: 'Tue', tempC: 27, condition: 'Scattered Showers', rainChancePercent: 65, advice: 'Collect diseased cocoa pods in a sack and bury outside the grove.' },
      { day: 'Wed', tempC: 29, condition: 'Partly Cloudy', rainChancePercent: 40, advice: 'Plant plantain suckers as temporary shade for young cocoa seedlings.' },
      { day: 'Thu', tempC: 30, condition: 'Sunny', rainChancePercent: 25, advice: 'Window for systemic copper fungicide spray.' },
      { day: 'Fri', tempC: 28, condition: 'Cloudy', rainChancePercent: 50, advice: 'Clear weed rings around palm trees.' },
      { day: 'Sat', tempC: 29, condition: 'Partly Cloudy', rainChancePercent: 35, advice: 'Sort dried cocoa beans according to grade 1 export specs.' },
      { day: 'Sun', tempC: 28, condition: 'Scattered Showers', rainChancePercent: 55, advice: 'Check nursery beds for damping-off disease.' }
    ],
    seasonalCalendarNote: 'Cocoa & Tree Crop Rainforest Heart. Intensive sanitary harvesting and canopy aeration critical.'
  }
};

export async function fetchWeatherAdvisory(stateName: string): Promise<WeatherAdvisoryData> {
  // Realistic simulated network latency for TanStack Query
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (NIGERIAN_AGRO_WEATHER[stateName]) {
    return NIGERIAN_AGRO_WEATHER[stateName];
  }
  // Fallback to Kano if not found
  return NIGERIAN_AGRO_WEATHER.Kano;
}

export function getAllSupportedStates(): string[] {
  return Object.keys(NIGERIAN_AGRO_WEATHER);
}

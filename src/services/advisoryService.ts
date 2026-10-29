import type { AdvisoryMessage } from '../types';
import { ApiUnavailableError, sendAdvisoryMessage } from './api';

export interface PredefinedFaq {
  id: string;
  questionEn: string;
  questionHa: string;
  questionYo: string;
  questionIg: string;
  questionPcm: string;
  topic: AdvisoryMessage['topic'];
  answerEn: string;
  answerHa: string;
  answerYo: string;
  answerIg: string;
  answerPcm: string;
  quickReplies: string[];
}

export const FREQUENT_FARM_QUESTIONS: PredefinedFaq[] = [
  {
    id: 'faq-maize-planting',
    questionEn: 'When is the best time to plant maize in Plateau State?',
    questionHa: 'Wane lokaci ne ya fi dacewa a shuka masara a Jihar Plateau?',
    questionYo: 'Igba wo lo dara julọ lati gbin agbado ni Ipinle Plateau?',
    questionIg: 'Kedu oge kacha mma ịkụ ọka na Steeti Plateau?',
    questionPcm: 'Which time make sense pass to plant corn for Plateau State?',
    topic: 'crops',
    answerEn: 'For maize farmers in Plateau State, plant with the onset of reliable seasonal rains; timing varies across the state’s highland and lowland areas. Confirm local rainfall before planting.\n\n1. **Planting Depth**: Sow 2 seeds per hole at 3cm depth; 75cm between ridges, 25cm between stands.\n2. **Fertilizer**: Follow local extension recommendations for fertilizer type and application rate.',
    answerHa: 'Ga manoman masara a Jihar Plateau, a shuka bayan an fara samun ruwan sama na dindindin; lokaci ya danganta da yankin tsauni ko na kwari. A tabbatar da ruwan sama na yankinku kafin shuka.\n\n1. **Nisan Shuka**: Zuba iri 2 a kowane rami a zurfin santimita 3. Nisan kwance santimita 75, nisan tazarar shuka santimita 25.\n2. **Taki**: A bi shawarar jami’in noma na yankinku wajen nau’in taki da adadinsa.',
    answerYo: 'Fun awọn agbẹ agbado ni Ipinle Plateau, gbin nigbati ojo ba ti bẹrẹ déédéé; akoko le yato laarin awọn agbegbe oke ati pẹtẹlẹ. Ṣayẹwo ojo ni agbegbe rẹ ṣaaju dida.\n\n1. **Ijinlẹ**: Fi irugbin meji si iho kan ni ijinlẹ 3cm. Aaye laarin ila jẹ 75cm, laarin igi jẹ 25cm.\n2. **Ajile**: Tẹle oṣuwọn ajile ti oṣiṣẹ ogbin agbegbe Plateau ṣeduro.',
    answerIg: 'Maka ndị ọrụ ugbo ọka na Steeti Plateau, kụọ mgbe mmiri ozuzo malitere ịdịgide; oge nwere ike ịdị iche n’ebe ugwu na ebe dị ala. Lelee mmiri ozuzo dị n’ógbè gị tupu ị kụọ.\n\n1. **Omimi**: Kụọ mkpụrụ abụọ n’otu olulu na omimi 3cm; anya 75cm n’etiti ahịrị na 25cm n’etiti osisi.\n2. **Fatịlaịza**: Soro ọnụego onye ọrụ ugbo mpaghara Plateau tụrụ aro.',
    answerPcm: 'For corn farmers for Plateau State, plant when steady seasonal rain don start; timing fit change between highland and lowland areas. Check local rain before you plant.\n\n1. **Spacing**: Put 2 seeds inside one hole 3cm deep. Ridge spacing 75cm, stand spacing 25cm.\n2. **Fertilizer**: Follow the rate your local Plateau extension officer recommends.',
    quickReplies: ['What is the price of NPK fertilizer in Plateau?', 'How to control Fall Armyworm in maize?', 'Which maize seed suits Plateau farms?']
  },
  {
    id: 'faq-yam-storage',
    questionEn: 'How can I store yam tubers to prevent rot and sprouting during dry season?',
    questionHa: 'Ta yaya zan ajiye doya don hana ta rubewa da tohowa a lokacin rani?',
    questionYo: 'Bawo ni mo ṣe le tọju isu lati dènà jíjẹrà ati yiyo ewe ni igba ọgbẹlẹ?',
    questionIg: 'Kedu ka m ga-esi chekwaa ji ka ọ ghara ire ure na ịgba akwụkwọ n\'oge ọkọchị?',
    questionPcm: 'How I fit store yam tubers make e no rot or begin germinate for harmattan?',
    topic: 'crops',
    answerEn: 'To store harvested yam tubers safely for 4–6 months on Plateau farms:\n\n1. **Curing Phase**: Cure tubers in the shade for 3–5 days immediately after digging up so skin scratches heal over.\n2. **Traditional Yam Barn (Gidan Doya / Rumbu)**: Tie tubers vertically with raffia ropes on wooden racks under shade trees. Ensure minimum 30cm clearance off the ground to prevent rodent reach and fungal dampness.\n3. **Sprout Prevention**: Gently snap off any small sprout tips as soon as they emerge with clean fingers; this stops the tuber from depleting moisture and shrinking.\n4. **Wood Ash Treatment**: Rub clean dry wood ash over any cuts or bruises on the tuber crowns to disinfect wounds.\n5. **Ventilation**: Keep the storage area breezy; never store yams in closed unventilated polythene bags!',
    answerHa: 'Don ajiye doya ba tare da ta ruba ba na tsawon watanni 4 zuwa 6:\n\n1. **Shanya a Inuwa**: Bayan an tono doya, a bar ta a inuwa na kwanaki 3-5 don raunin fatar ya warke.\n2. **Rumbun Doya**: A daure doyar a tsaye da igiyar kaba a kan itatuwan rumbu a karkashin inuwa. A bar tazara santimita 30 daga kasa don hana bera da danshi.\n3. **Karye Tohuwa**: Da zarar doya ta fara tohowa, a karya tohuwar da hannu don hana doyar shanyewa da raguwa.\n4. **Toka**: A shafa tokar itace a kan duk inda aka samu yanka ko rauni a jikin doyar.\n5. **Samun Iska**: A tabbatar rumbun yana samun iska sosai; kada a taba ajiye doya a cikin ledar roba mai zafi!',
    answerYo: 'Lati tọju isu fun oṣu 4 si 6 laisi jijẹrà:\n\n1. **Ṣíṣe ni Ojiji**: Fi isu si abẹ ojiji fun ọjọ 3-5 lẹhin kíkà lati jẹ ki ọgbẹ ara rẹ gbẹ.\n2. **Aba Isu**: So isu rọ lori pẹpẹ igi pẹlu okun labẹ ojiji. Rii daju pe o ga lati ilẹ pẹlu 30cm lati dènà eku ati ọrinrin.\n3. **Didẹkun Yiyo Ewe**: Pa eyikeyi oju ewe to ba fẹ yo pẹlu ọwọ ki isu naa ma ba rù.\n4. **Eeru Igi**: Pa eeru igi ti o mọ si ibi ti isu ba ti ni ọgbẹ lati pa kokoro.\n5. **Afẹfẹ**: Jẹ ki afẹfẹ ma fẹ si i daradara; maṣe fi isu sinu apo rọba ti ko ni iho afẹfẹ!',
    answerIg: 'Iji chekwaa ji ọnwa 4 ruo 6 n\'enweghị ire ure:\n\n1. **Ịkpọ nkụ na Ndò**: Debe ji na ndò ụbọchị 3-5 mgbe e gwuputara ya ka ọnyá dị n\'ahụ ya laa.\n2. **Ọba Ji**: Kee ji n\'osisi n\'ọba n\'okpuru ndò. Hụ na ọ dị 30cm n\'elu ala iji gbochie oke na iru mmiri.\n3. **Ịgbaghachi Akwụkwọ**: Gbarie ome ọ bụla na-apụta n\'elu ji iji mee ka ji ghara ịkpọnwụ.\n4. **Ntụ Ọkụ**: Tee ntụ ọkụ dị ọcha n\'ebe ọ bụla ji nwere ọnyá iji gbochie nje fungus.\n5. **Ikuku**: Kwe ka ikuku na-eku n\'ọba ahụ; etinyela ji n\'ime akpa nylon mechiri emechi!',
    answerPcm: 'To store your yam make e last 4 to 6 months without spoiling:\n\n1. **Cure Under Shade**: Leave tubers under shade for 3 to 5 days after harvest make surface scratches dry.\n2. **Yam Barn (Racks)**: Tie yam stands on wooden rafters inside open airy barn under tree shade. Make am high at least 30cm from ground make rat no touch am.\n3. **Break Sprout**: Once yam start to sprout eye, snap am with hand make the yam no shrink or soft.\n4. **Wood Ash**: Rub clean wood ash on any cut or wound make fungus no enter.\n5. **Ventilation**: Make sure breeze dey enter well well. Never put yam inside tight plastic bag!',
    quickReplies: ['Where to buy yam disease treatment in Plateau?', 'How to cure yam anthracnose', 'Best time to plant yam in Plateau?']
  },
  {
    id: 'faq-fertilizer-pricing',
    questionEn: 'What are common fertilizer types and recommended rates for Plateau farms?',
    questionHa: 'Wadanne nau\'ikan takin zamani ne ake amfani da su kuma yaya adadin zubawa yake?',
    questionYo: 'Iru ajile wo lo wa ati bawo ni a ṣe gbọdọ lo wọn?',
    questionIg: 'Kedu ụdị fatịlaịza dị na otu e kwesịrị isi tinye ha?',
    questionPcm: 'Which kind fertilizers dey Naija market and how much farmer suppose apply?',
    topic: 'fertilizer',
    answerEn: 'Common fertilizer options available to Plateau farmers include:\n\n1. **NPK 15-15-15 / NPK 20-10-10**:\n   - *Purpose*: Balanced starter nutrition for root development and vegetative branching.\n   - *Rate*: Follow crop-specific local extension guidance or soil-test results; rates vary by crop and field.\n   - *Best Timing*: Basal application is commonly made 10–14 days after planting.\n\n2. **Urea 46% Nitrogen**:\n   - *Purpose*: Rapid leaf growth for cereals such as maize.\n   - *Rate*: Follow local extension guidance and split applications where recommended.\n   - *Caution*: Apply to moist soil and avoid broadcasting on a hot, dry surface.\n\n3. **Single Superphosphate (SSP) / Muriate of Potash (MOP)**:\n   - *Purpose*: Root strength and tuber bulking (essential for yam, cassava, and sweet potatoes).\n\n4. **Composted Cow & Poultry Manure**:\n   - *Purpose*: Organic soil conditioning and improved moisture retention.',
    answerHa: 'Nau\'ikan takin da manoman Jihar Plateau ke amfani da su sun haɗa da NPK, Urea, da taki na dabbobi. Adadin taki ya danganta da amfanin gona da ƙasar gona; a bi shawarar jami’in noma na yankinku ko sakamakon gwajin ƙasa. A zuba taki a ƙasa mai danshi.',
    answerYo: 'Awọn ajile ti awọn agbẹ ni Ipinle Plateau le lo pẹlu NPK, Urea ati maalu. Iye ajile da akoko lilo da a tẹle iṣeduro oṣiṣẹ ogbin agbegbe tabi abajade idanwo ilẹ. Fi ajile si ilẹ tutu.',
    answerIg: 'Ụdị fatịlaịza ndị ọrụ ugbo na Steeti Plateau nwere ike iji gụnyere NPK, Urea na nsị anụmanụ. Ọnụọgụ ya dabere n’ihe a kụrụ na ala; soro ndụmọdụ onye ọrụ ugbo mpaghara ma ọ bụ nyocha ala. Tinye ya n’ala mmiri.',
    answerPcm: 'Fertilizer wey Plateau farmers fit use include NPK, Urea and animal manure. The right amount depend on crop and soil; follow your local extension officer or soil-test advice. Apply am when soil get moisture.',
    quickReplies: ['How much is a bag of NPK in Jos?', 'How to make compost fertilizer at home', 'Can I mix Urea with herbicide?']
  }
];

async function mockMalamNoma(
  userQuery: string,
  userLanguage = 'en'
): Promise<AdvisoryMessage> {
  // Realistic simulated thinking latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const queryLower = userQuery.toLowerCase();

  // Check matching FAQ
  const matchedFaq = FREQUENT_FARM_QUESTIONS.find((faq) => {
    const qEn = faq.questionEn.toLowerCase();
    const qHa = faq.questionHa.toLowerCase();
    const qYo = faq.questionYo.toLowerCase();
    const qIg = faq.questionIg.toLowerCase();
    const qPcm = faq.questionPcm.toLowerCase();

    return (
      queryLower.includes(faq.topic || '') ||
      qEn.split(' ').some((word) => word.length > 3 && queryLower.includes(word)) ||
      qHa.split(' ').some((word) => word.length > 3 && queryLower.includes(word)) ||
      qYo.split(' ').some((word) => word.length > 3 && queryLower.includes(word)) ||
      qIg.split(' ').some((word) => word.length > 3 && queryLower.includes(word)) ||
      qPcm.split(' ').some((word) => word.length > 3 && queryLower.includes(word))
    );
  });

  if (matchedFaq) {
    let responseText = matchedFaq.answerEn;
    if (userLanguage === 'ha') responseText = matchedFaq.answerHa;
    else if (userLanguage === 'yo') responseText = matchedFaq.answerYo;
    else if (userLanguage === 'ig') responseText = matchedFaq.answerIg;
    else if (userLanguage === 'pcm') responseText = matchedFaq.answerPcm;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      topic: matchedFaq.topic,
      quickReplies: matchedFaq.quickReplies,
      disclaimer: 'Advisory simulated by NomaAi Agro-Engine based on NAERLS / IITA research recommendations.'
    };
  }

  // General intelligent agro-advisory response
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: `**Malam Noma Agricultural Advisory:**\n\nRegarding your question: *"${userQuery}"*:\n\n1. **Diagnostic Assessment**: For sustainable crop productivity in Plateau State, test drainage and organic matter before applying chemical inputs.\n2. **Recommended Action**: If addressing pest or weed pressure, apply spot treatments early morning (6:30–9:00 AM) to preserve beneficial pollinators and prevent rapid spray evaporation.\n3. **Input Sourcing**: Ensure inputs bear valid NAFDAC registration numbers or are sourced from licensed Plateau State ADP input dealers to avoid counterfeit products.\n4. **Consultation**: For severe field symptoms, consult a Plateau State extension agent through our Consultants Directory.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    topic: 'crops',
    quickReplies: [
      'Find nearby ADP extension officer',
      'What fertilizer is best for this?',
      'How to prepare neem pesticide'
    ],
    disclaimer: 'Advisory generated from the Plateau State agronomic knowledge base (Mock Mode).'
  };
}

export async function askMalamNoma(
  userQuery: string,
  userLanguage = 'en'
): Promise<AdvisoryMessage> {
  try {
    return await sendAdvisoryMessage({ message: userQuery, language: userLanguage });
  } catch (error) {
    if (!(error instanceof ApiUnavailableError)) throw error;
    console.warn('Advisory API unavailable; using the clearly marked local FAQ demo.', error);
    return mockMalamNoma(userQuery, userLanguage);
  }
}

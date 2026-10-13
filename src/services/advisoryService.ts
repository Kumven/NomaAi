import type { AdvisoryMessage } from '../types';

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
    questionEn: 'When is the best time to plant maize in northern & central Nigeria?',
    questionHa: 'Wane lokaci ne ya fi dacewa a shuka masara a Arewa?',
    questionYo: 'Igba wo lo dara julọ lati gbin agbado ni Ariwa ati Aarin Naijiria?',
    questionIg: 'Kedu oge kacha mma ịkụ ọka na ugwu na etiti Naịjirịa?',
    questionPcm: 'Which time make sense pass to plant corn for North and Middle Belt?',
    topic: 'crops',
    answerEn: 'In Northern & Central Nigeria (Kaduna, Kano, Niger, Plateau, Benue):\n\n1. **Early Season Rain Planting**: May 15 – June 10, once topsoil has accumulated at least 25mm of steady rainfall over 3 days.\n2. **Planting Depth**: Sow 2 seeds per hole at 3cm depth; 75cm between ridges, 25cm between stands.\n3. **Basal Fertilizer**: Apply NPK 15-15-15 at 4 bags (200kg) per hectare exactly 10–14 days after germination.\n4. **Top Dress Urea**: Apply 2 bags of Urea per hectare at 4–5 weeks after planting right before tasseling.',
    answerHa: 'Ga manoman Arewa da Tsakiyar Najeriya (Kaduna, Kano, Niger, Plateau, Benue):\n\n1. **Lokacin Shuka**: Tsakanin 15 ga Mayu zuwa 10 ga Yuni, bayan an samu ruwan sama na akalla kwanaki 3 a jere.\n2. **Nisan Shuka**: Zuba iri 2 a kowane rami a zurfin santimita 3. Nisan kwance santimita 75, nisan tazarar shuka santimita 25.\n3. **Takin Farko**: Zuba NPK 15-15-15 (buhu 4 a kowace kadada) kwanaki 10-14 bayan tsirowa.\n4. **Takin Urea**: Zuba Urea buhu 2 a kowace kadada makwanni 4-5 bayan shuka kafin fitar zaren masara.',
    answerYo: 'Fun agbegbe Ariwa ati Aarin Naijiria:\n\n1. **Asiko Gbingbin**: Ọjọ 15 Oṣu Karun si 10 Oṣu Kẹfa, lẹhin ti ojo ti rọ daadaa fun ọjọ mẹta.\n2. **Ijinlẹ**: Fi irugbin meji si iho kan ni ijinlẹ 3cm. Aaye laarin ila jẹ 75cm, laarin igi jẹ 25cm.\n3. **Ajile Akọkọ**: Fi NPK 15-15-15 (bọọgi 4 fun hekta kan) ni ọjọ 10-14 lẹhin ti o ba ti hu.\n4. **Ajile Urea**: Fi baagi Urea 2 kun lẹhin ọsẹ 4-5 ki agbado to bẹrẹ si i yo irun.',
    answerIg: 'Maka ndị ọrụ ugbo nọ na Ugwu na Etiti Naịjirịa:\n\n1. **Oge Ịkụ**: Mee 15 ruo Juun 10, mgbe mmiri zoro nke ọma ma ọ dịkarịa ala ụbọchị atọ.\n2. **Omimi**: Kụọ mkpụrụ abụọ n\'otu olulu na omimi 3cm; anya 75cm n\'etiti ahịrị, 25cm n\'etiti ihe ndị ahụ.\n3. **Fatịlaịza Mbụ**: Tinye NPK 15-15-15 (akpa 4 n\'otu hekta) ụbọchị 10-14 mgbe o puchara.\n4. **Fatịlaịza Urea**: Tinye akpa abụọ nke Urea n\'izu 4-5 mgbe ị kụsịrị.',
    answerPcm: 'For Northern and Middle Belt farmers:\n\n1. **Planting Time**: Between May 15 to June 10, once rainfall don steady well well for like 3 days.\n2. **Spacing**: Put 2 seeds inside one hole 3cm deep. Ridge spacing 75cm, stand spacing 25cm.\n3. **First Fertilizer (NPK)**: Put NPK 15-15-15 (4 bags for 1 hectare) 10 to 14 days after corn germinate.\n4. **Top Dress Urea**: Put 2 bags of Urea 4 to 5 weeks after planting before tassel begin come out.',
    quickReplies: ['What is the price of NPK fertilizer today?', 'How to control Fall Armyworm in maize?', 'Best hybrid maize seed variety in Nigeria']
  },
  {
    id: 'faq-yam-storage',
    questionEn: 'How can I store yam tubers to prevent rot and sprouting during dry season?',
    questionHa: 'Ta yaya zan ajiye doya don hana ta rubewa da tohowa a lokacin rani?',
    questionYo: 'Bawo ni mo ṣe le tọju isu lati dènà jíjẹrà ati yiyo ewe ni igba ọgbẹlẹ?',
    questionIg: 'Kedu ka m ga-esi chekwaa ji ka ọ ghara ire ure na ịgba akwụkwọ n\'oge ọkọchị?',
    questionPcm: 'How I fit store yam tubers make e no rot or begin germinate for harmattan?',
    topic: 'crops',
    answerEn: 'To store harvested yam tubers safely for 4–6 months in Nigeria:\n\n1. **Curing Phase**: Cure tubers in the shade for 3–5 days immediately after digging up so skin scratches heal over.\n2. **Traditional Yam Barn (Gidan Doya / Rumbu)**: Tie tubers vertically with raffia ropes on wooden racks under shade trees. Ensure minimum 30cm clearance off the ground to prevent rodent reach and fungal dampness.\n3. **Sprout Prevention**: Gently snap off any small sprout tips as soon as they emerge with clean fingers; this stops the tuber from depleting moisture and shrinking.\n4. **Wood Ash Treatment**: Rub clean dry wood ash over any cuts or bruises on the tuber crowns to disinfect wounds.\n5. **Ventilation**: Keep the storage area breezy; never store yams in closed unventilated polythene bags!',
    answerHa: 'Don ajiye doya ba tare da ta ruba ba na tsawon watanni 4 zuwa 6:\n\n1. **Shanya a Inuwa**: Bayan an tono doya, a bar ta a inuwa na kwanaki 3-5 don raunin fatar ya warke.\n2. **Rumbun Doya**: A daure doyar a tsaye da igiyar kaba a kan itatuwan rumbu a karkashin inuwa. A bar tazara santimita 30 daga kasa don hana bera da danshi.\n3. **Karye Tohuwa**: Da zarar doya ta fara tohowa, a karya tohuwar da hannu don hana doyar shanyewa da raguwa.\n4. **Toka**: A shafa tokar itace a kan duk inda aka samu yanka ko rauni a jikin doyar.\n5. **Samun Iska**: A tabbatar rumbun yana samun iska sosai; kada a taba ajiye doya a cikin ledar roba mai zafi!',
    answerYo: 'Lati tọju isu fun oṣu 4 si 6 laisi jijẹrà:\n\n1. **Ṣíṣe ni Ojiji**: Fi isu si abẹ ojiji fun ọjọ 3-5 lẹhin kíkà lati jẹ ki ọgbẹ ara rẹ gbẹ.\n2. **Aba Isu**: So isu rọ lori pẹpẹ igi pẹlu okun labẹ ojiji. Rii daju pe o ga lati ilẹ pẹlu 30cm lati dènà eku ati ọrinrin.\n3. **Didẹkun Yiyo Ewe**: Pa eyikeyi oju ewe to ba fẹ yo pẹlu ọwọ ki isu naa ma ba rù.\n4. **Eeru Igi**: Pa eeru igi ti o mọ si ibi ti isu ba ti ni ọgbẹ lati pa kokoro.\n5. **Afẹfẹ**: Jẹ ki afẹfẹ ma fẹ si i daradara; maṣe fi isu sinu apo rọba ti ko ni iho afẹfẹ!',
    answerIg: 'Iji chekwaa ji ọnwa 4 ruo 6 n\'enweghị ire ure:\n\n1. **Ịkpọ nkụ na Ndò**: Debe ji na ndò ụbọchị 3-5 mgbe e gwuputara ya ka ọnyá dị n\'ahụ ya laa.\n2. **Ọba Ji**: Kee ji n\'osisi n\'ọba n\'okpuru ndò. Hụ na ọ dị 30cm n\'elu ala iji gbochie oke na iru mmiri.\n3. **Ịgbaghachi Akwụkwọ**: Gbarie ome ọ bụla na-apụta n\'elu ji iji mee ka ji ghara ịkpọnwụ.\n4. **Ntụ Ọkụ**: Tee ntụ ọkụ dị ọcha n\'ebe ọ bụla ji nwere ọnyá iji gbochie nje fungus.\n5. **Ikuku**: Kwe ka ikuku na-eku n\'ọba ahụ; etinyela ji n\'ime akpa nylon mechiri emechi!',
    answerPcm: 'To store your yam make e last 4 to 6 months without spoiling:\n\n1. **Cure Under Shade**: Leave tubers under shade for 3 to 5 days after harvest make surface scratches dry.\n2. **Yam Barn (Racks)**: Tie yam stands on wooden rafters inside open airy barn under tree shade. Make am high at least 30cm from ground make rat no touch am.\n3. **Break Sprout**: Once yam start to sprout eye, snap am with hand make the yam no shrink or soft.\n4. **Wood Ash**: Rub clean wood ash on any cut or wound make fungus no enter.\n5. **Ventilation**: Make sure breeze dey enter well well. Never put yam inside tight plastic bag!',
    quickReplies: ['Where to buy organic yam fungicides in Benue?', 'How to cure yam anthracnose', 'Best time to plant yam in southern states']
  },
  {
    id: 'faq-fertilizer-pricing',
    questionEn: 'What are the current fertilizer types and recommended application rates in Nigeria?',
    questionHa: 'Wadanne nau\'ikan takin zamani ne ake amfani da su kuma yaya adadin zubawa yake?',
    questionYo: 'Iru ajile wo lo wa ati bawo ni a ṣe gbọdọ lo wọn?',
    questionIg: 'Kedu ụdị fatịlaịza dị na otu e kwesịrị isi tinye ha?',
    questionPcm: 'Which kind fertilizers dey Naija market and how much farmer suppose apply?',
    topic: 'fertilizer',
    answerEn: 'Common Fertilizer Options in Nigerian Agro-Markets:\n\n1. **NPK 15-15-15 / NPK 20-10-10**:\n   - *Purpose*: Balanced starter nutrition for root development and vegetative branching.\n   - *Rate*: 4–6 bags (200–300kg) per hectare.\n   - *Best Timing*: Basal application 10–14 days after planting.\n\n2. **Urea 46% Nitrogen**:\n   - *Purpose*: Rapid leaf growth and deep green coloration for cereals (maize, rice, sorghum).\n   - *Rate*: 2–3 bags (100–150kg) per hectare split into two applications.\n   - *Caution*: Always bury slightly in moist soil; never broadcast on hot dry surface to avoid ammonia volatilization loss.\n\n3. **Single Superphosphate (SSP) / Muriate of Potash (MOP)**:\n   - *Purpose*: Root strength and tuber bulking (essential for yam, cassava, and sweet potatoes).\n\n4. **Composted Cow & Poultry Manure**:\n   - *Purpose*: Organic soil conditioning, cost-saving, improves moisture retention in sandy soils.',
    answerHa: 'Nau\'ikan Takin da ake amfani da su a Najeriya:\n\n1. **NPK 15-15-15 ko NPK 20-10-10**:\n   - *Amfani*: Gina tushe da ganyen shuka a farko.\n   - *Adadi*: Buhu 4 zuwa 6 a kowace kadada.\n   - *Lokaci*: Kwanaki 10-14 bayan tsirowa.\n\n2. **Takin Urea (Fari)**:\n   - *Amfani*: Sa ganye yin kore da saurin girma musamman ga masara da shinkafa.\n   - *Adadi*: Buhu 2 zuwa 3 a kowace kadada, a zuba sau biyu.\n   - *Tsanaki*: A binne a cikin danshi; kada a watsa a fili yayin rana mai zafi don taki ba zai bace a iska ba.\n\n3. **Takin Kayan Lambu & Dabbobi**:\n   - *Amfani*: Takin kashin shanu da kaji yana da kyau sosai wajen sanya kasa ta rike danshi.',
    answerYo: 'Awọn Iru Ajile ti o wọpọ ni Naijiria:\n\n1. **NPK 15-15-15**:\n   - *Iṣẹ*: Fun idagbasoke gbongbo ati ewe.\n   - *Iye*: Baagi 4 si 6 fun hekta kan ni ọjọ 10-14 lẹhin gbingbin.\n2. **Urea 46%**:\n   - *Iṣẹ*: Fun awọ ewe to dudu ati idagbasoke agbado ati resi.\n   - *Ikilọ*: Bo mọlẹ sinu erupẹ ti o ni ọrinrin; maṣe da a silẹ lori ilẹ ti o gbẹ nitori ooru yoo gbe nitrogen lọ.\n3. **Ajile Idọti Eranko (Maalu ati Adiye)**:\n   - *Iṣẹ*: O dinku inawo o si mu ki ile ni ọrinrin daadaa.',
    answerIg: 'Ụdị Fatịlaịza Dị Na Naịjirịa:\n\n1. **NPK 15-15-15**:\n   - *Uru ya*: Maka mgbọrọgwụ siri ike na akwụkwọ ndụ akwụkwọ ndụ.\n   - *Ọnụọgụ*: Akpa 4 ruo 6 n\'otu hekta.\n2. **Urea 46%**:\n   - *Uru ya*: Na-eme ka ọka na osikapa too ngwa ngwa.\n   - *Ịdọ aka ná ntị*: Lie ya n\'ime ala mmiri; atụsala ya n\'anwụ.\n3. **Nsị Ehi na Ọkụkọ (Organic Manure)**:\n   - *Uru ya*: Na-eme ka ala mụta nri n\'efu ma na-ejide mmiri n\'ime ala.',
    answerPcm: 'Common Fertilizers for Naija market:\n\n1. **NPK 15-15-15**:\n   - *Work*: Starter food for roots and stem.\n   - *Rate*: 4 to 6 bags for 1 hectare at 10-14 days after germination.\n2. **Urea**:\n   - *Work*: Makes corn and rice leaves deep green and tall.\n   - *Warning*: Dig small soil cover am inside damp ground; no throw am on dry ground for sun because nitrogen go evaporate into breeze!\n3. **Organic Fowl/Cow Dung Manure**:\n   - *Work*: Best natural fertilizer to save money and keep soil rich.',
    quickReplies: ['How much is a bag of NPK in Kano and Ibadan?', 'How to make compost fertilizer at home', 'Can I mix Urea with herbicide?']
  }
];

export async function askMalamNoma(
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
    text: `**Malam Noma Agricultural Advisory:**\n\nRegarding your question: *"${userQuery}"*:\n\n1. **Diagnostic Assessment**: For sustainable crop productivity in Nigerian soils, test for drainage capacity and organic matter content before applying chemical interventions.\n2. **Recommended Action**: If addressing pest or weed pressure, apply spot treatments early morning (6:30–9:00 AM) to preserve beneficial pollinators and prevent rapid spray evaporation.\n3. **Input Sourcing**: Ensure inputs bear valid NAFDAC registration numbers or are sourced from licensed ADP / FMARD input dealers to avoid counterfeit products.\n4. **Consultation**: For severe localized field symptoms, consult the nearest ADP Extension Agent in our Consultants Directory.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    topic: 'crops',
    quickReplies: [
      'Find nearby ADP extension officer',
      'What fertilizer is best for this?',
      'How to prepare neem pesticide'
    ],
    disclaimer: 'Advisory generated from Nigerian Agronomic Knowledge Base (Mock Mode).'
  };
}

/* ═══════════════════════════════════════════════════
   Section item types & default data
   Client-safe — no Node.js imports
   ═══════════════════════════════════════════════════ */

export interface ServiceItem {
  id: string;
  icon: string;
  highlight: boolean;
  hidden?: boolean;
  sv: { title: string; desc: string; tag?: string; price?: string };
  en: { title: string; desc: string; tag?: string; price?: string };
}

export interface AlignerItem {
  id: string;
  icon: string;
  hidden?: boolean;
  sv: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface AdvantageItem {
  id: string;
  hidden?: boolean;
  sv: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface ProcessItem {
  id: string;
  hidden?: boolean;
  sv: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface DMItem {
  id: string;
  icon: string;
  hidden?: boolean;
  sv: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface FAQItem {
  id: string;
  hidden?: boolean;
  sv: { question: string; answer: string };
  en: { question: string; answer: string };
}

export interface MythItem {
  id: string;
  hidden?: boolean;
  sv: { myth: string; truth: string };
  en: { myth: string; truth: string };
}

export interface NewsItem {
  id: string;
  color: string;
  image?: string;
  hidden?: boolean;
  sv: { tag: string; date: string; title: string; desc: string; body?: string };
  en: { tag: string; date: string; title: string; desc: string; body?: string };
}

export interface BeforeAfterItem {
  id: string;
  hidden?: boolean;
  before: string;
  after: string;
}

export interface SectionsData {
  services: ServiceItem[];
  aligners: AlignerItem[];
  advantages: AdvantageItem[];
  process: ProcessItem[];
  dm: DMItem[];
  faq: FAQItem[];
  myths: MythItem[];
  news: NewsItem[];
  beforeAfter: BeforeAfterItem[];
}

/**
 * Deep-merge saved sections with defaults so that new fields added to
 * DEFAULT_SECTIONS (e.g. body on news items) are backfilled into saved items.
 */
export function mergeSections(saved: Partial<SectionsData>): SectionsData {
  const merged = { ...DEFAULT_SECTIONS, ...saved } as SectionsData;

  // For each array key, merge items by id so new default fields carry over
  for (const key of Object.keys(DEFAULT_SECTIONS) as (keyof SectionsData)[]) {
    const defaults = DEFAULT_SECTIONS[key];
    const items = saved[key];
    if (!Array.isArray(defaults) || !Array.isArray(items)) continue;

    type Item = Record<string, unknown>;
    const defs = defaults as unknown as Item[];
    const saved_items = items as unknown as Item[];
    const defaultMap = new Map(defs.map((d) => [d.id as string, d]));
    (merged[key] as unknown as Item[]) = saved_items.map((item) => {
      const def = defaultMap.get(item.id as string);
      if (!def) return item;
      const result = { ...def, ...item };
      for (const loc of ["sv", "en"] as const) {
        const defLoc = def[loc];
        const itemLoc = item[loc];
        if (
          defLoc &&
          typeof defLoc === "object" &&
          itemLoc &&
          typeof itemLoc === "object"
        ) {
          result[loc] = {
            ...(defLoc as Record<string, unknown>),
            ...(itemLoc as Record<string, unknown>),
          };
        }
      }
      return result;
    });
  }

  return merged;
}

export const NEWS_COLORS = [
  { value: "bg-teal-800 text-white", label: "Teal" },
  { value: "bg-amber-800 text-white", label: "Guld" },
  { value: "bg-indigo-900 text-white", label: "Djupblå" },
];

export const DEFAULT_SECTIONS: SectionsData = {
  services: [
    {
      id: "case",
      icon: "check-circle",
      highlight: true,
      sv: {
        title: "Kostnadsfri Case Assessment",
        desc: "Skicka in bilder och få en kostnadsfri bedömning med rekommendation om hur fallet bäst hanteras: Clinical Advisor via ClearCorrect, förslag om TPS eller remiss till klinik.",
        tag: "KOSTNADSFRITT",
      },
      en: {
        title: "Free Case Assessment",
        desc: "Submit photos and receive a free assessment with a recommendation on how to best manage the case: Clinical Advisor via ClearCorrect, TPS proposal, or referral to a clinic.",
        tag: "FREE",
      },
    },
    {
      id: "tps",
      icon: "clipboard-list",
      highlight: false,
      sv: {
        title: "Treatment Planning Service (TPS)",
        desc: "Fullständig ortodontisk behandlingsplanering för alignerfall. Jag tar fram en detaljerad plan baserad på patientens diagnostik som du kan följa under hela behandlingen.",
        price: "2 500 kr per fall",
      },
      en: {
        title: "Treatment Planning Service (TPS)",
        desc: "Complete orthodontic treatment planning for aligner cases. I create a detailed plan based on the patient's diagnostics that you can follow throughout the treatment.",
        price: "SEK 2,500 per case",
      },
    },
    {
      id: "tps-agreement",
      icon: "building",
      highlight: false,
      sv: {
        title: "TPS-avtal med mängdrabatt",
        desc: "För kliniker med löpande behov av behandlingsplanering erbjuder jag avtalsförslag med förmånliga volymer. Kontakta mig för mer information.",
      },
      en: {
        title: "TPS agreement with volume discount",
        desc: "For clinics with ongoing treatment planning needs, I offer agreements with favorable volume pricing. Contact me for more information.",
      },
    },
    {
      id: "clinical",
      icon: "lightbulb",
      highlight: false,
      sv: {
        title: "Clinical Advisor",
        desc: "Via Straumann erbjuder jag klinisk rådgivning kring ClearCorrect-fall. Som Clinical Advisor kan jag stödja dig genom hela behandlingsprocessen.",
        tag: "STRAUMANN",
      },
      en: {
        title: "Clinical Advisor",
        desc: "Through Straumann, I offer clinical advisory for ClearCorrect cases. As a Clinical Advisor, I can support you throughout the treatment process.",
        tag: "STRAUMANN",
      },
    },
    {
      id: "study-club",
      icon: "users",
      highlight: false,
      sv: {
        title: "Study Club",
        desc: "Delta i Straumanns Study Club — en mötesplats för tandläkare som vill fördjupa sina kunskaper inom alignerbehandling genom falldiskussioner och erfarenhetsutbyte.",
        tag: "STRAUMANN",
      },
      en: {
        title: "Study Club",
        desc: "Join Straumann's Study Club — a meeting place for dentists who want to deepen their knowledge of aligner treatment through case discussions and experience sharing.",
        tag: "STRAUMANN",
      },
    },
    {
      id: "case-cafe",
      icon: "chat",
      highlight: false,
      sv: {
        title: "Case Café",
        desc: "Informella fallgenomgångar i samarbete med Straumann. Ett tillfälle att diskutera pågående eller planerade fall med kollegor och få input från en specialist.",
        tag: "STRAUMANN",
      },
      en: {
        title: "Case Café",
        desc: "Informal case reviews in collaboration with Straumann. An opportunity to discuss ongoing or planned cases with colleagues and get input from a specialist.",
        tag: "STRAUMANN",
      },
    },
    {
      id: "referral",
      icon: "link",
      highlight: false,
      sv: {
        title: "Remiss till fysisk klinik",
        desc: "För fall som kräver specialistbehandling på plats kan remiss skickas via journalsystemen Muntra och Frenda till en av mina mottagningskliniker.",
        tag: "REMISS",
      },
      en: {
        title: "Referral to physical clinic",
        desc: "For cases requiring in-person specialist treatment, referrals can be sent via the Muntra and Frenda journal systems to one of my reception clinics.",
        tag: "REFERRAL",
      },
    },
    {
      id: "growth",
      icon: "trending-up",
      highlight: true,
      sv: {
        title: "Aligner Growth Program",
        desc: "För tandläkare som vill växa sin verksamhet inom aligners. Innehåller flödesoptimering och handfasta förslag för att förbättra processen från konsultation till leverans av skenor. Kan kombineras med TPS-abonnemang till ett kraftigt rabatterat pris.",
        tag: "NYHET",
        price: "15 000 kr",
      },
      en: {
        title: "Aligner Growth Program",
        desc: "For dentists looking to grow their aligner practice. Includes workflow optimization and hands-on recommendations for improving the process from consultation to tray delivery. Can be combined with a TPS subscription at a significantly reduced price.",
        tag: "NEW",
        price: "15 000 SEK",
      },
    },
  ],
  aligners: [
    {
      id: "invisible",
      icon: "eye",
      sv: {
        title: "Nästan osynliga",
        desc: "Genomskinliga skenor som knappt syns. Du kan le med självförtroende under hela behandlingen — de flesta runt dig märker inte ens att du har dem.",
      },
      en: {
        title: "Nearly invisible",
        desc: "Clear trays that are barely noticeable. Smile with confidence throughout your treatment — most people around you won't even notice you're wearing them.",
      },
    },
    {
      id: "removable",
      icon: "refresh",
      sv: {
        title: "Avtagbara och flexibla",
        desc: "Till skillnad från fast tandställning kan du enkelt ta ut skenorna vid måltider, tandborstning och speciella tillfällen. Det gör det lättare att upprätthålla god munhygien.",
      },
      en: {
        title: "Removable and flexible",
        desc: "Unlike fixed braces, you can easily remove the aligners for meals, brushing, and special occasions. This makes it easier to maintain good oral hygiene.",
      },
    },
    {
      id: "comfortable",
      icon: "heart",
      sv: {
        title: "Bekväma att bära",
        desc: "Inga metalldelar som skaver mot kinder och läppar. Skenorna är mjuka, släta och designade för maximal komfort i vardagen.",
      },
      en: {
        title: "Comfortable to wear",
        desc: "No metal parts rubbing against your cheeks and lips. The trays are smooth, soft, and designed for maximum everyday comfort.",
      },
    },
    {
      id: "precision",
      icon: "shield-check",
      sv: {
        title: "Digital precision",
        desc: "Med 3D-skanning och digital behandlingsplanering kan hela förloppet simuleras i förväg. Du ser ditt förväntade slutresultat redan innan behandlingen börjar.",
      },
      en: {
        title: "Digital precision",
        desc: "With 3D scanning and digital treatment planning, the entire process can be simulated in advance. You can see your expected outcome before treatment even begins.",
      },
    },
    {
      id: "all-ages",
      icon: "smiley",
      sv: {
        title: "Alla åldrar",
        desc: "Aligners fungerar utmärkt för både tonåringar och vuxna. Det finns speciella system anpassade för unga patienter med tänder som fortfarande växer.",
      },
      en: {
        title: "All ages",
        desc: "Aligners work excellently for both teenagers and adults. Special systems exist for young patients with teeth that are still developing.",
      },
    },
    {
      id: "most-issues",
      icon: "clipboard-check",
      sv: {
        title: "Behandlar de flesta bettfel",
        desc: "Trångställning, glesa tänder, över- och underbett, samt korsbett — moderna aligners kan behandla de flesta ortodontiska problem effektivt.",
      },
      en: {
        title: "Treats most bite issues",
        desc: "Crowding, spacing, overbite, underbite, and crossbite — modern aligners can effectively treat most orthodontic problems.",
      },
    },
  ],
  advantages: [
    {
      id: "analysis",
      sv: {
        title: "Omsorgsful analys av ditt fall",
        desc: "Varje uppdrag inleds med en grundlig analys av det tillhandahållna underlaget – detta säkerställer en välgrundad och effektiv fortsatt planering.",
      },
      en: {
        title: "Thoughtful case analysis",
        desc: "Every case begins with a thorough analysis of the provided material, ensuring a well-founded and efficient treatment plan moving forward.",
      },
    },
    {
      id: "therapy-plan",
      sv: {
        title: "Förslag till terapiplan till din journal",
        desc: "I syfte att förenkla din dokumentation erbjuder jag ett genomarbetat förslag till terapiplan, innefattande diagnos, prognosbedömning samt – vid behov – en motivering för tillämpning av Försäkringskassans högkostnadsskydd.",
      },
      en: {
        title: "Treatment plan proposal",
        desc: "To simplify your documentation, I provide a well-developed treatment plan proposal, including diagnosis, prognosis assessment, and—when applicable—a justification for the application of the Swedish Social Insurance Agency's high-cost protection.",
      },
    },
    {
      id: "staging",
      sv: {
        title: "Förslag till disposition av dina skenor",
        desc: "Varje fall planeras med samma omsorg som om det vore mitt eget. Jag tar därför fram en genomtänkt strategi för hur skenorna bör disponeras, med målet att säkerställa en så smidig och effektiv behandling som möjligt.",
      },
      en: {
        title: "Proposed aligner staging strategy",
        desc: "Each case is planned with the same level of care as if it were my own. I therefore develop a structured strategy for how the aligners should be staged, with the goal of ensuring a smooth and efficient treatment process.",
      },
    },
    {
      id: "predictable",
      sv: {
        title: "Förutsägbara resultat",
        desc: "Genom avancerad digital planering kan behandlingens utveckling förutses och följas med hög precision. Jag lägger den tid och expertis som krävs för att du tryggt ska nå i mål med varje fall.",
      },
      en: {
        title: "Predictable results",
        desc: "Through advanced digital planning, treatment progress can be predicted and monitored with high precision. I invest the necessary time and expertise to ensure that you successfully complete your cases.",
      },
    },
  ],
  process: [
    {
      id: "consultation",
      sv: {
        title: "Konsultation",
        desc: "En grundlig undersökning och digital scanning av dina tänder för att skapa en personlig behandlingsplan.",
      },
      en: {
        title: "Consultation",
        desc: "A thorough examination and digital scanning of your teeth to create a personalized treatment plan.",
      },
    },
    {
      id: "plan",
      sv: {
        title: "Behandlingsplan",
        desc: "Med 3D-teknologi skapas en detaljerad plan som visar varje steg i din behandling — från start till slutresultat.",
      },
      en: {
        title: "Treatment plan",
        desc: "Using 3D technology, a detailed plan is created showing every step of your treatment — from start to finish.",
      },
    },
    {
      id: "aligners",
      sv: {
        title: "Skräddarsydda skenor",
        desc: "Du får en serie individuellt anpassade, genomskinliga skenor som gradvis flyttar dina tänder till rätt position.",
      },
      en: {
        title: "Custom aligners",
        desc: "You receive a series of individually tailored, clear aligners that gradually move your teeth into the right position.",
      },
    },
    {
      id: "result",
      sv: {
        title: "Ditt nya leende",
        desc: "Regelbundna kontroller säkerställer att behandlingen följer planen. Resultatet — ett vackert, rakt leende.",
      },
      en: {
        title: "Your new smile",
        desc: "Regular check-ups ensure the treatment follows the plan. The result — a beautiful, straight smile.",
      },
    },
  ],
  dm: [
    {
      id: "scan",
      icon: "phone",
      sv: {
        title: "Skanna hemifrån",
        desc: "Ta regelbundna skanningar av dina tänder med kameran på din telefon. AI:n analyserar behandlingens framsteg automatiskt.",
      },
      en: {
        title: "Scan from home",
        desc: "Take regular scans of your teeth with your phone camera. The AI analyzes treatment progress automatically.",
      },
    },
    {
      id: "detection",
      icon: "alert-triangle",
      sv: {
        title: "Tidig avvikelse",
        desc: "Systemet upptäcker små avvikelser innan de blir problem — och din ortodontist kan justera planen direkt.",
      },
      en: {
        title: "Early detection",
        desc: "The system detects small deviations before they become problems — and your orthodontist can adjust the plan immediately.",
      },
    },
    {
      id: "fewer",
      icon: "clock",
      sv: {
        title: "Färre besök",
        desc: "Minska antalet fysiska besök på kliniken utan att kompromissa med kvaliteten på din behandling.",
      },
      en: {
        title: "Fewer visits",
        desc: "Reduce the number of physical clinic visits without compromising the quality of your treatment.",
      },
    },
    {
      id: "transparency",
      icon: "eye",
      sv: {
        title: "Full insyn",
        desc: "Följ din egen behandlingsresa i appen och se hur dina tänder sakta men säkert når målet.",
      },
      en: {
        title: "Full transparency",
        desc: "Follow your own treatment journey in the app and watch your teeth slowly but surely reach the goal.",
      },
    },
  ],
  faq: [
    {
      id: "duration",
      sv: {
        question: "Hur länge pågår en behandling med aligners?",
        answer:
          "Behandlingstiden varierar beroende på hur mycket tänderna behöver flyttas. En typisk behandling tar mellan 6 och 18 månader. Under konsultationen får du en uppskattning baserad på din individuella situation.",
      },
      en: {
        question: "How long does aligner treatment take?",
        answer:
          "Treatment time varies depending on how much the teeth need to move. A typical treatment takes between 6 and 18 months. During the consultation, you'll receive an estimate based on your individual situation.",
      },
    },
    {
      id: "pain",
      sv: {
        question: "Gör det ont att använda genomskinliga skenor?",
        answer:
          "De flesta upplever ett lätt tryck eller obehag de första dagarna med en ny skena, vilket är helt normalt — det betyder att skenan arbetar. Obehaget är vanligtvis milt och övergående.",
      },
      en: {
        question: "Does it hurt to wear clear aligners?",
        answer:
          "Most people experience light pressure or discomfort during the first days with a new aligner, which is completely normal — it means the aligner is working. The discomfort is usually mild and temporary.",
      },
    },
    {
      id: "wear-time",
      sv: {
        question: "Hur ofta måste jag bära skenorna?",
        answer:
          "För bästa resultat bör skenorna bäras 20–22 timmar per dag. Du tar ut dem när du äter, dricker (annat än vatten) och borstar tänderna.",
      },
      en: {
        question: "How often do I need to wear the aligners?",
        answer:
          "For best results, aligners should be worn 20–22 hours per day. You remove them when eating, drinking (anything other than water), and brushing your teeth.",
      },
    },
    {
      id: "eligibility",
      sv: {
        question: "Kan alla behandlas med aligners?",
        answer:
          "De flesta ortodontiska problem kan behandlas med aligners, men inte alla fall är lämpliga. Mer komplexa bettfel kan kräva andra metoder. En konsultation ger dig svar på om aligners passar just dig.",
      },
      en: {
        question: "Can everyone be treated with aligners?",
        answer:
          "Most orthodontic problems can be treated with aligners, but not all cases are suitable. More complex bite issues may require other methods. A consultation will tell you if aligners are right for you.",
      },
    },
    {
      id: "systems",
      sv: {
        question: "Finns det olika alignersystem?",
        answer:
          "Ja, det finns flera etablerade system på marknaden med olika styrkor. André har lång erfarenhet av de ledande systemen och hjälper dig välja den lösning som bäst passar dina behov och din situation.",
      },
      en: {
        question: "Are there different aligner systems?",
        answer:
          "Yes, there are several established systems on the market with different strengths. André has extensive experience with the leading systems and will help you choose the solution that best suits your needs and situation.",
      },
    },
    {
      id: "cost",
      sv: {
        question: "Vad kostar en behandling?",
        answer:
          "Kostnaden varierar beroende på behandlingens omfattning. Under en konsultation får du en tydlig kostnadsuppskattning. Många kliniker erbjuder delbetalning. I vissa regioner i Sverige kan behandlingen helt eller delvis omfattas av lokala hälso- och sjukvårdsbestämmelser — kontrollera med Försäkringskassan vad som gäller i ditt fall.",
      },
      en: {
        question: "How much does treatment cost?",
        answer:
          "Cost varies depending on the scope of treatment. During a consultation, you'll receive a clear cost estimate. Many clinics offer payment plans. In some regions of Sweden, treatment may be partially covered by local healthcare regulations — check with Försäkringskassan for your situation.",
      },
    },
  ],
  myths: [
    {
      id: "cosmetic-only",
      sv: {
        myth: "Aligners är bara för små kosmetiska justeringar.",
        truth:
          "Moderna aligners kan behandla ett brett spektrum av ortodontiska problem, inklusive överbett, underbett, korsbett och svår trångställning. Tekniken har utvecklats enormt de senaste åren.",
      },
      en: {
        myth: "Aligners are only for minor cosmetic fixes.",
        truth:
          "Modern aligners can treat a wide range of orthodontic issues, including overbites, underbites, crossbites, and severe crowding. The technology has advanced enormously in recent years.",
      },
    },
    {
      id: "all-same",
      sv: {
        myth: "Alla alignersbehandlingar är lika.",
        truth:
          "Att välja en specialist för alignerbehandling innebär högre precision, bättre kontroll och tryggare resultat.\nDet handlar inte bara om att räta tänder – utan om att skapa ett funktionellt, hållbart och estetiskt optimalt bett.",
      },
      en: {
        myth: "All aligner treatments are the same.",
        truth:
          "Choosing a specialist for aligner treatment means higher precision, better control, and more predictable results.\nIt's not just about straightening teeth — it's about creating a functional, lasting, and aesthetically optimal bite.",
      },
    },
    {
      id: "part-time",
      sv: {
        myth: "Man behöver inte bära skenorna hela tiden.",
        truth:
          "För att behandlingen ska lyckas måste skenorna bäras 20–22 timmar per dag. De ska bara tas ut vid måltider, dryck (annat än vatten) och tandborstning.",
      },
      en: {
        myth: "You don't have to wear them all the time.",
        truth:
          "For treatment to succeed, aligners must be worn 20–22 hours per day. They should only be removed for meals, drinks (other than water), and brushing.",
      },
    },
    {
      id: "painless",
      sv: {
        myth: "Aligners är helt smärtfria.",
        truth:
          "Även om de är betydligt bekvämare än metallställningar, utövar aligners tryck för att flytta tänderna. Det kan ge ett tillfälligt, milt obehag — särskilt vid byte till en ny uppsättning skenor.",
      },
      en: {
        myth: "Aligners are completely pain-free.",
        truth:
          "While significantly more comfortable than metal braces, aligners apply pressure to move teeth. This can cause temporary, mild discomfort — especially when switching to a new set of trays.",
      },
    },
    {
      id: "adults-only",
      sv: {
        myth: "Aligners är bara för vuxna.",
        truth:
          "Aligners fungerar utmärkt även för tonåringar. Det finns speciella system anpassade för unga patienter med tänder som fortfarande växer, inklusive funktioner för att följa att skenorna bärs tillräckligt.",
      },
      en: {
        myth: "Aligners are only for adults.",
        truth:
          "Aligners work excellently for teenagers too. Special systems are designed for young patients with developing teeth, including compliance monitoring features.",
      },
    },
    {
      id: "eat-anything",
      sv: {
        myth: "Man kan äta och dricka vad som helst med skenorna på.",
        truth:
          "Skenorna måste alltid tas ut innan du äter eller dricker annat än vatten. Annars riskerar du att skada skenorna, samla bakterier och öka risken för karies.",
      },
      en: {
        myth: "You can eat and drink whatever you want with them on.",
        truth:
          "Aligners must always be removed before eating or drinking anything other than water. Otherwise you risk damaging the trays, trapping bacteria, and increasing the risk of cavities.",
      },
    },
    {
      id: "diy",
      sv: {
        myth: "Beställ-hem-aligners utan tandläkare är lika bra.",
        truth:
          "Professionellt övervakad behandling av en specialist säkerställer säker och kontrollerad tandförflyttning. Hemmabehandlingar utan personlig uppföljning saknar den nödvändiga kliniska kontrollen och kan leda till komplikationer.",
      },
      en: {
        myth: "Mail-order DIY aligners are just as effective.",
        truth:
          "Professionally supervised treatment by a specialist ensures safe and controlled tooth movement. At-home treatments without in-person oversight lack the necessary clinical control and can lead to complications.",
      },
    },
    {
      id: "expensive",
      sv: {
        myth: "Aligners är mycket dyrare än tandställning.",
        truth:
          "Kostnaden för alignerbehandling är i regel jämförbar med traditionell tandställning. Många kliniker erbjuder dessutom delbetalning som gör behandlingen mer tillgänglig.",
      },
      en: {
        myth: "Aligners are far more expensive than braces.",
        truth:
          "The cost of aligner treatment is generally comparable to traditional braces. Many clinics also offer payment plans that make treatment more accessible.",
      },
    },
  ],
  news: [
    {
      id: "guide",
      color: "bg-orange-700 text-[#fff]",
      image: "/images/news/clear-aligners-benfits.jpg",
      sv: {
        tag: "GUIDE",
        date: "15 mars 2026",
        title:
          "Aligners vs traditionell tandställning: Vilken behandling passar dig?",
        desc: "En jämförelse av genomskinliga skenor och traditionell tandreglering — material, process, kostnad och resultat.",
        body: "Aligners och traditionell tandställning är de två vanligaste metoderna för tandreglering idag. Genomskinliga skenor (aligners) är nästan osynliga, avtagbara och kräver färre besök hos tandläkaren. Traditionella metallställningar ger ortodontisten mer direkt kontroll och kan hantera komplexa fall.\n\nKostnaden för de två behandlingarna är i allmänhet jämförbar. Alignerbehandling tar vanligtvis 6–18 månader beroende på fallets komplexitet, medan traditionell tandställning ofta sitter i 18–24 månader.\n\nBåda metoderna ger utmärkta resultat — valet beror på livsstil, fallets komplexitet och personliga preferenser. Boka en kostnadsfri bedömning för att ta reda på vilken metod som passar dig bäst.",
      },
      en: {
        tag: "GUIDE",
        date: "March 15, 2026",
        title: "Aligners vs traditional braces: Which treatment suits you?",
        desc: "A comparison of clear aligners and traditional braces — materials, process, cost, and results.",
        body: "Aligners and traditional braces are the two most common orthodontic methods today. Clear aligners are nearly invisible, removable, and require fewer dental visits. Traditional metal braces give the orthodontist more direct control and can handle complex cases.\n\nThe cost of both treatments is generally comparable. Aligner treatment typically takes 6–18 months depending on complexity, while traditional braces are often worn for 18–24 months.\n\nBoth methods deliver excellent results — the choice depends on lifestyle, case complexity, and personal preference. Book a free assessment to find out which method suits you best.",
      },
    },
    {
      id: "tips",
      color: "bg-teal-900 text-[#fff]",
      sv: {
        tag: "TIPS",
        date: "1 mars 2026",
        title: "5 tips för att få ut mest av din skenbehandling",
        desc: "Praktiska råd som hjälper dig hålla behandlingen på rätt spår — från rengöring till bärtid och kontroller.",
        body: "1. Bär dina skenor minst 22 timmar per dag — ta bara ut dem vid måltider och tandborstning.\n\n2. Rengör skenorna dagligen med ljummet vatten och en mjuk tandborste. Undvik varmt vatten som kan deformera plasten.\n\n3. Byt till nästa skena enligt schemat — hoppa inte över steg även om det känns bra.\n\n4. Använd Dental Monitoring-appen för att skicka in regelbundna bilder så att din ortodontist kan följa framstegen på distans.\n\n5. Kom ihåg att använda retainer efter avslutad behandling för att behålla resultatet.",
      },
      en: {
        tag: "TIPS",
        date: "March 1, 2026",
        title: "5 tips to get the most out of your aligner treatment",
        desc: "Practical advice to keep your treatment on track — from cleaning to wear time and check-ups.",
        body: "1. Wear your aligners at least 22 hours per day — only remove them for meals and brushing.\n\n2. Clean your aligners daily with lukewarm water and a soft toothbrush. Avoid hot water which can warp the plastic.\n\n3. Switch to the next aligner on schedule — don't skip steps even if things feel fine.\n\n4. Use the Dental Monitoring app to send regular photos so your orthodontist can track progress remotely.\n\n5. Remember to wear your retainer after treatment is complete to maintain the results.",
      },
    },
    {
      id: "health",
      color: "bg-green-700 text-[#fff]",
      sv: {
        tag: "MUNHÄLSA",
        date: "14 februari 2026",
        title: "Varför raka tänder handlar om mer än estetik",
        desc: "Felställda tänder kan påverka tuggfunktion, munhygien och till och med huvudvärk. Läs om hälsofördelarna med ortodonti.",
        body: "Många tänker på tandreglering som en kosmetisk behandling, men fördelarna sträcker sig långt bortom ett vackert leende.\n\nFelställda tänder kan göra det svårare att borsta och använda tandtråd ordentligt, vilket ökar risken för karies och tandköttsproblem. Ett ojämnt bett kan dessutom belasta käkleden och leda till huvudvärk, nacksmärtor och till och med sömnproblem.\n\nGenom att rätta till tandställningen förbättras tuggfunktionen, munhygienen blir enklare att upprätthålla och belastningen på käkleden minskar. Det är en investering i din hälsa — inte bara ditt utseende.",
      },
      en: {
        tag: "ORAL HEALTH",
        date: "February 14, 2026",
        title: "Why straight teeth are about more than aesthetics",
        desc: "Misaligned teeth can affect chewing, oral hygiene, and even headaches. Read about the health benefits of orthodontics.",
        body: "Many think of orthodontics as a cosmetic treatment, but the benefits extend far beyond a beautiful smile.\n\nMisaligned teeth can make it harder to brush and floss properly, increasing the risk of cavities and gum disease. An uneven bite can also strain the jaw joint, leading to headaches, neck pain, and even sleep problems.\n\nBy correcting tooth alignment, chewing function improves, oral hygiene becomes easier to maintain, and strain on the jaw joint is reduced. It's an investment in your health — not just your appearance.",
      },
    },
  ],
  beforeAfter: [
    {
      id: "1",
      before: "/images/before-after/Före1.jpg",
      after: "/images/before-after/Efter1.jpg",
    },
    {
      id: "2",
      before: "/images/before-after/Före2.jpg",
      after: "/images/before-after/Efter2.jpg",
    },
    {
      id: "2a",
      before: "/images/before-after/Före2a.jpg",
      after: "/images/before-after/Efter2a.jpg",
    },
    {
      id: "4",
      before: "/images/before-after/Före4.jpg",
      after: "/images/before-after/Efter4.jpg",
    },
    {
      id: "4a",
      before: "/images/before-after/Före4a.jpg",
      after: "/images/before-after/Efter4a.jpg",
    },
    {
      id: "5",
      before: "/images/before-after/Före5.jpg",
      after: "/images/before-after/Efter5.jpg",
    },
    {
      id: "6",
      before: "/images/before-after/Före6.jpg",
      after: "/images/before-after/Efter6.jpg",
    },
    {
      id: "7",
      before: "/images/before-after/Före7.jpg",
      after: "/images/before-after/Efter7.jpg",
    },
    {
      id: "8",
      before: "/images/before-after/Före8.jpg",
      after: "/images/before-after/Efter8.jpg",
    },
    {
      id: "10",
      before: "/images/before-after/Före10.jpg",
      after: "/images/before-after/Efter10.jpg",
    },
    {
      id: "11",
      before: "/images/before-after/Före11.jpg",
      after: "/images/before-after/Efter11.jpg",
    },
    {
      id: "12",
      before: "/images/before-after/Före12.jpg",
      after: "/images/before-after/Efter12.jpg",
    },
  ],
};

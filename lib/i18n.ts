export type Locale = "sv" | "en";

export const translations = {
  sv: {
    // Header / brand
    brandName: "Wikholm Ortodonti",
    brandTagline: "Ortodonti & Invisalign",

    // Nav
    navAbout: "Om mig",
    navInvisalign: "Invisalign",
    navProcess: "Process",
    navLocations: "Kliniker",
    navNews: "Nyheter",
    navFaq: "FAQ",
    navContact: "Kontakt",
    openMenu: "Öppna meny",

    // Hero
    heroBadge: "Invisalign Platinum Elite Provider",
    heroTitle1: "Ditt leende,",
    heroTitle2: "vår passion",
    heroSubtitle:
      "Specialisttandläkare inom tandreglering sedan 2014. Med fokus på Invisalign och ClearCorrect hjälper jag dig uppnå det leende du alltid drömt om — diskret, bekvämt och med enastående resultat.",
    heroCta: "Hitta din klinik",
    heroSecondary: "Läs mer om mig",

    // About
    aboutLabel: "André Wikholm",
    aboutTitle1: "Specialisttandläkare med ett öga för",
    aboutTitle2: "naturliga resultat",
    aboutPhotoPlaceholder: "Foto kommer snart",
    aboutParagraph1:
      "Legitimerad tandläkare sedan 2003 och specialisttandläkare inom tandreglering sedan 2014. Dedikerad Invisalign-behandlare sedan 2017 och arbetar idag uteslutande med aligners.",
    aboutParagraph2:
      "Som mångårig Invisalign Platinum Elite Provider har jag startat ett stort antal fall och byggt upp en bred erfarenhet av alignerbehandling för både ungdomar och vuxna. Min filosofi är enkel: varje patient förtjänar en individuell behandlingsplan.",
    aboutParagraph3:
      "Jag är medlem i Svenska Ortodontiföreningen, Sveriges Tandläkarförbund, Swedish Aligner Society och European Aligner Society. Utanför kliniken hittar du mig med familjen eller ute i naturen.",
    statYears: "Års erfarenhet",
    statPatients: "Nöjda patienter",
    statProvider: "Invisalign Provider",

    // Invisalign
    invisalignLabel: "Specialitet",
    invisalignTitle1: "Varför välja",
    invisalignTitle2: "Invisalign?",
    invisalignIntro:
      "Invisalign är den ledande metoden för diskret tandreglering. Som certifierad Platinum Elite Provider erbjuder jag den högsta nivån av expertis och omsorg.",
    benefitInvisible: "Nästan osynlig",
    benefitInvisibleDesc:
      "Genomskinliga skenor som knappt syns. Du kan le med självförtroende under hela behandlingen.",
    benefitFaster: "Snabbare resultat",
    benefitFasterDesc:
      "Moderna tekniker och avancerad planering ger ofta kortare behandlingstider än traditionella metoder.",
    benefitComfort: "Maximal komfort",
    benefitComfortDesc:
      "Inga metallbyglar eller trådar. Skenorna kan tas ut vid måltider och tandborstning.",
    benefitDigital: "Digital precision",
    benefitDigitalDesc:
      "3D-skanning och digital behandlingsplanering säkerställer exakta, förutsägbara resultat.",
    benefitAllAges: "Alla åldrar",
    benefitAllAgesDesc:
      "Invisalign fungerar utmärkt för både tonåringar och vuxna, oavsett tidigare tandvårdshistorik.",
    benefitProven: "Beprövad metod",
    benefitProvenDesc:
      "Över 22 miljoner patienter världen över har behandlats framgångsrikt med Invisalign.",
    ctaReady: "Redo att ta nästa steg?",
    ctaBook: "Boka en kostnadsfri konsultation på din närmaste klinik.",
    ctaViewClinics: "Se kliniker",

    // Locations
    locationsLabel: "Kliniker",
    locationsTitle1: "Hitta din",
    locationsTitle2: "närmaste klinik",
    locationsIntro:
      "Jag tar emot patienter på kliniker i Stockholmsområdet, Enköping och Örnsköldsvik. Välj den som passar dig bäst.",
    loadingMap: "Laddar karta...",

    // Process
    processLabel: "PROCESSEN",
    processTitle1: "Hur fungerar",
    processTitle2: "behandlingen?",
    processStep1Title: "Konsultation",
    processStep1Desc:
      "En grundlig undersökning och digital scanning av dina tänder för att skapa en personlig behandlingsplan.",
    processStep2Title: "Behandlingsplan",
    processStep2Desc:
      "Med 3D-teknologi skapas en detaljerad plan som visar varje steg i din behandling — från start till slutresultat.",
    processStep3Title: "Skräddarsydda skenor",
    processStep3Desc:
      "Du får en serie individuellt anpassade, genomskinliga skenor som gradvis flyttar dina tänder till rätt position.",
    processStep4Title: "Ditt nya leende",
    processStep4Desc:
      "Regelbundna kontroller säkerställer att behandlingen följer planen. Resultatet — ett vackert, rakt leende.",

    // Advantages
    advantagesLabel: "FÖRDELAR",
    advantagesTitle1: "Varför välja",
    advantagesTitle2: "genomskinlig tandreglering?",
    advantagesIntro:
      "Aligners erbjuder en rad fördelar jämfört med traditionell tandreglering, speciellt för vuxna och ungdomar som vill ha en diskret behandling.",
    advRemovable: "Avtagbara skenor",
    advRemovableDesc:
      "Ta enkelt ut skenorna när du äter, dricker eller borstar tänderna — för bättre munhygien under hela behandlingen.",
    advComfortable: "Bekvämt att bära",
    advComfortableDesc:
      "Inga metalldelar som skaver. Skenorna är mjuka, släta och designade för maximal komfort.",
    advFewerVisits: "Färre besök",
    advFewerVisitsDesc:
      "Genomskinlig tandreglering kräver generellt färre klinikbesök än traditionell tandställning, vilket sparar tid i din vardag.",
    advPredictable: "Förutsägbara resultat",
    advPredictableDesc:
      "Avancerad digital planering gör det möjligt att förutse och följa behandlingens framsteg med hög precision.",

    // News & Tips
    newsLabel: "NYHETER & TIPS",
    newsTitle1: "Aktuellt inom",
    newsTitle2: "ortodonti",
    newsIntro:
      "Artiklar, tips och nyheter om tandreglering, munhälsa och det senaste inom aligners.",
    newsReadMore: "Läs mer →",
    news1Tag: "GUIDE",
    news1Date: "15 mars 2026",
    news1Title:
      "Aligners vs traditionell tandställning: Vilken behandling passar dig?",
    news1Desc:
      "En jämförelse av genomskinliga skenor och traditionell tandreglering — material, process, kostnad och resultat.",
    news2Tag: "TIPS",
    news2Date: "1 mars 2026",
    news2Title: "5 tips för att få ut mest av din skenbehandling",
    news2Desc:
      "Praktiska råd som hjälper dig hålla behandlingen på rätt spår — från rengöring till bärtid och kontroller.",
    news3Tag: "MUNHÄLSA",
    news3Date: "14 februari 2026",
    news3Title: "Varför raka tänder handlar om mer än estetik",
    news3Desc:
      "Felställda tänder kan påverka tuggfunktion, munhygien och till och med huvudvärk. Läs om hälsofördelarna med ortodonti.",

    // FAQ
    faqLabel: "VANLIGA FRÅGOR",
    faqTitle1: "Frågor",
    faqTitle2: "& svar",
    faqIntro:
      "Här hittar du svar på de vanligaste frågorna om alignerbehandling.",
    faq1Q: "Hur länge pågår en behandling med aligners?",
    faq1A:
      "Behandlingstiden varierar beroende på hur mycket tänderna behöver flyttas. En typisk behandling tar mellan 6 och 18 månader. Under konsultationen får du en uppskattning baserad på din individuella situation.",
    faq2Q: "Gör det ont att använda genomskinliga skenor?",
    faq2A:
      "De flesta upplever ett lätt tryck eller obehag de första dagarna med en ny skena, vilket är helt normalt — det betyder att skenan arbetar. Obehaget är vanligtvis milt och övergående.",
    faq3Q: "Hur ofta måste jag bära skenorna?",
    faq3A:
      "För bästa resultat bör skenorna bäras 20–22 timmar per dag. Du tar ut dem när du äter, dricker (annat än vatten) och borstar tänderna.",
    faq4Q: "Kan alla behandlas med aligners?",
    faq4A:
      "De flesta ortodontiska problem kan behandlas med aligners, men inte alla fall är lämpliga. Mer komplexa bettfel kan kräva andra metoder. En konsultation ger dig svar på om aligners passar just dig.",
    faq5Q: "Vad är skillnaden mellan Invisalign och ClearCorrect?",
    faq5A:
      "Båda systemen använder genomskinliga, avtagbara skenor för att räta tänderna. Invisalign har funnits längst och har behandlat över 22 miljoner patienter. ClearCorrect, som utvecklas av Straumann Group, erbjuder ett konkurrenskraftigt alternativ med sitt ClearQuartz-material. André hjälper dig välja det system som bäst passar dina behov.",
    faq6Q: "Vad kostar en behandling?",
    faq6A:
      "Kostnaden varierar beroende på behandlingens omfattning. Under en konsultation får du en tydlig kostnadsuppskattning. Många kliniker erbjuder delbetalning. I vissa regioner i Sverige kan behandlingen helt eller delvis omfattas av lokala hälso- och sjukvårdsbestämmelser — kontrollera med Försäkringskassan vad som gäller i ditt fall.",
    faqLink: "Läs mer på invisalign.se →",

    // ClearCorrect
    clearCorrectLabel: "ALTERNATIV BEHANDLING",
    clearCorrectTitle1: "Vi erbjuder även",
    clearCorrectTitle2: "ClearCorrect",
    clearCorrectIntro:
      "Utöver Invisalign erbjuder vi även ClearCorrect — ett annat ledande system för genomskinlig tandreglering, utvecklat av Straumann Group med över 60 års erfarenhet inom tandvård.",
    ccFlexible: "Flexibel behandling",
    ccFlexibleDesc:
      "ClearCorrect erbjuder flexibla behandlingsalternativ som kan anpassas efter dina specifika behov och budget, från enkla justeringar till mer omfattande korrigeringar.",
    ccMaterial: "ClearQuartz-material",
    ccMaterialDesc:
      "Tillverkade av ClearQuartz™ — ett branschledande trippelskiktat plastmaterial som ger utmärkt passform, komfort och hållbarhet genom hela behandlingsperioden.",
    ccQuality: "Straumann-kvalitet",
    ccQualityDesc:
      "ClearCorrect utvecklas av Straumann Group — en världsledare inom dental estetik och implantat, med beprövad forskning och innovation.",
    ccLink: "Läs mer om ClearCorrect →",

    // LinkedIn
    linkedinPersonal: "LinkedIn — André Wikholm",
    linkedinCompany: "LinkedIn — Wikholm Ortodonti AB",

    // Footer
    footerDesc:
      "Specialisttandläkare inom tandreglering med fokus på Invisalign och ClearCorrect. Mångårig Platinum Elite Provider.",
    footerQuickLinks: "Snabblänkar",
    footerContact: "Kontakt",
    footerCopyright: "Wikholm Ortodonti. Alla rättigheter förbehållna.",
  },

  en: {
    // Header / brand
    brandName: "Wikholm Orthodontics",
    brandTagline: "Orthodontics & Invisalign",

    // Nav
    navAbout: "About",
    navInvisalign: "Invisalign",
    navProcess: "Process",
    navLocations: "Clinics",
    navNews: "News",
    navFaq: "FAQ",
    navContact: "Contact",
    openMenu: "Open menu",

    // Hero
    heroBadge: "Invisalign Platinum Elite Provider",
    heroTitle1: "Your smile,",
    heroTitle2: "our passion",
    heroSubtitle:
      "Specialist orthodontist since 2014. Focused on Invisalign and ClearCorrect, I help you achieve the smile you've always dreamed of — discreet, comfortable, and with outstanding results.",
    heroCta: "Find your clinic",
    heroSecondary: "Read more about me",

    // About
    aboutLabel: "André Wikholm",
    aboutTitle1: "Specialist orthodontist with an eye for",
    aboutTitle2: "natural results",
    aboutPhotoPlaceholder: "Photo coming soon",
    aboutParagraph1:
      "Licensed dentist since 2003 and specialist orthodontist since 2014. A dedicated Invisalign provider since 2017, today working exclusively with aligners.",
    aboutParagraph2:
      "As a multi-year Invisalign Platinum Elite Provider, I have started a large number of cases and built extensive experience in aligner treatment for both teenagers and adults. My philosophy is simple: every patient deserves an individual treatment plan.",
    aboutParagraph3:
      "I'm a member of the Swedish Orthodontic Society, the Swedish Dental Association, the Swedish Aligner Society, and the European Aligner Society. Outside the clinic, you'll find me with my family or out in nature.",
    statYears: "Years of experience",
    statPatients: "Happy patients",
    statProvider: "Invisalign Provider",

    // Invisalign
    invisalignLabel: "Specialty",
    invisalignTitle1: "Why choose",
    invisalignTitle2: "Invisalign?",
    invisalignIntro:
      "Invisalign is the leading method for discreet teeth straightening. As a certified Platinum Elite Provider, I offer the highest level of expertise and care.",
    benefitInvisible: "Nearly invisible",
    benefitInvisibleDesc:
      "Clear aligners that are barely noticeable. Smile with confidence throughout your entire treatment.",
    benefitFaster: "Faster results",
    benefitFasterDesc:
      "Modern techniques and advanced planning often result in shorter treatment times than traditional methods.",
    benefitComfort: "Maximum comfort",
    benefitComfortDesc:
      "No metal brackets or wires. Aligners can be removed for meals and brushing.",
    benefitDigital: "Digital precision",
    benefitDigitalDesc:
      "3D scanning and digital treatment planning ensure exact, predictable results.",
    benefitAllAges: "All ages",
    benefitAllAgesDesc:
      "Invisalign works excellently for both teenagers and adults, regardless of previous dental history.",
    benefitProven: "Proven method",
    benefitProvenDesc:
      "Over 22 million patients worldwide have been successfully treated with Invisalign.",
    ctaReady: "Ready to take the next step?",
    ctaBook: "Book a free consultation at your nearest clinic.",
    ctaViewClinics: "View clinics",

    // Locations
    locationsLabel: "Clinics",
    locationsTitle1: "Find your",
    locationsTitle2: "nearest clinic",
    locationsIntro:
      "I see patients at clinics in the Stockholm area, Enköping, and Örnsköldsvik. Choose the one that suits you best.",
    loadingMap: "Loading map...",

    // Process
    processLabel: "THE PROCESS",
    processTitle1: "How does the",
    processTitle2: "treatment work?",
    processStep1Title: "Consultation",
    processStep1Desc:
      "A thorough examination and digital scanning of your teeth to create a personalized treatment plan.",
    processStep2Title: "Treatment plan",
    processStep2Desc:
      "Using 3D technology, a detailed plan is created showing every step of your treatment — from start to finish.",
    processStep3Title: "Custom aligners",
    processStep3Desc:
      "You receive a series of individually tailored, clear aligners that gradually move your teeth into the right position.",
    processStep4Title: "Your new smile",
    processStep4Desc:
      "Regular check-ups ensure the treatment follows the plan. The result — a beautiful, straight smile.",

    // Advantages
    advantagesLabel: "ADVANTAGES",
    advantagesTitle1: "Why choose",
    advantagesTitle2: "clear aligner treatment?",
    advantagesIntro:
      "Aligners offer a range of advantages over traditional braces, especially for adults and teenagers who want a discreet treatment.",
    advRemovable: "Removable aligners",
    advRemovableDesc:
      "Simply remove the aligners when eating, drinking, or brushing — for better oral hygiene throughout treatment.",
    advComfortable: "Comfortable to wear",
    advComfortableDesc:
      "No metal parts that irritate. The aligners are smooth, soft, and designed for maximum comfort.",
    advFewerVisits: "Fewer visits",
    advFewerVisitsDesc:
      "Clear aligner treatment generally requires fewer clinic visits than traditional braces, saving time in your everyday life.",
    advPredictable: "Predictable results",
    advPredictableDesc:
      "Advanced digital planning makes it possible to predict and track treatment progress with high precision.",

    // News & Tips
    newsLabel: "NEWS & TIPS",
    newsTitle1: "Latest in",
    newsTitle2: "orthodontics",
    newsIntro:
      "Articles, tips, and news about teeth straightening, oral health, and the latest in aligners.",
    newsReadMore: "Read more →",
    news1Tag: "GUIDE",
    news1Date: "March 15, 2026",
    news1Title: "Aligners vs traditional braces: Which treatment suits you?",
    news1Desc:
      "A comparison of clear aligners and traditional braces — materials, process, cost, and results.",
    news2Tag: "TIPS",
    news2Date: "March 1, 2026",
    news2Title: "5 tips to get the most out of your aligner treatment",
    news2Desc:
      "Practical advice to keep your treatment on track — from cleaning to wear time and check-ups.",
    news3Tag: "ORAL HEALTH",
    news3Date: "February 14, 2026",
    news3Title: "Why straight teeth are about more than aesthetics",
    news3Desc:
      "Misaligned teeth can affect chewing, oral hygiene, and even headaches. Read about the health benefits of orthodontics.",

    // FAQ
    faqLabel: "FAQ",
    faqTitle1: "Questions",
    faqTitle2: "& answers",
    faqIntro:
      "Here you'll find answers to the most common questions about aligner treatment.",
    faq1Q: "How long does aligner treatment take?",
    faq1A:
      "Treatment time varies depending on how much the teeth need to move. A typical treatment takes between 6 and 18 months. During the consultation, you'll receive an estimate based on your individual situation.",
    faq2Q: "Does it hurt to wear clear aligners?",
    faq2A:
      "Most people experience light pressure or discomfort during the first days with a new aligner, which is completely normal — it means the aligner is working. The discomfort is usually mild and temporary.",
    faq3Q: "How often do I need to wear the aligners?",
    faq3A:
      "For best results, aligners should be worn 20–22 hours per day. You remove them when eating, drinking (anything other than water), and brushing your teeth.",
    faq4Q: "Can everyone be treated with aligners?",
    faq4A:
      "Most orthodontic problems can be treated with aligners, but not all cases are suitable. More complex bite issues may require other methods. A consultation will tell you if aligners are right for you.",
    faq5Q: "What is the difference between Invisalign and ClearCorrect?",
    faq5A:
      "Both systems use clear, removable aligners to straighten teeth. Invisalign has been around the longest and has treated over 22 million patients. ClearCorrect, developed by Straumann Group, offers a competitive alternative with its ClearQuartz material. André will help you choose the system that best suits your needs.",
    faq6Q: "How much does treatment cost?",
    faq6A:
      "Cost varies depending on the scope of treatment. During a consultation, you'll receive a clear cost estimate. Many clinics offer payment plans. In some regions of Sweden, treatment may be partially covered by local healthcare regulations — check with Försäkringskassan for your situation.",
    faqLink: "Learn more at invisalign.se →",

    // ClearCorrect
    clearCorrectLabel: "ALTERNATIVE TREATMENT",
    clearCorrectTitle1: "We also offer",
    clearCorrectTitle2: "ClearCorrect",
    clearCorrectIntro:
      "In addition to Invisalign, we also offer ClearCorrect — another leading clear aligner system, developed by Straumann Group with over 60 years of dental experience.",
    ccFlexible: "Flexible treatment",
    ccFlexibleDesc:
      "ClearCorrect offers flexible treatment options that can be adapted to your specific needs and budget, from simple adjustments to more comprehensive corrections.",
    ccMaterial: "ClearQuartz material",
    ccMaterialDesc:
      "Made from ClearQuartz™ — an industry-leading triple-layered material that provides excellent fit, comfort, and durability throughout the treatment period.",
    ccQuality: "Straumann quality",
    ccQualityDesc:
      "ClearCorrect is developed by Straumann Group — a world leader in dental aesthetics and implants, with proven research and innovation.",
    ccLink: "Learn more about ClearCorrect →",

    // LinkedIn
    linkedinPersonal: "LinkedIn — André Wikholm",
    linkedinCompany: "LinkedIn — Wikholm Orthodontics AB",

    // Footer
    footerDesc:
      "Specialist orthodontist focusing on Invisalign and ClearCorrect. Multi-year Platinum Elite Provider.",
    footerQuickLinks: "Quick links",
    footerContact: "Contact",
    footerCopyright: "Wikholm Orthodontics. All rights reserved.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["sv"];

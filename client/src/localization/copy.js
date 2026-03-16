export function getLanguageCopy(copy, language) {
  return copy[language] || copy.en;
}

export const appLayoutCopy = {
  en: {
    explore: 'Explore',
    bookmarks: 'Bookmarks',
    settings: 'Settings',
  },
  nl: {
    explore: 'Verkennen',
    bookmarks: 'Bladwijzers',
    settings: 'Instellingen',
  },
};

export const exploreCopy = {
  en: {
    loading: 'Loading explore...',
    noResults: 'No results',
    noResultsBody: 'Try a different search term or clear your filters.',
    clearSearch: 'Clear search',
    heading: 'Explore Topics',
    subtitle: 'Discover new interests and trusted global news sources.',
    searchPlaceholder: 'Search Topics, Tags, or Sources...',
    trending: 'Trending Topics',
    viewAll: 'View All',
    follow: 'Follow',
    trustedSources: 'Trusted Sources',
    verified: 'VERIFIED',
    liveTrends: 'Live Trends',
    personalizedTitle: 'Personalized For You',
    personalizedText: "We've found 12 new articles matching your interests in Technology and Science.",
    liveTrendsData: [
      { tag: 'GLOBAL • LIVE', title: 'Major tech breakthrough in quantum computing reported.', meta: '12m ago • 4.2k reading' },
      { tag: 'POLITICS', title: 'New economic policy proposed in parliament today.', meta: '45m ago • 1.8k reading' },
      { tag: 'ENTERTAINMENT', title: 'Film festival winners announced for the 2024 season.', meta: '1h ago • 12k reading' },
    ],
    sources: [
      { name: 'TechCrunch', description: 'Startups, AI and product launches.' },
      { name: 'Wired', description: 'Deep dives on innovation and society.' },
      { name: 'Reuters', description: 'Global business and policy updates.' },
    ],
    topicMap: {
      technology: { name: 'Technology', description: 'AI, cloud and product innovation.' },
      cybersecurity: { name: 'Cybersecurity', description: 'Threats, policy and zero-trust updates.' },
      startups: { name: 'Startups', description: 'Funding, scale-ups and market movement.' },
    },
  },
  nl: {
    loading: 'Verkennen laden...',
    noResults: 'Geen resultaten',
    noResultsBody: 'Probeer een andere zoekterm of wis je filters.',
    clearSearch: 'Zoekopdracht wissen',
    heading: 'Onderwerpen Verkennen',
    subtitle: 'Ontdek nieuwe interesses en betrouwbare wereldwijde nieuwsbronnen.',
    searchPlaceholder: 'Zoek onderwerpen, tags of bronnen...',
    trending: 'Trending Onderwerpen',
    viewAll: 'Bekijk Alles',
    follow: 'Volgen',
    trustedSources: 'Betrouwbare Bronnen',
    verified: 'GEVERIFIEERD',
    liveTrends: 'Live Trends',
    personalizedTitle: 'Gepersonaliseerd Voor Jou',
    personalizedText: 'We hebben 12 nieuwe artikelen gevonden op basis van je interesses in Technologie en Wetenschap.',
    liveTrendsData: [
      { tag: 'WERELD • LIVE', title: 'Grote technologische doorbraak in quantum computing gemeld.', meta: '12m geleden • 4.2k lezers' },
      { tag: 'POLITIEK', title: 'Nieuw economisch beleid vandaag voorgesteld in het parlement.', meta: '45m geleden • 1.8k lezers' },
      { tag: 'ENTERTAINMENT', title: 'Winnaars van het filmfestival voor seizoen 2024 bekendgemaakt.', meta: '1u geleden • 12k lezers' },
    ],
    sources: [
      { name: 'TechCrunch', description: 'Startups, AI en productlanceringen.' },
      { name: 'Wired', description: 'Diepgaande analyses over innovatie en maatschappij.' },
      { name: 'Reuters', description: 'Wereldwijde updates over business en beleid.' },
    ],
    topicMap: {
      technology: { name: 'Technologie', description: 'AI, cloud en productinnovatie.' },
      cybersecurity: { name: 'Cybersecurity', description: 'Dreigingen, beleid en zero-trust updates.' },
      startups: { name: 'Startups', description: 'Financiering, scale-ups en marktbeweging.' },
    },
  },
};

export const bookmarksCopy = {
  en: {
    loading: 'Loading bookmarks...',
    emptyTitle: 'No bookmarks yet',
    emptyBody: 'Save articles to read later. Your bookmarks will appear here.',
    title: 'Saved Bookmarks',
    subtitle: 'Manage your curated list of saved articles and resources.',
    sortBy: 'Sort by',
    newest: 'Newest First',
    oldest: 'Oldest First',
    az: 'Alphabetical (A-Z)',
    open: 'Open article',
    delete: 'Delete',
    previous: 'Previous',
    next: 'Next Page',
    showing: (from, to, total) => `Showing ${from}-${to} of ${total} saved articles`,
    savedLabel: (time) => `Saved ${time}`,
    readLabel: (minutes) => `${minutes} min read`,
  },
  nl: {
    loading: 'Bladwijzers laden...',
    emptyTitle: 'Nog geen bladwijzers',
    emptyBody: 'Sla artikels op om later te lezen. Je bladwijzers verschijnen hier.',
    title: 'Opgeslagen bladwijzers',
    subtitle: 'Beheer je lijst met opgeslagen artikelen en bronnen.',
    sortBy: 'Sorteren op',
    newest: 'Nieuwste eerst',
    oldest: 'Oudste eerst',
    az: 'Alfabetisch (A-Z)',
    open: 'Artikel openen',
    delete: 'Verwijderen',
    previous: 'Vorige',
    next: 'Volgende pagina',
    showing: (from, to, total) => `Toont ${from}-${to} van ${total} opgeslagen artikelen`,
    savedLabel: (time) => `Opgeslagen ${time}`,
    readLabel: (minutes) => `${minutes} min leestijd`,
  },
};

export const bookmarkNlOverrides = {
  12: {
    category: 'TECHNOLOGIE',
    source: 'TechCrunch',
    title: 'EU AI Act: wat verandert er voor productteams',
    summary: 'Een praktisch overzicht van de compliance-impact voor softwareteams.',
  },
  11: {
    category: 'FINANCIËN',
    source: 'Bloomberg',
    title: 'Hoe edge AI mainstream toepassingen binnenkomt',
    summary: 'On-device modellen worden praktischer voor moderne producten.',
  },
  10: {
    category: 'LIFESTYLE',
    source: 'NY Times',
    title: '10 gezondste superfoods om toe te voegen in 2024',
    summary: 'Een praktische lijst met voedzame keuzes voor elke dag.',
  },
  9: {
    category: 'WETENSCHAP',
    source: 'NASA Nieuws',
    title: 'Telescoop detecteert waterdamp op verre exoplaneet',
    summary: 'Nieuwe metingen verbeteren het inzicht in exoplaneetklimaten.',
  },
  8: {
    category: 'TECHNOLOGIE',
    source: 'The Verge',
    title: 'Quantum computing en de volgende veiligheidsgrens',
    summary: 'Waarom quantumbeleid nu een board-level onderwerp is.',
  },
  7: {
    category: 'FINANCIËN',
    source: 'Reuters',
    title: 'Centrale banken sturen op nieuwe beleidswijzigingen',
    summary: 'Markten reageren op nieuwe richtlijnen en renteverwachtingen.',
  },
};

export const articleCopy = {
  en: {
    loading: 'Loading article...',
    emptyTitle: 'No article data',
    emptyBody: 'Try opening another article.',
    breadcrumbs: 'Home / Technology / Article',
    authorName: 'Marcus Chen',
    authorMeta: 'Senior Tech Correspondent • Oct 24, 2023',
    summaryTitle: 'AI Summary',
    summaryEmpty: 'No AI summary yet.',
    summaryEmptyBody: 'Generate a summary to see the key points for this article.',
    sectionOne: 'The Shift from Centralization',
    sectionOneBody:
      'The traditional media landscape has long been dominated by centralized platforms. Decentralized models introduce verifiable sources and stronger trust mechanisms.',
    quote:
      'The goal is not just moving content to another server, but changing how credibility is verified.',
    sectionTwo: 'Verifiable Credibility',
    sectionTwoBody:
      'Cryptographic signatures and transparent metadata make each story easier to validate and audit.',
    generateSummary: 'Generate AI Summary',
    generatingSummary: 'Generating AI Summary...',
    summaryError: 'Could not generate summary. Check your backend API key.',
    generatedBadge: 'AI Summary Generated',
    takeaway: 'Takeaway',
    tags: ['#BLOCKCHAIN', '#FUTUREOFMEDIA', '#TECHNOLOGY'],
    relatedTitle: 'Related Stories',
    related: [
      'How Web3 is Changing the Creator Economy Forever',
      'Top 10 Emerging Technologies to Watch in 2024',
    ],
    overrides: {
      12: {
        title: 'EU AI Act: What changes for product teams',
        summary: 'A practical view on compliance impact for software teams.',
        content:
          'The EU AI Act introduces risk-based obligations. Teams should classify systems, document datasets and establish human oversight where required.',
      },
      11: {
        title: 'How edge AI is moving into mainstream apps',
        summary: 'On-device models are becoming practical for modern products.',
        content:
          'Edge AI helps reduce latency and preserve privacy by processing data locally. Tooling is improving for mobile and desktop deployment.',
      },
    },
  },
  nl: {
    loading: 'Artikel laden...',
    emptyTitle: 'Geen artikelgegevens',
    emptyBody: 'Probeer een ander artikel te openen.',
    breadcrumbs: 'Home / Technologie / Artikel',
    authorName: 'Marcus Chen',
    authorMeta: 'Senior Tech Correspondent • 24 okt 2023',
    summaryTitle: 'AI-samenvatting',
    summaryEmpty: 'Nog geen AI-samenvatting.',
    summaryEmptyBody: 'Genereer een samenvatting om de kernpunten van dit artikel te zien.',
    sectionOne: 'De verschuiving weg van centralisatie',
    sectionOneBody:
      'Het traditionele medialandschap werd lange tijd gedomineerd door gecentraliseerde platformen. Gedecentraliseerde modellen brengen verifieerbare bronnen en sterkere vertrouwensmechanismen.',
    quote:
      'Het doel is niet alleen content naar een andere server verplaatsen, maar veranderen hoe geloofwaardigheid wordt geverifieerd.',
    sectionTwo: 'Verifieerbare geloofwaardigheid',
    sectionTwoBody:
      'Cryptografische handtekeningen en transparante metadata maken elk verhaal makkelijker te valideren en te auditen.',
    generateSummary: 'Genereer AI-samenvatting',
    generatingSummary: 'AI-samenvatting genereren...',
    summaryError: 'Kon geen samenvatting genereren. Controleer je backend API key.',
    generatedBadge: 'AI-samenvatting gegenereerd',
    takeaway: 'Kernpunt',
    tags: ['#BLOCKCHAIN', '#TOEKOMSTVANMEDIA', '#TECHNOLOGIE'],
    relatedTitle: 'Gerelateerde Verhalen',
    related: [
      'Hoe Web3 de creator economy voorgoed verandert',
      'Top 10 opkomende technologieën om in 2024 te volgen',
    ],
    overrides: {
      12: {
        title: 'EU AI Act: wat verandert er voor productteams',
        summary: 'Een praktisch overzicht van de compliance-impact voor softwareteams.',
        content:
          'De EU AI Act introduceert verplichtingen op basis van risiconiveaus. Teams moeten systemen classificeren, datasets documenteren en menselijke controle waar nodig voorzien.',
      },
      11: {
        title: 'Hoe edge AI mainstream toepassingen binnenkomt',
        summary: 'On-device modellen worden praktischer voor moderne producten.',
        content:
          'Edge AI verlaagt latency en beschermt privacy door data lokaal te verwerken. De tooling voor mobiele en desktopuitrol wordt steeds beter.',
      },
      10: {
        title: '10 gezondste superfoods om toe te voegen in 2024',
        summary: 'Een praktische lijst met voedzame keuzes voor elke dag.',
        content:
          'Evenwichtige voedingspatronen zijn makkelijker vol te houden wanneer maaltijden rond pure ingrediënten en eenvoudige routines worden opgebouwd.',
      },
      9: {
        title: 'Telescoop detecteert waterdamp op verre exoplaneet',
        summary: 'Nieuwe metingen verbeteren het inzicht in exoplaneetklimaten.',
        content:
          'Observaties met moderne telescopen verbeteren voortdurend atmosferische modellen en de langetermijnkarakterisering van exoplaneten.',
      },
      8: {
        title: 'Quantum computing en de volgende veiligheidsgrens',
        summary: 'Waarom quantumbeleid nu een board-level onderwerp is.',
        content:
          'Securityteams evalueren post-quantum migratiepaden terwijl regelgevers en standaardisatieorganisaties de richtlijnen versnellen.',
      },
      7: {
        title: 'Centrale banken sturen op nieuwe beleidswijzigingen',
        summary: 'Markten reageren op nieuwe richtlijnen en renteverwachtingen.',
        content:
          'Toekomstgerichte indicatoren tonen dat beleidsbeslissingen afhankelijk blijven van data terwijl inflatie geleidelijk normaliseert.',
      },
    },
  },
};

export const settingsCopy = {
  en: {
    loading: 'Loading settings...',
    emptyTitle: 'No settings available',
    emptyBody: 'Please refresh and try again.',
    settings: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    account: 'Account',
    notifications: 'Notifications',
    privacy: 'Privacy & Security',
    appearanceSub: 'Customize how NewsRoom looks on your device.',
    languageSub: 'Manage your language and regional preferences.',
    accountSub: 'Manage your profile and connected services.',
    notificationsSub: 'Control how and when you receive updates.',
    privacySub: 'Manage your data protection and account security settings.',
    darkMode: 'Dark Mode',
    darkModeDesc: 'Use a dark theme for a better night experience.',
    compactView: 'Compact View',
    compactViewDesc: 'Display more headlines on the screen at once.',
    displayLanguage: 'Display Language',
    emailAddress: 'Email Address',
    changeEmail: 'Change Email',
    googleAccount: 'Google Account',
    connected: 'Connected',
    disconnect: 'Disconnect',
    breakingNews: 'Breaking News Alerts',
    breakingNewsDesc: 'Receive push notifications for major headlines.',
    digestFrequency: 'Email Digest Frequency',
    profileVisibility: 'Profile Visibility',
    twoFactor: 'Two-Factor Authentication',
    twoFactorDesc: 'Add an extra layer of security to your account.',
    discard: 'Discard changes',
    save: 'Save Changes',
    saved: 'Settings saved',
  },
  nl: {
    loading: 'Instellingen laden...',
    emptyTitle: 'Geen instellingen beschikbaar',
    emptyBody: 'Ververs de pagina en probeer opnieuw.',
    settings: 'Instellingen',
    appearance: 'Uiterlijk',
    language: 'Taal',
    account: 'Account',
    notifications: 'Meldingen',
    privacy: 'Privacy & Beveiliging',
    appearanceSub: 'Pas aan hoe NewsRoom eruitziet op je toestel.',
    languageSub: 'Beheer je taal- en regiovoorkeuren.',
    accountSub: 'Beheer je profiel en gekoppelde diensten.',
    notificationsSub: 'Bepaal hoe en wanneer je updates ontvangt.',
    privacySub: 'Beheer gegevensbescherming en accountbeveiliging.',
    darkMode: 'Donkere modus',
    darkModeDesc: 'Gebruik een donker thema voor een betere nachtweergave.',
    compactView: 'Compacte weergave',
    compactViewDesc: 'Toon meer headlines tegelijk op het scherm.',
    displayLanguage: 'Weergavetaal',
    emailAddress: 'E-mailadres',
    changeEmail: 'E-mail wijzigen',
    googleAccount: 'Google-account',
    connected: 'Verbonden',
    disconnect: 'Verbinding verbreken',
    breakingNews: 'Breaking news meldingen',
    breakingNewsDesc: 'Ontvang pushmeldingen voor grote headlines.',
    digestFrequency: 'Frequentie e-mailoverzicht',
    profileVisibility: 'Profielzichtbaarheid',
    twoFactor: 'Tweestapsverificatie',
    twoFactorDesc: 'Voeg extra beveiliging toe aan je account.',
    discard: 'Wijzigingen verwerpen',
    save: 'Wijzigingen opslaan',
    saved: 'Instellingen opgeslagen',
  },
};

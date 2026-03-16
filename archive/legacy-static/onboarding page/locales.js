// Localization configuration and translations
const locales = {
    // Supported languages
    supported: ['en', 'nl', 'fr', 'de'],
    
    // Default language
    default: 'en',
    
    // Language display names (for UI)
    displayNames: {
        en: { short: "EN", full: "English", flag: "🇬🇧" },
        nl: { short: "NL", full: "Nederlands", flag: "🇳🇱" },
        fr: { short: "FR", full: "Français", flag: "🇫🇷" },
        de: { short: "DE", full: "Deutsch", flag: "🇩🇪" }
    },
    
    // Translations for each language
    translations: {
        en: {
            // Left panel
            badge: "GLOBAL COVERAGE",
            heroTitle: "Stay ahead with the most relevant stories.",
            heroSubtitle: "Curated from trusted global sources and summarized by AI in real-time for you.",
            
            // Header
            multiLangSupport: "Multi-language support",
            
            // Auth section
            authTitle1: "Your News,",
            authTitle2: "Personalized",
            authDescription: "Follow topics and sources from around the world to tailor your feed to your unique interests. Never miss what matters to you.",
            continueGoogle: "Continue with Google",
            createAccount: "Create Account",
            alreadyAccount: "Already have an account?",
            signIn: "Sign in",
            
            // Footer
            termsLink: "Terms of Service",
            privacyLink: "Privacy Policy",
            helpLink: "Help Center",
            copyright: "© 2026 IT Trends News. All rights reserved. Built for the modern information age."
        },
        
        nl: {
            // Left panel
            badge: "WERELDWIJDE DEKKING",
            heroTitle: "Blijf voorop met de meest relevante verhalen.",
            heroSubtitle: "Samengesteld uit betrouwbare wereldwijde bronnen en in realtime samengevat door AI voor jou.",
            
            // Header
            multiLangSupport: "Meertalige ondersteuning",
            
            // Auth section
            authTitle1: "Jouw Nieuws,",
            authTitle2: "Gepersonaliseerd",
            authDescription: "Volg onderwerpen en bronnen van over de hele wereld om je feed af te stemmen op jouw unieke interesses. Mis nooit wat belangrijk voor je is.",
            continueGoogle: "Doorgaan met Google",
            createAccount: "Account Aanmaken",
            alreadyAccount: "Heb je al een account?",
            signIn: "Inloggen",
            
            // Footer
            termsLink: "Servicevoorwaarden",
            privacyLink: "Privacybeleid",
            helpLink: "Helpcentrum",
            copyright: "© 2026 IT Trends Nieuws. Alle rechten voorbehouden. Gebouwd voor het moderne informatietijdperk."
        },
        
        fr: {
            // Left panel
            badge: "COUVERTURE MONDIALE",
            heroTitle: "Gardez une longueur d'avance avec les histoires les plus pertinentes.",
            heroSubtitle: "Sélectionné à partir de sources mondiales fiables et résumé par l'IA en temps réel pour vous.",
            
            // Header
            multiLangSupport: "Support multilingue",
            
            // Auth section
            authTitle1: "Vos Actualités,",
            authTitle2: "Personnalisées",
            authDescription: "Suivez des sujets et des sources du monde entier pour adapter votre fil à vos intérêts uniques. Ne manquez jamais ce qui compte pour vous.",
            continueGoogle: "Continuer avec Google",
            createAccount: "Créer un Compte",
            alreadyAccount: "Vous avez déjà un compte?",
            signIn: "Se connecter",
            
            // Footer
            termsLink: "Conditions d'Utilisation",
            privacyLink: "Politique de Confidentialité",
            helpLink: "Centre d'Aide",
            copyright: "© 2026 IT Trends Actualités. Tous droits réservés. Conçu pour l'ère de l'information moderne."
        },
        
        de: {
            // Left panel
            badge: "WELTWEITE ABDECKUNG",
            heroTitle: "Bleiben Sie mit den relevantesten Geschichten auf dem Laufenden.",
            heroSubtitle: "Kuratiert aus vertrauenswürdigen globalen Quellen und in Echtzeit von KI für Sie zusammengefasst.",
            
            // Header
            multiLangSupport: "Mehrsprachige Unterstützung",
            
            // Auth section
            authTitle1: "Ihre Nachrichten,",
            authTitle2: "Personalisiert",
            authDescription: "Folgen Sie Themen und Quellen aus aller Welt, um Ihren Feed auf Ihre einzigartigen Interessen abzustimmen. Verpassen Sie nie, was Ihnen wichtig ist.",
            continueGoogle: "Mit Google fortfahren",
            createAccount: "Konto Erstellen",
            alreadyAccount: "Haben Sie bereits ein Konto?",
            signIn: "Anmelden",
            
            // Footer
            termsLink: "Nutzungsbedingungen",
            privacyLink: "Datenschutzrichtlinie",
            helpLink: "Hilfezentrum",
            copyright: "© 2026 IT Trends Nachrichten. Alle Rechte vorbehalten. Entwickelt für das moderne Informationszeitalter."
        }
    },
    
    // Helper function to get translation
    t(key, lang = null) {
        const currentLang = lang || this.current || this.default;
        return this.translations[currentLang]?.[key] || this.translations[this.default][key] || key;
    },
    
    // Get all translations for a language
    getLanguage(lang) {
        return this.translations[lang] || this.translations[this.default];
    },
    
    // Check if language is supported
    isSupported(lang) {
        return this.supported.includes(lang);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = locales;
}

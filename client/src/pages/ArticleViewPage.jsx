import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

const COPY = {
  en: {
    loading: 'Loading article...',
    emptyTitle: 'No article data',
    emptyBody: 'Try opening another article.',
    breadcrumbs: 'Home / Technology / Article',
    authorName: 'Marcus Chen',
    authorMeta: 'Senior Tech Correspondent • Oct 24, 2023',
    summaryTitle: 'AI Summary Generated',
    sectionOne: 'The Shift from Centralization',
    sectionOneBody:
      'The traditional media landscape has long been dominated by centralized platforms. Decentralized models introduce verifiable sources and stronger trust mechanisms.',
    quote:
      'The goal is not just moving content to another server, but changing how credibility is verified.',
    sectionTwo: 'Verifiable Credibility',
    sectionTwoBody:
      'Cryptographic signatures and transparent metadata make each story easier to validate and audit.',
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
    summaryTitle: 'AI-samenvatting gegenereerd',
    sectionOne: 'De verschuiving weg van centralisatie',
    sectionOneBody:
      'Het traditionele medialandschap werd lange tijd gedomineerd door gecentraliseerde platformen. Gedecentraliseerde modellen brengen verifieerbare bronnen en sterkere vertrouwensmechanismen.',
    quote:
      'Het doel is niet alleen content naar een andere server verplaatsen, maar veranderen hoe geloofwaardigheid wordt geverifieerd.',
    sectionTwo: 'Verifieerbare geloofwaardigheid',
    sectionTwoBody:
      'Cryptografische handtekeningen en transparante metadata maken elk verhaal makkelijker te valideren en te auditen.',
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

export default function ArticleViewPage() {
  const { language } = useAppContext();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const text = COPY[language] || COPY.en;

  useEffect(() => {
    if (!id) return;
    const forcedState = (searchParams.get('state') || '').toLowerCase();

    if (forcedState === 'loading') {
      setLoading(true);
      setArticle(null);
      return;
    }

    api.getArticle(id).then((data) => {
      if (forcedState === 'empty') {
        setArticle(null);
      } else {
        setArticle(data.article);
      }
      setLoading(false);
    });
  }, [id, searchParams]);

  const articleId = Number(id);
  const translatedArticle = article
    ? {
        ...article,
        ...(text.overrides?.[articleId] || {}),
      }
    : null;

  if (loading) {
    return <p>{text.loading}</p>;
  }

  if (!translatedArticle) {
    return <section className="page-panel"><div className="empty-box"><h2>{text.emptyTitle}</h2><p>{text.emptyBody}</p></div></section>;
  }

  return (
    <section className="article-shell">
      <nav className="breadcrumbs">{text.breadcrumbs}</nav>
      <h1 className="article-title">{translatedArticle.title}</h1>

      <div className="author-row">
        <div className="author-avatar" />
        <div>
          <p className="author-name">{text.authorName}</p>
          <p className="author-meta">{text.authorMeta}</p>
        </div>
      </div>

      <div className="summary-card">
        <h3>{text.summaryTitle}</h3>
        <p>{translatedArticle.summary}</p>
      </div>

      <article className="article-body">
        <p>{translatedArticle.content}</p>
        <h2>{text.sectionOne}</h2>
        <p>{text.sectionOneBody}</p>
        <blockquote>"{text.quote}"</blockquote>
        <h2>{text.sectionTwo}</h2>
        <p>{text.sectionTwoBody}</p>
      </article>

      <div className="tag-row">
        {text.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <section className="related-section">
        <h3>{text.relatedTitle}</h3>
        <div className="related-grid">
          {text.related.map((item) => (
            <article className="card" key={item}>
              <h4>{item}</h4>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

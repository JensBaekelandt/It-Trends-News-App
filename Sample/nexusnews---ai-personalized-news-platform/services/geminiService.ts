
import { Article, Language } from "../types";

const GNEWS_API_KEY = process.env.VITE_GNEWS_API_KEY;
const GNEWS_BASE_URL = "https://gnews.io/api/v4";
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const fetchNewsArticles = async (
  topics: string[],
  sources: string[],
  language: Language
): Promise<Article[]> => {
  if (!GNEWS_API_KEY) {
    console.error("GNews API key is not configured");
    return [];
  }

  try {
    // Build search query from topics and sources
    const searchTerms = topics.slice(0, 3).join(" OR ");
    const sourceFilter = sources.length > 0 ? sources.slice(0, 3).join(",") : "";
    
    // Determine language code for GNews API
    const langMap: Record<Language, string> = {
      en: "en",
      zh: "zh",
      nl: "nl",
      tr: "tr"
    };
    const lang = langMap[language] || "en";

    // Build GNews API endpoint with parameters
    let url = `${GNEWS_BASE_URL}/top?lang=${lang}&max=10&apikey=${GNEWS_API_KEY}`;
    
    if (searchTerms) {
      url = `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(searchTerms)}&lang=${lang}&max=10&apikey=${GNEWS_API_KEY}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.articles || !Array.isArray(data.articles)) {
      console.error("Unexpected GNews API response format");
      return [];
    }

    // Transform GNews articles to our Article format with stable IDs
    return data.articles.map((article: any, index: number) => {
      // Create stable ID from URL
      const urlHash = article.url ? article.url.split('/').pop()?.split('?')[0] || `article-${index}` : `article-${index}`;
      
      return {
        id: urlHash,
        title: article.title || "Untitled",
        summary: article.description || article.content || "No summary available",
        source: article.source?.name || "Unknown Source",
        topic: topics[index % topics.length] || "News",
        imageUrl: article.image || `https://picsum.photos/seed/${urlHash}/800/450`,
        publishedAt: article.publishedAt || new Date().toISOString(),
        url: article.url || "#"
      };
    });
  } catch (error) {
    console.error("Error fetching news from GNews API:", error);
    return [];
  }
};

export const generateArticleSummary = async (
  title: string,
  content: string
): Promise<string> => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is not configured");
    return content.substring(0, 500) + "...";
  }

  try {
    const prompt = `Please provide a concise and informative summary (2-3 paragraphs) of the following article:
    
Title: ${title}

Content: ${content.substring(0, 2000)}

Summary:`;

    const response = await fetch(`${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return content.substring(0, 500) + "...";
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return content.substring(0, 500) + "...";
  }
};

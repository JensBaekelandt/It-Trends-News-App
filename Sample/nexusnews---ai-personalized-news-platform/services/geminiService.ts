
import { GoogleGenAI, Type } from "@google/genai";
import { Article, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchNewsArticles = async (
  topics: string[],
  sources: string[],
  language: Language
): Promise<Article[]> => {
  const prompt = `Act as a high-quality global news aggregator. 
  Generate a list of 10 realistic recent news articles based on these topics: ${topics.join(', ')} 
  and these preferred sources: ${sources.join(', ')}. 
  The articles should be in the language: ${language}.
  Make sure titles are catchy and summaries are informative.
  Return the results as a JSON array of objects.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              source: { type: Type.STRING },
              topic: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
              publishedAt: { type: Type.STRING },
              url: { type: Type.STRING },
            },
            required: ["id", "title", "summary", "source", "topic", "imageUrl", "publishedAt", "url"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const articles = JSON.parse(text);
    // Add placeholder images if missing or invalid
    return articles.map((article: Article, index: number) => ({
      ...article,
      imageUrl: `https://picsum.photos/seed/${article.id || index}/800/450`
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

/**
 * Content Extraction Service
 * Uses CORS proxy to fetch web pages and extracts readable content
 */

// CORS proxy options (free services)
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
];

interface ExtractedContent {
  title: string;
  content: string;
  excerpt: string;
}

/**
 * Simple HTML to text conversion (without external dependencies)
 */
function htmlToText(html: string): string {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&amp;/g, '&');
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Extract main content from HTML
 */
function extractMainContent(html: string): string {
  // Look for common main content containers
  const selectors = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const selector of selectors) {
    const match = html.match(selector);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Fallback: remove header, nav, footer, sidebar
  let content = html;
  content = content.replace(/<header[^>]*>([\s\S]*?)<\/header>/gi, '');
  content = content.replace(/<nav[^>]*>([\s\S]*?)<\/nav>/gi, '');
  content = content.replace(/<footer[^>]*>([\s\S]*?)<\/footer>/gi, '');
  content = content.replace(/<aside[^>]*>([\s\S]*?)<\/aside>/gi, '');
  
  return content;
}

/**
 * Fetch article content from URL using CORS proxy
 */
export const fetchArticleContent = async (url: string): Promise<ExtractedContent | null> => {
  try {
    // Try each CORS proxy
    for (const proxyUrl of CORS_PROXIES) {
      try {
        const encodedUrl = encodeURIComponent(url);
        const fetchUrl = proxyUrl + encodedUrl;

        const response = await fetch(fetchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        if (!response.ok) {
          console.warn(`Failed to fetch with proxy ${proxyUrl}: ${response.status}`);
          continue;
        }

        const html = await response.text();

        if (!html || html.length < 100) {
          console.warn(`Content too short from ${proxyUrl}`);
          continue;
        }

        // Extract title
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const title = titleMatch ? htmlToText(titleMatch[1]) : 'Untitled';

        // Extract main content
        const mainContent = extractMainContent(html);
        const content = htmlToText(mainContent);

        // Create excerpt (first 500 characters)
        const excerpt = content.substring(0, 500).trim();

        return {
          title,
          content: content.substring(0, 3000), // Limit content to 3000 chars for API
          excerpt
        };
      } catch (error) {
        console.warn(`Error with proxy ${proxyUrl}:`, error);
        // Try next proxy
        continue;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching article content:', error);
    return null;
  }
};

/**
 * Fallback: use article summary if content extraction fails
 */
export const getArticleContent = async (
  url: string,
  fallbackContent: string
): Promise<string> => {
  const extracted = await fetchArticleContent(url);
  return extracted?.content || fallbackContent;
};

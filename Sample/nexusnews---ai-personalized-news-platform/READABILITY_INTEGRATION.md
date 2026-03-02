# Readability Integration - Article Content Extraction

## Overview
This document describes the integration of Mozilla's Readability library into the NexusNews application for improved article content extraction and in-app reading.

## What Changed

### 1. **Enhanced Content Extraction Service** (`services/contentExtractor.ts`)
- **Added Readability Integration**: Uses Mozilla's `@mozilla/readability` library combined with `jsdom` for DOM parsing
- **Dual Extraction Strategy**:
  - Primary: Mozilla Readability (superior content extraction)
  - Fallback: Regex-based extraction (if Readability fails)
- **Improved Content Handling**:
  - Returns both plain text (`content`) and rich HTML (`htmlContent`)
  - Plain text for summary generation
  - HTML for rich in-app rendering

**Key Improvements**:
- ✅ Better article content detection
- ✅ Automatic removal of ads, sidebars, and navigation
- ✅ Preserves article structure and formatting
- ✅ Handles complex website layouts

### 2. **HTML Sanitization Utility** (`services/htmlSanitizer.ts`)
- **Safety First**: Sanitizes extracted HTML to prevent XSS attacks
- **Features**:
  - Removes script tags and event handlers
  - Whitelist-based tag filtering
  - URL validation (prevents javascript: and data: URLs)
  - Safe attribute filtering
  - Graceful fallback for parsing errors

**Allowed Elements**:
- Text formatting: `<p>`, `<strong>`, `<em>`, `<u>`, `<code>`
- Headings: `<h1>` - `<h6>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Quotes: `<blockquote>`
- Media: `<img>`, `<video>`, `<iframe>` (with safe attributes)
- Tables: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`, `<th>`

### 3. **Enhanced Article Detail Component** (`components/ArticleDetail.tsx`)
- **Dual Content Display**:
  - Renders rich HTML when Readability extraction succeeds
  - Falls back to plain text if HTML extraction fails
- **Better Styling**:
  - Tailwind prose classes for responsive typography
  - Dark mode support
  - Proper image and link styling
  - Code block formatting

## How It Works

### Content Extraction Flow

```
1. User opens article
   ↓
2. ArticleDetail fetches content via fetchArticleContent()
   ↓
3. CORS Proxy retrieves raw HTML from article URL
   ↓
4. Readability.parse() extracts article content
   ├─ Success: Returns title, content, htmlContent
   └─ Failure: Falls back to regex extraction
   ↓
5. Plain text content used for summary generation
6. HTML content rendered for rich display
   ↓
7. HTML sanitized before rendering (security)
   ↓
8. Display in ArticleDetail with formatting
```

## Dependencies

The following dependencies are used:
- `@mozilla/readability`: Article content extraction
- `jsdom`: DOM parsing from HTML strings
- `lucide-react`: UI icons
- Tailwind CSS: Styling and prose classes

All dependencies are already in `package.json`.

## Usage Example

### Extracting Article Content
```typescript
import { fetchArticleContent } from '../services/contentExtractor';

const result = await fetchArticleContent(articleUrl);
if (result) {
  console.log('Title:', result.title);
  console.log('Plain text:', result.content);
  console.log('Rich HTML:', result.htmlContent);
  console.log('Excerpt:', result.excerpt);
}
```

### Safely Rendering HTML
```typescript
import { createSafeHtml } from '../services/htmlSanitizer';

const safeHtml = createSafeHtml(extracted.htmlContent);
// Use in JSX: dangerouslySetInnerHTML={safeHtml}
```

## Benefits

1. **Better Reading Experience**: Rich formatting, proper typography, images
2. **Improved Content Quality**: Readability removes clutter, ads, and navigation
3. **Security**: HTML sanitization prevents XSS attacks
4. **Fallback Handling**: Gracefully handles extraction failures
5. **Dual Format**: Both text and HTML for different use cases

## Testing Recommendations

1. Test with various news websites (different layouts)
2. Verify HTML content renders correctly
3. Check mobile responsiveness of extracted content
4. Ensure images load properly
5. Test with articles containing code blocks, tables, or embedded content

## Production Considerations

1. **HTML Sanitization**: Consider using DOMPurify library for more robust sanitization
2. **CORS Issues**: CORS proxies may have rate limits - consider using a backend solution
3. **Performance**: Implement content caching to reduce extraction calls
4. **Error Handling**: Add retry logic with exponential backoff
5. **User Preferences**: Add option for users to choose text vs HTML view

## Future Enhancements

- [ ] Content caching to reduce API calls
- [ ] User option to toggle between text and HTML view
- [ ] Text size adjustment
- [ ] Reading progress indicator
- [ ] Dark mode optimized images
- [ ] Custom CSS for article styling
- [ ] Export articles as PDF/EPUB

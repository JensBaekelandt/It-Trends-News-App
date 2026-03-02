# Developer Quick Reference - Readability Integration

## 📚 API Reference

### `contentExtractor.ts`

#### `fetchArticleContent(url: string): Promise<ExtractedContent | null>`
Fetches and extracts article content from a URL.

**Parameters:**
- `url` (string): The article URL to extract

**Returns:**
```typescript
{
  title: string;           // Article title
  content: string;         // Plain text content (up to 5000 chars)
  excerpt: string;         // First 500 chars summary
  htmlContent?: string;    // Rich HTML format (from Readability)
}
```

**Example:**
```typescript
const article = await fetchArticleContent('https://example.com/article');
if (article) {
  console.log('Title:', article.title);
  console.log('Text:', article.content);
  console.log('HTML:', article.htmlContent);
}
```

**Error Handling:**
- Returns `null` if all CORS proxies fail
- Falls back to regex extraction if Readability fails
- Logs warnings for debugging

#### `getArticleContent(url: string, fallbackContent: string): Promise<string>`
Convenience function that falls back to fallback content if extraction fails.

---

### `htmlSanitizer.ts`

#### `createSafeHtml(html: string): { __html: string }`
Sanitizes HTML and returns safe object for `dangerouslySetInnerHTML`.

**Parameters:**
- `html` (string): Raw HTML to sanitize

**Returns:**
```typescript
{ __html: string } // Safe to use with dangerouslySetInnerHTML
```

**Example:**
```typescript
const safeHtml = createSafeHtml(article.htmlContent);
// In JSX:
<div dangerouslySetInnerHTML={safeHtml} />
```

#### `sanitizeHtml(html: string): string`
Sanitizes HTML string and returns cleaned version.

**Security Features:**
- Removes `<script>` tags
- Removes event handlers (`onclick`, `onload`, etc.)
- Whitelists allowed tags
- Validates URLs (prevents `javascript:` and `data:` URLs)
- Removes dangerous attributes

**Allowed Tags:**
```
Text: p, strong, em, u, code, br
Headers: h1, h2, h3, h4, h5, h6
Lists: ul, ol, li
Media: img, video, iframe, source
Tables: table, thead, tbody, tr, td, th
Layout: div, span, article, section
Other: blockquote, pre, a, figure, figcaption
```

**Allowed Attributes:**
- `<a>`: href, title, target, rel
- `<img>`: src, alt, width, height, title
- `<iframe>`: src, width, height
- `<video>`: width, height, controls, autoplay
- All tags: class, id, style

---

## 🔄 Content Flow in ArticleDetail

```typescript
// 1. Component mounts
useEffect(() => {
  // 2. Fetch content
  const extracted = await fetchArticleContent(article.url);
  
  // 3. Store both formats
  setArticleContent(extracted.content);        // Plain text
  setArticleHtmlContent(extracted.htmlContent); // Rich HTML
  
  // 4. Generate summary from text
  const summary = await generateArticleSummary(
    article.title,
    extracted.content
  );
}, [article]);

// 5. Render
return (
  articleHtmlContent ? (
    // Render rich HTML
    <div dangerouslySetInnerHTML={createSafeHtml(articleHtmlContent)} />
  ) : (
    // Fallback to plain text
    <div>{articleContent}</div>
  )
);
```

---

## 🎨 Tailwind Prose Classes

Applied to HTML content for styling:
```typescript
<div className="prose dark:prose-invert max-w-none mt-4
  prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg
  prose-a:text-primary-600 dark:prose-a:text-primary-400
  prose-code:bg-slate-100 dark:prose-code:bg-slate-800
  prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950"
  dangerouslySetInnerHTML={createSafeHtml(articleHtmlContent)}
/>
```

---

## 🐛 Debugging Tips

### Check extraction success:
```typescript
const result = await fetchArticleContent(url);
console.log('Extracted:', result);
```

### Monitor console for fallback:
Look for: `"Readability failed, trying fallback extraction..."`

### Verify HTML sanitization:
```typescript
const original = '<img src="javascript:alert(1)" />';
const sanitized = sanitizeHtml(original);
console.log(sanitized); // javascript: should be removed
```

### Check for parsing errors:
```typescript
const unsafe = `<img src="data:image/svg+xml,<script>alert(1)</script>" />`;
const safe = createSafeHtml(unsafe);
// data: protocol should be removed
```

---

## ⚠️ Common Issues

**Issue: HTML content not rendering**
- Check if `htmlContent` is defined: `if (extracted?.htmlContent)`
- Verify HTML is not empty: `article.htmlContent?.length > 0`
- Check browser console for sanitization warnings

**Issue: Images not loading**
- CORS proxies may block image URLs
- Consider caching or proxying images separately
- Check network tab for 403/404 errors

**Issue: Extraction fails on certain websites**
- CORS proxies have rate limits
- Website JavaScript may be required for content
- Consider implementing backend extraction service

**Issue: Styling looks broken**
- Verify Tailwind prose classes are applied
- Check dark mode is configured correctly
- Run `tailwind build` if custom classes not compiling

---

## 🔗 CORS Proxy Options

Current proxies in use:
1. `https://api.allorigins.win/raw?url=` (Rate limit: reasonable)
2. `https://cors-anywhere.herokuapp.com/` (Requires token for production)

**Production Alternative:**
Implement backend endpoint:
```typescript
// Backend: /api/extract-article
app.post('/api/extract-article', async (req, res) => {
  const { url } = req.body;
  const html = await fetch(url).then(r => r.text());
  const content = extractWithReadability(html, url);
  res.json(content);
});
```

---

## 📈 Performance Considerations

- **Caching**: Consider caching extracted content by URL
- **Lazy Loading**: Load content only when article detail is opened
- **Debouncing**: Throttle rapid content requests
- **Stream Processing**: For large articles, consider streaming content

---

## 🔐 Security Notes

1. **Always sanitize** before rendering with `dangerouslySetInnerHTML`
2. **Use `createSafeHtml()`** instead of raw HTML rendering
3. **Monitor CORS proxy** for injected content
4. **Consider DOMPurify** for production (more comprehensive)
5. **Validate URLs** before fetching (basic check in place)

---

## 📞 Support Resources

- Documentation: [READABILITY_INTEGRATION.md](READABILITY_INTEGRATION.md)
- Implementation: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)  
- Mozilla Readability Docs: https://github.com/mozilla/readability
- JSDOM Docs: https://github.com/jsdom/jsdom

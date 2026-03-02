/**
 * HTML Sanitization Utility
 * Simple regex-based sanitization to prevent XSS while keeping article formatting
 * Lightweight alternative to complex DOM parsing
 */

// Dangerous protocols to filter
const DANGEROUS_PROTOCOLS = ['javascript:', 'data:', 'vbscript:', 'file:'];

/**
 * Check if a URL is safe (prevents javascript: and data: URLs)
 */
function isSafeUrl(url: string): boolean {
  const trimmedUrl = url.toLowerCase().trim();
  return !DANGEROUS_PROTOCOLS.some(protocol => trimmedUrl.startsWith(protocol));
}

/**
 * Sanitize HTML content
 * Simple but effective regex-based approach
 * Removes: script tags, event handlers, and dangerous protocols
 */
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let sanitized = html;

  // Remove script and style tags completely
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove event handlers (onclick, onload, etc.)
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: and data: URLs from href and src attributes
  sanitized = sanitized.replace(/\s+href\s*=\s*["']([^"']*)["']/gi, (match, url) => {
    return isSafeUrl(url) ? match : ' href="#"';
  });
  sanitized = sanitized.replace(/\s+src\s*=\s*["']([^"']*)["']/gi, (match, url) => {
    return isSafeUrl(url) ? match : '';
  });

  // Remove potentially dangerous tags but keep content
  // This removes forms, iframes with bad src, embed, object tags
  sanitized = sanitized.replace(/<(form|embed|object)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');
  
  // Remove iframe tags unless they come from safe sources (youtube, vimeo, etc)
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, (match) => {
    if (match.includes('youtube.com') || match.includes('youtu.be') || 
        match.includes('vimeo.com') || match.includes('dailymotion')) {
      return match;
    }
    return '';
  });

  return sanitized;
};

/**
 * Create a safe HTML object for rendering with dangerouslySetInnerHTML
 */
export const createSafeHtml = (html: string): { __html: string } => {
  // Note: In browser environment, we need to use a proper HTML sanitizer library
  // For now, we're relying on Readability's somewhat safe output
  // In production, use DOMPurify or similar
  return { __html: sanitizeHtml(html) };
};

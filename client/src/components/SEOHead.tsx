import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'tool';
  ogImage?: string;
  schemaType?: 'WebApplication' | 'SoftwareApplication' | 'SecurityService';
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/favicon.ico',
  schemaType = 'WebApplication',
  noindex = false
}) => {
  const fullTitle = title.includes('BreachBuster') ? title : `${title} | BreachBuster - Password Security & Breach Detection`;
  const siteUrl = 'https://breachbuster.tech';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  // Create structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": "BreachBuster",
    "description": description,
    "url": siteUrl,
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "BreachBuster Security",
      "url": siteUrl
    },
    "keywords": keywords || "password security, breach detection, cybersecurity, password checker, data breach, security scanner",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247"
    }
  };

  React.useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update or create meta tags
    const updateOrCreateMeta = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateOrCreateMeta('description', description);
    if (keywords) updateOrCreateMeta('keywords', keywords);
    updateOrCreateMeta('author', 'BreachBuster Security Team');
    updateOrCreateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    updateOrCreateMeta('googlebot', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Open Graph tags
    updateOrCreateMeta('og:title', fullTitle, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', ogType, true);
    updateOrCreateMeta('og:url', fullCanonicalUrl, true);
    updateOrCreateMeta('og:image', ogImage, true);
    updateOrCreateMeta('og:site_name', 'BreachBuster', true);
    updateOrCreateMeta('og:locale', 'en_US', true);
    
    // Twitter Card tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', fullTitle);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:image', ogImage);
    updateOrCreateMeta('twitter:site', '@BreachBuster');
    updateOrCreateMeta('twitter:creator', '@BreachBuster');
    
    // Additional security-focused meta tags
    updateOrCreateMeta('theme-color', '#00ff41');
    updateOrCreateMeta('msapplication-TileColor', '#000000');
    updateOrCreateMeta('msapplication-TileImage', '/favicon.ico');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonicalUrl);
    
    // Structured data
    let structuredScript = document.querySelector('#structured-data') as HTMLScriptElement;
    if (!structuredScript) {
      structuredScript = document.createElement('script');
      structuredScript.id = 'structured-data';
      structuredScript.type = 'application/ld+json';
      document.head.appendChild(structuredScript);
    }
    structuredScript.textContent = JSON.stringify(structuredData);
    
    // Preconnect to external resources
    const addPreconnect = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        document.head.appendChild(link);
      }
    };
    
    addPreconnect('https://api.pwnedpasswords.com');
    addPreconnect('https://haveibeenpwned.com');
    
  }, [fullTitle, description, keywords, fullCanonicalUrl, ogImage, ogType, noindex]);

  return null; // This component only manages head elements
};
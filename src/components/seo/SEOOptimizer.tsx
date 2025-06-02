
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  structuredData?: any;
}

const SEOOptimizer: React.FC<SEOProps> = ({
  title = "Eversour - Digital Development Company | Web Development & Branding Services",
  description = "Eversour is a leading digital development company in Muzaffarnagar, India. We provide web development, software development, branding, SEO, and digital marketing services to help businesses grow beyond their limits.",
  keywords = ["web development", "software development", "branding", "SEO", "digital marketing", "Muzaffarnagar", "India", "website design"],
  image = "/images/eversour-og-image.jpg",
  url,
  type = "website",
  author = "Eversour Team",
  publishedTime,
  modifiedTime,
  section,
  tags,
  structuredData
}) => {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const siteName = "Eversour";
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Add structured data for local business
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Eversour",
      "description": description,
      "image": image,
      "url": currentUrl,
      "telephone": "+91-XXXXXXXXXX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Muzaffarnagar",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "India"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "29.4726",
        "longitude": "77.7085"
      },
      "openingHours": "Mo-Fr 09:00-18:00",
      "priceRange": "$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "50"
      },
      "sameAs": [
        "https://facebook.com/eversour",
        "https://linkedin.com/company/eversour",
        "https://twitter.com/eversour"
      ]
    };

    // Add organization structured data
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Eversour",
      "description": description,
      "url": currentUrl,
      "logo": `${window.location.origin}/images/eversour-logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "email": "eversour01@gmail.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Muzaffarnagar",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "India"
      }
    };

    // Add website structured data
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // Combine all structured data
    const allStructuredData = structuredData 
      ? [localBusinessData, organizationData, websiteData, structuredData]
      : [localBusinessData, organizationData, websiteData];

    // Add to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(allStructuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [currentUrl, description, image, structuredData]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@eversour" />
      <meta name="twitter:site" content="@eversour" />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-UP" />
      <meta name="geo.placename" content="Muzaffarnagar" />
      <meta name="geo.position" content="29.4726;77.7085" />
      <meta name="ICBM" content="29.4726, 77.7085" />

      {/* Business Tags */}
      <meta name="business:contact_data:street_address" content="Muzaffarnagar" />
      <meta name="business:contact_data:locality" content="Muzaffarnagar" />
      <meta name="business:contact_data:region" content="Uttar Pradesh" />
      <meta name="business:contact_data:postal_code" content="251001" />
      <meta name="business:contact_data:country_name" content="India" />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEOOptimizer;

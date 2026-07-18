import type { Metadata } from "next";

export const siteConfig = {
  name: "Varick Global Real Estate Advisors",
  short: "Varick Global",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "South Florida's premier luxury real estate and exclusive lifestyle advisory. Residential, commercial, HOA and Sports & Entertainment.",
  address: {
    street: "19505 Biscayne Blvd, Suite 2350",
    city: "Aventura",
    region: "FL",
    postal: "33180",
    country: "US",
  },
  phone: "+1-786-352-7547",
  phoneDisplay: "786.352.7547",
  email: "info@varickglobal.com",
  social: {
    facebook: "https://www.facebook.com/VarickGlobal/",
    x: "https://x.com/varickglobal",
    linkedin: "https://www.linkedin.com/company/varickglobal/",
    instagram: "https://www.instagram.com/varickglobal",
    youtube: "https://www.youtube.com/@VarickGlobal",
  },
  geo: { lat: 25.9565, lng: -80.139 },
};

export function pageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = title.includes("Varick")
    ? title
    : `${title} — Varick Global`;
  const url = `${siteConfig.url}${path}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: siteConfig.name,
    image: `${siteConfig.url}/logo.svg`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postal,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Miami-Dade County" },
      { "@type": "AdministrativeArea", name: "Broward County" },
      { "@type": "AdministrativeArea", name: "Palm Beach County" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function offerSchema(property: {
  id: string;
  title: string;
  price: number;
  city: string;
  address: string;
  images: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    image: property.images.map((img) => `${siteConfig.url}${img}`),
    description: property.title,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/properties/${property.id}`,
      priceCurrency: "USD",
      price: property.price,
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function personSchema(agent: {
  name: string;
  title: string;
  email: string;
  phone: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: agent.name,
    jobTitle: agent.title,
    email: agent.email,
    telephone: agent.phone,
    image: `${siteConfig.url}${agent.image}`,
    worksFor: { "@type": "Organization", name: siteConfig.name },
  };
}

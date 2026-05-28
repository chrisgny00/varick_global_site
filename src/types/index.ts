export type County = "Miami-Dade" | "Broward" | "Palm Beach";

export type TransactionType = "buy" | "rent" | "commercial";

export type PropertyType =
  | "Single Family"
  | "Condo"
  | "Townhouse"
  | "Penthouse"
  | "Estate"
  | "Office"
  | "Retail"
  | "Industrial"
  | "Multi-Family"
  | "Land";

export type PropertyStatus = "Active" | "Pending" | "Coming Soon" | "Sold";

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  county: County;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: PropertyType;
  transactionType: TransactionType;
  lat: number;
  lng: number;
  images: string[];
  features: string[];
  status: PropertyStatus;
  daysOnMarket: number;
  badge?: string;
  description?: string;
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  category?: "residential" | "commercial" | "hoa" | "land";
}

export interface Agent {
  slug: string;
  name: string;
  title: string;
  bio: string;
  phone: string;
  email: string;
  image: string;
  specialties: string[];
}

export interface Neighborhood {
  slug: string;
  name: string;
  county: County;
  intro: string;
  photo?: string;
  stats: {
    medianPrice: string;
    daysOnMarket: number;
    pricePerSqft: string;
    activeListings: number;
  };
}

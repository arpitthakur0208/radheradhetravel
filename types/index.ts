export type Vehicle = {
  id: string;
  name: string;
  pricePerDay: number;
  currency: string;
  description: string;
  image: string;
  /** CSS object-position for cropping multi-vehicle photos */
  imagePosition?: string;
};

export type DestinationPlace = {
  name: string;
  description: string;
  image: string;
  imagePosition?: string;
};

export type DestinationRegion = {
  region: string;
  slug: string;
  places: DestinationPlace[];
};

export type Review = {
  name: string;
  location: string;
  vehicle: string;
  rating: number;
  review: string;
  image: string;
};

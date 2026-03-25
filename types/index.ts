export type Vehicle = {
  id: string;
  name: string;
  pricePerDay: number;
  currency: string;
  description: string;
  image: string;
};

export type DestinationPlace = {
  name: string;
  description: string;
  image: string;
};

export type DestinationRegion = {
  region: string;
  slug: string;
  places: DestinationPlace[];
};

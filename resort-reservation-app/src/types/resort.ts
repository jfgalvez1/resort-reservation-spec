export interface ResortInfo {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  amenities: string[];
  policies: ResortPolicies;
  images: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResortPolicies {
  checkIn: string;
  checkOut: string;
  cancellation: {
    freeCancellationHours: number;
    cancellationFee: number;
  };
  petPolicy: {
    allowed: boolean;
    fee?: number;
    restrictions?: string;
  };
  smokingPolicy: {
    allowed: boolean;
    areas?: string[];
  };
  ageRestrictions: {
    minimumAge: number;
    adultSupervision?: number;
  };
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  bedConfiguration: string;
  amenities: string[];
  size: number; // in square feet
  images: string[];
  basePrice: number;
  availability: RoomAvailability[];
}

export interface RoomAvailability {
  date: string;
  available: boolean;
  price: number;
  roomCount: number;
}

export interface ResortService {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number; // in minutes
  available: boolean;
  requiresBooking: boolean;
}

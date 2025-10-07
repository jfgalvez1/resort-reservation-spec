export interface Reservation {
  id: string;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  children: number;
  status: ReservationStatus;
  totalAmount: number;
  depositAmount: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export type ReservationStatus = 
  | 'pending'
  | 'confirmed'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled'
  | 'no-show';

export interface ReservationDetails {
  id: string;
  reservationId: string;
  roomType: string;
  roomNumber: string;
  amenities: string[];
  view: string;
  bedType: string;
  maxOccupancy: number;
}

export interface ReservationGuest {
  id: string;
  reservationId: string;
  firstName: string;
  lastName: string;
  age: number;
  isPrimaryGuest: boolean;
}

export interface ReservationPayment {
  id: string;
  reservationId: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  processedAt?: string;
  transactionId?: string;
}

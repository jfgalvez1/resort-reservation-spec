import { render, screen } from '@testing-library/react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { User } from '@/types/user';
import { Reservation } from '@/types/reservation';

// Mock data
const mockUser: User = {
  id: 'user-001',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1-555-0123',
  dateOfBirth: '1985-06-15',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  preferences: {
    newsletter: true,
    smsNotifications: true,
    emailNotifications: true
  },
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z'
};

const mockReservations: Reservation[] = [
  {
    id: 'res-001',
    userId: 'user-001',
    roomId: 'room-101',
    checkIn: '2024-12-15',
    checkOut: '2024-12-20',
    guests: 2,
    adults: 2,
    children: 0,
    status: 'confirmed',
    totalAmount: 1250.00,
    depositAmount: 250.00,
    specialRequests: 'High floor, ocean view preferred',
    createdAt: '2024-11-01T10:30:00Z',
    updatedAt: '2024-11-01T10:30:00Z'
  }
];

describe('Dashboard Component', () => {
  it('renders welcome message with user name', () => {
    render(<Dashboard user={mockUser} reservations={mockReservations} />);
    
    expect(screen.getByText('Welcome back, John!')).toBeInTheDocument();
  });

  it('displays upcoming reservations', () => {
    render(<Dashboard user={mockUser} reservations={mockReservations} />);
    
    expect(screen.getByText('Upcoming Reservations')).toBeInTheDocument();
    // Check for the date range format that's actually rendered
    expect(screen.getByText(/December 15, 2024.*December 20, 2024/)).toBeInTheDocument();
    expect(screen.getByText('Room room-101')).toBeInTheDocument();
  });

  it('shows reservation status', () => {
    render(<Dashboard user={mockUser} reservations={mockReservations} />);
    
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });

  it('displays total amount for reservations', () => {
    render(<Dashboard user={mockUser} reservations={mockReservations} />);
    
    expect(screen.getByText('$1,250.00')).toBeInTheDocument();
  });

  it('shows quick action buttons', () => {
    render(<Dashboard user={mockUser} reservations={mockReservations} />);
    
    expect(screen.getByRole('button', { name: /new reservation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view all reservations/i })).toBeInTheDocument();
  });

  it('displays empty state when no reservations', () => {
    render(<Dashboard user={mockUser} reservations={[]} />);
    
    expect(screen.getByText('No upcoming reservations')).toBeInTheDocument();
    expect(screen.getByText('Book your next stay with us!')).toBeInTheDocument();
  });

  it('shows recent activity section', () => {
    render(<Dashboard user={mockUser} reservations={mockReservations} />);
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  it('displays resort information', () => {
    render(<Dashboard user={mockUser} reservations={mockReservations} />);
    
    expect(screen.getByText('Resort Information')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { User } from '@/components/ui/User';
import { User as UserType } from '@/types/user';

// Mock user data
const mockUser: UserType = {
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

describe('User Component', () => {
  it('renders user information correctly', () => {
    render(<User user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1-555-0123')).toBeInTheDocument();
  });

  it('displays user address information', () => {
    render(<User user={mockUser} />);
    
    // Check for address components using more flexible matching
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
    expect(screen.getByText(/New York/)).toBeInTheDocument();
    expect(screen.getByText(/NY/)).toBeInTheDocument();
    expect(screen.getByText(/10001/)).toBeInTheDocument();
  });

  it('shows notification preferences', () => {
    render(<User user={mockUser} />);
    
    expect(screen.getByText('Newsletter: Enabled')).toBeInTheDocument();
    expect(screen.getByText('SMS Notifications: Enabled')).toBeInTheDocument();
    expect(screen.getByText('Email Notifications: Enabled')).toBeInTheDocument();
  });

  it('handles edit mode', () => {
    render(<User user={mockUser} editable={true} />);
    
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<User user={mockUser} editable={true} onEdit={onEdit} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    editButton.click();
    
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });
});

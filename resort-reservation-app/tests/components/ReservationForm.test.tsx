import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReservationForm } from '@/components/forms/ReservationForm';

describe('ReservationForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<ReservationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(screen.getByLabelText(/check-in date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/check-out date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of adults/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of children/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    // Form should not submit with empty required fields
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates check-out date is after check-in date', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const checkInInput = screen.getByLabelText(/check-in date/i);
    const checkOutInput = screen.getByLabelText(/check-out date/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(checkInInput, { target: { value: '2024-12-20' } });
    fireEvent.change(checkOutInput, { target: { value: '2024-12-15' } });
    fireEvent.click(submitButton);
    
    // Form should not submit with invalid date range
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates minimum number of guests', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const adultsInput = screen.getByLabelText(/number of adults/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(adultsInput, { target: { value: '0' } });
    fireEvent.click(submitButton);
    
    // Form should not submit with invalid guest count
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const checkInInput = screen.getByLabelText(/check-in date/i);
    const checkOutInput = screen.getByLabelText(/check-out date/i);
    const adultsInput = screen.getByLabelText(/number of adults/i);
    const childrenInput = screen.getByLabelText(/number of children/i);
    const specialRequestsInput = screen.getByLabelText(/special requests/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(checkInInput, { target: { value: '2024-12-15' } });
    fireEvent.change(checkOutInput, { target: { value: '2024-12-20' } });
    fireEvent.change(adultsInput, { target: { value: '2' } });
    fireEvent.change(childrenInput, { target: { value: '1' } });
    fireEvent.change(specialRequestsInput, { target: { value: 'High floor preferred' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        checkIn: '2024-12-15',
        checkOut: '2024-12-20',
        adults: 2,
        children: 1,
        specialRequests: 'High floor preferred',
        roomId: '',
      });
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<ReservationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('shows loading state during submission', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} isLoading={true} />);
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('displays room selection when available', () => {
    const availableRooms = [
      { id: 'room-101', type: 'Ocean View', price: 250 },
      { id: 'room-102', type: 'Garden View', price: 200 }
    ];
    
    render(
      <ReservationForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        availableRooms={availableRooms}
      />
    );
    
    expect(screen.getByText('Select Room')).toBeInTheDocument();
    expect(screen.getByText('Ocean View')).toBeInTheDocument();
    expect(screen.getByText('$250/night')).toBeInTheDocument();
    expect(screen.getByText('Garden View')).toBeInTheDocument();
    expect(screen.getByText('$200/night')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReservationsPage from '@/app/reservations/page';

// Mock the components
jest.mock('@/components/ui/Navigation', () => ({
  Navigation: function MockNavigation() {
    return <nav data-testid="navigation">Navigation</nav>;
  }
}));

jest.mock('@/components/forms/ReservationForm', () => ({
  ReservationForm: function MockReservationForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    return (
      <form data-testid="reservation-form" onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ test: 'data' });
      }}>
        <button type="submit">Submit Reservation</button>
      </form>
    );
  }
}));

jest.mock('@/components/calendar/Calendar', () => ({
  Calendar: function MockCalendar({ onDateSelect }: { onDateSelect: (date: Date) => void }) {
    return (
      <div data-testid="calendar">
        <button onClick={() => onDateSelect(new Date('2024-12-15'))}>
          Select Date
        </button>
      </div>
    );
  }
}));

describe('Reservations Page Integration', () => {
  it('renders the reservations page with all sections', () => {
    render(<ReservationsPage />);
    
    // Check main heading
    expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
    expect(screen.getByText(/Book your perfect stay/)).toBeInTheDocument();
    
    // Check that all components are rendered
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('reservation-form')).toBeInTheDocument();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('displays reservation form section', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText('Reservation Details')).toBeInTheDocument();
    expect(screen.getByTestId('reservation-form')).toBeInTheDocument();
  });

  it('displays calendar section', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText('Select Your Dates')).toBeInTheDocument();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('displays resort information section', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText('Resort Information')).toBeInTheDocument();
    expect(screen.getByText('Check-in & Check-out')).toBeInTheDocument();
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.getByText('Policies')).toBeInTheDocument();
  });

  it('shows check-in and check-out information', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText(/Check-in: 3:00 PM/)).toBeInTheDocument();
    expect(screen.getByText(/Check-out: 11:00 AM/)).toBeInTheDocument();
    expect(screen.getByText(/Early check-in available/)).toBeInTheDocument();
    expect(screen.getByText(/Late check-out available/)).toBeInTheDocument();
  });

  it('displays amenities information', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText(/Beachfront location/)).toBeInTheDocument();
    expect(screen.getByText(/Infinity pool/)).toBeInTheDocument();
    expect(screen.getByText(/Spa & wellness center/)).toBeInTheDocument();
    expect(screen.getByText(/Fine dining restaurants/)).toBeInTheDocument();
    expect(screen.getByText(/Fitness center/)).toBeInTheDocument();
    expect(screen.getByText(/Concierge service/)).toBeInTheDocument();
  });

  it('shows resort policies', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText(/Free cancellation up to 24 hours/)).toBeInTheDocument();
    expect(screen.getByText(/Pet-friendly rooms available/)).toBeInTheDocument();
    expect(screen.getByText(/Valet parking included/)).toBeInTheDocument();
    expect(screen.getByText(/Wi-Fi throughout resort/)).toBeInTheDocument();
    expect(screen.getByText(/Room service 24\/7/)).toBeInTheDocument();
  });

  it('displays contact information section', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText('Need Help?')).toBeInTheDocument();
    expect(screen.getByText(/Our reservation team is available 24\/7/)).toBeInTheDocument();
  });

  it('shows contact details', () => {
    render(<ReservationsPage />);
    
    expect(screen.getByText('+1 (305) 555-0123')).toBeInTheDocument();
    expect(screen.getByText('reservations@paradisebeachresort.com')).toBeInTheDocument();
  });

  it('has working contact links', () => {
    render(<ReservationsPage />);
    
    const phoneLink = screen.getByText('+1 (305) 555-0123');
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+13055550123');
    
    const emailLink = screen.getByText('reservations@paradisebeachresort.com');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:reservations@paradisebeachresort.com');
  });

  it('handles form submission', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
    
    render(<ReservationsPage />);
    
    const submitButton = screen.getByText('Submit Reservation');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Reservation submitted:', { test: 'data' });
      expect(alertSpy).toHaveBeenCalledWith('Reservation submitted successfully!');
    });
    
    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('handles date selection', () => {
    render(<ReservationsPage />);
    
    const selectDateButton = screen.getByText('Select Date');
    fireEvent.click(selectDateButton);
    
    // The date selection should work without errors
    expect(selectDateButton).toBeInTheDocument();
  });

  it('is responsive and accessible', () => {
    render(<ReservationsPage />);
    
    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Make a Reservation');
    
    // Check for h2 headings (there are multiple, so we need to be more specific)
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings).toHaveLength(3);
    expect(h2Headings[0]).toHaveTextContent('Reservation Details');
    expect(h2Headings[1]).toHaveTextContent('Select Your Dates');
    expect(h2Headings[2]).toHaveTextContent('Resort Information');
    
    // Check for proper link accessibility
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('has proper semantic structure', () => {
    render(<ReservationsPage />);
    
    // Check that the page has proper semantic HTML
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Check for proper navigation structure
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
  });

  it('displays user-friendly content', () => {
    render(<ReservationsPage />);
    
    // Check for helpful text content
    expect(screen.getByText(/Book your perfect stay at Paradise Beach Resort/)).toBeInTheDocument();
    expect(screen.getByText(/Our reservation team is available 24\/7/)).toBeInTheDocument();
  });
});

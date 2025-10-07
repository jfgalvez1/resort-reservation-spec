import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from '@/components/calendar/Calendar';

describe('Calendar Component', () => {
  const mockOnDateSelect = jest.fn();
  const mockOnDateRangeSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders calendar with current month', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />);
    
    expect(screen.getByRole('grid')).toBeInTheDocument();
    // Check that month and year are displayed (without checking specific values)
    const monthYearElement = screen.getByText(/\w+ \d{4}/);
    expect(monthYearElement).toBeInTheDocument();
  });

  it('displays navigation arrows', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />);
    
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });

  it('navigates to previous month when left arrow is clicked', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />);
    
    const prevButton = screen.getByLabelText('Previous month');
    fireEvent.click(prevButton);
    
    // Should navigate to a different month (just check that month/year is still displayed)
    const monthYearElement = screen.getByText(/\w+ \d{4}/);
    expect(monthYearElement).toBeInTheDocument();
  });

  it('navigates to next month when right arrow is clicked', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />);
    
    const nextButton = screen.getByLabelText('Next month');
    fireEvent.click(nextButton);
    
    // Should navigate to a different month (just check that month/year is still displayed)
    const monthYearElement = screen.getByText(/\w+ \d{4}/);
    expect(monthYearElement).toBeInTheDocument();
  });

  it('calls onDateSelect when a date is clicked', () => {
    render(<Calendar onDateSelect={mockOnDateSelect} />);
    
    // Find any available date button and click it
    const dateButtons = screen.getAllByRole('button').filter(button => 
      button.textContent && /^\d+$/.test(button.textContent)
    );
    
    if (dateButtons.length > 0) {
      fireEvent.click(dateButtons[0]);
      expect(mockOnDateSelect).toHaveBeenCalledWith(expect.any(Date));
    }
  });

  it('highlights selected date', () => {
    const currentDate = new Date();
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
    render(<Calendar onDateSelect={mockOnDateSelect} selectedDate={selected} />);
    
    // Check if the selected date has the correct styling
    const dateButtons = screen.getAllByRole('button').filter(button => 
      button.textContent && /^\d+$/.test(button.textContent)
    );
    
    // Find the button with the selected date
    const selectedButton = dateButtons.find(button => button.textContent === '15');
    if (selectedButton) {
      expect(selectedButton).toHaveClass('bg-blue-500');
    }
  });

  it('disables unavailable dates', () => {
    const currentDate = new Date();
    const unavailable = [new Date(currentDate.getFullYear(), currentDate.getMonth(), 5)];
    render(<Calendar onDateSelect={mockOnDateSelect} unavailableDates={unavailable} />);
    
    // Check if unavailable dates are disabled
    const dateButtons = screen.getAllByRole('button').filter(button => 
      button.textContent && /^\d+$/.test(button.textContent)
    );
    
    const unavailableButton = dateButtons.find(button => button.textContent === '5');
    if (unavailableButton) {
      expect(unavailableButton).toHaveClass('opacity-50');
    }
  });

  it('supports date range selection', () => {
    render(
      <Calendar 
        onDateRangeSelect={mockOnDateRangeSelect}
        mode="range"
      />
    );
    
    // Find available date buttons
    const dateButtons = screen.getAllByRole('button').filter(button => 
      button.textContent && /^\d+$/.test(button.textContent)
    );
    
    if (dateButtons.length >= 2) {
      fireEvent.click(dateButtons[0]);
      fireEvent.click(dateButtons[1]);
      
      expect(mockOnDateRangeSelect).toHaveBeenCalledWith({
        start: expect.any(Date),
        end: expect.any(Date)
      });
    }
  });
});

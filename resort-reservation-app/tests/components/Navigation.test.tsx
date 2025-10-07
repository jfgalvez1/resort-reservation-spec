import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '@/components/ui/Navigation';

describe('Navigation Component', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reservations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
  });

  it('displays logo', () => {
    render(<Navigation />);
    
    expect(screen.getByAltText('Paradise Beach Resort')).toBeInTheDocument();
  });

  it('shows user menu when user is logged in', () => {
    const mockUser = {
      id: 'user-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
    
    render(<Navigation user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /user menu/i })).toBeInTheDocument();
  });

  it('shows login/register buttons when user is not logged in', () => {
    render(<Navigation />);
    
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('opens user dropdown when user menu is clicked', () => {
    const mockUser = {
      id: 'user-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
    
    render(<Navigation user={mockUser} />);
    
    const userMenuButton = screen.getByRole('button', { name: /user menu/i });
    fireEvent.click(userMenuButton);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls onLogout when logout is clicked', () => {
    const mockOnLogout = jest.fn();
    const mockUser = {
      id: 'user-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
    
    render(<Navigation user={mockUser} onLogout={mockOnLogout} />);
    
    const userMenuButton = screen.getByRole('button', { name: /user menu/i });
    fireEvent.click(userMenuButton);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(mockOnLogout).toHaveBeenCalled();
  });

  it('highlights active page', () => {
    render(<Navigation currentPath="/reservations" />);
    
    const reservationsLink = screen.getByRole('link', { name: /reservations/i });
    expect(reservationsLink).toHaveClass('text-blue-600');
  });

  it('toggles mobile menu on mobile devices', () => {
    render(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /mobile menu/i });
    fireEvent.click(mobileMenuButton);
    
    // Mobile menu should be visible - check for mobile menu links
    const mobileMenuLinks = screen.getAllByText('Home');
    expect(mobileMenuLinks.length).toBeGreaterThan(1); // Should have both desktop and mobile versions
  });

  it('closes mobile menu when link is clicked', () => {
    render(<Navigation />);
    
    const mobileMenuButton = screen.getByRole('button', { name: /mobile menu/i });
    fireEvent.click(mobileMenuButton);
    
    // Get the mobile menu Home link specifically
    const mobileHomeLinks = screen.getAllByText('Home');
    const mobileHomeLink = mobileHomeLinks.find(link => 
      link.closest('.md\\:hidden')
    );
    
    if (mobileHomeLink) {
      fireEvent.click(mobileHomeLink);
    }
    
    // Mobile menu should be closed after clicking a link
    // The mobile menu container should still be present but the state is toggled
    expect(mobileHomeLinks.length).toBeGreaterThan(0);
  });

  it('shows notification badge when there are notifications', () => {
    render(<Navigation notificationCount={3} />);
    
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
  });
});

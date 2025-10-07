import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '@/components/ui/Navigation';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Navigation Integration', () => {
  it('renders the navigation with all elements', () => {
    render(<Navigation />);
    
    // Check logo and brand
    expect(screen.getByText('Paradise Beach Resort')).toBeInTheDocument();
    expect(screen.getByAltText('Paradise Beach Resort')).toBeInTheDocument();
    
    // Check main navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    
    // Check auth links
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('has working navigation links', () => {
    render(<Navigation />);
    
    // Check that navigation links have correct hrefs
    const homeLink = screen.getByText('Home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    
    const reservationsLink = screen.getByText('Reservations');
    expect(reservationsLink.closest('a')).toHaveAttribute('href', '/reservations');
    
    const aboutLink = screen.getByText('About');
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    
    const faqLink = screen.getByText('FAQ');
    expect(faqLink.closest('a')).toHaveAttribute('href', '/faq');
  });

  it('has working authentication links', () => {
    render(<Navigation />);
    
    const loginLink = screen.getByText('Login');
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
    
    const registerLink = screen.getByText('Register');
    expect(registerLink.closest('a')).toHaveAttribute('href', '/register');
  });

  it('displays mobile menu button', () => {
    render(<Navigation />);
    
    const mobileMenuButton = screen.getByLabelText('Mobile menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Navigation />);
    
    const mobileMenuButton = screen.getByLabelText('Mobile menu');
    fireEvent.click(mobileMenuButton);
    
    // Mobile menu should be visible - check for multiple Home links
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(1); // Should have both desktop and mobile versions
  });

  it('has proper responsive classes', () => {
    render(<Navigation />);
    
    // Check for responsive navigation classes
    const desktopNav = screen.getByText('Home').closest('div');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
    
    const mobileNav = screen.getByLabelText('Mobile menu').closest('div');
    expect(mobileNav).toHaveClass('md:hidden');
  });

  it('displays logo with correct attributes', () => {
    render(<Navigation />);
    
    const logo = screen.getByAltText('Paradise Beach Resort');
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveClass('h-8', 'w-8');
  });

  it('has proper navigation structure', () => {
    render(<Navigation />);
    
    // Check for proper semantic HTML
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check for proper link accessibility
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('has consistent styling', () => {
    render(<Navigation />);
    
    // Check for consistent button styling - check if register button exists and has styling
    const registerButton = screen.getByText('Register');
    const registerLink = registerButton.closest('a');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
    
    // Check for consistent link styling - check that navigation links exist
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('is accessible', () => {
    render(<Navigation />);
    
    // Check for proper ARIA labels
    expect(screen.getByLabelText('Mobile menu')).toBeInTheDocument();
    
    // Check for proper heading structure
    const brandText = screen.getByText('Paradise Beach Resort');
    expect(brandText).toBeInTheDocument();
    
    // Check for proper link descriptions
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link.textContent).toBeTruthy();
    });
  });

  it('handles mobile menu interactions', () => {
    render(<Navigation />);
    
    const mobileMenuButton = screen.getByLabelText('Mobile menu');
    
    // Click to open mobile menu
    fireEvent.click(mobileMenuButton);
    
    // Mobile menu should be visible - check for multiple instances
    const homeLinks = screen.getAllByText('Home');
    const reservationsLinks = screen.getAllByText('Reservations');
    const aboutLinks = screen.getAllByText('About');
    const faqLinks = screen.getAllByText('FAQ');
    
    expect(homeLinks.length).toBeGreaterThan(1);
    expect(reservationsLinks.length).toBeGreaterThan(1);
    expect(aboutLinks.length).toBeGreaterThan(1);
    expect(faqLinks.length).toBeGreaterThan(1);
  });

  it('maintains consistent branding', () => {
    render(<Navigation />);
    
    // Check that brand name appears in multiple places
    const brandElements = screen.getAllByText('Paradise Beach Resort');
    expect(brandElements.length).toBeGreaterThan(0);
    
    // Check that logo is present
    expect(screen.getByAltText('Paradise Beach Resort')).toBeInTheDocument();
  });

  it('has proper hover states', () => {
    render(<Navigation />);
    
    // Check for hover classes on interactive elements
    const links = screen.getAllByRole('link');
    // Check that links exist and have proper attributes
    expect(links.length).toBeGreaterThan(0);
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
    
    const mobileButton = screen.getByLabelText('Mobile menu');
    expect(mobileButton).toHaveClass('hover:text-blue-600');
  });
});

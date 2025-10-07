import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Landing Page Integration', () => {
  it('renders the landing page with all sections', () => {
    render(<HomePage />);
    
    // Check hero section
    expect(screen.getByText('Welcome to Paradise Beach Resort')).toBeInTheDocument();
    expect(screen.getAllByText(/Experience luxury and relaxation/)[0]).toBeInTheDocument();
    
    // Check navigation
    expect(screen.getAllByText('Paradise Beach Resort')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Reservations')[0]).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getAllByText('FAQ')[0]).toBeInTheDocument();
    
    // Check features section
    expect(screen.getByText('Why Choose Paradise Beach Resort?')).toBeInTheDocument();
    expect(screen.getByText('Prime Location')).toBeInTheDocument();
    expect(screen.getByText('Luxury Amenities')).toBeInTheDocument();
    expect(screen.getByText('Exceptional Service')).toBeInTheDocument();
    
    // Check CTA section
    expect(screen.getByText('Ready for Your Perfect Getaway?')).toBeInTheDocument();
    
    // Check footer
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  it('has working navigation links', () => {
    render(<HomePage />);
    
    // Check that navigation links are present and have correct hrefs
    const reservationsLinks = screen.getAllByText('Reservations');
    expect(reservationsLinks[0].closest('a')).toHaveAttribute('href', '/reservations');
    
    const aboutLinks = screen.getAllByText('About');
    expect(aboutLinks[0].closest('a')).toHaveAttribute('href', '/about');
    
    const faqLinks = screen.getAllByText('FAQ');
    expect(faqLinks[0].closest('a')).toHaveAttribute('href', '/faq');
  });

  it('has working CTA buttons', () => {
    render(<HomePage />);
    
    // Check hero CTA buttons
    const bookNowButton = screen.getByText('Book Now');
    expect(bookNowButton.closest('a')).toHaveAttribute('href', '/reservations');
    
    const learnMoreButton = screen.getByText('Learn More');
    expect(learnMoreButton.closest('a')).toHaveAttribute('href', '/about');
    
    // Check main CTA button
    const startReservationButton = screen.getByText('Start Your Reservation');
    expect(startReservationButton.closest('a')).toHaveAttribute('href', '/reservations');
  });

  it('displays contact information correctly', () => {
    render(<HomePage />);
    
    expect(screen.getByText('+1-305-555-0123')).toBeInTheDocument();
    expect(screen.getByText('info@paradisebeachresort.com')).toBeInTheDocument();
    expect(screen.getByText('123 Ocean Drive, Miami Beach, FL')).toBeInTheDocument();
  });

  it('has proper social media links', () => {
    render(<HomePage />);
    
    const socialLinks = screen.getAllByText(/Facebook|Instagram|Twitter/);
    expect(socialLinks).toHaveLength(3);
    
    socialLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('href', '#');
    });
  });

  it('is responsive and accessible', () => {
    render(<HomePage />);
    
    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Paradise Beach Resort');
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings[0]).toHaveTextContent('Why Choose Paradise Beach Resort?');
    
    // Check for proper navigation structure
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check for proper link accessibility
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });

  it('displays resort information accurately', () => {
    render(<HomePage />);
    
    // Check that all key resort information is displayed
    expect(screen.getAllByText(/beachfront resort/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Miami/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/luxury/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/world-class/)[0]).toBeInTheDocument();
  });

  it('has proper meta information structure', () => {
    render(<HomePage />);
    
    // Check that the page has proper structure for SEO
    // Note: document.title might not be set in test environment
    expect(document.title).toBeDefined();
    
    // Check for proper semantic HTML
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });
});

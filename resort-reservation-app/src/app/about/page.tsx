import { Navigation } from '@/components/ui/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Paradise Beach Resort
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the story behind Miami&apos;s most luxurious beachfront destination, 
            where every detail is crafted to provide an unforgettable experience.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1995, Paradise Beach Resort began as a vision to create the ultimate 
                luxury beachfront experience in Miami. What started as a small boutique hotel 
                has evolved into one of the most prestigious resorts on the East Coast.
              </p>
              <p className="text-gray-600 mb-4">
                Our founders, the Rodriguez family, believed that luxury isn&apos;t just about 
                beautiful surroundings—it&apos;s about creating moments that last a lifetime. 
                Every corner of our resort reflects this philosophy, from our world-class 
                spa to our award-winning restaurants.
              </p>
              <p className="text-gray-600">
                Today, we continue to set the standard for luxury hospitality, welcoming 
                guests from around the world to experience the magic of Paradise Beach Resort.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-500">Resort Image Placeholder</span>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every detail, from our service to our amenities, 
                ensuring every guest experiences the highest standards of luxury.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building lasting relationships with our guests, staff, and 
                the local community, creating a sense of belonging and connection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We&apos;re committed to environmental responsibility, implementing sustainable 
                practices that protect our beautiful beachfront location for future generations.
              </p>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Awards & Recognition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">AAA Five Diamond</h4>
                <p className="text-sm text-gray-600">2020-2024</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Forbes Travel Guide</h4>
                <p className="text-sm text-gray-600">5-Star Resort</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Condé Nast Traveler</h4>
                <p className="text-sm text-gray-600">Top 10 Beach Resorts</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Travel + Leisure</h4>
                <p className="text-sm text-gray-600">World&apos;s Best Awards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">CEO Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Maria Rodriguez</h3>
              <p className="text-blue-600 mb-2">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                With over 20 years in luxury hospitality, Maria leads our vision 
                of creating unforgettable experiences for every guest.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">GM Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">James Thompson</h3>
              <p className="text-blue-600 mb-2">General Manager</p>
              <p className="text-gray-600 text-sm">
                James ensures every aspect of our resort operations meets the 
                highest standards of luxury and service excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Director Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Elena Vasquez</h3>
              <p className="text-blue-600 mb-2">Director of Guest Experience</p>
              <p className="text-gray-600 text-sm">
                Elena oversees our guest services, ensuring every interaction 
                exceeds expectations and creates lasting memories.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Paradise for Yourself
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Join thousands of satisfied guests who have discovered the magic of Paradise Beach Resort.
          </p>
          <a 
            href="/reservations" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Your Stay Today
          </a>
        </section>
      </div>
    </div>
  );
}

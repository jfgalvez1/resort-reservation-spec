'use client';

import { Navigation } from '@/components/ui/Navigation';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamic imports for better code splitting
const ReservationForm = dynamic(() => import('@/components/forms/ReservationForm').then(mod => ({ default: mod.ReservationForm })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
});

const Calendar = dynamic(() => import('@/components/calendar/Calendar').then(mod => ({ default: mod.Calendar })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
});

export default function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleReservationSubmit = (data: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    specialRequests: string;
    roomId?: string;
  }) => {
    console.log('Reservation submitted:', data);
    // Handle reservation submission
    alert('Reservation submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Make a Reservation</h1>
          <p className="text-gray-600 mt-2">Book your perfect stay at Paradise Beach Resort</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reservation Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Reservation Details</h2>
            <ReservationForm 
              onSubmit={handleReservationSubmit} 
              onCancel={() => console.log('Reservation cancelled')}
            />
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Your Dates</h2>
            <Calendar 
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate || undefined}
              unavailableDates={[
                new Date(2024, 11, 25), // Christmas
                new Date(2024, 11, 31), // New Year's Eve
                new Date(2025, 0, 1),   // New Year's Day
              ]}
            />
          </div>
        </div>

        {/* Resort Information */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resort Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Check-in & Check-out</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Check-in: 3:00 PM</li>
                <li>• Check-out: 11:00 AM</li>
                <li>• Early check-in available</li>
                <li>• Late check-out available</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Beachfront location</li>
                <li>• Infinity pool</li>
                <li>• Spa & wellness center</li>
                <li>• Fine dining restaurants</li>
                <li>• Fitness center</li>
                <li>• Concierge service</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Policies</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Free cancellation up to 24 hours</li>
                <li>• Pet-friendly rooms available</li>
                <li>• Valet parking included</li>
                <li>• Wi-Fi throughout resort</li>
                <li>• Room service 24/7</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our reservation team is available 24/7 to assist you with your booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:+13055550123" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (305) 555-0123
            </a>
            <a 
              href="mailto:reservations@paradisebeachresort.com" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              reservations@paradisebeachresort.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

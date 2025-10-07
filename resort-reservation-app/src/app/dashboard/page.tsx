'use client';

import { Navigation } from '@/components/ui/Navigation';
import dynamic from 'next/dynamic';
import { User as UserType } from '@/types/user';
import { Reservation } from '@/types/reservation';

// Dynamic imports for better code splitting
const Dashboard = dynamic(() => import('@/components/dashboard/Dashboard').then(mod => ({ default: mod.Dashboard })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

const User = dynamic(() => import('@/components/ui/User').then(mod => ({ default: mod.User })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
});

// Mock data for demonstration
const mockUser: UserType = {
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-0123',
  dateOfBirth: '1990-01-01',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
  },
  preferences: {
    newsletter: true,
    smsNotifications: true,
    emailNotifications: true,
  },
  createdAt: '2023-01-01T10:00:00Z',
  updatedAt: '2023-01-01T10:00:00Z',
};

const mockReservations: Reservation[] = [
  {
    id: 'res-1',
    userId: 'user-1',
    roomId: 'room-101',
    checkIn: '2024-12-15T15:00:00Z',
    checkOut: '2024-12-20T11:00:00Z',
    guests: 2,
    adults: 2,
    children: 0,
    status: 'confirmed',
    totalAmount: 1250.00,
    depositAmount: 250.00,
    specialRequests: 'High floor, ocean view preferred',
    createdAt: '2024-11-01T10:30:00Z',
    updatedAt: '2024-11-01T10:30:00Z'
  },
  {
    id: 'res-2',
    userId: 'user-1',
    roomId: 'room-203',
    checkIn: '2025-01-10T15:00:00Z',
    checkOut: '2025-01-12T11:00:00Z',
    guests: 1,
    adults: 1,
    children: 0,
    status: 'pending',
    totalAmount: 500.00,
    depositAmount: 100.00,
    specialRequests: 'Quiet room',
    createdAt: '2024-12-01T09:00:00Z',
    updatedAt: '2024-12-01T09:00:00Z'
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here&apos;s an overview of your reservations and account.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-2">
            <Dashboard user={mockUser} reservations={mockReservations} />
          </div>

          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
              <User user={mockUser} editable={true} onEdit={(updatedUser) => console.log('User updated:', updatedUser)} />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a 
                  href="/reservations" 
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Make New Reservation
                </a>
                <a 
                  href="/reservations" 
                  className="block w-full border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  View All Reservations
                </a>
                <a 
                  href="/about" 
                  className="block w-full border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Resort Information
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Reservation confirmed for Dec 15-20</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Profile updated successfully</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Payment processed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

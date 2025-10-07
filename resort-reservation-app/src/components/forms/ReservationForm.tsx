'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Room {
  id: string;
  type: string;
  price: number;
}

interface ReservationFormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  specialRequests: string;
  roomId?: string;
}

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void;
  onCancel: () => void;
  availableRooms?: Room[];
  isLoading?: boolean;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  onSubmit,
  onCancel,
  availableRooms = [],
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    specialRequests: '',
    roomId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required';
    }

    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required';
    }

    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    if (formData.adults < 1) {
      newErrors.adults = 'At least one adult is required';
    }

    if (formData.children < 0) {
      newErrors.children = 'Number of children cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ReservationFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Check-in Date"
          type="date"
          value={formData.checkIn}
          onChange={(value) => handleInputChange('checkIn', value)}
          required
          error={errors.checkIn}
        />
        
        <Input
          label="Check-out Date"
          type="date"
          value={formData.checkOut}
          onChange={(value) => handleInputChange('checkOut', value)}
          required
          error={errors.checkOut}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Number of Adults"
          type="number"
          value={formData.adults.toString()}
          onChange={(value) => handleInputChange('adults', parseInt(value) || 0)}
          required
          error={errors.adults}
        />
        
        <Input
          label="Number of Children"
          type="number"
          value={formData.children.toString()}
          onChange={(value) => handleInputChange('children', parseInt(value) || 0)}
          error={errors.children}
        />
      </div>

      {availableRooms.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Room
          </label>
          <div className="space-y-2">
            {availableRooms.map((room) => (
              <label key={room.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="roomId"
                  value={room.id}
                  checked={formData.roomId === room.id}
                  onChange={(e) => handleInputChange('roomId', e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{room.type}</div>
                  <div className="text-sm text-gray-600">${room.price}/night</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <Input
        label="Special Requests"
        value={formData.specialRequests}
        onChange={(value) => handleInputChange('specialRequests', value)}
        placeholder="Any special requests or preferences..."
      />

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Submit Reservation'}
        </Button>
      </div>
    </form>
  );
};

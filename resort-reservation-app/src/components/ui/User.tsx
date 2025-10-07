import React from 'react';
import { User as UserType } from '@/types/user';
import { Button } from './Button';

interface UserProps {
  user: UserType;
  editable?: boolean;
  onEdit?: (user: UserType) => void;
}

export const User: React.FC<UserProps> = ({ user, editable = false, onEdit }) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(user);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
        {editable && (
          <Button onClick={handleEdit} variant="outline" size="sm">
            Edit
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Address</h4>
        <p className="text-gray-600">
          {user.address.street}<br />
          {user.address.city}, {user.address.state} {user.address.zipCode}<br />
          {user.address.country}
        </p>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Notification Preferences</h4>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            Newsletter: {user.preferences.newsletter ? 'Enabled' : 'Disabled'}
          </p>
          <p className="text-sm text-gray-600">
            SMS Notifications: {user.preferences.smsNotifications ? 'Enabled' : 'Disabled'}
          </p>
          <p className="text-sm text-gray-600">
            Email Notifications: {user.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>
    </div>
  );
};

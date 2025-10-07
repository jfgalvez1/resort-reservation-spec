import { DataService } from '@/lib/data';
import { UserType } from '@/types/user';
import { Reservation } from '@/types/reservation';
import { FinancialTransaction } from '@/types/transaction';

// Mock fetch
global.fetch = jest.fn();

describe('Data Service', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (fetch as jest.Mock).mockReset();
  });

  describe('User Operations', () => {
    it('fetches users', async () => {
      const mockUsers: UserType[] = [
        {
          id: '1',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          dateOfBirth: new Date('1990-01-01'),
          preferences: { newsletter: true, smsUpdates: false, specialOffers: true },
          loyaltyPoints: 100,
          memberSince: new Date('2020-01-01')
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers)
      });

      const users = await DataService.getUsers();
      expect(users).toEqual(mockUsers);
      expect(fetch).toHaveBeenCalledWith('/data/users.json');
    });

    it('fetches user by ID', async () => {
      const mockUsers: UserType[] = [
        { id: '1', email: 'test@example.com' } as UserType,
        { id: '2', email: 'test2@example.com' } as UserType
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers)
      });

      const user = await DataService.getUserById('1');
      expect(user?.id).toBe('1');
    });

    it('creates user', async () => {
      const userData = {
        email: 'new@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '+1234567890',
        dateOfBirth: new Date('1990-01-01'),
        preferences: { newsletter: true, smsUpdates: false, specialOffers: true },
        loyaltyPoints: 0
      };

      const user = await DataService.createUser(userData);
      expect(user.email).toBe('new@example.com');
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('updates user', async () => {
      const mockUsers: UserType[] = [
        { id: '1', email: 'test@example.com', firstName: 'John' } as UserType
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockUsers)
      });

      const updatedUser = await DataService.updateUser('1', { firstName: 'Jane' });
      expect(updatedUser?.firstName).toBe('Jane');
    });
  });

  describe('Reservation Operations', () => {
    it('fetches reservations', async () => {
      const mockReservations: Reservation[] = [
        {
          id: '1',
          userId: '1',
          roomType: 'Standard',
          checkIn: '2024-12-15',
          checkOut: '2024-12-20',
          adults: 2,
          children: 1,
          specialRequests: 'High floor',
          status: 'confirmed',
          totalAmount: 500,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockReservations)
      });

      const reservations = await DataService.getReservations();
      expect(reservations).toEqual(mockReservations);
    });

    it('fetches reservations by user ID', async () => {
      const mockReservations: Reservation[] = [
        { id: '1', userId: '1' } as Reservation,
        { id: '2', userId: '2' } as Reservation
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockReservations)
      });

      const userReservations = await DataService.getReservationsByUserId('1');
      expect(userReservations).toHaveLength(1);
      expect(userReservations[0].userId).toBe('1');
    });

    it('creates reservation', async () => {
      const reservationData = {
        userId: '1',
        roomId: 'room-101',
        checkIn: '2024-12-15',
        checkOut: '2024-12-20',
        adults: 2,
        children: 0,
        specialRequests: '',
        status: 'pending' as const,
        totalAmount: 750,
        depositAmount: 150,
        guests: 2
      };

      const reservation = await DataService.createReservation(reservationData);
      expect(reservation.roomId).toBe('room-101');
      expect(reservation.id).toBeDefined();
      expect(reservation.createdAt).toBeDefined();
      expect(reservation.updatedAt).toBeDefined();
    });

    it('cancels reservation', async () => {
      const mockReservations: Reservation[] = [
        { id: '1', status: 'confirmed' } as Reservation
      ];

      // Mock the fetch call for getReservations (called by getReservationById)
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockReservations)
      });

      // Mock the fetch call for getReservations (called by updateReservation)
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockReservations)
      });

      // Mock the fetch call for updateReservation
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true })
      });

      const result = await DataService.cancelReservation('1');
      expect(result).toBe(true);
    });
  });

  describe('Transaction Operations', () => {
    it('fetches transactions', async () => {
      const mockTransactions: FinancialTransaction[] = [
        {
          id: '1',
          userId: '1',
          type: 'payment',
          amount: 500,
          description: 'Reservation payment',
          timestamp: new Date()
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockTransactions)
      });

      const transactions = await DataService.getTransactions();
      expect(transactions).toEqual(mockTransactions);
    });

    it('fetches transactions by user ID', async () => {
      const mockTransactions: FinancialTransaction[] = [
        { id: '1', userId: '1' } as FinancialTransaction,
        { id: '2', userId: '2' } as FinancialTransaction
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockTransactions)
      });

      const userTransactions = await DataService.getTransactionsByUserId('1');
      expect(userTransactions).toHaveLength(1);
      expect(userTransactions[0].userId).toBe('1');
    });

    it('creates transaction', async () => {
      const transactionData = {
        userId: '1',
        type: 'payment' as const,
        amount: 500,
        description: 'Reservation payment'
      };

      const transaction = await DataService.createTransaction(transactionData);
      expect(transaction.amount).toBe(500);
      expect(transaction.id).toBeDefined();
      expect(transaction.createdAt).toBeDefined();
      expect(transaction.updatedAt).toBeDefined();
    });
  });

  describe('Search and Filtering', () => {
    it('searches reservations', async () => {
      const mockReservations: Reservation[] = [
        { 
          id: '1', 
          roomId: 'room-101', 
          status: 'confirmed',
          userId: 'user-1',
          checkIn: '2024-12-15',
          checkOut: '2024-12-20',
          guests: 2,
          adults: 2,
          children: 0,
          totalAmount: 500,
          depositAmount: 100,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        } as Reservation,
        { 
          id: '2', 
          roomId: 'room-102', 
          status: 'pending',
          userId: 'user-2',
          checkIn: '2024-12-25',
          checkOut: '2024-12-30',
          guests: 1,
          adults: 1,
          children: 0,
          totalAmount: 300,
          depositAmount: 60,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        } as Reservation
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockReservations)
      });

      const results = await DataService.searchReservations('room-101');
      expect(results).toHaveLength(1);
      expect(results[0].roomId).toBe('room-101');
    });

    it('filters reservations by date range', async () => {
      const mockReservations: Reservation[] = [
        { id: '1', checkIn: '2024-12-15', checkOut: '2024-12-20' } as Reservation,
        { id: '2', checkIn: '2024-12-25', checkOut: '2024-12-30' } as Reservation
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockReservations)
      });

      const startDate = new Date('2024-12-10');
      const endDate = new Date('2024-12-24'); // Changed to exclude the second reservation
      const results = await DataService.getReservationsByDateRange(startDate, endDate);
      expect(results).toHaveLength(1);
    });
  });

  describe('Analytics', () => {
    it('calculates user stats', async () => {
      const mockReservations: Reservation[] = [
        { 
          userId: '1', 
          roomId: 'room-standard-1', 
          checkIn: '2024-12-15', 
          checkOut: '2024-12-20',
          id: 'res-1',
          guests: 2,
          adults: 2,
          children: 0,
          status: 'confirmed',
          totalAmount: 500,
          depositAmount: 100,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        } as Reservation,
        { 
          userId: '1', 
          roomId: 'room-standard-2', 
          checkIn: '2024-12-25', 
          checkOut: '2024-12-30',
          id: 'res-2',
          guests: 2,
          adults: 2,
          children: 0,
          status: 'confirmed',
          totalAmount: 750,
          depositAmount: 150,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        } as Reservation
      ];

      const mockTransactions: FinancialTransaction[] = [
        { userId: '1', type: 'payment', amount: 500 } as FinancialTransaction,
        { userId: '1', type: 'payment', amount: 750 } as FinancialTransaction
      ];

      (fetch as jest.Mock)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockReservations) })
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockTransactions) });

      const stats = await DataService.getUserStats('1');
      expect(stats.totalReservations).toBe(2);
      expect(stats.totalSpent).toBe(1250);
      expect(stats.averageStayLength).toBe(5);
      expect(stats.favoriteRoomType).toBe('room-standard-2');
    });
  });

  describe('Error Handling', () => {
    it('handles fetch errors gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(DataService.getUsers()).rejects.toThrow('Network error');
    });

    it('returns null for non-existent user', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve([])
      });

      const user = await DataService.getUserById('nonexistent');
      expect(user).toBeNull();
    });
  });
});

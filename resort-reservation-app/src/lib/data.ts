import { User as UserType } from '@/types/user';
import { Reservation } from '@/types/reservation';
import { FinancialTransaction } from '@/types/transaction';
import { ResortInfo } from '@/types/resort';
import { FAQEntry } from '@/types/faq';

// Mock data service
export class DataService {
  // Users
  static async getUsers(): Promise<UserType[]> {
    const response = await fetch('/data/users.json');
    return response.json();
  }

  static async getUserById(id: string): Promise<UserType | null> {
    const users = await this.getUsers();
    return users.find(user => user.id === id) || null;
  }

  static async createUser(user: Omit<UserType, 'id'>): Promise<UserType> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: UserType = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return newUser;
  }

  static async updateUser(id: string, updates: Partial<UserType>): Promise<UserType | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = await this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    return users[userIndex];
  }

  // Reservations
  static async getReservations(): Promise<Reservation[]> {
    const response = await fetch('/data/reservations.json');
    return response.json();
  }

  static async getReservationsByUserId(userId: string): Promise<Reservation[]> {
    const reservations = await this.getReservations();
    return reservations.filter(reservation => reservation.userId === userId);
  }

  static async getReservationById(id: string): Promise<Reservation | null> {
    const reservations = await this.getReservations();
    return reservations.find(reservation => reservation.id === id) || null;
  }

  static async createReservation(reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reservation> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newReservation: Reservation = {
      ...reservation,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return newReservation;
  }

  static async updateReservation(id: string, updates: Partial<Reservation>): Promise<Reservation | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const reservations = await this.getReservations();
    const reservationIndex = reservations.findIndex(reservation => reservation.id === id);
    
    if (reservationIndex === -1) return null;
    
    reservations[reservationIndex] = { 
      ...reservations[reservationIndex], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return reservations[reservationIndex];
  }

  static async cancelReservation(id: string): Promise<boolean> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const reservation = await this.getReservationById(id);
    if (!reservation) return false;
    
    // Update reservation status
    await this.updateReservation(id, { status: 'cancelled' });
    return true;
  }

  // Transactions
  static async getTransactions(): Promise<FinancialTransaction[]> {
    const response = await fetch('/data/transactions.json');
    return response.json();
  }

  static async getTransactionsByUserId(userId: string): Promise<FinancialTransaction[]> {
    const transactions = await this.getTransactions();
    return transactions.filter(transaction => transaction.userId === userId);
  }

  static async getTransactionById(id: string): Promise<FinancialTransaction | null> {
    const transactions = await this.getTransactions();
    return transactions.find(transaction => transaction.id === id) || null;
  }

  static async createTransaction(transaction: Omit<FinancialTransaction, 'id' | 'timestamp'>): Promise<FinancialTransaction> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const newTransaction: FinancialTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return newTransaction;
  }

  // Resort Info
  static async getResortInfo(): Promise<ResortInfo> {
    const response = await fetch('/data/resort-info.json');
    return response.json();
  }

  // FAQ
  static async getFAQ(): Promise<FAQEntry[]> {
    const response = await fetch('/data/faq.json');
    return response.json();
  }

  // Search and filtering
  static async searchReservations(query: string, userId?: string): Promise<Reservation[]> {
    const reservations = userId 
      ? await this.getReservationsByUserId(userId)
      : await this.getReservations();
    
    return reservations.filter(reservation => 
      reservation.id.toLowerCase().includes(query.toLowerCase()) ||
      reservation.roomId.toLowerCase().includes(query.toLowerCase()) ||
      reservation.status.toLowerCase().includes(query.toLowerCase())
    );
  }

  static async getReservationsByDateRange(startDate: Date, endDate: Date): Promise<Reservation[]> {
    const reservations = await this.getReservations();
    
    return reservations.filter(reservation => {
      const checkIn = new Date(reservation.checkIn);
      const checkOut = new Date(reservation.checkOut);
      
      return (checkIn >= startDate && checkIn <= endDate) ||
             (checkOut >= startDate && checkOut <= endDate) ||
             (checkIn <= startDate && checkOut >= endDate);
    });
  }

  // Analytics and reporting
  static async getUserStats(userId: string): Promise<{
    totalReservations: number;
    totalSpent: number;
    averageStayLength: number;
    favoriteRoomType: string;
  }> {
    const reservations = await this.getReservationsByUserId(userId);
    const transactions = await this.getTransactionsByUserId(userId);
    
    const totalReservations = reservations.length;
    const totalSpent = transactions
      .filter(t => t.type === 'payment')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const averageStayLength = totalReservations > 0 
      ? reservations.reduce((sum, r) => {
          const checkIn = new Date(r.checkIn);
          const checkOut = new Date(r.checkOut);
          return sum + (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
        }, 0) / totalReservations
      : 0;
    
    const roomTypeCounts = reservations.reduce((counts, r) => {
      counts[r.roomId] = (counts[r.roomId] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    
    const favoriteRoomType = Object.keys(roomTypeCounts).reduce((a, b) => 
      roomTypeCounts[a] > roomTypeCounts[b] ? a : b, 'Standard'
    );
    
    return {
      totalReservations,
      totalSpent,
      averageStayLength: Math.round(averageStayLength * 10) / 10,
      favoriteRoomType
    };
  }
}

// Export convenience functions
export const getUsers = DataService.getUsers.bind(DataService);
export const getUserById = DataService.getUserById.bind(DataService);
export const createUser = DataService.createUser.bind(DataService);
export const updateUser = DataService.updateUser.bind(DataService);
export const getReservations = DataService.getReservations.bind(DataService);
export const getReservationsByUserId = DataService.getReservationsByUserId.bind(DataService);
export const getReservationById = DataService.getReservationById.bind(DataService);
export const createReservation = DataService.createReservation.bind(DataService);
export const updateReservation = DataService.updateReservation.bind(DataService);
export const cancelReservation = DataService.cancelReservation.bind(DataService);
export const getTransactions = DataService.getTransactions.bind(DataService);
export const getTransactionsByUserId = DataService.getTransactionsByUserId.bind(DataService);
export const getTransactionById = DataService.getTransactionById.bind(DataService);
export const createTransaction = DataService.createTransaction.bind(DataService);
export const getResortInfo = DataService.getResortInfo.bind(DataService);
export const getFAQ = DataService.getFAQ.bind(DataService);
export const searchReservations = DataService.searchReservations.bind(DataService);
export const getReservationsByDateRange = DataService.getReservationsByDateRange.bind(DataService);
export const getUserStats = DataService.getUserStats.bind(DataService);

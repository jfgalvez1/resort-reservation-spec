import { User as UserType } from '@/types/user';

// Mock authentication service
export class AuthService {
  private static currentUser: UserType | null = null;
  private static isAuthenticated = false;

  // Mock login
  static async login(email: string, password: string): Promise<{ success: boolean; user?: UserType; error?: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation - accept any email/password for demo
    if (email && password) {
      // Mock user data
      const user: UserType = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1-555-0123',
        dateOfBirth: '1990-01-01',
        preferences: {
          newsletter: true,
          smsNotifications: true,
          emailNotifications: true
        },
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        createdAt: '2023-01-01T10:00:00Z',
        updatedAt: '2023-01-01T10:00:00Z'
      };

      this.currentUser = user;
      this.isAuthenticated = true;
      
      return { success: true, user };
    }

    return { success: false, error: 'Invalid credentials' };
  }

  // Mock registration
  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<{ success: boolean; user?: UserType; error?: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation
    if (userData.email && userData.password && userData.firstName && userData.lastName) {
      const user: UserType = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || '',
        dateOfBirth: '1990-01-01',
        preferences: {
          newsletter: true,
          smsNotifications: true,
          emailNotifications: true
        },
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.currentUser = user;
      this.isAuthenticated = true;
      
      return { success: true, user };
    }

    return { success: false, error: 'Registration failed' };
  }

  // Mock logout
  static logout(): void {
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  // Get current user
  static getCurrentUser(): UserType | null {
    return this.currentUser;
  }

  // Check if authenticated
  static isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Mock password reset
  static async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: `If an account with ${email} exists, a password reset link has been sent.`
    };
  }

  // Mock update profile
  static async updateProfile(updates: Partial<UserType>): Promise<{ success: boolean; user?: UserType; error?: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      return { success: true, user: this.currentUser };
    }

    return { success: false, error: 'User not authenticated' };
  }

  // Mock social login
  static async socialLogin(provider: 'google' | 'facebook'): Promise<{ success: boolean; user?: UserType; error?: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const user: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      email: `user@${provider}.com`,
      firstName: 'Social',
      lastName: 'User',
      phone: '',
      dateOfBirth: '1990-01-01',
      preferences: {
        newsletter: true,
        smsNotifications: true,
        emailNotifications: true
      },
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.currentUser = user;
    this.isAuthenticated = true;
    
    return { success: true, user };
  }
}

// Export convenience functions
export const login = AuthService.login.bind(AuthService);
export const register = AuthService.register.bind(AuthService);
export const logout = AuthService.logout.bind(AuthService);
export const getCurrentUser = AuthService.getCurrentUser.bind(AuthService);
export const isLoggedIn = AuthService.isLoggedIn.bind(AuthService);
export const resetPassword = AuthService.resetPassword.bind(AuthService);
export const updateProfile = AuthService.updateProfile.bind(AuthService);
export const socialLogin = AuthService.socialLogin.bind(AuthService);

# Data Model: Modern Resort Reservation System

**Feature**: Modern Resort Reservation System  
**Date**: 2025-01-27  
**Type**: Static Web Application with Mock Data

## Entity Overview

This system uses mock data stored in JSON files with TypeScript interfaces for type safety. No database is required for the initial implementation.

## Core Entities

### User
Represents a person who can make reservations and access dashboard features.

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string; // ISO date string
  lastLoginAt?: string; // ISO date string
  isActive: boolean;
}
```

**Validation Rules**:
- Email must be valid format
- First and last name are required
- Phone is optional but must be valid format if provided
- User ID must be unique

**State Transitions**:
- `inactive` → `active` (on first login)
- `active` → `inactive` (on account deactivation)

### Reservation
Represents a booking with date, user, and status information.

```typescript
interface Reservation {
  id: string;
  userId: string;
  checkInDate: string; // ISO date string
  checkOutDate: string; // ISO date string
  guestCount: number;
  roomType: 'standard' | 'deluxe' | 'suite';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  specialRequests?: string;
}
```

**Validation Rules**:
- Check-in date must be in the future
- Check-out date must be after check-in date
- Guest count must be between 1 and 8
- Total amount must be positive
- Status transitions must be valid

**State Transitions**:
- `pending` → `confirmed` (on payment)
- `confirmed` → `cancelled` (on cancellation)
- `confirmed` → `completed` (after check-out)
- `cancelled` → `pending` (on rebooking)

### Financial Transaction
Represents financial tracking information for expense/earnings calculations.

```typescript
interface FinancialTransaction {
  id: string;
  userId: string;
  reservationId?: string; // Optional, for reservation-related transactions
  type: 'payment' | 'refund' | 'service_charge' | 'discount';
  amount: number; // Positive for earnings, negative for expenses
  description: string;
  category: 'accommodation' | 'dining' | 'activities' | 'services' | 'other';
  date: string; // ISO date string
  status: 'pending' | 'completed' | 'failed';
}
```

**Validation Rules**:
- Amount must be non-zero
- Date must be valid
- Type and category must be from allowed values
- Status transitions must be valid

**State Transitions**:
- `pending` → `completed` (on successful processing)
- `pending` → `failed` (on processing failure)
- `completed` → `pending` (on reversal)

### Resort Information
Represents content about the resort's story, features, and amenities.

```typescript
interface ResortInfo {
  id: string;
  name: string;
  description: string;
  story: string;
  features: string[];
  amenities: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
  };
  updatedAt: string; // ISO date string
}
```

**Validation Rules**:
- Name and description are required
- Images must have valid URLs
- Contact information must be complete
- Policies must be defined

### FAQ Entry
Represents a question and answer pair for user support.

```typescript
interface FAQEntry {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'reservations' | 'amenities' | 'policies' | 'billing';
  order: number; // For display ordering
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
```

**Validation Rules**:
- Question and answer are required
- Category must be from allowed values
- Order must be unique within category
- Question must be unique

## Entity Relationships

### User ↔ Reservation (One-to-Many)
- One user can have many reservations
- Each reservation belongs to exactly one user
- Foreign key: `reservation.userId` → `user.id`

### User ↔ FinancialTransaction (One-to-Many)
- One user can have many financial transactions
- Each transaction belongs to exactly one user
- Foreign key: `transaction.userId` → `user.id`

### Reservation ↔ FinancialTransaction (One-to-Many)
- One reservation can have multiple transactions (payment, refunds, charges)
- Each transaction can optionally belong to one reservation
- Foreign key: `transaction.reservationId` → `reservation.id`

### Resort Information (Singleton)
- Only one resort information record exists
- No relationships to other entities

### FAQ Entries (Independent)
- FAQ entries are independent of other entities
- Categorized for organization

## Data Storage Strategy

### Mock Data Files
```
src/data/
├── users.json              # Array of User objects
├── reservations.json       # Array of Reservation objects
├── transactions.json       # Array of FinancialTransaction objects
├── resort-info.json        # Single ResortInfo object
└── faq.json                # Array of FAQEntry objects
```

### Type Definitions
```
src/types/
├── user.ts                 # User interface
├── reservation.ts          # Reservation interface
├── transaction.ts          # FinancialTransaction interface
├── resort.ts              # ResortInfo interface
├── faq.ts                 # FAQEntry interface
└── index.ts               # Re-export all types
```

## Data Validation

### Runtime Validation
- Use Zod schemas for runtime validation
- Validate data on load and save operations
- Provide clear error messages for invalid data

### Type Safety
- TypeScript interfaces for compile-time checking
- Strict type checking enabled
- No `any` types allowed

## Mock Data Generation

### Sample Data Requirements
- 10-20 sample users with realistic names and emails
- 50-100 sample reservations across different date ranges
- 100-200 financial transactions with various types
- Complete resort information with multiple images
- 20-30 FAQ entries across all categories

### Data Consistency
- All foreign key relationships must be valid
- Date ranges must be realistic (past and future dates)
- Financial amounts must be reasonable
- User data must be realistic and diverse

## Performance Considerations

### Data Loading
- Load data on component mount
- Use React Query for caching and synchronization
- Implement loading states for better UX

### Data Filtering
- Client-side filtering for small datasets
- Efficient algorithms for date range queries
- Memoization for expensive calculations

### Data Updates
- Optimistic updates for better UX
- Rollback on failure
- Batch updates when possible

## Security Considerations

### Data Sanitization
- Sanitize all user inputs
- Validate data before storage
- Prevent XSS attacks

### Access Control
- Mock authentication with role-based access
- Protect sensitive financial data
- Implement proper session management

## Future Database Migration

### Migration Strategy
- Design interfaces to be database-agnostic
- Use repository pattern for data access
- Prepare for API integration
- Maintain backward compatibility

### Database Schema
- PostgreSQL for production
- Proper indexing for performance
- Foreign key constraints for data integrity
- Audit trails for financial data

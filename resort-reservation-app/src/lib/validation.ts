// Validation schemas and functions for the resort reservation system

// Validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validation function type
export type Validator<T> = (value: T) => ValidationResult;

// Create a validation result
export function createValidationResult(isValid: boolean, errors: string[] = []): ValidationResult {
  return { isValid, errors };
}

// Combine multiple validation results
export function combineValidationResults(...results: ValidationResult[]): ValidationResult {
  const allErrors = results.flatMap(result => result.errors);
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}

// Email validation
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return createValidationResult(false, ['Email is required']);
  }
  
  if (!emailRegex.test(email)) {
    return createValidationResult(false, ['Please enter a valid email address']);
  }
  
  return createValidationResult(true);
}

// Phone validation
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (!phone) {
    return createValidationResult(false, ['Phone number is required']);
  }
  
  if (!phoneRegex.test(cleanPhone)) {
    return createValidationResult(false, ['Please enter a valid phone number']);
  }
  
  return createValidationResult(true);
}

// Password validation
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    return createValidationResult(false, ['Password is required']);
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return createValidationResult(errors.length === 0, errors);
}

// Name validation
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  if (!name) {
    return createValidationResult(false, [`${fieldName} is required`]);
  }
  
  if (name.length < 2) {
    return createValidationResult(false, [`${fieldName} must be at least 2 characters long`]);
  }
  
  if (name.length > 50) {
    return createValidationResult(false, [`${fieldName} must be less than 50 characters`]);
  }
  
  if (!/^[a-zA-Z\s\-']+$/.test(name)) {
    return createValidationResult(false, [`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`]);
  }
  
  return createValidationResult(true);
}

// Date validation
export function validateDate(date: string | Date, fieldName: string = 'Date'): ValidationResult {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!date) {
    return createValidationResult(false, [`${fieldName} is required`]);
  }
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return createValidationResult(false, [`${fieldName} must be a valid date`]);
  }
  
  return createValidationResult(true);
}

// Future date validation
export function validateFutureDate(date: string | Date, fieldName: string = 'Date'): ValidationResult {
  const dateValidation = validateDate(date, fieldName);
  if (!dateValidation.isValid) {
    return dateValidation;
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dateObj < today) {
    return createValidationResult(false, [`${fieldName} must be in the future`]);
  }
  
  return createValidationResult(true);
}

// Date range validation
export function validateDateRange(
  startDate: string | Date,
  endDate: string | Date,
  startFieldName: string = 'Start date',
  endFieldName: string = 'End date'
): ValidationResult {
  const startValidation = validateDate(startDate, startFieldName);
  const endValidation = validateDate(endDate, endFieldName);
  
  if (!startValidation.isValid || !endValidation.isValid) {
    return combineValidationResults(startValidation, endValidation);
  }
  
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  if (start >= end) {
    return createValidationResult(false, [`${endFieldName} must be after ${startFieldName.toLowerCase()}`]);
  }
  
  return createValidationResult(true);
}

// Number validation
export function validateNumber(
  value: number | string,
  min?: number,
  max?: number,
  fieldName: string = 'Number'
): ValidationResult {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    return createValidationResult(false, [`${fieldName} must be a valid number`]);
  }
  
  if (min !== undefined && num < min) {
    return createValidationResult(false, [`${fieldName} must be at least ${min}`]);
  }
  
  if (max !== undefined && num > max) {
    return createValidationResult(false, [`${fieldName} must be no more than ${max}`]);
  }
  
  return createValidationResult(true);
}

// Integer validation
export function validateInteger(
  value: number | string,
  min?: number,
  max?: number,
  fieldName: string = 'Number'
): ValidationResult {
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (isNaN(num) || !Number.isInteger(num)) {
    return createValidationResult(false, [`${fieldName} must be a valid integer`]);
  }
  
  if (min !== undefined && num < min) {
    return createValidationResult(false, [`${fieldName} must be at least ${min}`]);
  }
  
  if (max !== undefined && num > max) {
    return createValidationResult(false, [`${fieldName} must be no more than ${max}`]);
  }
  
  return createValidationResult(true);
}

// String length validation
export function validateStringLength(
  value: string,
  minLength?: number,
  maxLength?: number,
  fieldName: string = 'Text'
): ValidationResult {
  if (!value) {
    return createValidationResult(false, [`${fieldName} is required`]);
  }
  
  if (minLength !== undefined && value.length < minLength) {
    return createValidationResult(false, [`${fieldName} must be at least ${minLength} characters long`]);
  }
  
  if (maxLength !== undefined && value.length > maxLength) {
    return createValidationResult(false, [`${fieldName} must be no more than ${maxLength} characters long`]);
  }
  
  return createValidationResult(true);
}

// URL validation
export function validateURL(url: string, fieldName: string = 'URL'): ValidationResult {
  if (!url) {
    return createValidationResult(false, [`${fieldName} is required`]);
  }
  
  try {
    new URL(url);
    return createValidationResult(true);
  } catch {
    return createValidationResult(false, [`${fieldName} must be a valid URL`]);
  }
}

// Credit card validation (Luhn algorithm)
export function validateCreditCard(cardNumber: string): ValidationResult {
  if (!cardNumber) {
    return createValidationResult(false, ['Credit card number is required']);
  }
  
  const cleanNumber = cardNumber.replace(/\D/g, '');
  
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return createValidationResult(false, ['Credit card number must be between 13 and 19 digits']);
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return createValidationResult(false, ['Invalid credit card number']);
  }
  
  return createValidationResult(true);
}

// CVV validation
export function validateCVV(cvv: string): ValidationResult {
  if (!cvv) {
    return createValidationResult(false, ['CVV is required']);
  }
  
  if (!/^\d{3,4}$/.test(cvv)) {
    return createValidationResult(false, ['CVV must be 3 or 4 digits']);
  }
  
  return createValidationResult(true);
}

// Expiry date validation
export function validateExpiryDate(month: string, year: string): ValidationResult {
  if (!month || !year) {
    return createValidationResult(false, ['Expiry date is required']);
  }
  
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  if (monthNum < 1 || monthNum > 12) {
    return createValidationResult(false, ['Invalid month']);
  }
  
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return createValidationResult(false, ['Card has expired']);
  }
  
  return createValidationResult(true);
}

// Form validation schemas
export const validationSchemas = {
  // User registration
  userRegistration: {
    firstName: (value: string) => validateName(value, 'First name'),
    lastName: (value: string) => validateName(value, 'Last name'),
    email: validateEmail,
    password: validatePassword,
    phone: (value: string) => value ? validatePhone(value) : createValidationResult(true),
  },
  
  // User login
  userLogin: {
    email: validateEmail,
    password: (value: string) => value ? createValidationResult(true) : createValidationResult(false, ['Password is required']),
  },
  
  // Reservation form
  reservation: {
    checkIn: (value: string) => validateFutureDate(value, 'Check-in date'),
    checkOut: (value: string) => validateFutureDate(value, 'Check-out date'),
    adults: (value: number) => validateInteger(value, 1, 10, 'Number of adults'),
    children: (value: number) => validateInteger(value, 0, 10, 'Number of children'),
    specialRequests: (value: string) => value ? validateStringLength(value, 0, 500, 'Special requests') : createValidationResult(true),
  },
  
  // Payment form
  payment: {
    cardNumber: validateCreditCard,
    cvv: validateCVV,
    expiryMonth: (value: string) => validateInteger(parseInt(value, 10), 1, 12, 'Expiry month'),
    expiryYear: (value: string) => validateInteger(parseInt(value, 10), new Date().getFullYear(), new Date().getFullYear() + 20, 'Expiry year'),
    cardholderName: (value: string) => validateName(value, 'Cardholder name'),
  },
};

// Validate entire form
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  schema: Record<keyof T, Validator<unknown>>
): ValidationResult {
  const results: ValidationResult[] = [];
  
  for (const [field, validator] of Object.entries(schema)) {
    if (field in data) {
      results.push(validator(data[field]));
    }
  }
  
  return combineValidationResults(...results);
}

// Get first error message
export function getFirstError(result: ValidationResult): string | null {
  return result.errors.length > 0 ? result.errors[0] : null;
}

// Check if field has error
export function hasError(result: ValidationResult): boolean {
  return !result.isValid;
}

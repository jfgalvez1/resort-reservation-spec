// Date utility functions for the resort reservation system

// Get current date in YYYY-MM-DD format
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

// Get date in YYYY-MM-DD format
export function formatDateForInput(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}

// Add days to a date
export function addDays(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
}

// Subtract days from a date
export function subtractDays(date: Date | string, days: number): Date {
  return addDays(date, -days);
}

// Get start of day
export function getStartOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(0, 0, 0, 0);
  return result;
}

// Get end of day
export function getEndOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(dateObj);
  result.setHours(23, 59, 59, 999);
  return result;
}

// Check if date is today
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
}

// Check if date is in the past
export function isPast(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = getStartOfDay(new Date());
  return getStartOfDay(dateObj) < today;
}

// Check if date is in the future
export function isFuture(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = getStartOfDay(new Date());
  return getStartOfDay(dateObj) > today;
}

// Check if date is within a range
export function isDateInRange(
  date: Date | string,
  startDate: Date | string,
  endDate: Date | string
): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  return dateObj >= start && dateObj <= end;
}

// Get days between two dates
export function getDaysBetween(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

// Get business days between two dates (excluding weekends)
export function getBusinessDaysBetween(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return count;
}

// Get next business day
export function getNextBusinessDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const nextDay = addDays(dateObj, 1);
  
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  
  return nextDay;
}

// Get previous business day
export function getPreviousBusinessDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const prevDay = subtractDays(dateObj, 1);
  
  while (prevDay.getDay() === 0 || prevDay.getDay() === 6) {
    prevDay.setDate(prevDay.getDate() - 1);
  }
  
  return prevDay;
}

// Check if date is a weekend
export function isWeekend(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dayOfWeek = dateObj.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
}

// Check if date is a weekday
export function isWeekday(date: Date | string): boolean {
  return !isWeekend(date);
}

// Get month name
export function getMonthName(date: Date | string, format: 'short' | 'long' = 'long'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', { month: format });
}

// Get day name
export function getDayName(date: Date | string, format: 'short' | 'long' = 'long'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', { weekday: format });
}

// Get quarter
export function getQuarter(date: Date | string): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return Math.floor(dateObj.getMonth() / 3) + 1;
}

// Get fiscal year (assuming April start)
export function getFiscalYear(date: Date | string): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  
  return month >= 3 ? year : year - 1; // April (month 3) is start of fiscal year
}

// Format date for display
export function formatDateForDisplay(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

// Format date range for display
export function formatDateRangeForDisplay(
  startDate: Date | string,
  endDate: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const start = formatDateForDisplay(startDate, options);
  const end = formatDateForDisplay(endDate, options);
  
  // If same month and year, show abbreviated format
  const startObj = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const endObj = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  if (startObj.getMonth() === endObj.getMonth() && startObj.getFullYear() === endObj.getFullYear()) {
    const startDay = startObj.getDate();
    const endDay = endObj.getDate();
    const monthYear = startObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return `${startDay}-${endDay}, ${monthYear}`;
  }
  
  return `${start} - ${end}`;
}

// Get age from birth date
export function getAge(birthDate: Date | string): number {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// Check if year is leap year
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Get days in month
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Get first day of month
export function getFirstDayOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
}

// Get last day of month
export function getLastDayOfMonth(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
}

// Get week number
export function getWeekNumber(date: Date | string): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const firstDayOfYear = new Date(dateObj.getFullYear(), 0, 1);
  const pastDaysOfYear = (dateObj.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Get timezone offset in hours
export function getTimezoneOffset(date: Date | string): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTimezoneOffset() / -60;
}

// Convert to UTC
export function toUTC(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Date(dateObj.getTime() + (dateObj.getTimezoneOffset() * 60000));
}

// Convert from UTC
export function fromUTC(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000));
}

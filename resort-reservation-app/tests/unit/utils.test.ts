import {
  formatCurrency,
  formatDate,
  formatDateRange,
  calculateDaysBetween,
  generateId,
  debounce,
  throttle,
  storage,
  sessionStorage,
  buildUrl,
  parseUrlParams,
  isValidEmail,
  isValidPhone,
  isValidDate,
  capitalize,
  truncate,
  slugify,
  groupBy,
  sortBy,
  unique,
  omit,
  pick,
  handleError,
  createLoadingState
} from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-12-15');
      expect(formatDate(date)).toBe('December 15, 2024');
      expect(formatDate(date, { month: 'short' })).toBe('Dec 15, 2024');
    });
  });

  describe('formatDateRange', () => {
    it('formats date range correctly', () => {
      const start = new Date('2024-12-15');
      const end = new Date('2024-12-20');
      expect(formatDateRange(start, end)).toBe('Dec 15, 2024 - Dec 20, 2024');
    });
  });

  describe('calculateDaysBetween', () => {
    it('calculates days between dates correctly', () => {
      const start = new Date('2024-12-15');
      const end = new Date('2024-12-20');
      expect(calculateDaysBetween(start, end)).toBe(5);
    });
  });

  describe('generateId', () => {
    it('generates ID of correct length', () => {
      const id = generateId(8);
      expect(id).toHaveLength(8);
      expect(typeof id).toBe('string');
    });

    it('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('debounce', () => {
    it('debounces function calls', (done) => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });
  });

  describe('throttle', () => {
    it('throttles function calls', (done) => {
      let callCount = 0;
      const throttledFn = throttle(() => {
        callCount++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });
  });

  describe('storage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('stores and retrieves data', () => {
      storage.set('test', { key: 'value' });
      expect(storage.get('test', null)).toEqual({ key: 'value' });
    });

    it('returns default value when key not found', () => {
      expect(storage.get('nonexistent', 'default')).toBe('default');
    });

    it('removes data', () => {
      storage.set('test', 'value');
      storage.remove('test');
      expect(storage.get('test', null)).toBeNull();
    });
  });

  describe('sessionStorage', () => {
    beforeEach(() => {
      if (typeof window !== 'undefined') {
        window.sessionStorage.clear();
      }
    });

    it('stores and retrieves data', () => {
      sessionStorage.set('test', { key: 'value' });
      expect(sessionStorage.get('test', null)).toEqual({ key: 'value' });
    });
  });

  describe('buildUrl', () => {
    it('builds URL with parameters', () => {
      const url = buildUrl('/api/test', { page: 1, limit: 10 });
      expect(url).toContain('page=1');
      expect(url).toContain('limit=10');
    });
  });

  describe('parseUrlParams', () => {
    it('parses URL parameters', () => {
      const params = parseUrlParams('/test?page=1&limit=10');
      expect(params).toEqual({ page: '1', limit: '10' });
    });
  });

  describe('isValidEmail', () => {
    it('validates email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('validates phone numbers', () => {
      expect(isValidPhone('+1234567890')).toBe(true);
      expect(isValidPhone('123-456-7890')).toBe(true);
      expect(isValidPhone('invalid')).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('validates dates', () => {
      expect(isValidDate('2024-12-15')).toBe(true);
      expect(isValidDate('invalid-date')).toBe(false);
    });
  });

  describe('capitalize', () => {
    it('capitalizes strings', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('Hello');
    });
  });

  describe('truncate', () => {
    it('truncates strings', () => {
      expect(truncate('hello world', 5)).toBe('he...');
      expect(truncate('short', 10)).toBe('short');
    });
  });

  describe('slugify', () => {
    it('creates URL-friendly slugs', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
      expect(slugify('Test & Test')).toBe('test-test');
    });
  });

  describe('groupBy', () => {
    it('groups array by key', () => {
      const data = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 }
      ];
      const grouped = groupBy(data, 'category');
      expect(grouped.A).toHaveLength(2);
      expect(grouped.B).toHaveLength(1);
    });
  });

  describe('sortBy', () => {
    it('sorts array by key', () => {
      const data = [
        { value: 3 },
        { value: 1 },
        { value: 2 }
      ];
      const sorted = sortBy(data, 'value');
      expect(sorted[0].value).toBe(1);
      expect(sorted[2].value).toBe(3);
    });
  });

  describe('unique', () => {
    it('removes duplicates', () => {
      expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('omit', () => {
    it('omits specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });
  });

  describe('pick', () => {
    it('picks specified keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });
  });

  describe('handleError', () => {
    it('handles Error objects', () => {
      const error = new Error('Test error');
      expect(handleError(error)).toBe('Test error');
    });

    it('handles string errors', () => {
      expect(handleError('String error')).toBe('String error');
    });

    it('handles unknown errors', () => {
      expect(handleError({})).toBe('An unknown error occurred');
    });
  });

  describe('createLoadingState', () => {
    it('creates loading state with methods', () => {
      const state = createLoadingState();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.data).toBeNull();
      expect(typeof state.setLoading).toBe('function');
      expect(typeof state.setSuccess).toBe('function');
      expect(typeof state.setError).toBe('function');
    });
  });
});

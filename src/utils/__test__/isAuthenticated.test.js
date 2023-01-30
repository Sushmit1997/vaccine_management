const isAuthenticated = require('../isAuthenticated')

describe('isAuthenticated', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it('returns false when no token is found in local storage', () => {
      expect(isAuthenticated()).toBe(false);
    });
  
    it('returns true when a token is found in local storage', () => {
      localStorage.setItem('token', 'abc123');
      expect(isAuthenticated()).toBe(true);
    });
  });
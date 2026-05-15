import { describe, expect, it } from 'vitest';

import { loginSchema, signupSchema } from '../auth.schema';

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('should validate a correct email and password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should fail if email is invalid', () => {
      const result = loginSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });

    it('should fail if password is too short', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
      });
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error.issues[0].message).toBe(
          'Password must be at least 8 characters',
        );
      }
    });
  });

  describe('signupSchema', () => {
    it('should pass if passwords match', () => {
      const result = signupSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should fail if passwords do not match', () => {
      const result = signupSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'differentPassword',
      });
      expect(result.success).toBe(false);
      if (result.success === false) {
        const issue = result.error.issues.find(
          (i) => i.path[0] === 'confirmPassword',
        );
        expect(issue?.message).toBe('Passwords do not match');
      }
    });
  });
});

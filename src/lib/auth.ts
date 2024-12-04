import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { LoginCredentials, RegisterCredentials, User } from '../types/auth';
import { hashPassword, comparePasswords } from '../utils/crypto';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  const database = await db;
  
  if (!credentials.email || !credentials.password || !credentials.name || !credentials.confirmPassword) {
    throw new AuthError('All fields are required');
  }
  
  if (credentials.password.length < 8) {
    throw new AuthError('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(credentials.password)) {
    throw new AuthError('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(credentials.password)) {
    throw new AuthError('Password must contain at least one number');
  }

  if (credentials.password !== credentials.confirmPassword) {
    throw new AuthError('Passwords do not match');
  }

  const existingUser = await database.get('users', credentials.email);
  if (existingUser) {
    throw new AuthError('User already exists');
  }

  const hashedPassword = await hashPassword(credentials.password);

  const user = {
    id: uuidv4(),
    email: credentials.email,
    name: credentials.name,
    password: hashedPassword,
  };

  await database.put('users', user);

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  const database = await db;
  
  if (!credentials.email || !credentials.password) {
    throw new AuthError('Email and password are required');
  }

  const user = await database.get('users', credentials.email);
  
  if (!user) {
    throw new AuthError('Invalid credentials');
  }

  const isValidPassword = await comparePasswords(credentials.password, user.password);
  if (!isValidPassword) {
    throw new AuthError('Invalid credentials');
  }

  const token = uuidv4();
  const expiresAt = Date.now() + (credentials.remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);
  
  await database.put('sessions', {
    token,
    expiresAt,
  });

  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};
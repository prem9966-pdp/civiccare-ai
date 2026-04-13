import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generate a JWT token for a user
 * @param userId - The user ID to include in the payload
 * @returns string - The signed JWT token
 */
export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';
  
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '7d',
  });
};

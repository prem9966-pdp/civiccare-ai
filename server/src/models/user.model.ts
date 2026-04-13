import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  generateToken: () => string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    console.log(`[MODEL DEBUG] Hashing password for: ${this.email}`);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(`[MODEL DEBUG] Password hashed successfully`);
    next();
  } catch (error: any) {
    console.error(`[MODEL DEBUG] Hashing failed: ${error.message}`);
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  console.log(`[MODEL DEBUG] Comparing password for: ${this.email}`);
  if (!this.password) {
    console.error(`[MODEL DEBUG] No password hash found for user!`);
    return false;
  }
  const match = await bcrypt.compare(password, this.password);
  console.log(`[MODEL DEBUG] Password match result: ${match}`);
  return match;
};

// Method to generate JWT
userSchema.methods.generateToken = function(): string {
  const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
  return jwt.sign(
    { id: this._id },
    jwtSecret,
    { expiresIn: '7d' }
  );
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;

import User, { IUser } from "../models/user.model";
import { RegisterBody, LoginBody } from "../validators/auth.validator";
import { ApiError } from "../utils/ApiError";

class AuthService {
  async register(data: RegisterBody) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new ApiError(400, "User already exists with this email");
    }

    const user = await User.create(data);
    const token = user.generateToken();
    
    // Convert to object and delete password
    const userObj = user.toObject();
    delete (userObj as any).password;

    return { user: userObj, token };
  }

  async login(data: LoginBody) {
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      throw new ApiError(404, "Invalid credentials - user not found");
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials - password incorrect");
    }

    const token = user.generateToken();
    const userObj = user.toObject();
    delete (userObj as any).password;

    return { user: userObj, token };
  }

  async getMe(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User session not found");
    }
    return user;
  }
}

export const authService = new AuthService();

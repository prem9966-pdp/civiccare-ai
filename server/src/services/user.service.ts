import User, { IUser } from "../models/user.model";
import { UpdateProfileBody } from "../validators/user.validator";
import { ApiError } from "../utils/ApiError";

class UserService {
  async updateProfile(userId: string, data: UpdateProfileBody) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (data.name) user.name = data.name;
    if (data.profile) {
      user.profile = { ...user.profile, ...data.profile };
    }

    await user.save();
    return user;
  }

  async getDashboardSummary(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // In a real app, this would aggregate data from schemes, chats, etc.
    return {
        user: {
            name: user.name,
            role: user.role,
            isProfileComplete: !!(user.profile.phone && user.profile.state)
        },
        stats: {
            matchedSchemes: 14, // Mock
            activeConsultations: 2, // Mock
            documentsUploaded: 5 // Mock
        }
    };
  }
}

export const userService = new UserService();

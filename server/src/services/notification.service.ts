import Notification, { INotification } from "../models/notification.model";

class NotificationService {
  async create(userId: string, data: Partial<INotification>) {
    return await Notification.create({ ...data, userId });
  }

  async getUserNotifications(userId: string) {
    return await Notification.find({ userId }).sort({ isRead: 1, createdAt: -1 }).limit(10);
  }

  async markAsRead(userId: string, id: string) {
    return await Notification.findOneAndUpdate(
        { _id: id, userId }, 
        { isRead: true }, 
        { new: true }
    );
  }

  async markAllAsRead(userId: string) {
    return await Notification.updateMany({ userId, isRead: false }, { isRead: true });
  }
}

export const notificationService = new NotificationService();

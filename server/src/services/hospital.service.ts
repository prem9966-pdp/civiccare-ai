import Hospital, { IHospital } from "../models/hospital.model";
import { ApiError } from '../utils/ApiError';

class HospitalService {
  async getAll(query: any) {
    const { city, type, search } = query;
    const filter: any = {};

    if (city) filter.city = city;
    if (type) filter.type = type;
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } }
        ];
    }

    return await Hospital.find(filter).sort({ isEmergencyReady: -1, name: 1 });
  }

  async getById(id: string) {
    const item = await Hospital.findById(id);
    if (!item) throw new ApiError(404, "Hospital not found");
    return item;
  }
}

export const hospitalService = new HospitalService();

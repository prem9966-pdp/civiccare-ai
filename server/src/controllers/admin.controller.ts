import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/user.model";
import Scheme from "../models/scheme.model";
import Hospital from "../models/hospital.model";
import AdminActivity from "../models/admin-activity.model";
import { analyticsService } from "../services/analytics.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from '../utils/ApiError';

export const getDashboardSummary = asyncHandler(async (req: Request, res: Response) => {
  const stats = await analyticsService.getDashboardStats();

  return res.status(200).json(
    new ApiResponse(200, stats, "Dashboard summary retrieved")
  );
});

export const getUsersAudit = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, users, "Citizen audit trail retrieved")
  );
});

// Scheme CRUD
export const upsertScheme = asyncHandler(async (req: Request, res: Response) => {
    const { id, ...data } = req.body;
    let scheme;
    
    if (id) {
        scheme = await Scheme.findByIdAndUpdate(id, data, { new: true });
        await AdminActivity.create({ 
            adminId: req.user?._id?.toString(), action: 'UPDATE_SCHEME', targetId: id, targetType: 'Scheme', details: `Updated scheme: ${scheme?.title}` 
        });
    } else {
        scheme = await Scheme.create(data);
        await AdminActivity.create({ 
            adminId: req.user?._id?.toString(), action: 'CREATE_SCHEME', targetId: scheme._id, targetType: 'Scheme', details: `Created scheme: ${scheme.title}` 
        });
    }

    return res.status(200).json(
      new ApiResponse(200, scheme, "Scheme catalog updated")
    );
});

export const deleteScheme = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await Scheme.findByIdAndDelete(id);
    await AdminActivity.create({ 
        adminId: req.user?._id?.toString(), action: 'DELETE_SCHEME', targetId: id, targetType: 'Scheme', details: `Deleted scheme ID: ${id}` 
    });

    return res.status(200).json(
      new ApiResponse(200, null, "Scheme removed from catalog")
    );
});

// Hospital CRUD
export const upsertHospital = asyncHandler(async (req: Request, res: Response) => {
    const { id, ...data } = req.body;
    let hospital;

    if (id) {
        hospital = await Hospital.findByIdAndUpdate(id, data, { new: true });
        await AdminActivity.create({ 
            adminId: req.user?._id?.toString(), action: 'UPDATE_HOSPITAL', targetId: id, targetType: 'Hospital', details: `Updated location: ${hospital?.name}` 
        });
    } else {
        hospital = await Hospital.create(data);
        await AdminActivity.create({ 
            adminId: req.user?._id?.toString(), action: 'CREATE_HOSPITAL', targetId: hospital._id, targetType: 'Hospital', details: `Created location: ${hospital.name}` 
        });
    }

    return res.status(200).json(
      new ApiResponse(200, hospital, "Location discovery hub updated")
    );
});

export const deleteHospital = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await Hospital.findByIdAndDelete(id);
    await AdminActivity.create({ 
        adminId: req.user?._id?.toString(), action: 'DELETE_LOCATION', targetId: id, targetType: 'Hospital', details: `Deleted location ID: ${id}` 
    });

    return res.status(200).json(
      new ApiResponse(200, null, "Location removed from hub")
    );
});



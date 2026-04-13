import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  profile: z.object({
    age: z.number().min(0).max(120).optional(),
    phone: z.string().min(10).max(15).optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    languagePreference: z.string().optional(),
    occupation: z.string().optional(),
    category: z.string().optional(),
    incomeRange: z.string().optional(),
    healthIssues: z.array(z.string()).optional(),
  }).optional(),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;

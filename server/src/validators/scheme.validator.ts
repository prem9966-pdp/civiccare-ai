import { z } from "zod";

export const schemeCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  state: z.string(),
  targetGroups: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  requiredDocs: z.array(z.string()).optional(),
  stepsToApply: z.array(z.string()).optional(),
  officialUrl: z.string().url().optional(),
  eligibilityCriteria: z.object({
    minAge: z.number().optional(),
    maxAge: z.number().optional(),
    incomeCap: z.number().optional(),
    gender: z.string().optional(),
    caste: z.array(z.string()).optional(),
    disabilityRequired: z.boolean().optional(),
    employment: z.array(z.string()).optional(),
  }).optional(),
});

export type SchemeCreateBody = z.infer<typeof schemeCreateSchema>;

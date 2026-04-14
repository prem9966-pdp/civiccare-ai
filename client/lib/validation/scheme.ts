import { z } from "zod";

export const schemeDiscoverySchema = z.object({
  age: z.string().or(z.number()).transform(v => Number(v)).refine(v => v > 0, "Age must be positive"),
  gender: z.string().min(1, "Gender is required"),
  state: z.string().min(1, "State is required"),
  income: z.string().or(z.number()).transform(v => Number(v)),
  category: z.string().min(1, "Category is required"),
  occupation: z.string().min(1, "Occupation is required"),
  education: z.string().optional(),
  disabilityStatus: z.string().optional(),
  farmerStatus: z.string().optional(),
  studentStatus: z.string().optional()
});

export type SchemeDiscoveryValues = z.infer<typeof schemeDiscoverySchema>;

import { z } from "zod";

export const schemeDiscoverySchema = z.object({
  age: z.coerce.number().min(1, "Age must be positive"),
  gender: z.string().min(1, "Gender is required"),
  state: z.string().min(1, "State is required"),
  income: z.coerce.number().min(0, "Income cannot be negative"),
  category: z.string().min(1, "Category is required"),
  occupation: z.string().min(1, "Occupation is required"),
  education: z.string().optional(),
  disabilityStatus: z.string().optional(),
  farmerStatus: z.string().optional(),
  studentStatus: z.string().optional()
});

export type SchemeDiscoveryValues = z.infer<typeof schemeDiscoverySchema>;

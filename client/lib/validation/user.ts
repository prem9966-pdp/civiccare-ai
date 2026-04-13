import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  profile: z.object({
    phone: z.string().min(10, "Phone must be at least 10 digits").max(15, "Phone too long"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    languagePreference: z.string().min(1, "Language is required"),
    occupation: z.string().min(1, "Occupation is required"),
    category: z.string().min(1, "Category is required"),
    incomeRange: z.string().min(1, "Income range is required"),
    healthIssues: z.array(z.string()).optional(),
  }),
});

export type ProfileValues = z.infer<typeof profileSchema>;

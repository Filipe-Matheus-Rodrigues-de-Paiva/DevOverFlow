import * as z from "zod";

export const questionSchema = z.object({
  title: z.string().min(5, "Title must contain at least 5 characters").max(130),
  explanation: z
    .string()
    .min(20, "Explanation must contain at least 20 characters"),
  tags: z
    .array(z.string().min(1).max(15))
    .min(1, "Must contain at least 1 tag")
    .max(3),
});

export const answerSchema = z.object({
  content: z.string().min(100, "Answer must contain at least 100 characters"),
});

export const editProfileSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters").max(30),
  username: z
    .string()
    .min(5, "Username must contain at least 5 characters")
    .max(50),
  portfolioWebsite: z.string().url("Invalid URL"),
  location: z
    .string()
    .min(3, "Location must contain at least 3 characters")
    .max(50),
  bio: z.string().min(10, "Bio must contain at least 10 characters").max(160),
});

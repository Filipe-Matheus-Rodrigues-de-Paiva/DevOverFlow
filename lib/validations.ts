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

import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthValues = z.infer<typeof schema>;
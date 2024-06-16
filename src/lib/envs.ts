import { z } from "zod";

const envSchema = z.object({
    API_BASE_URL: z.string().min(1),
  });
  

export const envs = envSchema.parse({
  API_BASE_URL: process.env.API_BASE_URL,
})
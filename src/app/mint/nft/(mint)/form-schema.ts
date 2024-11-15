import { z } from 'zod';

export const mintFormSchema = z.object({
  name: z.string().min(1, 'Name is required!'),
  description: z.string().min(1, 'Description is required!'),
  externalUrl: z.string().optional(),
});

export type MintFormSchema = z.infer<typeof mintFormSchema>;

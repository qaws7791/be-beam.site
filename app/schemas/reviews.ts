import { z } from 'zod';

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(100),
  images: z.array(z.instanceof(File)).max(10),
});

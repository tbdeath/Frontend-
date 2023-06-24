import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  submitClaim: publicProcedure
    .input(z.object({ address: z.string(), name: z.string(), id: z.string() }))
    .mutation(({ input }) => {
      return {
        message: `not implemented yet`,
        data: input,
      };
    }),
});

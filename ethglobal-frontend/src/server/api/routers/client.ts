import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const clientRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ address: z.string(), govId: z.string() }))
    .mutation(({ input }) => {
      return {
        message: `not implemented yet`,
        data: input,
      };
    }),
});

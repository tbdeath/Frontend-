import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

const inputSchema = z.object({
  address: z.string(),
  govId: z.string(),
  receipients: z.map(z.string(), z.object({ weight: z.number().int() })),
})

export const clientRouter = createTRPCRouter({
  create: publicProcedure
    .input(inputSchema)
    .mutation(async ({ input }) => {
      const result = await prisma.client.create({
        data: {
          address: input.address,
          govId: input.govId,
          receipients: {
            create: Array.from(input.receipients).map(([address, { weight }]) => ({
              toAddress: address,
              weight,
            }))
          }
        }
      })
      return {
        message: `not implemented yet`,
        data: result,
      };
    }),
});

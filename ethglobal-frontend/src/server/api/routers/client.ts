import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

const inputSchema = z.object({
  address: z.string(),
  govId: z.string(),
  recipients: z.map(z.string(), z.object({ weight: z.number().int().positive() })),
})

export const clientRouter = createTRPCRouter({
  create: publicProcedure
    .input(inputSchema)
    .mutation(async ({ input }) => {
      const data = {
        address: input.address,
        govId: input.govId,
        recipients: {
          create: Array.from(input.recipients).map(([address, { weight }]) => ({
            toAddress: address,
            weight,
          }))
        }
      }
      const result = await prisma.client.upsert({
        where: { address: input.address },
        create: data,
        update: {
          govId: input.govId,
          recipients: {
            deleteMany: {},
            create: data.recipients.create,
          },
        },
      })
      return {
        message: `not implemented yet`,
        data: result,
      };
    }),
});

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
      await startClaim(input.address, input.govId, "https://frontend-lac-five.vercel.app")
      return {
        message: `success`,
        data: result,
      };
    }),

  get: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(async ({ input }) => {
      const result = await prisma.client.findUnique({
        where: { address: input.address },
        include: { recipients: true },
      })
      return {
        message: `success`,
        data: result,
      };
    }),
});

async function startClaim(address: string, govId: string, rootUrl: string) {
  // check government 
  // callback url is relative to the server
  const body = {
    address,
    govId,
    callbackUrl: `${rootUrl}/api/callback/claimTimeout`,
  }
  const url = "https://api.chainjet.io/hooks/21cc524ab93572d54c222bfc1c80e7bf4a7a119eff467fcc"
  await prisma.client.update({
    where: { address },
    data: { claimedStartedAt: new Date() },
  })
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const result: unknown = await response.json()
  console.log(result)
}

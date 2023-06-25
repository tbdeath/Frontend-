import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress } = z.object({ walletAddress: z.string() }).parse(req.body)
  await prisma.client.update({
    where: { address: walletAddress },
    data: { claimedStartedAt: null },
  })
  res.status(200).json({ message: "success" })
}
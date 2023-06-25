import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress } = z.object({ walletAddress: z.string() }).parse(req.body)
  const client = await prisma.client.findUnique({
    where: { address: walletAddress },
    include: { recipients: true },
  })
  console.log(client);
  if (client) {
    if (client.claimedStartedAt) {
      // TODO: distribute assets
      await prisma.client.update({
        where: { address: walletAddress },
        data: { claimed: true },
      })
      const url = "https://api.chainjet.io/hooks/872df1cd219b238450eee955146ff852b19667f76df1ef7d"
      for (const recipient of client.recipients) {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: recipient.toAddress }),
        })
      }
      res.status(200).json({ message: "success", data: client })
      return
    }
  }
  res.status(404).json({ message: "not found" })
}

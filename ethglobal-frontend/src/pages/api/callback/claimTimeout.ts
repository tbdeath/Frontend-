import { ethers } from "ethers";
import { type NextApiRequest, type NextApiResponse } from "next";
import { type ZodType, z } from "zod";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress } = z.object({ walletAddress: z.string() }).parse(req.body)

  const client = await prisma.client.findUnique({
    where: { address: walletAddress },
    include: { recipients: true },
  })
  
  if (client) {
    if (client.claimedStartedAt) {
      // TODO: distribute assets
      await callContract()
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


async function callContract() {
  const provider = new ethers.JsonRpcProvider(env.ALCHEMY_URL)
  const signer = new ethers.Wallet(env.WALLET_PRIVATE_KEY, provider)

  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function approve(address _spender, uint256 _value) public returns (bool success)",
  ]

  const output = await provider.getBlockNumber()
  console.log(output)

  const USDTContract = new ethers.Contract("0x1E4a5963aBFD975d8c9021ce480b42188849D41d", abi, signer)

  const functionSchema = <T extends ZodType>(rt: T) => z.function(z.tuple([]), z.promise(rt))

  const contractSchema = z.object({
    name: functionSchema(z.string()),
    symbol: functionSchema(z.string()),
    decimals: functionSchema(z.bigint()),
    totalSupply: functionSchema(z.bigint()),
  })

  const contract = contractSchema.parse(USDTContract)

  const name = await contract.name()
  const symbol = await contract.symbol()
  const decimals = await contract.decimals()
  const totalSupply = await contract.totalSupply()

  console.log(`${symbol} (${name}) total supply is ${ethers.formatUnits(totalSupply, decimals)}`)
}
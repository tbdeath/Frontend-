import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { z } from "zod";
import { api } from "~/utils/api";

function Home() {
  
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);
  
  const account = useAccount()
  const balance = useBalance({ address: account.address })

  const [formData, setFormData] = useState({
    sin: "",
    numPeopleSplittingWill: 0,
    recipientWalletAddress: [""],
    recipientAllocation: [""],
  });

  if (
    formData.recipientWalletAddress.length < formData.numPeopleSplittingWill
  ) {
    let tmp = formData.recipientWalletAddress;
    for (
      let i = 0;
      i <
      formData.numPeopleSplittingWill - formData.recipientWalletAddress.length;
      i++
    ) {
      tmp.push("");
    }
    setFormData({ ...formData, recipientWalletAddress: tmp });
  }
  if (formData.recipientAllocation.length < formData.numPeopleSplittingWill) {
    let tmp = formData.recipientAllocation;
    for (
      let i = 0;
      i < formData.numPeopleSplittingWill - formData.recipientAllocation.length;
      i++
    ) {
      tmp.push("");
    }
    setFormData({ ...formData, recipientAllocation: tmp });
  }

  const rows = [];

  for (let i = 0; i < formData.numPeopleSplittingWill; i++) {
    rows.push(
      <tr key={i}>
        <td>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            placeholder="Wallet Address"
            value={formData.recipientWalletAddress[i]}
            onChange={(e) => {
              let tmp = [...formData.recipientWalletAddress];
              tmp[i] = e.target.value;
              setFormData({ ...formData, recipientWalletAddress: tmp });
            }}
          />
        </td>
        <td>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="number"
            step={1}
            placeholder="Weight of Will"
            value={formData.recipientAllocation[i]}
            onChange={(e) => {
              let tmp = [...formData.recipientAllocation];
              tmp[i] = e.target.value;
              setFormData({ ...formData, recipientAllocation: tmp });
            }}
          />
        </td>
      </tr>
    );
  }

  const createClient = api.client.create.useMutation();
  const handleSubmit = () => {
    if (!account.isConnected) return alert("Please connect your wallet");
    createClient.mutate({
      address: account.address ?? "",
      govId: formData.sin,
      recipients: new Map(formData.recipientWalletAddress.map((address, i) => ([
        address,
        {
          weight: z.number().int().parse(Number(formData.recipientAllocation[i])),
        }
      ]))),
    });
  }

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {account.isConnected ? (
        <div>
          <p>Address: {account.address}</p>
          <p>Balance: {balance.data?.formatted}</p>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <p>Not connected</p>
          <Link href="/"><button className="border p-2">Connect</button></Link>
        </div>
      )}
      <h1>Create Your Will</h1>
      <form
        className="mb-4 flex flex-col items-center rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          handleSubmit();
        }}
      >
        <label className="mb-2 block text-sm font-bold text-gray-700">
          SIN Number:
        </label>
        <span>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            value={formData.sin}
            onChange={(e) => setFormData({ ...formData, sin: e.target.value })}
          ></input>
        </span>
        <br />
        <label className="mb-2 block text-sm font-bold text-gray-700">
          How many people will be in your will?
        </label>
        <span>
          <input
            type="number"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            value={formData.numPeopleSplittingWill}
            onChange={(e) => {
              setFormData({
                ...formData,
                numPeopleSplittingWill: e.target.valueAsNumber,
              });
              console.log(formData.numPeopleSplittingWill);
            }}
          ></input>
        </span>
        <br />
        <div>
          <tbody>{rows}</tbody>
        </div>
        <br />
        <button
          type="submit"
          className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
        >
          Submit
        </button>
      </form>
      <style jsx>{`
        form {
          width: 80%;
          margin: 0 auto;
        }
        h1 {
          margin-top: 5%;
          text-align: center;
          font-size: 50px;
        }
        label {
          float: left;
          display: inline-block;
          width: 150px;
          text-align: right;
        }
        span {
          display: block;
          overflow: hidden;
          padding: 0px 4px 0px 6px;
        }
        button {
          display: flex;
          margin: auto;
        }
      `}</style>
    </>
  );
}

export default Home;

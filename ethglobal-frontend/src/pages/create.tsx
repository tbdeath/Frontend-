import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

function Home() {
  
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);
  
  const account = useAccount()
  const balance = useBalance({ address: account.address })

  const [formData, setFormData] = useState({
    sin: "",
    walletAddress: "",
    numPeopleSplittingWill: 0,
    recipientName: [""],
    recipientSin: [""],
    recipientWalletAddress: [""],
    recipientAllocation: [""],
  });

  if (formData.recipientName.length < formData.numPeopleSplittingWill) {
    let tmp = formData.recipientName;
    for (
      let i = 0;
      i < formData.numPeopleSplittingWill - formData.recipientName.length;
      i++
    ) {
      tmp.push("");
    }
    setFormData({ ...formData, recipientName: tmp });
  }
  if (formData.recipientSin.length < formData.numPeopleSplittingWill) {
    let tmp = formData.recipientSin;
    for (
      let i = 0;
      i < formData.numPeopleSplittingWill - formData.recipientSin.length;
      i++
    ) {
      tmp.push("");
    }
    setFormData({ ...formData, recipientSin: tmp });
  }
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
            placeholder="Name"
            value={formData.recipientName[i]}
            onChange={(e) => {
              let tmp = [...formData.recipientName];
              tmp[i] = e.target.value;
              setFormData({ ...formData, recipientName: tmp });
            }}
          />
        </td>
        <td>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            placeholder="SIN Number"
            value={formData.recipientSin[i]}
            onChange={(e) => {
              let tmp = [...formData.recipientSin];
              tmp[i] = e.target.value;
              setFormData({ ...formData, recipientSin: tmp });
            }}
          />
        </td>
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
            type="text"
            placeholder="Percentage of Will"
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
      <form className="mb-4 flex flex-col items-center rounded bg-white px-8 pb-8 pt-6 shadow-md">
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
          Wallet Address:
        </label>
        <span>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            value={formData.walletAddress}
            onChange={(e) =>
              setFormData({ ...formData, walletAddress: e.target.value })
            }
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

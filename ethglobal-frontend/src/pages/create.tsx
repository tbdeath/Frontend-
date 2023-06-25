import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { api } from "~/utils/api";
import 'daisyui/dist/full.css';

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
    const tmp = formData.recipientWalletAddress;
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
    const tmp = formData.recipientAllocation;
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
      <tr key={i} className="danger">
        <td>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            type="text"
            placeholder="Wallet Address"
            value={formData.recipientWalletAddress[i]}
            onChange={(e) => {
              const tmp = [...formData.recipientWalletAddress];
              tmp[i] = e.target.value;
              setFormData({ ...formData, recipientWalletAddress: tmp });
            }}
          />
        </td>
        <td>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            type="number"
            step={1}
            placeholder="Weight of Will"
            value={formData.recipientAllocation[i]}
            onChange={(e) => {
              const tmp = [...formData.recipientAllocation];
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
          weight: Number(formData.recipientAllocation[i]),
        }
      ]))),
    });
  }

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div style={{backgroundColor: "#540cfc"}}>
      {account.isConnected ? (
        <div>
          <p style={{color: "#75f8cd"}}>Address: {account.address}</p>
          <p style={{color: "#75f8cd"}}>Balance: {balance.data?.formatted}</p>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <p>Not connected</p>
          <Link href="/"><button className="btn btn-outline btn-info">Connect</button></Link>
        </div>
      )}
      <h1 style={{color: "#75f8cd"}}>Create Your Will</h1>
      <br/>
      <br/>
      <br/>
      </div>
      <br/>
      <form
        className="mb-4 flex flex-col items-center rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          handleSubmit();
        }}
      >
        <div style={{marginLeft: "35%"}}>
        <label className="mb-2 block text-sm font-bold text-gray-700" style={{marginTop: "10px"}}>
          <b>SIN Number:</b>
        </label>
        <span>
          <input
            type="text"
            className="input input-bordered input-primary w-full max-w-xs"
            value={formData.sin}
            onChange={(e) => setFormData({ ...formData, sin: e.target.value })}
          ></input>
        </span>
        <br />
        <label className="mb-2 block text-sm font-bold text-gray-700">
          <b>How many people will be in your will?</b>
        </label>
        <span>
          <input
            type="number"
            className="input input-bordered input-primary w-full max-w-xs"
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
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          style={{width: "12%"}}
        >
          Submit
        </button>
        {createClient.isLoading && <p>Submitting...</p>}
        {createClient.isSuccess && <p>Success!</p>}
        {createClient.isError && <p>{JSON.stringify(createClient.error)}</p>}
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

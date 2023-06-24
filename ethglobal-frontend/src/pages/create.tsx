import React, { useState } from "react";

function Home() {
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
      <tr>
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
          />
        </td>
        <td>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            placeholder="Wallet Address"
          />
        </td>
        <td>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            placeholder="Percentage of Will"
          />
        </td>
      </tr>
    );
  }

  return (
    <>
      <h1>Create Your Will</h1>
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
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
        <tbody>{rows}</tbody>
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
      `}</style>
    </>
  );
}

export default Home;

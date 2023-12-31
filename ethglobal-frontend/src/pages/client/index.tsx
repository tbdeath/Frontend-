import Head from "next/head";
import { useEffect, useState } from "react";
import { useConnect, useAccount, useDisconnect, useBalance } from 'wagmi';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'

export default function ClientPage() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);

  const connect = useConnect()
  const account = useAccount()
  const { disconnect } = useDisconnect()

  const balance = useBalance({ address: account.address })
  
  const handleLogout = () => {
    disconnect();
  }
  
  const prepareTransaction = usePrepareSendTransaction({
    to: '0xcf11Bf220BB50a504C00297275289946c696e53c',
    value: BigInt(100000),
  })
  const sendTransaction = useSendTransaction(prepareTransaction.config)
  
  const handleSendTransaction = () => {
    console.log(sendTransaction);
    sendTransaction.sendTransaction?.()
  }

  console.log(prepareTransaction.config);

  return (
    <>
      <Head>
        <title>Client page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h3>Client page</h3>
        <div className="flex flex-col gap-4 p-4">
          <p>Status: {account.status}</p>
          <p>Address: {account.address}</p>
          <p>Balance: {balance.data?.formatted}</p>
          {isReady && connect.connectors.map((connector) => (
            <button
              key={connector.id}
              className="border p-2 disabled:opacity-50"
              onClick={() => connect.connect({ connector })}
              disabled={connect.isLoading}
            >
              Log in with {connector.name}
            </button>
          ))}
          <button
            className="border p-2 disabled:opacity-50"
            onClick={handleLogout}
            disabled={!account.isConnected}
          >
            Log out
          </button>
          <button
            className="border p-2 disabled:opacity-50"
            onClick={handleSendTransaction}
            disabled={sendTransaction.isLoading}
          >
            Send transaction
          </button>
        </div>
      </main>
    </>
  );
}

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useConnect, useAccount, useDisconnect, useBalance,useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import Connect from './Connect';

let exportVar;

export default function Home() {
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);



  const connect = useConnect()
  const account = useAccount()
  exportVar = account.address;
  const { disconnect } = useDisconnect()

  const balance = useBalance({ address: account.address })
  const am = account.address
  
  
  const handleLogout = () => {
    disconnect();
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <p>Status: {account.status}</p>
        {/* {isReady && !account.isConnected && connect.connectors.map((connector) => (
          <button
            key={connector.id}
            className="border p-2 disabled:opacity-50"
            onClick={() => connect.connect({ connector })}
            disabled={connect.isLoading}
          >
            Log in with {connector.name}
             
          </button>
          
        ))} */}

      {isReady && !account.isConnected  &&
          <button>
            <Connect></Connect>
          </button>
        }
         


      {/* <button className="border p-2 disabled:opacity-50">Connect</button> */}
        {account.isConnected && (
          <>
            <p>Address: {account.address}</p>
            <p>Balance: {balance.data?.formatted}</p>
            <button
              className="border p-2"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        )}
      </div>
      {account.isConnected && (
        <div className="btn-group">
          <button
            id="create"
            className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
            onClick={() => router.push("/create")}
          >
            I want to create my will
            
          </button>
          <button
            id="modify"
            className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
            onClick={() => router.push("/modify")}
          >
            I want to modify my will
          </button>
          <style jsx>{`
            div {
              width: 100%;
              margin-top: 20%;
            }
            button {
              width: 40%;
              margin-left: 5%;
            }
          `}</style>
        </div>
      )}
    </>
    
  );
  
}


export {exportVar};


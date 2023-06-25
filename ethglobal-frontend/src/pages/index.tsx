import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { Connect } from "~/components/Connect";

let exportVar;

export default function Home() {
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);

  const account = useAccount()
  exportVar = account.address;
  const { disconnect } = useDisconnect()

  const balance = useBalance({ address: account.address })

  console.log(balance)


  const handleLogout = () => {
    disconnect();
  }

  return (
    <>
    <div className="flex flex-col" style={{backgroundImage: "url(bg1.jpeg)", height: "100vh"}}>
        {isReady && <p style={{fontSize: "40px", color: "#75f8cd"}}>Status: {account.status}</p>}
      <img src="logo.png" width="1000" height="300" style={{marginLeft: "20%", marginTop: "5%" }}/>
      
        {isReady && !account.isConnected &&
          <Connect />
        }

        {isReady && account.isConnected && (
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
      
      {isReady && account.isConnected && (
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
              height: 100vh;
            }
            button {
              width: 40%;
              margin-left: 5%;
            }
            p {
              font-size: 100px;
            }
          `}</style>
        </div>
      )}
      </div> 
    </>

  );

}


export { exportVar };
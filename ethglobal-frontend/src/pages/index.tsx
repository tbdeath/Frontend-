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
      
      
        

        {isReady && account.isConnected && (
          <>
            <p style={{color: "#75f8cd"}}>Address: {account.address}</p>
            <p style={{color: "#75f8cd"}}>Balance: {balance.data?.formatted}</p>
            
          </>
        )}
        <img src="logo.png" width="1000" height="300" style={{marginLeft: "20%", marginTop: "5%" }}/>
        {isReady && !account.isConnected &&
          <Connect />
        }
      
      {isReady && account.isConnected && (
        <p className="btn-group" style={{marginLeft: "30%", marginTop: "5%"}}>
          <button
            id="create"
            className="btn btn-accent"
            onClick={() => router.push("/create")}
          >
            I want to create my will

          </button>
          <button
            id="modify"
            className="btn btn-accent"
            onClick={() => router.push("/modify")}
          >
            I want to modify my will
          </button>
          {isReady && account.isConnected && (
          <button
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
          
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
        </p>
      )}
      </div> 
    </>

  );

}


export { exportVar };
import { useMemo } from 'react';
import { type WindowProvider, useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'
import { paywall } from '~/pages/_app';
import 'daisyui/dist/full.css';

export const Connect = () => {
  const { address, isConnected } = useAccount();
  
  // Retrieve the wallet provider from the paywall library
  const provider = useMemo(() => {
    return paywall.getProvider("https://app.unlock-protocol.com") as WindowProvider; 
  }, []);

  const { connect } = useConnect({
    connector: new InjectedConnector({
      options: {
        name: "Unlock Paywall Provider",
        getProvider: () => {
          // Return the provider we created earlier
          return provider;
        },
      },
    }),
  });

  return (
    <>
    
      {!isConnected && <button onClick={() => {
        connect()
      }} className="btn btn-primary" style={{fontSize: "30px"}}>Connect</button>
      }
      
      {isConnected && <p>Welcome back {address?.slice(0,8)}&hellip;</p>}
      <style jsx>{`
            button {
              width: 30%;
              margin-left: 35%;
              margin-right: 20%;
              margin-top: 5%;
            }
            
          `}</style>
    </>
  )
}

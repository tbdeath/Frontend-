import { type AppType,AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains,mainnet } from 'wagmi';
import { gnosis, goerli } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Paywall } from '../../node_modules/@unlock-protocol/paywall'
import { networks } from '@unlock-protocol/networks'
import { api } from "~/utils/api";
import "~/styles/globals.css";
import {ethers} from 'ethers';
//import {network} from '../config';


//import '../styles/index.css'


export const paywall = new Paywall(networks);


const walletConnect = new WalletConnectConnector({
  chains: [gnosis],
  options: {
    projectId: "d9a4b3e043f60dbc6a41df343a520d92",
  },
})
 
const injected = new InjectedConnector()

const { publicClient, webSocketPublicClient } = configureChains(
  [gnosis, goerli],
  [publicProvider()],
)
 

const MyApp: AppType = ({
  Component,
  pageProps,
}) => {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};




const config = createConfig({
  autoConnect: true,
  webSocketPublicClient, 
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(),
  }),
  connectors: [walletConnect, injected],
})





export default api.withTRPC(MyApp);
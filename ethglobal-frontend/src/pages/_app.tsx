import { type AppType } from "next/app";
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { gnosis, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { api } from "~/utils/api";
import "~/styles/globals.css";
 
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
 
const config = createConfig({
  publicClient,
  webSocketPublicClient,
  connectors: [walletConnect, injected],
})

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

export default api.withTRPC(MyApp);

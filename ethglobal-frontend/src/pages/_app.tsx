import { type AppType } from "next/app";
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet, optimism, gnosis } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { api } from "~/utils/api";
import "~/styles/globals.css";
 
const connector = new WalletConnectConnector({
  chains: [gnosis],
  options: {
    projectId: "d9a4b3e043f60dbc6a41df343a520d92",
  },
})

const { publicClient, webSocketPublicClient } = configureChains(
  [gnosis],
  [publicProvider()],
)
 
const config = createConfig({
  publicClient,
  webSocketPublicClient,
  connectors: [connector],
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

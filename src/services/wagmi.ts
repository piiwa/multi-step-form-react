import { JsonRpcProvider, WebSocketProvider } from "@ethersproject/providers";
import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { Provider } from "@wagmi/core";
import { useMemo } from "react";
import {
  configureChains,
  createClient,
  useProvider,
  useWebSocketProvider,
} from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { NEXT_PUBLIC_ALCHEMY_API_KEY } from "@/constants/env";

export const appInfo = {
  appName: "DApp",
};

export const useWagmi = () => ({
  ...useMemo(() => {
    const config = configureChains(
      [mainnet, goerli],
      [
        alchemyProvider({
          apiKey: NEXT_PUBLIC_ALCHEMY_API_KEY,
        }),
        publicProvider(),
      ]
    );

    const chains = config.chains;

    const wallets = [
      ...getDefaultWallets({
        appName: appInfo.appName,
        chains,
      }).wallets,
      {
        groupName: "Other",
        wallets: [ledgerWallet({ chains })],
      },
    ];

    const wagmi = createClient<Provider, WebSocketProvider>({
      autoConnect: true,
      connectors: connectorsForWallets(wallets),
      provider: config.provider,
      webSocketProvider: config.webSocketProvider,
    });

    return {
      chains,
      wallets,
      wagmi,
    };
  }, []),
  provider: useProvider<JsonRpcProvider>(),
  webSocketProvider: useWebSocketProvider<WebSocketProvider>(),
});

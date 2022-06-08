import type { ExternalProvider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react';

export function useEthereumProvider() {
  const [ethereumProvider, setEthereumProvider] = useState<ExternalProvider | null>(null);
  const [isMetaMask, setIsMetaMask] = useState(false);

  useEffect(() => {
    async function detectProvider() {
      const provider = (await detectEthereumProvider()) as ExternalProvider;
      setEthereumProvider(provider);

      if (provider === window.ethereum) {
        setIsMetaMask(!!provider);
      }
    }

    detectProvider();

    // cleanup
    return () => {
      setEthereumProvider(null);
      setIsMetaMask(false);
    };
  }, []);

  return { ethereumProvider, isMetaMask };
}

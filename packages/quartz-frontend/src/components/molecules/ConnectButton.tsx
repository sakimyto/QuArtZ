import { useWeb3React } from '@web3-react/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa';

import Blockies from '@/components/atoms/Blockies';
import Button from '@/components/atoms/Button';
import projectConfig from '@/config/projectConfig';
import { useEthereumProvider } from '@/hooks/useEthereumProvider';
import { injected } from '@/utils/connectors';

const ConnectButton: NextPage = () => {
  const router = useRouter();

  const { activate, setError, account, active } = useWeb3React();
  const { isMetaMask } = useEthereumProvider();

  const [isConnecting, setIsConnecting] = useState(false);

  const connectMetaMask = async () => {
    const addChain = async () => {
      try {
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${projectConfig.chainId.toString(16)}`,
              chainName: projectConfig.networkName,
              nativeCurrency: {
                name: projectConfig.chainName,
                symbol: projectConfig.chainName,
                decimals: projectConfig.chainId,
              },
              rpcUrls: [projectConfig.rpcUrl],
            },
          ],
        });
      } catch (Exeption) {
        console.log(`${projectConfig.networkName} already Connected`);
        console.log('catch');
      } finally {
        console.log('finally');
      }
    };

    if (isMetaMask) {
      setIsConnecting(true);
      try {
        await activate(injected);
        setIsConnecting(false);
        addChain();
      } catch (error) {
        if (error instanceof Error) setError(error);
        setIsConnecting(false);
      }
    } else {
      window.open(
        `https://metamask.app.link/dapp/${projectConfig.siteDomain}${router.pathname}`,
        '_ blank'
      );
    }
  };

  useEffect(() => {
    async function loadInjectedWallet() {
      const isAuthorized = await injected.isAuthorized();
      if (isAuthorized) {
        await activate(injected);
      }
    }
    try {
      loadInjectedWallet();
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  }, [activate, setError]);

  return (
    <div className='flex justify-center'>
      {active && account ? (
        <div className='flex items-center p-2 space-x-2 text-xs rounded-full bg-zinc-700'>
          <span>
            <Blockies seed={account.toLowerCase()} className='rounded-full' />
          </span>
          <span>{`${account.substring(0, 5)}...${account.substring(account.length - 3)}`}</span>
        </div>
      ) : isConnecting ? (
        <Button
          onClick={() => ''}
          className='text-sm border-2 bg-zinc-800 border-zinc-500'
          disabled={true}
          isLoading={true}
        >
          Connecting
        </Button>
      ) : (
        <Button
          onClick={connectMetaMask}
          className='text-sm border-2 bg-zinc-800 border-zinc-500 hover:border-zinc-400'
          disabled={false}
        >
          <span>
            <FaWallet />
          </span>
          <span>Connect</span>
        </Button>
      )}
    </div>
  );
};

export default ConnectButton;

import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import Button from '@/components/atoms/Button';
import NFT from '@/config/abi/QAZToken.json';
import projectConfig from '@/config/projectConfig';

import { useEthereumProvider } from '@/hooks/useEthereumProvider';
import * as gtag from '@/utils/gtag';

const Minting: NextPage = () => {
  const { account, active, chainId } = useWeb3React();
  const { ethereumProvider } = useEthereumProvider();

  const [message, setMessage] = useState('');
  const [connErrMsg, setConnErrMsg] = useState('');
  const [totalSupply, setTotalSupply] = useState('?');
  const [maxAmount, setMaxAmount] = useState('?');
  const [nextTime, setNextTime] = useState('?');
  const [isMintable, setIsMintable] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const mintNFTs = async () => {
    if (account && ethereumProvider) {
      setMessage('');
      gtag.event({
        action: 'click',
        category: 'mint',
        label: 'start',
      });
      setIsPending(true);
      try {
        const web3Provider = new ethers.providers.Web3Provider(ethereumProvider);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(projectConfig.contractAddress, NFT.abi, signer);
        const transaction = await contract.mint();
        setIsPending(false);
        setIsMinting(true);
        await transaction.wait();
        setIsMinting(false);
        setMessage(`Yay! 1 ${projectConfig.nftName} successfully sent to you`);
      } catch (error) {
        setIsPending(false);
        setIsMinting(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    async function connErrMsg() {
      if (!active) {
        setConnErrMsg('Not connected to your wallet.');
      } else if (chainId !== projectConfig.chainId) {
        setConnErrMsg(`Change the network to ${projectConfig.networkName}.`);
      } else {
        setConnErrMsg('');
      }
    }

    async function fetchTotalSupply() {
      if (ethereumProvider) {
        const web3Provider = new ethers.providers.Web3Provider(ethereumProvider);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(projectConfig.contractAddress, NFT.abi, signer);
        const totalSupplyAmount = await contract.totalSupply();
        setTotalSupply(totalSupplyAmount.toString());
        const calcMaxAmount = Math.floor(totalSupplyAmount / 78 + 1) * 77 + 1;
        setMaxAmount(calcMaxAmount.toString());
      }
    }

    async function fetchLast77MintedAt() {
      if (ethereumProvider) {
        const web3Provider = new ethers.providers.Web3Provider(ethereumProvider);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(projectConfig.contractAddress, NFT.abi, signer);
        const last77MintedAt = await contract.last77MintedAt();
        const now = new Date();
        let date = new Date();
        date.setHours(now.getHours() - 77.01);
        let intDate = Math.floor(date.getTime() / 1000);
        if (last77MintedAt.toNumber() < intDate) {
          setIsMintable(true);
        } else {
          const nextt = (last77MintedAt.toNumber() - intDate) / 3600;
          setNextTime(nextt.toPrecision(3));
        }
      }
    }

    connErrMsg();
    if (active && account && chainId == projectConfig.chainId) {
      fetchTotalSupply();
      fetchLast77MintedAt();
    }

    // cleanup
    return () => {
      setIsMintable(false);
      setTotalSupply('?');
      setMaxAmount('?');
      setNextTime('?');
    };
  }, [active, account, ethereumProvider, chainId]);

  return (
    <>
      <div className='p-8 space-y-4 border rounded bg-zinc-800 border-t-red-300 border-r-blue-300 border-b-green-300 border-l-yellow-300'>
        <div className='text-2xl font-bold text-center'>
          <span className='text-pink-500'>{totalSupply}</span> / {maxAmount}
        </div>

        <div className='text-center'>
          <p className='text-base'>No fee, just gas.</p>
        </div>

        <div className='flex justify-center'>
          {isMintable ? (
            <>
              {active && !connErrMsg ? (
                <>
                  {isPending || isMinting ? (
                    <Button
                      onClick={() => ''}
                      className='font-bold bg-zinc-500'
                      disabled={true}
                      isLoading={true}
                    >
                      {isPending && 'Pending'}
                      {isMinting && 'Minting'}
                      {!isPending && !isMinting && 'Processing'}
                    </Button>
                  ) : (
                    <Button onClick={mintNFTs} className='font-bold bg-blue-700 hover:bg-blue-600'>
                      Mint
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={mintNFTs}
                  className='text-sm font-bold bg-zinc-700'
                  disabled={true}
                >
                  Mysterious error
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={mintNFTs}
              className='text-xs font-bold min-w-fit bg-zinc-700'
              disabled={true}
            >
              the next Mint after {`${nextTime}`} hours.
            </Button>
          )}
        </div>

        {message && <div className='text-sm text-center text-green-500'>{message}</div>}
        {connErrMsg && <div className='text-sm text-center text-red-500'>{connErrMsg}</div>}
      </div>
    </>
  );
};

export default Minting;

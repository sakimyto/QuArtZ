import '@/styles/globals.scss';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { GoogleAnalytics } from '@/components/atoms/GoogleAnalytics';
import { usePageView } from '@/hooks/usePageView';

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  usePageView();
  return (
    <>
      <GoogleAnalytics />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  );
};

export default MyApp;

const projectConfig = {
  nftName: 'QuArtZ',

  nftSymbol: 'QAZ',

  mintCost:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 0
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? 0
      : 0,

  networkName:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 'Astar mainnet'
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? 'Shibuya testnet'
      : 'localhost',

  chainName:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 'ASTR'
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? 'SBY'
      : 'ETH',

  chainId:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 592 // Aster mainnet
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? 81 // Shibuya testnet
      : 31337, // hardhat local network

  rpcUrl:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 'https://astar.api.onfinality.io/public'
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? 'https://rpc.shibuya.astar.network:8545'
      : 'http://localhost:8545',

  siteDomain:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 'quartz.gotcha3.xyz'
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? 'testnet-quartz.gotcha3.xyz'
      : 'localhost:3000',

  siteUrl:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 'https://quartz.gotcha3.xyz'
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? 'https://testnet-quartz.gotcha3.xyz'
      : 'http://localhost:3000',

  siteDescription:
    'QuArtZ is full-on-chain magic spell protocol, that is generated randomly and stored with attributes on Aster Network.',

  siteShortDescription: 'full-on-chain magic spell NFT',

  ogImagePath: '/img/ogp.png',

  twitterUsername: '@',

  twitterUrl: 'https://twitter.com/your_twitter_id',

  githubUrl: 'https://github.com/sakimyto/QuArtZ',

  discordUrl: 'https://discord.gg/your_discord_invite_code',

  collectionUrl:
    process.env.NEXT_PUBLIC_APP_ENV === 'production'
      ? 'https://tofunft.com/collection/QuArtZ/items'
      : process.env.NEXT_PUBLIC_APP_ENV === 'staging'
      ? ''
      : '',

  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    : '',
};

export default projectConfig;

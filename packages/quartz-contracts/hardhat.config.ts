import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";

import dotenv from "dotenv";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

dotenv.config();
const {
  LOCAL_OWNER_PRIVATE_KEY,
  LOCAL_ACCOUNT1_PRIVATE_KEY,
  LOCAL_ACCOUNT2_PRIVATE_KEY,
  OWNER_PRIVATE_KEY,
  ACCOUNT1_PRIVATE_KEY,
  ACCOUNT2_PRIVATE_KEY,
} = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const settings: import("hardhat/config").HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 10_000_000,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
      accounts: [
        `0x${LOCAL_OWNER_PRIVATE_KEY}`,
        `0x${LOCAL_ACCOUNT1_PRIVATE_KEY}`,
        `0x${LOCAL_ACCOUNT2_PRIVATE_KEY}`,
      ],
    },
    shibuya: {
      url: "https://evm.shibuya.astar.network",
      chainId: 81,
      accounts: [
        `0x${OWNER_PRIVATE_KEY}`,
        `0x${ACCOUNT1_PRIVATE_KEY}`,
        `0x${ACCOUNT2_PRIVATE_KEY}`,
      ],
    },
    aster: {
      url: "https://astar.api.onfinality.io/public",
      chainId: 592,
      accounts: [
        `0x${OWNER_PRIVATE_KEY}`,
        `0x${ACCOUNT1_PRIVATE_KEY}`,
        `0x${ACCOUNT2_PRIVATE_KEY}`,
      ],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 60_000,
  },
};

export default settings;

import { ethers, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { QAZDescriptor, QAZToken } from "../typechain-types";
import { ContractReceipt, ContractTransaction } from "ethers";
import { Block } from "@ethersproject/abstract-provider";

export type TestSigners = {
  deployer: SignerWithAddress;
  account0: SignerWithAddress;
  account1: SignerWithAddress;
  account2: SignerWithAddress;
};

export const getSigners = async (): Promise<TestSigners> => {
  const [deployer, account0, account1, account2] = await ethers.getSigners();
  return {
    deployer,
    account0,
    account1,
    account2,
  };
};

export const deployQAZDescriptor = async (
  deployer?: SignerWithAddress
): Promise<QAZDescriptor> => {
  const signer = deployer || (await getSigners()).deployer;

  const NFTDescriptorLibraryFactory = await ethers.getContractFactory(
    "NFTDescriptor",
    signer
  );
  const NFTDescriptorLibrary = await NFTDescriptorLibraryFactory.deploy();
  await NFTDescriptorLibrary.deployed();

  const QAZElementerLibraryFactory = await ethers.getContractFactory(
    "QAZElementer",
    signer
  );
  const QAZElementerLibrary = await QAZElementerLibraryFactory.deploy();
  await QAZElementerLibrary.deployed();

  const QAZDescriptorFactory = await ethers.getContractFactory(
    "QAZDescriptor",
    {
      signer: signer,
      libraries: {
        NFTDescriptor: NFTDescriptorLibrary.address,
        QAZElementer: QAZElementerLibrary.address,
      },
    }
  );
  const QAZDescriptor = (await QAZDescriptorFactory.deploy()) as QAZDescriptor;
  await QAZDescriptor.deployed();
  return QAZDescriptor;
};

export const deployQAZToken = async (
  deployer?: SignerWithAddress,
  descriptor?: string
): Promise<QAZToken> => {
  const signer = deployer || (await getSigners()).deployer;
  const QAZTokenFactory = await ethers.getContractFactory("QAZToken", signer);
  const QAZToken = (await QAZTokenFactory.deploy(
    descriptor || (await deployQAZDescriptor(signer)).address
  )) as QAZToken;
  await QAZToken.deployed();
  return QAZToken;
};

/**
 * Return a mint transaction data with receipt
 */
export const MintWithTxData = async (
  token: QAZToken,
  minter: SignerWithAddress
): Promise<{
  tx: ContractTransaction;
  receipt: ContractReceipt;
  tokenId: number;
}> => {
  const mintTxn = await token.connect(minter).mint();
  const mintReceipt = await mintTxn.wait();
  const mintEvent = mintReceipt.events?.[0];
  const mintVal = mintEvent?.args?.[2];
  const tokenId = mintVal.toNumber();
  return { tx: mintTxn, receipt: mintReceipt, tokenId: tokenId };
};

// The following adapted from `https://github.com/compound-finance/compound-protocol/blob/master/tests/Utils/Ethereum.js`

const rpc = <T = unknown>({
  method,
  params,
}: {
  method: string;
  params?: unknown[];
}): Promise<T> => {
  return network.provider.send(method, params);
};

export const encodeParameters = (
  types: string[],
  values: unknown[]
): string => {
  const abi = new ethers.utils.AbiCoder();
  return abi.encode(types, values);
};

export const blockByNumber = async (n: number | string): Promise<Block> => {
  return rpc({ method: "eth_getBlockByNumber", params: [n, false] });
};

export const increaseTime = async (seconds: number): Promise<unknown> => {
  await rpc({ method: "evm_increaseTime", params: [seconds] });
  return rpc({ method: "evm_mine" });
};

export const freezeTime = async (seconds: number): Promise<unknown> => {
  await rpc({ method: "evm_increaseTime", params: [-1 * seconds] });
  return rpc({ method: "evm_mine" });
};

export const advanceBlocks = async (blocks: number): Promise<void> => {
  for (let i = 0; i < blocks; i++) {
    await mineBlock();
  }
};

export const blockNumber = async (parse = true): Promise<number> => {
  const result = await rpc<number>({ method: "eth_blockNumber" });
  return parse ? parseInt(result.toString()) : result;
};

export const blockTimestamp = async (
  n: number | string,
  parse = true
): Promise<number | string> => {
  const block = await blockByNumber(n);
  return parse ? parseInt(block.timestamp.toString()) : block.timestamp;
};

export const setNextBlockTimestamp = async (
  n: number,
  mine = true
): Promise<void> => {
  await rpc({ method: "evm_setNextBlockTimestamp", params: [n] });
  if (mine) await mineBlock();
};

export const minerStop = async (): Promise<void> => {
  await network.provider.send("evm_setAutomine", [false]);
  await network.provider.send("evm_setIntervalMining", [0]);
};

export const minerStart = async (): Promise<void> => {
  await network.provider.send("evm_setAutomine", [true]);
};

export const mineBlock = async (): Promise<void> => {
  await network.provider.send("evm_mine");
};

export const chainId = async (): Promise<number> => {
  return parseInt(await network.provider.send("eth_chainId"), 16);
};

export const address = (n: number): string => {
  return `0x${n.toString(16).padStart(40, "0")}`;
};

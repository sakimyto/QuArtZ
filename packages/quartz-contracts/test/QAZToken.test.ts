import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { QAZToken } from "../typechain-types";
import { deployQAZToken, increaseTime, MintWithTxData } from "./utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("QAZToken", async () => {
  let QAZToken: QAZToken;
  let deployer: SignerWithAddress;
  let QuArtZersDAO: SignerWithAddress;
  let user: SignerWithAddress;

  // Deploys the EternalNFT contract and the EternalMarket contract before each test
  before("Setup Contract", async () => {
    [deployer, QuArtZersDAO, user] = await ethers.getSigners();
    console.log(`deployer address: ${deployer.address}`);
    console.log(`QuArtZersDAO address: ${QuArtZersDAO.address}`);
    console.log(`user address: ${user.address}`);
    QAZToken = await deployQAZToken(deployer);

    console.log(`QAZToken deploy tx hash: ${QAZToken.deployTransaction.hash}`);
    console.log(`QAZToken greeter contract address: ${QAZToken.address}`);
  });

  // Tests address for the EternalNFT contract
  it("Should have an address", async () => {
    assert.notEqual(QAZToken.address, (0x0).toString());
    assert.notEqual(QAZToken.address, "");
    assert.notEqual(QAZToken.address, null);
    assert.notEqual(QAZToken.address, undefined);
  });

  // Tests name for the token of EternalNFT contract
  it("Should have a name", async () => {
    const name = await QAZToken.collectionName();
    assert.equal(name, "QuArtZ");
  });

  // Tests symbol for the token of EternalNFT contract
  it("Should have a symbol", async () => {
    const symbol = await QAZToken.collectionSymbol();
    assert.equal(symbol, "QAZ");
  });

  // Tests for NFT minting function of EternalNFT contract using tokenID of the minted NFT
  it("Should be able to mint NFT", async () => {
    assert.equal((await QAZToken.totalSupply()).toNumber(), 0);

    // mint tokenId = 0
    const mint0TxData = await MintWithTxData(QAZToken, deployer);
    console.log(
      `mint 0 tx hash: https://shibuya.subscan.io/extrinsic/${mint0TxData.tx.hash}`
    );
    console.log(`tokenURI 0 : ${await QAZToken.tokenURI(0)}`);
    // Assertion for token(tokenId = 0)
    assert.equal(mint0TxData.tokenId, 0);
    assert.equal((await QAZToken.totalSupply()).toNumber(), 1);
    assert.equal(await QAZToken.ownerOf(0), deployer.address);
    assert.equal((await QAZToken.balanceOf(deployer.address)).toNumber(), 1);

    // except mint in inteval
    await expect(QAZToken.connect(deployer).mint()).to.revertedWith(
      "Mint is locked now."
    );

    // increase 77 hours
    await increaseTime(3601 * 77);

    // mint tokenId = 1
    const mint1TxData = await MintWithTxData(QAZToken, QuArtZersDAO);
    console.log(
      `mint 1 tx hash: https://shibuya.subscan.io/extrinsic/${mint1TxData.tx.hash}`
    );
    // Assertion for token(tokenId = 1) and contract state
    assert.equal(mint1TxData.tokenId, 1);
    assert.equal((await QAZToken.totalSupply()).toNumber(), 2);
    assert.equal(await QAZToken.ownerOf(1), QuArtZersDAO.address);
    assert.equal(
      (await QAZToken.balanceOf(QuArtZersDAO.address)).toNumber(),
      1
    );

    // transfer token(tokenId = 1) from QuArtZersDAO.address to user.address
    const QuArtZersDAOToAddressTxn = await QAZToken.connect(
      QuArtZersDAO
    ).transferFrom(QuArtZersDAO.address, user.address, 1);
    await QuArtZersDAOToAddressTxn.wait();
    console.log(
      `QuArtZersDAOToAddressTx tx hash: https://shibuya.subscan.io/extrinsic/${QuArtZersDAOToAddressTxn.hash}`
    );
    // Assertion for transferred token(tokenId = 1)
    assert.equal((await QAZToken.totalSupply()).toNumber(), 2);
    assert.equal(await QAZToken.ownerOf(1), user.address);
    assert.equal(
      (await QAZToken.balanceOf(QuArtZersDAO.address)).toNumber(),
      0
    );
    assert.equal((await QAZToken.balanceOf(user.address)).toNumber(), 1);

    // mint token(tokenId = 2)
    const mint2TxData = await MintWithTxData(QAZToken, user);
    console.log(
      `mint 2 tx hash: https://shibuya.subscan.io/extrinsic/${mint2TxData.tx.hash}`
    );
    // Assertion for re-minted token(tokenId = 0)
    assert.equal((await QAZToken.totalSupply()).toNumber(), 3);
    assert.equal(await QAZToken.ownerOf(2), user.address);
    assert.equal((await QAZToken.balanceOf(user.address)).toNumber(), 2);

    // transfer token(tokenId = 2) from user.address to QuArtZersDAO.address
    // require a few token for gas
    const QuArtZersDAOAddressTxn = await QAZToken.connect(user).transferFrom(
      user.address,
      QuArtZersDAO.address,
      2
    );
    await QuArtZersDAOAddressTxn.wait();
    console.log(
      `QuArtZersDAOAddress tx hash: https://shibuya.subscan.io/extrinsic/${QuArtZersDAOAddressTxn.hash}`
    );

    // Assertion for transferred token(tokenId = 2)
    assert.equal((await QAZToken.totalSupply()).toNumber(), 3);
    assert.equal(await QAZToken.ownerOf(2), QuArtZersDAO.address);
    assert.equal(
      (await QAZToken.balanceOf(QuArtZersDAO.address)).toNumber(),
      1
    );
    assert.equal((await QAZToken.balanceOf(user.address)).toNumber(), 1);
  });
});

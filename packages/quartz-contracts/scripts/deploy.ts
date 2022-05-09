import { ethers } from "hardhat";

const main = async () => {
  const NFTDescriptorLibraryFactory = await ethers.getContractFactory(
    "NFTDescriptor"
  );
  const NFTDescriptorLibrary = await NFTDescriptorLibraryFactory.deploy();
  await NFTDescriptorLibrary.deployed();

  const QAZElementerLibraryFactory = await ethers.getContractFactory(
    "QAZElementer"
  );
  const QAZElementerLibrary = await QAZElementerLibraryFactory.deploy();
  await QAZElementerLibrary.deployed();

  const QAZDescriptorFactory = await ethers.getContractFactory(
    "QAZDescriptor",
    {
      libraries: {
        NFTDescriptor: NFTDescriptorLibrary.address,
        QAZElementer: QAZElementerLibrary.address,
      },
    }
  );
  const QAZDescriptorContract = await QAZDescriptorFactory.deploy();
  await QAZDescriptorContract.deployed();
  console.log("Contract deployed to: ", QAZDescriptorContract.address);

  const QAZTokenFactory = await ethers.getContractFactory("QAZToken");
  const QAZTokenContract = await QAZTokenFactory.deploy(
    QAZDescriptorContract.address
  );
  await QAZTokenContract.deployed();
  console.log("Contract deployed to: ", QAZTokenContract.address);
};
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runMain();

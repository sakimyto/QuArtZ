# QuArtZ 💎 contracts

## Commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat test --network rinkeby
npx hardhat test --network shibuya
npx hardhat node
npx hardhat run scripts/deploy.ts --network rinkeby
npx hardhat run scripts/deploy.ts --network shibuya
npx hardhat verify --network rinkeby $Address
npx hardhat help
```

```shell
# localnode
./shiden --port 30333 --ws-port 9944 --rpc-port 9933 --rpc-cors all --alice --dev
```

## Magic Meta Data

- NFT
  - name
  - description
  - image
- Magic Meta Data
  - spell
  - element
  - power(0〜31)
  - speed(0〜31)
  - accuracy(0〜31)
  - range(0〜31)
  - cost(0〜31)
  - luck(0〜31)

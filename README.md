# CheckDot Token Smart Contract

## Information

Here's the token details.

- Name: CheckDot
- Symbol: CDT
- Decimals: 6
- Total Supply: 10,000,000

## Installation

Install node_modules for AS and Massa network.

```shell
npm install
```

## Build

By default this will build all files in `assembly/contracts` directory.

```shell
npm run build
```

## Deploy

Prerequisites :

- You must add a `.env` file at the root of the repository with the following keys set to valid values :
  - WALLET_SECRET_KEY="wallet_secret_key"
  - JSON_RPC_URL_PUBLIC
    - BuildNet: <https://buildnet.massa.net/api/v2>
    - TestNet: <https://test.massa.net/api/v2:33035>

These keys will be the ones used by the deployer script to interact with the blockchain.

The following command will build contracts in `assembly/contracts` directory and execute the deployment script
`src/deploy.ts`. This script will deploy on the node specified in the `.env` file.

```shell
npm run deploy
```

You can modify `src/deploy.ts` to change the smart contract being deployed, and to pass arguments to the constructor
function:

- line 31: specify what contract you want to deploy
- line 33: create the `Args` object to pass to the constructor of the contract you want to deploy

When the deployment operation is executed on-chain, the
[constructor](https://github.com/massalabs/massa-sc-toolkit/blob/main/packages/sc-project-initializer/commands/init/assembly/contracts/main.ts#L10)
function of the smart contract being deployed will
be called with the arguments provided in the deployment script.

The deployment script uses [massa-sc-deployer library](https://www.npmjs.com/package/@massalabs/massa-sc-deployer)
to deploy smart contracts.

You can edit this script and use [massa-web3 library](https://www.npmjs.com/package/@massalabs/massa-web3)
to create advanced deployment procedure.

For more information, please visit our ReadTheDocs about
[Massa smart-contract development](https://docs.massa.net/en/latest/web3-dev/smart-contracts.html).

## Unit tests

The test framework documentation is available here: [as-pect docs](https://as-pect.gitbook.io/as-pect)

```shell
npm run test
```

## Format code

```shell
npm run fmt
```

## Call Transaction (JS)

Example to burn CDT tokens

```shell
await client.smartContracts().callSmartContract({
    targetAddress: CONTRACT_ADDRESS,
    functionName: "burn",
    parameter: new Args().addU64(BigInt(1000000)).serialize(),
    maxGas: MAX_GAS,
    coins: BigInt(1),
    fee: BigInt(0),
});
```

## Call View Function (JS)

Example to get total supply

```shell
await client.smartContracts().readSmartContract({
    maxGas: MAX_GAS,
    targetAddress: CONTRACT_ADDRESS,
    targetFunction: "totalSupply",
    parameter: new Args().serialize(),
})
```
import {
  Args,
  Client,
  ClientFactory,
  DefaultProviderUrls,
  IAccount,
  WalletClient,
} from '@massalabs/massa-web3';
import dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = 'AS1McMwDRVbZGVoix62U8XLjTHXXjntMMc8sMwHLWpVsmokqnLa1';

const PRIVATE_KEY = process.env.WALLET_SECRET_KEY;

if (!PRIVATE_KEY) {
  throw new Error('Missing WALLET_SECRET_KEY in .env file');
}

(async () => {
  const account: IAccount = await WalletClient.getAccountFromSecretKey(
    PRIVATE_KEY,
  );

  const client: Client = await ClientFactory.createDefaultClient(
    DefaultProviderUrls.TESTNET,
    true,
    account,
  );

  let res = await client.smartContracts().readSmartContract({
    maxGas: BigInt(1000000),
    targetAddress: CONTRACT_ADDRESS,
    targetFunction: 'totalSupply',
    parameter: new Args().serialize(),
  });

  console.log(new Args(res.returnValue).nextU64());
})();

import { bytesToU64, stringToBytes, u64ToBytes } from '@massalabs/as-types';
import { Address, Storage } from '@massalabs/massa-as-sdk';

export const BALANCE_KEY = 'BALANCE';
export const ALLOWANCE_KEY = 'ALLOWANCE';

/**
 * Theses function are intended to be used in different token types (mintable, burnable...).
 * We define them and export in this file to avoid exporting them in the contract entry file,
 * making them callable from the outside world
 *
 */

/**
 * Returns the balance of a given address.
 *
 * @param address - address to get the balance for
 */
export function _balance(address: Address): u64 {
  const key = getBalanceKey(address);
  if (Storage.has(key)) {
    return bytesToU64(Storage.get(key));
  }
  return 0;
}

/**
 * Sets the balance of a given address.
 *
 * @param address - address to set the balance for
 * @param balance -
 */
export function _setBalance(address: Address, balance: u64): void {
  Storage.set(getBalanceKey(address), u64ToBytes(balance));
}

/**
 * @param address -
 * @returns the key of the balance in the storage for the given address
 */
function getBalanceKey(address: Address): StaticArray<u8> {
  return stringToBytes(BALANCE_KEY + address.toString());
}

/**
 * Removes amount of token from addressToBurn.
 *
 * @param addressToBurn -
 * @param amount -
 * @returns true if tokens has been burned
 */
export function _burn(addressToBurn: Address, amount: u64): boolean {
  const oldRecipientBalance = _balance(addressToBurn);
  const newRecipientBalance = oldRecipientBalance - amount;

  // Check underflow
  if (oldRecipientBalance < newRecipientBalance) {
    return false;
  }
  _setBalance(addressToBurn, newRecipientBalance);
  return true;
}

/**
 * Sets the allowance of the spender on the owner's account.
 *
 * @param owner - owner address
 * @param spenderAddress - spender address
 * @param amount - amount to set an allowance for
 */
export function _approve(
  owner: Address,
  spenderAddress: Address,
  amount: u64,
): void {
  const key = getAllowanceKey(owner, spenderAddress);
  Storage.set(key, u64ToBytes(amount));
}

/**
 * Returns the allowance set on the owner's account for the spender.
 *
 * @param owner - owner's id
 * @param spenderAddress - spender's id
 *
 * @returns the allowance
 */
export function _allowance(owner: Address, spenderAddress: Address): u64 {
  const key = getAllowanceKey(owner, spenderAddress);
  return Storage.has(key) ? bytesToU64(Storage.get(key)) : 0;
}

function getAllowanceKey(owner: Address, spender: Address): StaticArray<u8> {
  return stringToBytes(
    ALLOWANCE_KEY + owner.toString().concat(spender.toString()),
  );
}

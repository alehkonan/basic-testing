import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1200);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(1200);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1200);

    expect(() => account.withdraw(1300)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountA = getBankAccount(1200);
    const accountB = getBankAccount(0);

    expect(() => accountA.transfer(1300, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1200);

    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(0);
    account.deposit(100);

    expect(account.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(100);

    expect(account.getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    const accountA = getBankAccount(1200);
    const accountB = getBankAccount(0);
    accountA.transfer(200, accountB);

    expect(accountA.getBalance()).toBe(1000);
    expect(accountB.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1200);
    const balance = await account.fetchBalance();

    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);

    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(1000));

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);

    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(null));

    expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

import { Account } from '../types/account';
import { Mutex } from '../utils/lock';
import { NotFoundError } from '../errors/NotFoundError';

const accounts = new Map<number, Account>();
let idCounter = 1;

const transferMutex = new Mutex();

export class BankService {
  static reset() {
    accounts.clear();
    idCounter = 1;
  }

  static createAccount(name: string, balance: number): Account {
    if (balance < 0) throw new Error('餘額不能為負數');

    const account: Account = {
      id: idCounter++,
      name,
      balance,
      transactions: [],
    };
    accounts.set(account.id, account);
    return account;
  }

  static getAccount(id: number): Account | undefined {
    return accounts.get(id);
  }

  static deposit(id: number, amount: number): Account {
    const account = accounts.get(id);
    if (!account) throw new NotFoundError('帳戶不存在');

    account.balance += amount;
    account.transactions.push({ type: 'deposit', amount, date: new Date() });
    return account;
  }

  static withdraw(id: number, amount: number): Account {
    const account = accounts.get(id);
    if (!account) throw new NotFoundError('帳戶不存在');
    if (account.balance < amount) throw new Error('餘額不足');

    account.balance -= amount;
    account.transactions.push({ type: 'withdraw', amount, date: new Date() });
    return account;
  }

  static async transfer(fromId: number, toId: number, amount: number): Promise<{ from: Account; to: Account }> {
    const release = await transferMutex.lock();
    try {
      const from = accounts.get(fromId);
      const to = accounts.get(toId);

      if (!from || !to) throw new NotFoundError('帳戶不存在');
      if (from.balance < amount) throw new Error('餘額不足');

      const date = new Date();
      from.balance -= amount;
      to.balance += amount;

      from.transactions.push({ type: 'transfer-out', amount, date, to: to.id });
      to.transactions.push({ type: 'transfer-in', amount, date, from: from.id });

      return { from, to };
    } finally {
      release();
    }
  }
}
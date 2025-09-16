"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
const lock_1 = require("../utils/lock");
const accounts = new Map();
let idCounter = 1;
const transferMutex = new lock_1.Mutex();
class BankService {
    static reset() {
        accounts.clear();
        idCounter = 1;
    }
    static createAccount(name, balance) {
        if (balance < 0)
            throw new Error('餘額不能為負數');
        const account = {
            id: idCounter++,
            name,
            balance,
            transactions: [],
        };
        accounts.set(account.id, account);
        return account;
    }
    static getAccount(id) {
        return accounts.get(id);
    }
    static deposit(id, amount) {
        const account = accounts.get(id);
        if (!account)
            throw new Error('帳戶不存在');
        account.balance += amount;
        account.transactions.push({ type: 'deposit', amount, date: new Date() });
        return account;
    }
    static withdraw(id, amount) {
        const account = accounts.get(id);
        if (!account)
            throw new Error('帳戶不存在');
        if (account.balance < amount)
            throw new Error('餘額不足');
        account.balance -= amount;
        account.transactions.push({ type: 'withdraw', amount, date: new Date() });
        return account;
    }
    static async transfer(fromId, toId, amount) {
        const release = await transferMutex.lock();
        try {
            const from = accounts.get(fromId);
            const to = accounts.get(toId);
            if (!from || !to)
                throw new Error('帳戶不存在');
            if (from.balance < amount)
                throw new Error('餘額不足');
            const date = new Date();
            from.balance -= amount;
            to.balance += amount;
            from.transactions.push({ type: 'transfer-out', amount, date, to: to.id });
            to.transactions.push({ type: 'transfer-in', amount, date, from: from.id });
            return { from, to };
        }
        finally {
            release();
        }
    }
}
exports.BankService = BankService;

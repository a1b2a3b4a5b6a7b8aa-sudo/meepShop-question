"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const accounts = new Map();
let idCounter = 1;
// 建立帳戶
router.post('/', (req, res) => {
    const { name, balance } = req.body;
    if (balance < 0) {
        return res.status(400).json({ error: '餘額不能為負數' });
    }
    const account = {
        id: idCounter++,
        name,
        balance,
        transactions: [],
    };
    accounts.set(account.id, account);
    res.status(201).json(account);
});
// 存款
router.post('/:id/deposit', (req, res) => {
    const account = accounts.get(Number(req.params.id));
    if (!account) {
        return res.status(404).json({ error: '帳戶不存在' });
    }
    const amount = req.body.amount;
    account.balance += amount;
    account.transactions.push({ type: 'deposit', amount, date: new Date() });
    res.json(account);
});
// 提款
router.post('/:id/withdraw', (req, res) => {
    const account = accounts.get(Number(req.params.id));
    if (!account) {
        return res.status(404).json({ error: '帳戶不存在' });
    }
    const amount = req.body.amount;
    if (account.balance < amount) {
        return res.status(400).json({ error: '餘額不足' });
    }
    account.balance -= amount;
    account.transactions.push({ type: 'withdraw', amount, date: new Date() });
    res.json(account);
});
// 轉帳
router.post('/transfer', (req, res) => {
    const { fromId, toId, amount } = req.body;
    const from = accounts.get(Number(fromId));
    const to = accounts.get(Number(toId));
    if (!from || !to) {
        return res.status(404).json({ error: '帳戶不存在' });
    }
    if (from.balance < amount) {
        return res.status(400).json({ error: '餘額不足' });
    }
    const date = new Date();
    from.balance -= amount;
    to.balance += amount;
    from.transactions.push({ type: 'transfer-out', amount, date, to: to.id });
    to.transactions.push({ type: 'transfer-in', amount, date, from: from.id });
    res.json({ from, to });
});
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bank_1 = require("../services/bank");
const router = (0, express_1.Router)();
// 建立帳戶
router.post('/', (req, res) => {
    try {
        const { name, balance } = req.body;
        const account = bank_1.BankService.createAccount(name, balance);
        res.status(201).json(account);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// 存款
router.post('/:id/deposit', (req, res) => {
    try {
        const account = bank_1.BankService.deposit(Number(req.params.id), req.body.amount);
        res.json(account);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// 提款
router.post('/:id/withdraw', (req, res) => {
    try {
        const account = bank_1.BankService.withdraw(Number(req.params.id), req.body.amount);
        res.json(account);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// 轉帳
router.post('/transfer', async (req, res) => {
    try {
        const { fromId, toId, amount } = req.body;
        const result = await bank_1.BankService.transfer(Number(fromId), Number(toId), amount);
        return res.json(result);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
exports.default = router;

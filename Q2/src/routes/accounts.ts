import { Router } from 'express';
import { BankService } from '../services/bank';
import { handleError } from '../utils/errorHandler';

const router = Router();

// 建立帳戶
router.post('/', (req, res) => {
  try {
    const { name, balance } = req.body;
    const account = BankService.createAccount(name, balance);
    res.status(201).json(account);
  } catch (err: any) {
    handleError(res, err);
  }
});

// 存款
router.post('/:id/deposit', (req, res) => {
  try {
    const account = BankService.deposit(Number(req.params.id), req.body.amount);
    res.json(account);
  } catch (err: any) {
    handleError(res, err);
  }
});

// 提款
router.post('/:id/withdraw', (req, res) => {
  try {
    const account = BankService.withdraw(Number(req.params.id), req.body.amount);
    res.json(account);
  } catch (err: any) {
    handleError(res, err);
  }
});

// 轉帳
router.post('/transfer', async (req, res) => {
  try {
    const { fromId, toId, amount } = req.body;
    const result = await BankService.transfer(Number(fromId), Number(toId), amount);
    res.json(result);
  } catch (err: any) {
    handleError(res, err);
  }
});

export default router;
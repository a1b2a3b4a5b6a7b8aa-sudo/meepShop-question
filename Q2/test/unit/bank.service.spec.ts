import { BankService } from '../../src/services/bank';

describe('單元測試', () => {
  beforeEach(() => {
    BankService.reset();
  });

  it('單元測試：建立帳戶成功，名稱與餘額正確', () => {
    const account = BankService.createAccount('Hao', 1000);
    expect(account.name).toBe('Hao');
    expect(account.balance).toBe(1000);
    expect(account.transactions.length).toBe(0);
  });

  it('單元測試：禁止建立餘額為負的帳戶', () => {
    expect(() => BankService.createAccount('Hao', -500)).toThrow('餘額不能為負');
  });

  it('單元測試：存款，餘額更新', () => {
    const acc = BankService.createAccount('Hao', 100);
    const result = BankService.deposit(acc.id, 50);
    expect(result.balance).toBe(150);
  });

  it('單元測試：提款，餘額更新', () => {
    const acc = BankService.createAccount('Hao', 200);
    const result = BankService.withdraw(acc.id, 80);
    expect(result.balance).toBe(120);
  });

  it('單元測試：提款餘額不足時拋出錯誤', () => {
    const acc = BankService.createAccount('Hao', 50);
    expect(() => BankService.withdraw(acc.id, 100)).toThrow('餘額不足');
  });

  it('單元測試：轉帳成功，餘額正確更新並紀錄交易', async () => {
    const from = BankService.createAccount('Hao', 1000);
    const to = BankService.createAccount('Ben', 200);

    const result = await BankService.transfer(from.id, to.id, 300);
    expect(result.from.balance).toBe(700);
    expect(result.to.balance).toBe(500);

    expect(result.from.transactions[0]).toMatchObject({
      type: 'transfer-out',
      amount: 300,
      to: to.id,
    });
    expect(result.to.transactions[0]).toMatchObject({
      type: 'transfer-in',
      amount: 300,
      from: from.id,
    });
  });

  it('單元測試：轉帳餘額不足時拋出錯誤', async () => {
    const from = BankService.createAccount('A', 50);
    const to = BankService.createAccount('B', 50);
    await expect(BankService.transfer(from.id, to.id, 100)).rejects.toThrow('餘額不足');
  });

  it('單元測試：帳戶不存在時存提款拋出錯誤', () => {
    expect(() => BankService.deposit(999, 100)).toThrow('帳戶不存在');
    expect(() => BankService.withdraw(999, 100)).toThrow('帳戶不存在');
  });
});
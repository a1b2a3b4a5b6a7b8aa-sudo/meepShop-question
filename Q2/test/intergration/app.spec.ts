import request from 'supertest';
import app from '../../src/app';

describe('整合測試', () => {
  let accountA: any;
  let accountB: any;

  beforeAll(async () => {
    const resA = await request(app)
      .post('/accounts')
      .send({ name: 'Hao', balance: 1000 });

    expect(resA.status).toBe(201);
    accountA = resA.body;
    const resB = await request(app)
      .post('/accounts')
      .send({ name: 'Ben', balance: 500 });

    expect(resB.status).toBe(201);
    accountB = resB.body;
  });

  it('整合測試：成功存款，餘額更新並回傳 200', async () => {
    const res = await request(app)
      .post(`/accounts/${accountA.id}/deposit`)
      .send({ amount: 200 });

    expect(res.status).toBe(200);
    expect(res.body.balance).toBe(1200);
  });

  it('整合測試：成功提款，餘額更新並回傳 200', async () => {
    const res = await request(app)
      .post(`/accounts/${accountA.id}/withdraw`)
      .send({ amount: 100 });

    expect(res.status).toBe(200);
    expect(res.body.balance).toBe(1100);
  });

  it('整合測試：成功轉帳，兩邊帳戶餘額更新並回傳 200', async () => {
    const res = await request(app)
      .post(`/accounts/transfer`)
      .send({ fromId: accountA.id, toId: accountB.id, amount: 300 });

    expect(res.status).toBe(200);
    expect(res.body.from.balance).toBe(800);
    expect(res.body.to.balance).toBe(800);
  });

  it('整合測試：轉帳失敗，餘額不足時回傳 400 並帶錯誤訊息', async () => {
    const res = await request(app)
      .post(`/accounts/transfer`)
      .send({ fromId: accountA.id, toId: accountB.id, amount: 10000 });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('餘額不足');
  });

  it('整合測試：帳戶不存在時操作失敗，回傳 404 並帶錯誤訊息', async () => {
    const res = await request(app)
      .post(`/accounts/999/deposit`)
      .send({ amount: 100 });

    expect(res.status).toBe(404);
    expect(res.body.error).toContain('帳戶不存在');
  });
});
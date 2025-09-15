/**
 * 銀行交易類型
 */
export enum TransactionType {
  /** 存款：把錢存入帳戶 */
  Deposit = "deposit",

  /** 提款：從帳戶取出金額 */
  Withdraw = "withdraw",

  /** 轉入：從其他帳戶收到金額 */
  TransferIn = "transfer-in",

  /** 轉出：把金額轉給其他帳戶 */
  TransferOut = "transfer-out"
}
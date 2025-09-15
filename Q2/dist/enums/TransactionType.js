"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = void 0;
/**
 * 銀行交易類型
 */
var TransactionType;
(function (TransactionType) {
    /** 存款：把錢存入帳戶 */
    TransactionType["Deposit"] = "deposit";
    /** 提款：從帳戶取出金額 */
    TransactionType["Withdraw"] = "withdraw";
    /** 轉入：從其他帳戶收到金額 */
    TransactionType["TransferIn"] = "transfer-in";
    /** 轉出：把金額轉給其他帳戶 */
    TransactionType["TransferOut"] = "transfer-out";
})(TransactionType || (exports.TransactionType = TransactionType = {}));

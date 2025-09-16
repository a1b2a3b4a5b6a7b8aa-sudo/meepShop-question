"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutex = void 0;
class Mutex {
    constructor() {
        this.mutex = Promise.resolve();
    }
    async lock() {
        let unlockNext;
        const willLock = new Promise(resolve => {
            unlockNext = resolve;
        });
        const currentLock = this.mutex.then(() => willLock);
        this.mutex = currentLock;
        return () => unlockNext();
    }
}
exports.Mutex = Mutex;

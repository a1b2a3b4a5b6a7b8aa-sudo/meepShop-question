export class Mutex {
  private mutex = Promise.resolve();

  async lock(): Promise<() => void> {
    let unlockNext!: () => void;
    const willLock = new Promise<void>(resolve => {
      unlockNext = resolve;
    });

    const currentLock = this.mutex.then(() => willLock);
    this.mutex = currentLock;

    return () => unlockNext();
  }
}
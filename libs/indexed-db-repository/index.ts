import Repository from "repository";

class IndexedDBRepository<T> implements Repository<T> {
  constructor(
    private readonly dbName: string,
    private readonly storeName: string
  ) {
    this.init();
  }

  private async init() {
    const db = await this.openDatabase();
    db.close();
  }

  private async openDatabase() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore(this.storeName, { keyPath: "id" });
      };
    });
  }

  private async getObjectStore() {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.storeName, "readwrite");
    return transaction.objectStore(this.storeName);
  }

  async put(data: T): Promise<void> {
    const store = await this.getObjectStore();
    return new Promise<void>((resolve, reject) => {
      const request = store.put(data);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async delete(id: string): Promise<void> {
    const store = await this.getObjectStore();
    return new Promise<void>((resolve, reject) => {
      const request = store.delete(id);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async get(id: string): Promise<T> {
    const store = await this.getObjectStore();
    return new Promise<T>((resolve, reject) => {
      const request = store.get(id);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async findAll(): Promise<T[]> {
    const store = await this.getObjectStore();
    return new Promise<T[]>((resolve, reject) => {
      const request = store.getAll();

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  update(data: Partial<T>): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default IndexedDBRepository;

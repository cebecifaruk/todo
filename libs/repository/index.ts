export interface KVRepository<T> {
  put(data: T): Promise<void>;
  get(id: string): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface CRUDRepository<T> extends KVRepository<T> {
  update(data: Partial<T>): Promise<void>;
  findAll(): Promise<T[]>;
}

export default CRUDRepository;

import fs from "fs";
import Repository from "repository";

class FileRepository<T> implements Repository<T> {
  constructor(private readonly path: string) {}

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  get(id: string): Promise<T> {}

  set(id: string, entity: T): Promise<void> {}

  put(data: T): Promise<void> {}

  update(data: Partial<T>): Promise<void> {}
}

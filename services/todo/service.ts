import Repository from "repository";
import TodoService, { Todo } from ".";

export class TodoServiceImpl implements TodoService {
  constructor(private readonly repository: Repository<Todo>) {}

  async findAllTodos(): Promise<Todo[]> {
    return await this.repository.findAll();
  }

  async findTodoById(id: string): Promise<Todo> {
    return await this.repository.get(id);
  }

  async createTodo(title: string): Promise<void> {
    const id = Math.random().toString(36).substring(7);
    await this.repository.put({ id, title, completed: false });
  }

  async updateTodoTitle(id: string, title: string): Promise<void> {
    const todo = await this.repository.get(id);
    await this.repository.update({ ...todo, title });
  }

  async deleteTodo(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default TodoServiceImpl;

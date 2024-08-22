import axios, { AxiosInstance } from "axios";
import TodoService, { Todo } from ".";

class TodoRestClient implements TodoService {
  api: AxiosInstance;

  constructor(private readonly baseUrl: string) {
    this.api = axios.create({
      baseURL: baseUrl,
    });
  }

  async createTodo(title: string): Promise<void> {
    await this.api.post("/todos", { title });
  }

  async findAllTodos(): Promise<Todo[]> {
    const response = await this.api.get("/todos");
    return response.data;
  }

  async findTodoById(id: string): Promise<Todo> {
    const response = await this.api.get(`/todos/${id}`);
    return response.data;
  }

  async updateTodoById(id: string, title: string): Promise<void> {
    await this.api.patch(`/todos/${id}`, { title });
  }

  async updateTodoTitle(id: string, title: string): Promise<void> {
    await this.api.patch(`/todos/${id}`, { title });
  }

  async deleteTodo(id: string): Promise<void> {
    await this.api.delete(`/todos/${id}`);
  }
}

export default TodoRestClient;

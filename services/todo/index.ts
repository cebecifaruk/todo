export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoService {
  findAllTodos(): Promise<Todo[]>;
  findTodoById(id: string): Promise<Todo>;
  createTodo(title: string): Promise<void>;
  updateTodoTitle(id: string, title: string): Promise<void>;
  deleteTodo(id: string): Promise<void>;
}

export default TodoService;

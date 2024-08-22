import TodoService, { Todo } from '.';

class MockTodoService implements TodoService {
  todos: Todo[] = [
    { id: '1', title: 'Buy milk', completed: false },
    { id: '2', title: 'Buy eggs', completed: true },
  ];

  async findAllTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async findTodoById(id: string): Promise<Todo> {
    return this.todos.find((todo) => todo.id === id)!;
  }

  async createTodo(title: string): Promise<void> {
    const id = this.todos.map((todo) => Number(todo.id)).sort((a, b) => a - b)[this.todos.length - 1] + 1;
    this.todos.push({
      id: id.toString(),
      title,
      completed: false,
    });
  }

  async updateTodoTitle(id: string, title: string): Promise<void> {
    const todo = this.todos.find((todo) => todo.id === id)!;
    todo.title = title;
  }

  async deleteTodo(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

export default MockTodoService;

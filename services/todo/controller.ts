import express from 'express';
import TodoService, { Todo } from '.';

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  getRouter(): express.Router {
    const router = express.Router();

    router.get('/todos', async (req, res) => {
      const todos = await this.todoService.findAllTodos();
      res.json(todos);
    });

    router.post('/todos', async (req, res) => {
      const { title } = req.body as { title: string };
      await this.todoService.createTodo(title);
      res.status(201).send();
    });

    router.get('/todos/:id', async (req, res) => {
      const todo = await this.todoService.findTodoById(req.params.id);
      res.json(todo);
    });

    router.patch('/todos/:id', async (req, res) => {
      const { title } = req.body as { title: string };
      await this.todoService.updateTodoTitle(req.params.id, title);
      res.send();
    });

    router.delete('/todos/:id', async (req, res) => {
      await this.todoService.deleteTodo(req.params.id);
      res.send();
    });

    return router;
  }
}

export default TodoController;

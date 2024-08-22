import React from 'react';
import { createRoot } from 'react-dom/client';

import TodoComponent from 'todo-service/component';
import MockTodoService from 'todo-service/mock';
import TodoService from 'todo-service/service';
import IndexedDBRepository from 'indexed-db-repository';
import TodoRestClient from 'todo-service/client';
import App from './App';
import { Todo } from 'todo-service';

// const todoRepository = new IndexedDBRepository<Todo>("todos", "todos");
// const todoService = new TodoService(todoRepository);

// const todoService = new MockTodoService();

const todoService = new TodoRestClient('http://localhost:3000');

const Todo = TodoComponent(todoService);

const root = createRoot(document.getElementById('root')!);

root.render(
  <App>
    <Todo />
  </App>
);

import TodoController from "todo-service/controller";
import MockTodoService from "todo-service/mock";
import RestServer from "./RestServer";

const todoController = new TodoController(new MockTodoService());
new RestServer([todoController]).run();

import React from "react";
import {
  Button,
  Card,
  Drawer,
  Table,
  Form,
  Input,
  notification,
  message,
} from "antd";
import TodoService, { Todo } from "todo-service";

const TodoComponent = (todoService: TodoService) => () => {
  const [todos, setTodos] = React.useState<Todo[] | null>(null);
  const [createTodoDrawer, setCreateTodoDrawer] = React.useState(false);

  const loadTodos = React.useCallback(async () => {
    setTodos(null);
    const todos = await todoService.findAllTodos();
    setTodos(todos);
  }, [todoService]);

  const deleteTodo = React.useCallback(
    async (id: string) => {
      console.log(id);
      message.loading({ content: "Deleting todo...", key: "delete-todo" });
      await todoService.deleteTodo(id);
      message.success({ content: "Todo deleted", key: "delete-todo" });
      await loadTodos();
    },
    [todoService]
  );

  React.useEffect(() => {
    loadTodos();
  }, []);

  if (!todos) return <div>Loading...</div>;

  return (
    <Card
      extra={<Button icon="plus" onClick={() => setCreateTodoDrawer(true)} />}
    >
      <Drawer
        title="Create Todo"
        open={createTodoDrawer}
        onClose={() => setCreateTodoDrawer(false)}
      >
        <Form
          onFinish={async (values) => {
            setCreateTodoDrawer(false);
            message.loading({
              content: "Creating todo...",
              key: "create-todo",
            });
            await todoService.createTodo(values.title);
            message.success({ content: "Todo created", key: "create-todo" });
            await loadTodos();
          }}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Table
        dataSource={todos}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Title", dataIndex: "title" },
          { title: "Completed", dataIndex: "completed" },
          {
            title: "Actions",
            render: (row: any) => (
              <Button onClick={() => deleteTodo(row.id)} danger>
                Delete
              </Button>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default TodoComponent;

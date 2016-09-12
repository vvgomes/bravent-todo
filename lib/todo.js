import { defineAggregate } from "bravent"

import addTodo from "./command.handlers/add.todo";
import toggleTodo from "./command.handlers/toggle.todo";

import todoAdded from "./event.handlers/todo.added";
import todoToggled from "./event.handlers/todo.toggled";

const Todo = defineAggregate({
  initialState: { todos: [] },
  eventHandlers: { todoAdded, todoToggled },
  commandHandlers: { addTodo, toggleTodo }
});

export default Todo;


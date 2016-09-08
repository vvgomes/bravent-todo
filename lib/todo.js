import { defineAggregate } from "bravent"

import addTask from "./command.handlers/add.task";
import toggleTask from "./command.handlers/toggle.task";

import taskAdded from "./event.handlers/task.added";
import taskToggled from "./event.handlers/task.toggled";

const Todo = defineAggregate({
  initialState: { tasks: [] },
  eventHandlers: { taskAdded, taskToggled },
  commandHandlers: { addTask, toggleTask }
});

export default Todo;


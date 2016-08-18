import R from "ramda";
import moment from "moment"
import Validation from "data.validation"
import EventSourcing from "./event.sourcing/event.sourcing"

const Todo = {};

Todo.app = EventSourcing.buildApp({
  eventHandlers: {
    taskAdded: (state, event) =>
      R.concat(state, event.payload)
  },

  commandHandlers: {
    addTask: (state, command) =>
      Validation.Success([
        {
          type: "taskAdded",
          timestamp: moment().format("YYYYMMDDTHHmmss.SSS"),
          payload: command.payload
        }
      ])
  },

  initialState: []
});

export default Todo;


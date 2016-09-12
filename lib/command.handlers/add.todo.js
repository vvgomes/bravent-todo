import { validate } from "bravent";
import { has, where, isEmpty, flip, complement, contains, pluck, map } from "ramda";
import uuid from "uuid";
import utcClock from "../util/utc.clock";

const addTodo = (state, command, uuidGen = uuid.v4, clock = utcClock) =>
  validate(command, {
    "Todo must have a text description.":
      has("text"),

    "Todo text must not be empty.":
      where({ text: complement(isEmpty) }),

    "Todo text must be unique.":
      where({ text: flip(complement(contains))(pluck("text", state.todos)) })
  })
  .map(command => [{
    type: "todoAdded",
    id: uuidGen(),
    text: command.text,
    timestamp: clock()
  }]);

export default addTodo;

import { validate } from "predicado";
import { has, where, isEmpty, flip, complement, contains, pluck, map } from "ramda";
import uuid from "uuid";
import utcClock from "../util/utc.clock";

const addTodo = (state, command, uuidGen = uuid.v4, clock = utcClock) =>
  validate(command, [{
    error: "Todo must have a text description.",
    predicate: has("text")
  }, {
    error: "Todo text must not be empty.",
    predicate: where({ text: complement(isEmpty) })
  }, {
    error: "Todo text must be unique.",
    predicate: where({ text: flip(complement(contains))(pluck("text", state.todos)) })
  }])
  .map(command => [{
    type: "todoAdded",
    id: uuidGen(),
    text: command.text,
    timestamp: clock()
  }]);

export default addTodo;

import { validate } from "predicado";
import { has, where, isEmpty, flip, complement, contains, pluck, pipe, map, always } from "ramda";
import uuid from "uuid";
import utcClock from "../util/utc.clock";

const validations = state => [
  {
    error: "Todo must have a text description.",
    predicate: has("text")
  },
  {
    error: "Todo text must not be empty.",
    predicate: where({ text: complement(isEmpty) })
  },
  {
    error: "Todo text must be unique.",
    predicate: where({ text: flip(complement(contains))(pluck("text", state.todos)) })
  }
];

const addTodo = (state, command, uuidGen = uuid.v4, clock = utcClock) =>
  pipe(
    validate(validations(state)),
    map(always([{
      type: "todoAdded",
      id: uuidGen(),
      text: command.text,
      timestamp: clock()
    }]))
  )(command);

export default addTodo;

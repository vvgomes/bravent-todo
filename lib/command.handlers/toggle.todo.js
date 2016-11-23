import { validate } from "predicado";
import { where, flip, contains, pluck, pipe, map, always } from "ramda";
import utcClock from "../util/utc.clock";

const validations = state => [ 
  {
    error: "Todo not found.",
    predicate: where({ id: flip(contains)(pluck("id", state.todos)) })
  }
];

const toggleTodo = (state, command, clock = utcClock) =>
  pipe(
    validate(validations(state)),
    map(always([{
      type: "todoToggled",
      id: command.id,
      timestamp: clock()
    }]))
  )(command);

export default toggleTodo;


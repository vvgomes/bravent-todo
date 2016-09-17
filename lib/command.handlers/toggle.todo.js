import { validate } from "predicado";
import { where, flip, contains, pluck, map } from "ramda";
import utcClock from "../util/utc.clock";

const toggleTodo = (state, command, clock = utcClock) =>
  validate(command, [{
    error: "Todo not found.",
    predicate: where({ id: flip(contains)(pluck("id", state.todos)) })
  }])
  .map(command => [{
    type: "todoToggled",
    id: command.id,
    timestamp: clock()
  }]);

export default toggleTodo;

